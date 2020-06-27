import React, { useState, useEffect } from 'react';
import '../../UI/css/Statistics.css'
import {ReactComponent as ArrowIcon} from '../../UI/images/arrow.svg';
import {ReactComponent as SortIcon} from '../../UI/images/sort.svg';
import { Head } from '../misc/html_head'
import * as api from '../../api/api'
import * as utils from '../../utils';
import auth from '../../auth/auth';
import Loading from '../misc/loading';
import * as analysis from './Analysis';
import { DataFrame, Series } from 'pandas-js/dist/core';
import { Redirect } from 'react-router-dom';





const equity_df_columns = ['instrument', 'price', 'tradability', 'quantity','average_buy_price','dividend', 'realized profit', 'symbol', 'unrealized profit', 'percent unrealized profit', 'equity'];
const equity_columns_to_display = ['Name', 'Average Cost', 'Equity', 'Dividend', 'Realized Return', 'Unrealized Return', 'Current Price'];
const all_equity_fields = [...equity_columns_to_display, 'Tradability', 'Quantity', 'Unrealized Percent Return'];

let equity_keyword_mapping = {
    'Name': 'symbol',
    'Average Cost': 'average_buy_price',
    'Dividend': 'dividend',
    'Equity': 'equity',
    'Realized Return': 'realized profit',
    'Unrealized Return': 'unrealized profit',
    'Unrealized Percent Return': 'percent unrealized profit',
    'Earning Potential': 'earning potential',
    'Current Price': 'price',
    'Tradability': 'tradability',
    'Quantity': 'quantity',
};

/**
 * stores each category
 *  - how to render
 *  - category name for display
 *  - category lookup name in DF
 *  - data = value for each row (gets overriden while filling in table)
 */
let equity_specs = all_equity_fields.map((element) => (
    {
        render: () => {},
        display_column_name: element,
        df_column_name: equity_keyword_mapping[element],
        data: null,
    }

));


// ---------------- options -------------

const options_df_columns = ['symbol', 'average_open_price', 'quantity', 'option', 'equity', 'realized profit', 'unrealized profit', 'percent unrealized profit'];
const options_columns_to_display = ['Name', 'Average Cost', 'Realized Return']
const all_options_fields = [...options_columns_to_display, 'Tradability', 'Quantity', 'Unrealized Percent Return'];
let options_keyword_mapping = {
    'Name': 'symbol',
    'Average Cost': 'average_open_price',
    // 'Equity': 'equity',
    'Realized Return': 'realized profit',
    // 'Unrealized Return': 'unrealized profit',
    // 'Unrealized Percent Return': 'percent unrealized profit',
    // 'Earning Potential': 'earning potential',
    // 'Current Price': 'price',
    // 'Tradability': 'tradability',
    'Quantity': 'quantity',
};

let options_specs = all_options_fields.map((element) => (
    {
        render: () => {},
        display_column_name: element,
        df_column_name: options_keyword_mapping[element],
        data: null,
    }
));







// ----------------------------------------- helpers -----------------------------------------

const findIdxByDFColumnName = (specs, df_column_name) => {
    return specs.findIndex((object) => {
        return object.df_column_name === df_column_name;
    });
};

const findIdxByDisplayColumnName = (specs, display_column_name) => {
    return specs.findIndex((object) => {
        return object.display_column_name === display_column_name;
    });
};


export const Statistics = props => {
    const header = {
        'Authorization': `Bearer ${auth.bearer_token}`
    }

    // const header = {
    //     'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
    // }

    const [loggedIn, setLoggedIn] = useState(true);

    const [lastUpdatedAt, setLastUpdatedAt] = useState('');

    const [activeCategory, setActiveCategory] = useState('equities');

    const [totalInvested, setTotalInvested] = useState(0);
    const [cash, setCash] = useState(0);

    const [equityHistoryDF, setEquityHistoryDF] = useState(null);
    const [optionsHistoryDF, setOptionsHistoryDF] = useState(null);

    const [equityHistory, setEquityHistory] = useState(null);
    const [optionsHistory, setOptionsHistory] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const [sortedBy, setSortedBy] = useState('symbol');
    const [ascending, setAscending] = useState(true);


    let columnClass;
    if(activeCategory === 'equities')
        columnClass = utils.numDict[equity_columns_to_display.length] + '-col';
    else if(activeCategory === 'options')
        columnClass = utils.numDict[options_columns_to_display.length] + '-col';


    // ----------------------------------------- raw account data -----------------------------------------


    // total invested
    const updateTotalInvested = async () => {
        let inv = await api.getPortfolio(header);
        let value = await inv['results'][0]['market_value'];
        setTotalInvested(parseFloat(value).toFixed(2));
    }

    // cash
    const updateCash = async () => {
        let details = await api.getAccountDetails(header);
        let cashStr = await details[0]['portfolio_cash'];
        setCash(parseFloat(cashStr).toFixed(2));
    }

    useEffect(() => {
        updateTotalInvested();
    }, [refresh]);

    useEffect(() => {
        updateCash();
    }, [refresh]);



    // equity history
    const updateEquityData = async () => {
        let merged;

        // ----- positions -----
        let activeBool = true;
        let pos = await api.getPositionsEquity(header, activeBool); // active equity positions
        let positionsDF = await analysis.positionsToDF(pos);
        positionsDF = positionsDF.get(['symbol', 'average_buy_price', 'quantity', 'instrument']);
        merged = positionsDF;
        // console.log(merged.toString());

        // ----- realized profit -----
        let buyOrders = await api.getOrderHistoryEquity(header, ['filled'], 'buy'); // equity buy orders
        let sellOrders = await api.getOrderHistoryEquity(header, ['filled'], 'sell'); // equity sell orders
        let realProfit = await analysis.getRealizedProfit(buyOrders, sellOrders);

        let profitDF = new DataFrame(realProfit);
        if(profitDF.length){
            profitDF.columns = ['symbol', 'realized profit', 'instrument'];
            merged = positionsDF.merge(profitDF, ['symbol', 'instrument'], 'outer');
        }
        else {
            merged = merged.set('realized profit', utils.zeroesArray(merged.length));
        }

        let currentPrices = await api.getCurrentPricesFromInstrumentsDF(header, merged);
        let pricesDF = new DataFrame(currentPrices);
        pricesDF.columns = ['symbol', 'price'];
        merged = merged.merge(pricesDF, ['symbol'], 'outer');

        // ----- unrealized profit -----
        let unreal = await analysis.getUnrealizedProfit(merged);
        let unrealDF = new DataFrame(unreal);
        unrealDF.columns = ['symbol', 'unrealized profit', 'percent unrealized profit'];
        merged = merged.merge(unrealDF, ['symbol'], 'outer');
        // console.log(merged.toString());

        // ----- dividends -----
        let div = await api.getDividends(header, ['paid', 'reinvested']);
        if(div.length){
            let divDF = analysis.dividendsToDF(div);
            merged = merged.merge(divDF, ['instrument'], 'outer');
        }
        else{
            merged = merged.set('dividend', utils.zeroesArray(merged.length));
        }

        // ----- equity holdings -----
        let equity = analysis.getEquities(merged);
        let equityDF = new DataFrame(equity);
        equityDF.columns = ['symbol', 'equity'];
        merged = merged.merge(equityDF, ['symbol'], 'outer');

        // ----- tradability -----
        let tradabilities = await api.getFieldFromInstrumentsDF(merged, 'tradability');
        let tradeSeries = new Series(tradabilities, 'tradability');
        merged = merged.set('tradability', tradeSeries);

        // ----- symbols -----
        let symbols = await api.getFieldFromInstrumentsDF(merged, 'symbol');
        let symbolSeries = new Series(symbols, 'symbol');
        merged = merged.set('symbol', symbolSeries);


        // console.log(merged.toString());
        merged = merged.get(equity_df_columns);
        setEquityHistoryDF(merged);

        setLastUpdatedAt(new Date().toLocaleTimeString());
    }

    // options history
    const updateOptionsData = async () => {
        let merged;

        // ----- positions -----
        let activeBool = true;
        let optionsPositions = await api.getPositionsOptions(header, activeBool); // active options positions
        // console.log(optionsPositions);
        let optionsPositionsDF = await analysis.positionsToDFOptions(optionsPositions);
        if (optionsHistoryDF)
            optionsPositionsDF = optionsPositionsDF.get(['symbol', 'average_open_price', 'quantity', 'legs']);
        let newMerged = optionsPositionsDF;


        let buyOrders = await api.getOrderHistoryOptions(header, ['filled'], 'debit');
        let sellOrders = await api.getOrderHistoryOptions(header, ['filled'], 'credit');
        let realProfit = await analysis.getRealizedProfitOptions(buyOrders, sellOrders);

        let profitDF = new DataFrame(realProfit);
        // console.log(profitDF.toString());
        if(profitDF.length){
            profitDF.columns = ['symbol', 'realized profit', 'instrument'];
            newMerged = optionsPositionsDF.merge(profitDF, ['symbol'], 'outer');
        }
        else {
            newMerged = newMerged.set('realized profit', utils.zeroesArray(merged.length));
        }

        // console.log(merged.toString());
        setOptionsHistoryDF(newMerged);
        // console.log(newMerged.toString());
    }



    useEffect(() => {
        setLastUpdatedAt(new Date().toLocaleTimeString());
        updateEquityData();
        updateOptionsData();
        updateCash();
        updateTotalInvested();
    }, [refresh]);

    // convert history_df to history array
    useEffect(() => {
        const getSortedRows = (df, df_columns) => {
            // store data as array of rows (arrays)
            // data columns represented by history_columns
            if(!df)
                return;

            let dataRows = [];
            for(const row of df){
                let dataRow = df_columns.map((col) => {
                    let val = row.get(col);
                    if(parseFloat(val))
                        val = parseFloat(row.get(col));
                    return val;
                });
                dataRows.push(dataRow);
            }

            dataRows = sortColumns(dataRows, sortedBy);
            return dataRows
        }
        // console.log("Pulling Equity data");
        setEquityHistory(getSortedRows(equityHistoryDF, equity_df_columns));
        // console.log("Pulling Options data:");
        setOptionsHistory(getSortedRows(optionsHistoryDF, options_df_columns));

    }, [equityHistoryDF, optionsHistoryDF, sortedBy, ascending]);



    const sortColumns = (dataRows, category) => {
        let index = equity_df_columns.indexOf(category);
        dataRows.sort((a, b) => {
            if(!a && !b)
                return 0;

            if(!a[index])
                return Number.MAX_SAFE_INTEGER;

            if(!b[index])
                return Number.MIN_SAFE_INTEGER;

            if (b[index] < a[index])
                return ascending ? 1 : -1;
            return ascending ? -1 : 1;
        });
        return dataRows;
    }


    function getTotal(realizedBoolean){
        const REALIZED_IDX = equity_df_columns.indexOf('realized profit');
        const UNREALIZED_IDX = equity_df_columns.indexOf('unrealized profit');

        let idx = realizedBoolean ? REALIZED_IDX : UNREALIZED_IDX;
        let total = 0;
        if(!equityHistory) return 0;
        equityHistory.map(row => {
            total += row[idx];
            return null;
        });
        return total;
    }


    function renderTotal(realizedBoolean){
        let total = getTotal(realizedBoolean);
        let colorClass = total >= 0 ? 'positive' : 'negative';
        let className = 'data-row-value condensed ' + colorClass;
        let value = utils.beautifyPrice(parseFloat(total).toFixed(2));

        let percent = '';
        if (! realizedBoolean){
            percent = `(${utils.beautifyPercent((total / totalInvested)*100)})`;
        }

        return <div className={className}>{value} {percent} </div>
    }

    function populateEquitySpecRender(){
        let symbol_obj_idx = findIdxByDFColumnName(equity_specs, 'symbol'),
        quantity_obj_idx = findIdxByDFColumnName(equity_specs, 'quantity'),
        currentPrice_obj_idx = findIdxByDFColumnName(equity_specs, 'price'),
        tradability_obj_idx = findIdxByDFColumnName(equity_specs, 'tradability'),
        realized_obj_idx = findIdxByDFColumnName(equity_specs, 'realized profit'),
        unrealized_obj_idx = findIdxByDFColumnName(equity_specs, 'unrealized profit'),
        // unrealized_percent_obj_idx = findIdxByDFColumnName('percent unrealized profit'),
        dividend_obj_idx = findIdxByDFColumnName(equity_specs, 'dividend'),
        equity_obj_idx = findIdxByDFColumnName(equity_specs, 'equity'),
        averageCost_obj_idx = findIdxByDFColumnName(equity_specs, 'average_buy_price'),
        earningPotential_obj_idx = findIdxByDFColumnName(equity_specs, 'earning potential');


        // render for symbol
        if(equity_specs[symbol_obj_idx]){
            let quantity = equity_specs[quantity_obj_idx].data || '0';
            if(quantity !== '0')
                quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);


            equity_specs[symbol_obj_idx].render = () => (
                <div key='symbol' className={`value-container ${columnClass} cell`}>
                    <div className='text' >{equity_specs[symbol_obj_idx].data}</div>
                    <div style={{fontSize: '12px',
                                lineHeight: '16px',
                                textDecorationLine: 'underline',
                                color: '#747384'}}>
                        {quantity} shares
                    </div>
                </div>
            );
        }

        // render for current price
        const renderPriceButton = (symbol, tradability, currentPrice) => {
            if(tradability !== 'tradable')
                return null;

            return (
                <button onClick={() => window.open('http://robinhood.com/stocks/' + symbol)}
                target='_blank'
                className='text stock-redir-btn'
                type='button'>
                    {utils.beautifyPrice(currentPrice)}
                    <ArrowIcon className='arrow' />
                    {/* <img className='arrow' src={require('../../UI/images/arrow.svg')}></img> */}
                </button>
            );
        }


        if(equity_specs[currentPrice_obj_idx]){
            let symbol = equity_specs[symbol_obj_idx].data;
            equity_specs[currentPrice_obj_idx].render = () => {
                let tradability = equity_specs[tradability_obj_idx].data;
                let currentPrice = equity_specs[currentPrice_obj_idx].data;
                return (
                    <div key='current price' className={`btn-container ${columnClass}`}>
                            {renderPriceButton(symbol, tradability, currentPrice)}
                    </div>
                );
            };
        }

        // render for returns
        // realized
        if(equity_specs[realized_obj_idx])
            equity_specs[realized_obj_idx].render = () => {
                let data = equity_specs[realized_obj_idx].data;

                let realReturnString = utils.beautifyReturns(data);
                let realizedClass = '';
                if(parseFloat(data))
                    realizedClass = parseFloat(data) > 0 ? 'positive' : 'negative';

                return <div key='realized profit' className={`cell text ${columnClass} ${realizedClass}`}>{realReturnString}</div>;
            };
        // unrealized
        if(equity_specs[unrealized_obj_idx])
            equity_specs[unrealized_obj_idx].render = () => {
                let returns = equity_specs[unrealized_obj_idx].data;
                // let percent_returns = history_specs[unrealized_percent_obj_idx].data;

                let unrealReturnString = `${utils.beautifyReturns(returns)}`
                // if(unrealReturnString !== '-')
                //     unrealReturnString += ` (${percent_returns >= 0 ? '+' : ''}${parseFloat(percent_returns).toFixed(2)}%)`;
                let unrealizedClass = '';
                if(parseFloat(returns))
                    unrealizedClass = parseFloat(returns) > 0 ? 'positive' : 'negative';

                return <div key='unrealized profit' className={`cell text ${columnClass} ${unrealizedClass}`}>{unrealReturnString}</div>;
            };

        // equity
        if(equity_specs[equity_obj_idx])
            equity_specs[equity_obj_idx].render = () => {
                return <div key='equity' className={`cell text ${columnClass}`}>{utils.beautifyPrice(equity_specs[equity_obj_idx].data)}</div>;
            };


        // render dividend
        if(equity_specs[dividend_obj_idx])
            equity_specs[dividend_obj_idx].render = () => {
                return <div key='dividend' className={`cell text ${columnClass}`}>{utils.beautifyPrice(equity_specs[dividend_obj_idx].data)}</div>;
            };


        // average cost
        if(equity_specs[averageCost_obj_idx])
            equity_specs[averageCost_obj_idx].render = () => {
                return <div key='average cost' className={`cell text ${columnClass}`}>{utils.beautifyPrice(equity_specs[averageCost_obj_idx].data)}</div>;
            };

        // earnings potential
        if(equity_specs[earningPotential_obj_idx])
            equity_specs[earningPotential_obj_idx].render = () => {
                return <div key='earnings potential' className={`cell text ${columnClass}`}>-</div>
            };
    }

    function populateOptionsSpecRender(){
        console.log(columnClass);
        let symbol_obj_idx = findIdxByDFColumnName(options_specs, 'symbol'),
        quantity_obj_idx = findIdxByDFColumnName(options_specs, 'quantity'),
        currentPrice_obj_idx = findIdxByDFColumnName(options_specs, 'price'),
        tradability_obj_idx = findIdxByDFColumnName(options_specs, 'tradability'),
        realized_obj_idx = findIdxByDFColumnName(options_specs, 'realized profit'),
        unrealized_obj_idx = findIdxByDFColumnName(options_specs, 'unrealized profit'),
        unrealized_percent_obj_idx = findIdxByDFColumnName(options_specs, 'percent unrealized profit'),
        dividend_obj_idx = findIdxByDFColumnName(options_specs, 'dividend'),
        equity_obj_idx = findIdxByDFColumnName(options_specs, 'equity'),
        averageCost_obj_idx = findIdxByDFColumnName(options_specs, 'average_open_price'),
        earningPotential_obj_idx = findIdxByDFColumnName(options_specs, 'earning potential');

        // render for symbol
        if(equity_specs[symbol_obj_idx]){
            let quantity = options_specs[quantity_obj_idx].data || '0';
            if(quantity !== '0')
                quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);


            options_specs[symbol_obj_idx].render = () => (
                <div key='symbol' className={`value-container ${columnClass} cell`}>
                    <div className='text' >{options_specs[symbol_obj_idx].data}</div>
                    <div style={{fontSize: '12px',
                                lineHeight: '16px',
                                textDecorationLine: 'underline',
                                color: '#747384'}}>
                        {quantity} contracts
                    </div>
                </div>
            );
        }

        // render for average cost
        if(options_specs[averageCost_obj_idx])
            options_specs[averageCost_obj_idx].render = () => {
                return <div key='average cost' className={`cell text ${columnClass}`}>{utils.beautifyPrice(options_specs[averageCost_obj_idx].data)}</div>;
            };

        if(options_specs[realized_obj_idx])
            options_specs[realized_obj_idx].render = () => {
                let data = options_specs[realized_obj_idx].data;

                let realReturnString = utils.beautifyReturns(data);
                let realizedClass = '';
                if(parseFloat(data))
                    realizedClass = parseFloat(data) > 0 ? 'positive' : 'negative';

                return <div key='realized profit' className={`cell text ${columnClass} ${realizedClass}`}>{realReturnString}</div>;

            }
    }

    function sortDataByCategory(spec, elem){
        let idx = findIdxByDisplayColumnName(spec, elem);
        let df_col_name = spec[idx].df_column_name;
        if(sortedBy === df_col_name){
            setAscending(!ascending);
        }
        else
            setAscending(true);
        setSortedBy(df_col_name);
    }



    function activateHistoryCategory(category){
        setActiveCategory(category);
    }

    function renderTableColumnHeaders(){
        let specs, columns_to_display;
        if (activeCategory === 'equities'){
            specs = equity_specs;
            columns_to_display = equity_columns_to_display;
        }
        else if (activeCategory === 'options'){
            specs = options_specs;
            columns_to_display = options_columns_to_display;
        }

        return (
            <div className='row'>
                {columns_to_display.map((elem, idx) => {
                    return (
                        <div key={idx} className={`cell text row-header ${columnClass} category`}
                            onClick={() => sortDataByCategory(specs, elem)}
                        >
                            <div className='cell text row-header history-column-btn'
                                key={idx}
                                >{elem}
                            </div>
                            <div
                            style ={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <SortIcon className='sort-icon'/>
                            </div>
                        </div>

                    );
                })}
            </div>
        );
    }


    function renderOptionsHistory(){
        if(!optionsHistory) return <div></div>;

        return optionsHistory.map((dataRow) => {
            for(let i = 0; i < options_specs.length; i++){
                let obj = {...options_specs[i]};
                if(obj.df_column_name){
                    // console.log('column name:' + obj.df_column_name);
                    options_specs[i].data = dataRow[options_df_columns.indexOf(obj.df_column_name)];
                    // console.log(options_specs[i].data);
                }
            }

            populateOptionsSpecRender();
            // console.log(options_specs);
            let key = options_specs[findIdxByDFColumnName(options_specs, 'symbol')].data;
            return (
                <div key={key}>
                    <div className='row'>
                        {options_specs.map((spec) => spec.render())}
                    </div>
                    <hr/>
                </div>
            );
        })

    }

    function renderEquityHistory(){
        if(!equityHistory) return <div></div>;

        return equityHistory.map((dataRow) => {
            for(let i = 0; i < equity_specs.length; i++){
                let obj = {...equity_specs[i]};
                if(obj.df_column_name){
                    equity_specs[i].data = dataRow[equity_df_columns.indexOf(obj.df_column_name)];
                }
            }

            populateEquitySpecRender();

            return (
                <div key={equity_specs[findIdxByDFColumnName(equity_specs, 'symbol')].data}>
                    <div className='row'>
                        {equity_specs.map((obj) => obj.render())}
                    </div>
                    <hr/>
                </div>
            );
        });
    }

    function renderEquityTable(){
        return (
            <div className='table'>
                {renderTableColumnHeaders(equity_specs)}
                <hr/>
                {renderEquityHistory()}
            </div>
        );
    }

    function renderOptionsTable(){
        return (
            <div className='table'>
                {renderTableColumnHeaders(options_specs)}
                <hr/>
                {renderOptionsHistory()}
            </div>
        );
    }

    function renderTable(){
        if (activeCategory === 'equities')
            return renderEquityTable()
        else if (activeCategory === 'options')
            return renderOptionsTable();
    }




    if (! loggedIn)
        return <Redirect to='/login' push={true}/>

    return !equityHistory
        ? <Loading />
        : (
            <>
                <Head />
                <div>
                    <div className="top-container">
                        <div className="stats-header">
                            <div className="stats-box">
                                <div className="stats-box-title text">Total Portfolio</div>
                                <div className="stats-box-value condensed">{utils.beautifyPrice(parseFloat(totalInvested) + parseFloat(cash))}</div>
                                <div className="stats-box-data-row">
                                    <div className="data-row-categ text" >Realized Return</div>
                                    {renderTotal(true)}
                                </div>
                                <div className="stats-box-data-row">
                                    <div className="data-row-categ text">Unrealized Return</div>
                                    {renderTotal(false)}
                                </div>
                                <div className="stats-box-data-row">
                                    <div className="data-row-categ text">Buying Power</div>
                                    <div className="data-row-value condensed">{utils.beautifyPrice(cash)}</div>
                                </div>
                                <div className="stats-box-data-row">
                                    <div className="data-row-categ text">Total Investment</div>
                                    <div className="data-row-value condensed">{utils.beautifyPrice(totalInvested)}</div>

                                </div>
                            </div>
                            <div className='header-btns'>
                                <div className='text stock-redir-btn reload-btn'
                                    type='button'
                                    onClick={() => {
                                        setEquityHistory(null);
                                        setRefresh(refresh + 1);
                                    }}
                                >
                                    Reload
                                </div>
                                <div className='text stock-redir-btn reload-btn'
                                    type='button'
                                    onClick={() => {
                                        auth.logout();
                                        setLoggedIn(false);
                                    }}
                                    >Log out
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='bottom-container'>
                        <div className='history-container'>
                            <div className="history-header updated-stats">Updated at {lastUpdatedAt}</div>
                            <div className="history-header table-title text">History</div>
                            <div className='history-categories'>
                                <div className={`history-category-btn ${activeCategory === 'equities' ? 'active-category' : 'inactive-category'}`}
                                    onClick={() => {
                                        activateHistoryCategory('equities');
                                    }}
                                >Equities</div>
                                <div className={`history-category-btn ${activeCategory === 'options' ? 'active-category' : 'inactive-category'}`}
                                    onClick={() => {
                                        activateHistoryCategory('options');
                                    }}>Options</div>
                            </div>
                            {renderTable()}
                        </div>
                    </div>
                </div>
            </>
        );


}

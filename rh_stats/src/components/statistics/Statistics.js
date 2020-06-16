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

const df_columns = ['instrument', 'price', 'tradability', 'quantity','average_buy_price','dividend', 'realized profit', 'symbol', 'unrealized profit', 'percent unrealized profit', 'equity'];
const history_columns = ['Name', 'Average Cost', 'Equity', 'Dividend', 'Realized Return', 'Unrealized Return', 'Current Price'];
const all_fields = [...history_columns, 'Tradability', 'Quantity', 'Unrealized Percent Return'];

let keyword_mapping = {
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
let history_specs = all_fields.map((element) => (
    {
        render: () => {},
        display_column_name: element,
        df_column_name: keyword_mapping[element],
        data: null,
    }

))

// ----------------------------------------- helpers -----------------------------------------

const findIdxByDFColumnName = (df_column_name) => {
    return history_specs.findIndex((object) => {
        return object.df_column_name === df_column_name;
    });
};   

const findIdxByDisplayColumnName = (display_column_name) => {
    return history_specs.findIndex((object) => {
        return object.display_column_name === display_column_name;
    });
};   

const columnClass = utils.numDict[history_columns.length] + '-col';

export const Statistics = props => {
    // const header = {
    //     'Authorization': `Bearer ${auth.bearer_token}`
    // }


    const header = {
        'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
    }

    const [loggedIn, setLoggedIn] = useState(true);

    const [lastUpdatedAt, setLastUpdatedAt] = useState('')
    
    const [totalInvested, setTotalInvested] = useState(0);
    const [cash, setCash] = useState(0);
    
    const [historyDF, setHistoryDF] = useState(null);

    const [history, setHistory] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const [sortedBy, setSortedBy] = useState('symbol');
    const [ascending, setAscending] = useState(true);

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
    }, []);
    
    useEffect(() => {
        updateCash();
    }, []);


    // history
    const updateData = async () => {
        let merged;

        // ----- positions -----
        let pos = await api.getPositions(header, true); // active positions
        let positionsDF = await analysis.positionsToDF(pos);
        positionsDF = positionsDF.get(['symbol', 'average_buy_price', 'quantity', 'instrument']);
        merged = positionsDF;
        
        // ----- realized profit -----
        let buyOrders = await api.getOrderHistory(header, ['filled'], 'buy');
        let sellOrders = await api.getOrderHistory(header, ['filled'], 'sell');
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


        console.log(merged.toString());
        merged = merged.get(df_columns);
        setHistoryDF(merged);
        setLastUpdatedAt(new Date().toLocaleTimeString());
    }

    useEffect(() => {
        setLastUpdatedAt(new Date().toLocaleTimeString());
        updateData();
        updateCash();
        updateTotalInvested();
    }, [refresh]);

    // convert history_df to history array
    useEffect(() => {
            // store data as array of rows (arrays)
            // data columns represented by history_columns
            if(!historyDF)
                return;

            let dataRows = [];
            for(const row of historyDF){
                let dataRow = df_columns.map((col) => {
                    let val = row.get(col);
                    if(parseFloat(val))
                        val = parseFloat(row.get(col));
                    return val;
                });   
                dataRows.push(dataRow);
            }

            dataRows = sortColumns(dataRows, sortedBy);
            setHistory(dataRows);
    }, [historyDF, sortedBy, ascending]);




    const sortColumns = (dataRows, category) => {
        let index = df_columns.indexOf(category);
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
        const REALIZED_IDX = df_columns.indexOf('realized profit');
        const UNREALIZED_IDX = df_columns.indexOf('unrealized profit');

        let idx = realizedBoolean ? REALIZED_IDX : UNREALIZED_IDX;
        let total = 0;
        if(!history) return 0;
        history.map(row => {
            total += row[idx];
        });
        return total;
    }


    function renderTotal(realizedBoolean){
        let total = getTotal(realizedBoolean);
        let colorClass = total >= 0 ? 'positive' : 'negative';
        let className = 'data-row-value condensed ' + colorClass;
        let value = utils.beautifyPrice(parseFloat(total).toFixed(2));
        return <div className={className}>{value}</div>
    }

    function populateHistorySpecRender(){
        let symbol_obj_idx = findIdxByDFColumnName('symbol'),
        quantity_obj_idx = findIdxByDFColumnName('quantity'),
        currentPrice_obj_idx = findIdxByDFColumnName('price'),
        tradability_obj_idx = findIdxByDFColumnName('tradability'),
        realized_obj_idx = findIdxByDFColumnName('realized profit'),
        unrealized_obj_idx = findIdxByDFColumnName('unrealized profit'),
        unrealized_percent_obj_idx = findIdxByDFColumnName('percent unrealized profit'),
        dividend_obj_idx = findIdxByDFColumnName('dividend'),
        equity_obj_idx = findIdxByDFColumnName('equity'),
        averageCost_obj_idx = findIdxByDFColumnName('average_buy_price'),
        earningPotential_obj_idx = findIdxByDFColumnName('earning potential');


        // render for symbol
        if(history_specs[symbol_obj_idx]){
            let quantity = history_specs[quantity_obj_idx].data || '0';
            if(quantity !== '0')
                quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);
        
            
            history_specs[symbol_obj_idx].render = () => (
                <div className={`value-container ${columnClass} cell`}>
                    <div className='text' >{history_specs[symbol_obj_idx].data}</div>
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


        if(history_specs[currentPrice_obj_idx]){
            let symbol = history_specs[symbol_obj_idx].data;
            history_specs[currentPrice_obj_idx].render = () => {
                let tradability = history_specs[tradability_obj_idx].data;
                let currentPrice = history_specs[currentPrice_obj_idx].data;
                return (
                    <div className={`btn-container ${columnClass}`}>
                            {renderPriceButton(symbol, tradability, currentPrice)}
                    </div>
                );
            };
        }

        // render for returns
        // realized
        if(history_specs[realized_obj_idx])
            history_specs[realized_obj_idx].render = () => {
                let data = history_specs[realized_obj_idx].data;

                let realReturnString = utils.beautifyReturns(data);
                let realizedClass = ''; 
                if(parseFloat(data))
                    realizedClass = parseFloat(data) > 0 ? 'positive' : 'negative';
            
                return <div className={`cell text ${columnClass} ${realizedClass}`}>{realReturnString}</div>;
            };
        // unrealized
        if(history_specs[unrealized_obj_idx])
            history_specs[unrealized_obj_idx].render = () => {
                let returns = history_specs[unrealized_obj_idx].data;
                let percent_returns = history_specs[unrealized_percent_obj_idx].data;

                let unrealReturnString = `${utils.beautifyReturns(returns)}`
                // if(unrealReturnString !== '-')
                //     unrealReturnString += ` (${percent_returns >= 0 ? '+' : ''}${parseFloat(percent_returns).toFixed(2)}%)`;
                let unrealizedClass = ''; 
                if(parseFloat(returns))
                    unrealizedClass = parseFloat(returns) > 0 ? 'positive' : 'negative';
            
                return <div className={`cell text ${columnClass} ${unrealizedClass}`}>{unrealReturnString}</div>;
            };

        // equity
        if(history_specs[equity_obj_idx])
            history_specs[equity_obj_idx].render = () => {
                return <div className={`cell text ${columnClass}`}>{utils.beautifyPrice(history_specs[equity_obj_idx].data)}</div>;
            };
    

        // render dividend
        if(history_specs[dividend_obj_idx])
            history_specs[dividend_obj_idx].render = () => {
                return <div className={`cell text ${columnClass}`}>{utils.beautifyPrice(history_specs[dividend_obj_idx].data)}</div>;
            };


        // average cost
        if(history_specs[averageCost_obj_idx])
            history_specs[averageCost_obj_idx].render = () => {
                return <div className={`cell text ${columnClass}`}>{utils.beautifyPrice(history_specs[averageCost_obj_idx].data)}</div>;
            };

        // earnings potential
        if(history_specs[earningPotential_obj_idx])
            history_specs[earningPotential_obj_idx].render = () => {
                return <div className={`cell text ${columnClass}`}>-</div>
            };
    }

    function renderHistory(){
        if(!history) return <div></div>;

        return history.map((dataRow) => {
            for(let i = 0; i < history_specs.length; i++){
                let obj = {...history_specs[i]};
                if(obj.df_column_name){
                    history_specs[i].data = dataRow[df_columns.indexOf(obj.df_column_name)];
                    // console.log(obj.df_column_name);
                    // console.log(df_columns.indexOf(obj.df_column_name));
                    // console.log(history_specs[i].data);
                }
            }

            populateHistorySpecRender();

            return (
                <div key={history_specs[findIdxByDFColumnName('symbol')].data}>
                    <div className='row'>
                        {history_specs.map((obj) => obj.render())}                        
                    </div>
                    <hr/>
                </div>
            );
        });
    }

    function sortDataByCategory(elem){
        let idx = findIdxByDisplayColumnName(elem);
        let df_col_name = history_specs[idx].df_column_name;
        if(sortedBy === df_col_name){
            setAscending(!ascending);
        }
        else
            setAscending(true);
        setSortedBy(df_col_name);
    }

    if (! loggedIn)
        return <Redirect to='/login' push={true}/>

    return !history 
        ? <Loading />
        : (
            <div>
                <Head />
                <body>
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
                            <div class='header-btns'>
                                <div className='text stock-redir-btn reload-btn'
                                    type='button'
                                    onClick={() => {
                                        setHistory(null);
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
                            <div className='table'>
                                <div className='row'>
                                    {history_columns.map((elem, idx) => {
                                        return (
                                            <div className={`cell text row-header ${columnClass} category`}
                                                onClick={() => sortDataByCategory(elem)}
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
                                                    {/* <img className='sort-icon' src={require("../../UI/images/sort.svg")}/>     */}
                                                </div>
                                            </div>
                                            
                                        );
                                    })}
                                </div>
                                <hr/>
                                {renderHistory()}
                                
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        );


}
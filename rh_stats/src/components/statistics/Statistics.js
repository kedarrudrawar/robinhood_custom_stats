import React, { useState, useEffect } from 'react';
import 'UI/css/Statistics.css'
import { Head } from 'components/misc/html_head'
import * as api from 'api/api';
import * as utils from 'utils';
import auth from 'auth/auth';
import Loading from 'components/misc/loading';
import * as analysis from 'components/statistics/Analysis';
import { DataFrame, Series } from 'pandas-js/dist/core';

const df_columns = ['instrument', 'price', 'tradability', 'quantity','average_buy_price','dividend', 'realized profit', 'symbol', 'unrealized profit'];
const history_columns = ['Name', 'Average Cost', 'Dividend', 'Realized Return', 'Unrealized Return', 'Current Price', 'Earning Potential'];
const all_fields = [...history_columns, 'Tradability', 'Quantity'];





let keyword_mapping = {
    'Name': 'symbol',
    'Average Cost': 'average_buy_price',
    'Dividend': 'dividend',
    'Realized Return': 'realized profit',
    'Unrealized Return': 'unrealized profit',
    'Earning Potential': 'earning potential',
    'Current Price': 'price',
    'Tradability': 'tradability',
    'Quantity': 'quantity',
};

let history_columns2 = all_fields.map((element) => (
    {
        render: () => {},
        display_column_name: element,
        df_column_name: keyword_mapping[element],
        data: null,
    }

))



const numDict = {
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
};
const columnClass = numDict[history_columns.length] + '-col';



const REALIZED_IDX = df_columns.indexOf('realized profit');
const UNREALIZED_IDX = df_columns.indexOf('unrealized profit');




export const Statistics = props => {
    const header = {
        'Authorization': `Bearer ${auth.bearer_token}`
    }


    // const header = {
    //     'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
    // }

    
    const [totalInvested, setTotalInvested] = useState(0);
    const [cash, setCash] = useState(0);
    
    const [history, setHistory] = useState(null);

    // ----------------------------------------- raw account data -----------------------------------------

    // total invested
    useEffect(() => {
        const updateTotalInvested = async () => {
            let inv = await api.getPortfolio(header);
            let value = await inv['results'][0]['market_value'];
            setTotalInvested(parseFloat(value).toFixed(2));
        }
        updateTotalInvested();
    }, []);
    
    // cash
    useEffect(() => {
        const updateCash = async () => {
            let details = await api.getAccountDetails(header);
            let cashStr = await details[0]['portfolio_cash'];
            setCash(parseFloat(cashStr).toFixed(2));
        }
        updateCash();
    }, []);


    // history
    useEffect(() => {
        
        // TODO: figure out how to eliminate watchlist positions 
        const updateData = async () => {
            let merged;

            // ----- positions -----
            let pos = await api.getPositions(header, true);
            let positionsDF = await analysis.positionsToDF(pos);
            positionsDF = positionsDF.get(['symbol', 'average_buy_price', 'quantity', 'instrument']);
            
            // ----- realized profit -----
            let buyOrders = await api.getOrderHistory(header, ['filled'], 'buy');
            let sellOrders = await api.getOrderHistory(header, ['filled'], 'sell');
            let realProfit = await analysis.getRealizedProfit(buyOrders, sellOrders);
            let profitDF = new DataFrame(realProfit);
            profitDF.columns = ['symbol', 'realized profit', 'instrument'];
            merged = positionsDF.merge(profitDF, ['symbol', 'instrument'], 'outer');

            let currentPrices = await api.getCurrentPricesFromInstrumentsDF(header, merged);
            let pricesDF = new DataFrame(currentPrices);
            pricesDF.columns = ['symbol', 'price'];
            merged = merged.merge(pricesDF, ['symbol'], 'outer');

            // ----- unrealized profit -----
            let unreal = await analysis.getUnrealizedProfit(merged);
            let unrealDF = new DataFrame(unreal);
            unrealDF.columns = ['symbol', 'unrealized profit'];
            merged = merged.merge(unrealDF, ['symbol'], 'outer');
            // console.log(merged.toString());

            // ----- dividends -----
            let div = await api.getDividends(header, ['paid', 'reinvested']);
            let divDF = analysis.dividendsToDF(div);
            merged = merged.merge(divDF, ['instrument'], 'outer');

            // ----- tradability -----
            let tradabilities = await api.getFieldFromInstrumentsDF(merged, 'tradability');
            let tradeSeries = new Series(tradabilities, 'tradability');
            merged = merged.set('tradability', tradeSeries);


            merged = merged.get(df_columns);
            console.log(merged.toString());


            // store data as array of  rows (arrays)
            // data columns represented by history_columns
            let dataRows = [];
            for(const row of merged){
                let dataRow = df_columns.map((col) => row.get(col));              
                dataRows.push(dataRow);
            }

            let index = df_columns.indexOf('realized profit');
            let ascending = false;
            dataRows.sort((a, b) => {
                if (b[index] < a[index])
                    return ascending ? 1 : -1;
                return ascending ? -1 : 1;
            });
            

            setHistory(dataRows);
        }
        updateData();
    }, []);

    function getTotal(realizedBoolean){
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

    function renderHistory(){
        if(!history) return <div></div>;




        return history.map((dataRow) => {

            // let symbol, quantity, average_buy_price,unrealReturn,realReturn, currentPrice, tradability, dividend;
            // symbol = dataRow[df_columns.indexOf('symbol')];
            // quantity = dataRow[df_columns.indexOf('quantity')];
            // average_buy_price = dataRow[df_columns.indexOf('average_buy_price')];
            // unrealReturn = dataRow[df_columns.indexOf('unrealized profit')];
            // realReturn = dataRow[df_columns.indexOf('realized profit')];
            // currentPrice = dataRow[df_columns.indexOf('price')];
            // tradability = dataRow[df_columns.indexOf('tradability')];
            // dividend = dataRow[df_columns.indexOf('dividend')];
    

            for(let i = 0; i < history_columns2.length; i++){
                let obj = {...history_columns2[i]};
                if(obj.df_column_name){
                    history_columns2[i].data = dataRow[df_columns.indexOf(obj.df_column_name)];
                }
            }

            const findFunc = (df_column_name) => history_columns2.findIndex((object) => object.df_column_name === df_column_name);   

            let symbol_obj_idx = findFunc('symbol'),
            quantity_obj_idx = findFunc('quantity'),
            currentPrice_obj_idx = findFunc('price'),
            tradability_obj_idx = findFunc('tradability'),
            realized_obj_idx = findFunc('realized profit'),
            unrealized_obj_idx = findFunc('unrealized profit'),
            dividend_obj_idx = findFunc('dividend'),
            averageCost_obj_idx = findFunc('average_buy_price'),
            earningPotential_obj_idx = findFunc('earning potential');






            // render for symbol
            if(history_columns2[symbol_obj_idx]){
                let quantity = history_columns2[quantity_obj_idx].data || '0';
                if(quantity !== '0')
                    quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);
            
                
                history_columns2[symbol_obj_idx].render = () => (
                    <div className={`value-container ${columnClass} cell`}>
                        <div className='text' >{history_columns2[symbol_obj_idx].data}</div>
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
            if(history_columns2[currentPrice_obj_idx]){
                let symbol = history_columns2[symbol_obj_idx].data;
                history_columns2[currentPrice_obj_idx].render = () => {
                    let tradability = history_columns2[tradability_obj_idx].data;
                    let currentPrice = history_columns2[currentPrice_obj_idx].data;
                    return (
                        <div className={`btn-container ${columnClass}`}>
                                {renderPriceButton(symbol, tradability, currentPrice)}
                        </div>
                    );
                };
            }

            // render for returns
            // realized
            if(history_columns2[realized_obj_idx])
                history_columns2[realized_obj_idx].render = () => {
                    let data = history_columns2[realized_obj_idx].data;

                    let realReturnString = utils.beautifyReturns(data);
                    let realizedClass = ''; 
                    if(parseFloat(data))
                        realizedClass = parseFloat(data) > 0 ? 'positive' : 'negative';
                
                    return <div className={`cell text ${columnClass} ${realizedClass}`}>{realReturnString}</div>;
                };
            // unrealized
            if(history_columns2[unrealized_obj_idx])
                history_columns2[unrealized_obj_idx].render = () => {
                    let data = history_columns2[unrealized_obj_idx].data;

                    let unrealReturnString = utils.beautifyReturns(data);
                    let unrealizedClass = ''; 
                    if(parseFloat(data))
                        unrealizedClass = parseFloat(data) > 0 ? 'positive' : 'negative';
                
                    return <div className={`cell text ${columnClass} ${unrealizedClass}`}>{unrealReturnString}</div>;
                };

            // render dividend
            if(history_columns2[dividend_obj_idx])
                history_columns2[dividend_obj_idx].render = () => {
                    return <div className={`cell text ${columnClass}`}>{utils.beautifyPrice(history_columns2[dividend_obj_idx].data)}</div>;
                };


            // average cost
            if(history_columns2[averageCost_obj_idx])
                history_columns2[averageCost_obj_idx].render = () => {
                    return <div className={`cell text ${columnClass}`}>{utils.beautifyPrice(history_columns2[averageCost_obj_idx].data)}</div>;
                };

            // earnings potential
            if(history_columns2[earningPotential_obj_idx])
                history_columns2[earningPotential_obj_idx].render = () => {
                    return <div className={`cell text ${columnClass}`}> ask</div>
                };


                
            const renderPriceButton = (symbol, tradability, currentPrice) => {
                if(tradability !== 'tradable')
                    return null;
                return (
                    <button onClick={() => window.open('http://robinhood.com/stocks/' + symbol)} 
                    target='_blank' 
                    className='text stock-redir-btn'
                    type='button'>
                        {utils.beautifyPrice(currentPrice)}
                        <img className='arrow' src={require('UI/images/arrow.svg')}></img>
                    </button>
                );
            }

            return (
                <div key={history_columns2[symbol_obj_idx].data}>
                    <div className='row'>
                        {history_columns2.map((obj) => obj.render())}                        
                    </div>
                    <hr/>
                </div>
            );
        });
    }


    return !history 
        ? <Loading />
        : (
            <div>
                <Head />
                <body>
                    <div className="stats-header"> 
                        <div className="stats-box">
                            <div className="stats-box-title text">Total Investment</div>
                            <div className="stats-box-value condensed">{utils.beautifyPrice(totalInvested)}</div>
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
                        </div>
                    </div>

                    <div className="table-title text">History</div>
                    <div className='table'>
                        <div className='row'>
                            {history_columns.map((elem, idx) => {
                                return <div key={idx} className={`cell text row-header ${columnClass}`}>{elem}</div>;
                            })}
                        </div>
                        <hr/>
                        {renderHistory()}
                        
                    </div>
                </body>
            </div>
        );


}
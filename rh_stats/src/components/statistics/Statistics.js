import React, { useState, useEffect } from 'react';
import 'UI/css/Statistics.css'
import { Head } from 'components/misc/html_head'
import * as api from 'api/api';
import * as utils from 'utils';
import Loading from 'components/misc/loading';
import * as analysis from 'components/statistics/Analysis';
import { DataFrame, Series } from 'pandas-js/dist/core';

// const df_columns = ['symbol', 'quantity', 'average_buy_price', 'unrealized profit','realized profit', 'price', 'instrument', 'tradability', 'dividend'];
const df_columns = ['instrument', 'price', 'tradability', 'quantity','average_buy_price','dividend', 'realized profit', 'symbol', 'unrealized profit'];
const history_columns = ['Name', 'Average Cost', 'Dividend', 'Realized Return', 'Unrealized Return', 'Earning Potential', 'Current Price'];
const REALIZED_IDX = df_columns.indexOf('realized profit');
const UNREALIZED_IDX = df_columns.indexOf('unrealized profit');;




export const Statistics = props => {
    // const header = {
    //     'Authorization': `Bearer ${auth.bearer_token}`
    // }


    const header = {
        'Authorization': `Bearer ${process.env.REACT_APP_BEARER}`
    }

    
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
            dataRows.sort((a, b) => b[REALIZED_IDX] - a[REALIZED_IDX]); // sort by realized profit

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

            let symbol, quantity, average_buy_price,unrealReturn,realReturn, currentPrice, tradability, dividend;
            symbol = dataRow[df_columns.indexOf('symbol')];
            quantity = dataRow[df_columns.indexOf('quantity')];
            average_buy_price = dataRow[df_columns.indexOf('average_buy_price')];
            unrealReturn = dataRow[df_columns.indexOf('unrealized profit')];
            realReturn = dataRow[df_columns.indexOf('realized profit')];
            currentPrice = dataRow[df_columns.indexOf('price')];
            tradability = dataRow[df_columns.indexOf('tradability')];
            dividend = dataRow[df_columns.indexOf('dividend')];



            average_buy_price = utils.beautifyPrice(average_buy_price);

            quantity = !quantity ? 0 : quantity;
            quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);
            
            let realReturnString = utils.beautifyReturns(realReturn);
            let realizedClass = ''; 
            if(parseFloat(realReturn))
                realizedClass = parseFloat(realReturn) > 0 ? 'positive' : 'negative';
           

            let unrealReturnString = utils.beautifyReturns(unrealReturn);
            let unrealizedClass = ''; 
            if(parseFloat(unrealReturn))
                unrealizedClass = parseFloat(unrealReturn) > 0 ? 'positive' : 'negative';
            
            dividend = utils.beautifyPrice(dividend);
                
            const renderPriceButton = () => {
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
                <div key={symbol}>
                    <div className='row'>
                        <div className='value-container seven-col cell'>
                            <div className='text' >{symbol}</div>
                            <div style={{fontFamily: "IBM Plex Sans Condensed",
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        textDecorationLine: 'underline',
                                        color: '#747384'}}>
                                {quantity} shares
                            </div>
                        </div>
                        <div className='cell text seven-col'>{average_buy_price}</div>
                        <div className='cell text seven-col'>{dividend}</div>
                        <div className={`cell text seven-col ${realizedClass}`}><strong>{realReturnString}</strong></div>
                        <div className={`cell text seven-col ${unrealizedClass}`}><strong>{unrealReturnString}</strong></div>
                        <div className='cell text seven-col'>-</div>
                        <div className='btn-container seven-col' >
                           {renderPriceButton()}
                        </div>
                        
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
                                return <div key={idx} className='cell text row-header seven-col'>{elem}</div>;
                            })}
                        </div>
                        <hr/>
                        {renderHistory()}
                        
                    </div>
                </body>
            </div>
        );


}
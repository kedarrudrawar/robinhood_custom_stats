import React, { useState, useEffect } from 'react';
import 'UI/css/Statistics.css'
import { Head } from 'components/misc/html_head'
import * as api from 'api/api';
import * as utils from 'utils';
import Loading from 'components/misc/loading';
import * as analysis from 'components/statistics/Analysis';
import { DataFrame } from 'pandas-js/dist/core';

const df_columns = ['symbol', 'quantity', 'average_buy_price', 'unrealized profit','realized profit', 'price', 'instrument', 'tradability', 'dividend'];
const history_columns = ['Name', 'Holding', 'Average Cost', 'Unrealized Return', 'Realized Return', 'Earning Potential', 'Dividend', 'Current Price'];
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
            let pos = await api.getPositions(header, false);
            let positionsDF = await analysis.positionsToDF(pos);
            positionsDF = positionsDF.get(['symbol', 'average_buy_price', 'quantity', 'instrument', 'tradability']);

            // ----- realized profit -----
            let buyOrders = await api.getOrderHistory(header, ['filled'], 'buy');
            let sellOrders = await api.getOrderHistory(header, ['filled'], 'sell');
            let realProfit = await analysis.getRealizedProfit(buyOrders, sellOrders);
            let profitDF = new DataFrame(realProfit);
            profitDF.columns = ['symbol', 'realized profit'];
            merged = positionsDF.merge(profitDF, ['symbol'], 'outer');

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
            let [symbol, quantity, average_buy_price,unrealReturn,realReturn, currentPrice, instrument, tradability, dividend] = dataRow;

            average_buy_price = utils.beautifyPrice(average_buy_price);
            quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);
            quantity = quantity === 0 ? '-' : quantity; // set to empty string if qty is 0
            
            console.log('real return: ' + parseFloat(realReturn));
            console.log(typeof(realReturn));
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
                if(tradability === 'tradable')
                    return (
                        <button onClick={() => window.open('http://robinhood.com/stocks/' + symbol)} 
                        target='_blank' 
                        className='text stock-redir-btn'
                        type='button'>
                            {utils.beautifyPrice(currentPrice)}
                            <img class='arrow' src={require('UI/images/arrow.svg')}></img>
                        </button>
                    );
                return '';
            }

            return (
                <div key={symbol}>
                    <div className='row'>
                        <div className='cell text eight-col'>{symbol}</div>
                        <div className='cell text eight-col'>{quantity}</div>
                        <div className='cell text eight-col'>{average_buy_price}</div>
                        <div className={`cell text eight-col ${unrealizedClass}`}><strong>{unrealReturnString}</strong></div>
                        <div className={`cell text eight-col ${realizedClass}`}><strong>{realReturnString}</strong></div>
                        <div className='cell text eight-col'>-</div>
                        <div className='cell text eight-col'>{dividend}</div>
                        <div className='btn-container eight-col' >
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
                                return <div key={idx} className='cell text row-header eight-col'>{elem}</div>;
                            })}
                        </div>
                        <hr/>
                        {renderHistory()}
                        
                    </div>
                </body>
            </div>
        );


}
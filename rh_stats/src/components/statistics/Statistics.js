import React, { useState, useEffect } from 'react';
import '../../UI/css/Statistics.css'
import { Head } from '../misc/html_head'
import * as api from '../../api/api';
import * as utils from '../../utils';
import Loading from '../misc/loading';
import auth from '../../auth/auth';
import * as analysis from './Analysis';
import { DataFrame } from 'pandas-js/dist/core';

const REALIZED_IDX = 4;
const UNREALIZED_IDX = 3;
const df_columns = ['symbol', 'quantity', 'average_buy_price', 'unrealized profit','realized profit', 'price', 'instrument', 'tradability'];
const history_columns = ['Name', 'Holding', 'Average Cost', 'Unrealized Return', 'Realized Return', 'Dividend', 'Current Price'];

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
        const updateData = async () => {
            let merged;
            let pos = await api.getPositions(header, false);
            let positionsDF = await analysis.positionsToDF(pos);
            positionsDF = positionsDF.get(['symbol', 'average_buy_price', 'quantity', 'instrument', 'tradability']);

            // TODO: figure out how to eliminate watchlist positions 
            // realized profit
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

            // unrealized profit
            let unreal = await analysis.getUnrealizedProfit(merged);
            let unrealDF = new DataFrame(unreal);
            unrealDF.columns = ['symbol', 'unrealized profit'];
            merged = merged.merge(unrealDF, ['symbol'], 'outer');
            // console.log(merged.toString());

            merged = merged.get(df_columns);
            // console.log(merged.toString());

            // store data as array of  rows (arrays)
            // data columns represented by history_columns
            let dataRows = [];
            for(const row of merged){
                let entryPair = Array.from(Object.values(row))[1].entries;
                let dataRow = entryPair.map(pair => pair[1]);
                dataRows.push(dataRow);
            }

            dataRows.sort((a, b) => b[UNREALIZED_IDX] - a[UNREALIZED_IDX]); // sort by realized profit

            setHistory(dataRows);
        }
        updateData();
        // .then(() => {setLoading(false)});
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

    function renderLoading(){
        return <Loading/>;
    }

    function renderHistory(){
        if(!history) return <div></div>;

        return history.map(dataRow => {
            let [symbol, quantity, average_buy_price,unrealReturn,realReturn, currentPrice, instrument, tradability] = dataRow;

            quantity = quantity % 1 !== 0 ? parseFloat(quantity).toFixed(3) : parseInt(quantity);
            realReturn = utils.beautifyReturns(realReturn);
            unrealReturn = utils.beautifyReturns(unrealReturn);
                
            return (
                <div>
                <div className='row'>
                    <div className='cell text seven-col'>{symbol}</div>
                    <div className='cell text seven-col'>{quantity}</div>
                    <div className='cell text seven-col'>{utils.beautifyPrice(average_buy_price)}</div>
                    <div className='cell text seven-col'>{unrealReturn}</div>
                    <div className='cell text seven-col'>{realReturn}</div>
                    <div className='cell text seven-col'>-</div>
                    <div className='btn-container seven-col' >
                        <button onClick={() => window.open('http://robinhood.com/stocks/' + symbol)} 
                        target='_blank' 
                        className='text stock-redir-btn'
                        type='button'>
                            {utils.beautifyPrice(currentPrice)}
                        </button>
                    </div>
                    
                </div>
                <hr/>
                </div>
            );
        });
    }



    if(!history)
        return renderLoading();

    return !history 
        ? renderLoading() 
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
                            {history_columns.map(elem => {
                                return <div className='cell text row-header seven-col'>{elem}</div>;
                            })}
                        </div>
                        <hr/>
                        {renderHistory()}
                        
                    </div>
                </body>
            </div>
        );


}
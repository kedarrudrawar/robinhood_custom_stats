import React, { useState, useEffect } from 'react';
import '../../UI/Statistics.css'
import { Head } from '../misc/html_head'
import * as api from '../../api/api';

import * as analysis from './Analysis';
import { DataFrame } from 'pandas-js/dist/core';

const REALIZED_IDX = 5;
const UNREALIZED_IDX = 7;

export const Statistics = props => {
    const header = {
        'Authorization': `Bearer ${props.bearer}`
    }
    
    const [totalInvested, setTotalInvested] = useState(0);
    const [cash, setCash] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

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



    useEffect(() => {
        const updateData = async () => {
            let merged;
            let pos = await api.getPositions(header, false);
            let positionsDF = await analysis.positionsToDF(pos);
            positionsDF = positionsDF.get(['symbol', 'average_buy_price', 'quantity', 'instrument', 'tradability']);
            // console.log(positionsDF.toString());

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
            // console.log(unrealDF.toString());
            merged = merged.merge(unrealDF, ['symbol'], 'outer');
            console.log(merged.toString());

            let dataRows = [];
            for(const row of merged){
                let entryPair = Array.from(Object.values(row))[1].entries;
                let dataRow = entryPair.map(pair => pair[1]);
                dataRows.push(dataRow);
            }
            setData(dataRows);
        }

        updateData();
    }, []);

    function getTotal(realizedBoolean){
        let idx = realizedBoolean ? REALIZED_IDX : UNREALIZED_IDX;
        let total = 0;
        if(!data) return 0;
        data.map(row => {
            total += row[idx];
        });
        return total;
    }


    function renderTotal(realizedBoolean){
        let total = getTotal(realizedBoolean);
        let colorClass = total >= 0 ? 'positive' : 'negative';
        let className = 'data-row-value condensed ' + colorClass;
        return <div className={className}>${parseFloat(total).toFixed(2)}</div>
    }



    function renderHistory(){
        if(!data) return <div></div>;

        return data.map(dataRow => {
            let [symbol, average_buy_price, quantity, instrument, tradability, realizedProfit, currentPrice, unrealizedProfit] = dataRow;
            realizedProfit = realizedProfit !== null ? 
                        (realizedProfit > 0 ? '+$' + parseFloat(realizedProfit).toFixed(2) : '-$' + Math.abs(parseFloat(realizedProfit)).toFixed(2))
                        : '-';

            unrealizedProfit = unrealizedProfit !== null ? 
                        (unrealizedProfit >= 0 ? '+$' + parseFloat(unrealizedProfit).toFixed(2) : '-$' + Math.abs(parseFloat(unrealizedProfit)).toFixed(2))
                        : '-';                        



            return (
                <div>
                <div className='row'>
                    <div className='cell text'>{symbol}</div>
                    <div className='cell text'>{quantity}</div>
                    <div className='cell text'>{parseFloat(average_buy_price).toFixed(2)}</div>
                    <div className='cell text'>{unrealizedProfit}</div>
                    <div className='cell text'>{realizedProfit}</div>
                    <div className='cell text'>{currentPrice !== null ? '$' + parseFloat(currentPrice).toFixed(2) : '-'}</div>
                </div>
                <hr/>
                </div>
            );
        });
    }

    return (
        <div>
        <Head />
        <body>
            <div className="stats-header"> 
                <div className="stats-box">
                    <div className="stats-box-title text">Total Investment</div>
                    <div className="stats-box-value condensed">${totalInvested}</div>
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
                        <div className="data-row-value condensed">${cash}</div>
                    </div>
                </div>
                {/* <div className="stats-box">
                    <div className="stats-box-title text">Cash</div>
                    <div className="stats-box-value condensed">${cash}</div>
                    <div className="stats-box-data-row">
                        <div className="data-row-categ text">Interest Rate</div>
                        <div className="data-row-value condensed fake">$2,899.31</div>
                    </div>
                    <div className="stats-box-data-row">
                        <div className="data-row-categ text">Accruing Interest</div>
                        <div className="data-row-value condensed positive fake">+$82 (+7.16%)</div>
                    </div>
                    <div className="stats-box-data-row">
                        <div className="data-row-categ text">Lifetime Interest</div>
                        <div className="data-row-value condensed negative fake">-$152.14 (-5.25%)</div>
                    </div>
                </div> */}
            </div>

            <div className="table-title text">History</div>
            <div className='table'>
                <div className='first row'>
                    <div className='cell text row-header'>Name</div>
                    <div className='cell text row-header'>Holding</div>
                    <div className='cell text row-header'>Average Cost</div>
                    <div className='cell text row-header'>Unrealized</div>
                    <div className='cell text row-header'>Realized</div>
                    <div className='cell text row-header'>Current Price</div>
                </div>
                <hr/>
                {renderHistory()}
                
            </div>
        </body>
        </div>
    );


}
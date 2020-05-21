import React, { useState, useEffect } from 'react';
import '../../UI/Statistics.css'
import { Head } from '../misc/html_head'
import * as api from '../../api/api';

import * as analysis from './Analysis';

export const Statistics = props => {
    const header = {
        'Authorization': `Bearer ${props.bearer}`
    }
    
    // account info
    const [cash, setCash] = useState('');
    const [totalInvested, setTotalInvested] = useState('');

    // positions
    const [positions, setPositions] = useState([]);
    const [averageCost, setAverageCost] = useState([]);

    // instruments
    const [instruments, setInstruments] = useState([]);
    
    // market data
    const [currentPrices, setCurrentPrices] = useState([]);

    // order history 
    const [orders, setOrders] = useState([]); // list of objects
    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);

    // profits 
    const [realizedProfit, setRealizedProfit] = useState([]);
    const [unrealizedProfit, setUnrealizedProfit] = useState([]);


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

    // positions
    useEffect(() => {
        const getPositions = async () => {
            let pos = await api.getPositions(header);
            setPositions(pos);
        }
        getPositions();
    }, []);

    // order history
    const getOrderHistory = async (state=['filled'], side='', setFunc) => {
        let history = await api.getOrderHistory(header, state, side);
        setFunc(history);
    }

    useEffect(() => {
        getOrderHistory(['filled'], '', setOrders)
    }, []);

    // ----------------------------------------- market data -----------------------------------------

    // instruments
    useEffect(() => {
        const updateInstruments = async () => {
            let instr = Array.from(await api.getInstrumentsFromOrders(header, orders));
            setInstruments(instr);
        };
        updateInstruments();
    }, [orders]);

    // currentPrices
    useEffect(() => {
        const updateCurrentPrices = async () => {
            let currPrices = Array.from(await api.getCurrentPricesFromInstruments(header, instruments));
            setCurrentPrices(currPrices);
        }
        updateCurrentPrices();
    }, [instruments])

    // useEffect(() => {
    //     console.log('current prices');
    //     console.log(currentPrices);
    // }, [currentPrices]);

    // ----------------------------------------- profit calculations -----------------------------------------

    // sell orders
    useEffect(() => {
        getOrderHistory(['filled'], 'sell', setSellOrders);
    }, [orders])

    // buy orders
    useEffect(() => {
        getOrderHistory(['filled'], 'buy', setBuyOrders);;
    }, [sellOrders])
    
    useEffect(() => {
        const updateRealizedProfits = async () => {
            let profits = await analysis.getRealizedProfit(buyOrders, sellOrders);
            setRealizedProfit(profits);
        };
        updateRealizedProfits();
    }, [buyOrders]);

    useEffect(() => {
        const updateUnrealizedProfits = async () => {
            let unreal = await analysis.getUnrealizedProfit(positions);
            setUnrealizedProfit(unreal);
        }
        updateUnrealizedProfits();
    }, [positions])



    function renderHistory(){
        if (! realizedProfit) return <div></div>;
    
        return Object.entries(realizedProfit).map((element) => {
            let realprofit = element[1];
            let sign = realprofit < 0 ? '-' : '+';
            
            return (
                <div>
                <div className='row'>
                    <div className='cell text'>{element[0]}</div>
                    <div className='cell text'>-</div>
                    <div className='cell text'>-</div>
                    <div className='cell text'>-</div>
                    <div className='cell text'>{sign}${Math.abs(realprofit).toFixed(2)}</div>
                    <div className='cell text'>-</div>
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
                        <div className="data-row-categ text" >Initial Investment</div>
                        <div className="data-row-value condensed fake">$2,899.31</div>
                    </div>
                    <div className="stats-box-data-row">
                        <div className="data-row-categ text">Unrealized Return</div>
                        <div className="data-row-value condensed positive fake">+$82 (+7.16%)</div>
                    </div>
                    <div className="stats-box-data-row">
                        <div className="data-row-categ text">Realized Return</div>
                        <div className="data-row-value condensed negative fake">-$152.14 (-5.25%)</div>
                    </div>
                </div>
                <div className="stats-box">
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
                </div>
            </div>

            <div className="table-title text">History</div>
            <div className='table'>
                {/* <div className='first row'>
                    <div className='cell text row-header'>Name</div>
                    <div className='cell text row-header'>Average Cost</div>
                    <div className='cell text row-header'>Average Sell</div>
                    <div className='cell text row-header'>Unrealized</div>
                    <div className='cell text row-header'>Realized</div>
                    <div className='cell text row-header'>Current Price</div>
                </div> */}
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
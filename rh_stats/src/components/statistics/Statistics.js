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
    const [unrealizedProfit, setUnrealizedProfit] = useState([]);

    // instruments
    const [instruments, setInstruments] = useState([]);

    // order history 
    const [orders, setOrders] = useState([]);
    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);
    const [realizedProfit, setRealizedProfit] = useState([]);


    useEffect(() => {
        const getCash = async () => {
            let details = await api.getAccountDetails(header);
            let cashStr = await details[0]['portfolio_cash'];
            setCash(parseFloat(cashStr));
        }
        getCash();
    }, []);


    // positions

    useEffect(() => {
        const getPositions = async () => {
            let pos = await api.getPositions(header);
            setPositions(pos);
            console.log('setting positions');
        }
        getPositions();
    }, []);

    useEffect(() => {
        console.log('positions:');
        console.log(positions);
        const updateUnrealizedProfits = async () => {
            let unreal = await analysis.getUnrealizedProfit(positions);
            setUnrealizedProfit(unreal);
        }
        updateUnrealizedProfits();
    }, [positions])


    // order history

    const getOrderHistory = async (state=['filled'], side='', setFunc) => {
        let history = await api.getOrderHistory(header, state, side);
        setFunc(history);
    }

    useEffect(() => {
        getOrderHistory(['filled'], '', setOrders)
    }, []);

    useEffect(() => {
        getOrderHistory(['filled'], 'sell', setSellOrders);
    }, [orders])


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
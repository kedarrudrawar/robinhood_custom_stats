import * as analysis from './Analysis';
import * as test_vars from './test-variables';
import { DataFrame, Series } from 'pandas-js/dist/core';
import * as api from '../../api/api';

jest.mock('axios');
jest.mock('../../api/api', () => ({
    
    getFieldFromInstrumentsDF: jest.fn((df, field) => {
        const instrumentMap = {
            "https://api.robinhood.com/instruments/49945af2-ee94-496f-9b18-18ab01f90033/": 'ILMN',
            "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/": 'MRNA',
            "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/": 'NEE',
            "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/": 'FANG',
            "https://api.robinhood.com/instruments/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/": 'AMZN',
            "https://api.robinhood.com/instruments/18006bfb-cbad-4326-8348-738c94ea47fa/": 'AMAT',
            "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/": 'FANG',
            "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/": 'AAPL',
            "https://api.robinhood.com/instruments/124133a3-cf48-45f4-a014-934529fdfd7b/": 'PSX',
            "https://api.robinhood.com/instruments/b2e06903-5c44-46a4-bd42-2a696f9d68e1/": 'BABA',
            "https://api.robinhood.com/instruments/fc77229c-9134-4817-bd0c-588e672c15e7/": 'RHHBY',
            "https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/": 'MSFT',
        };
        let out = [];
        for(const row of df){
            if(field === 'symbol'){
                let instr = row.get('instrument');
                out.push(instrumentMap[instr]);
            }
            else if(field === 'tradability')
                out.push('tradable');
        };
        return out;
    }),

    getCurrentPricesFromInstrumentsDF: jest.fn(),
}));

let positions;
let fullPositions;

let singleBuyOrder;
let singleSellOrder;

let emptyBuyOrders = [];
let emptySellOrders = [];

beforeAll(() => {
    positions = test_vars.positions;
    fullPositions = test_vars.fullPositions;
    singleBuyOrder = test_vars.singleBuyOrder;
    singleSellOrder = test_vars.singleSellOrder;
})

describe('positions to DF', () => {
    it('should return an accurate dataframe', async () => {
        let received = await analysis.positionsToDF(positions);
        expect(received.length).toEqual(positions.length);
        let idx = 0;
        for(const row of received){
            for(const key of Object.keys(fullPositions[idx])){
                expect(row.get(key)).toEqual(fullPositions[idx][key]);
            }
            idx += 1;
        }
    });
});

describe('Get unrealized profit -- analysis', () => {
    let unrealProfit;
    let fakeCurrentPrice = 500.00;
    api.getCurrentPricesFromInstrumentsDF.mockImplementation((header, df) => Array.from(df.get('symbol').map(symbol => [symbol, fakeCurrentPrice])));

    it('should return array of [[symbol, unrealized profit, percent unrealized profit], ...]', async () => {
        let df = await analysis.positionsToDF(positions);
        unrealProfit = await analysis.getUnrealizedProfit(df);
        expect(unrealProfit[0]).toHaveLength(3);
    });

    it('should return accurate string/numbers', async () => {
        let df = await analysis.positionsToDF(positions);
        let prices = await api.getCurrentPricesFromInstrumentsDF({}, df);
        let prices_df = new DataFrame(prices);
        prices_df.columns = ['symbol', 'price'];
        df = df.merge(prices_df, ['symbol'], 'outer');
        
        let expected = fullPositions.map(pos => {
            let buy_price = parseFloat(pos['average_buy_price']);
            let qty = parseFloat(pos['quantity']);
            let returns = (fakeCurrentPrice - buy_price) * qty;
            let percent_return = (fakeCurrentPrice - buy_price) / buy_price * 100.00; 
            return [pos['symbol'],  returns, percent_return];
        });


        unrealProfit = await analysis.getUnrealizedProfit(df);
        await expect(unrealProfit).toEqual(expected);

    });
})

describe('Get realized profit -- analysis', () => {
    let realProfit, receivedProfit, expectedProfit;

    it('should return array of [[symbol, profit, instrument],...]', async () => {
        realProfit = await analysis.getRealizedProfit(singleBuyOrder, singleSellOrder);
        await expect(realProfit[0]).toHaveLength(3);
    });

    it('should return expected profit for single buy/sell order', async () => {
        realProfit = await analysis.getRealizedProfit(singleBuyOrder, singleSellOrder);
        receivedProfit = Number(parseFloat(await realProfit[0][1]).toFixed(2));
        expectedProfit = Number((5 * (29.36 - 26)).toFixed(2));
        await expect(receivedProfit).toEqual(expectedProfit);
    });

  
    it('should handle EMPTY buy orders with single sell order', async () => {
        realProfit = await analysis.getRealizedProfit(emptyBuyOrders, singleSellOrder);
        receivedProfit = Number(parseFloat(await realProfit[0][1]).toFixed(2));
        expectedProfit = Number((5 * (29.36)).toFixed(2));
        await expect(receivedProfit).toEqual(expectedProfit);
    });

    it('should handle single buy order with EMPTY sell orders', async () => {
        realProfit = await analysis.getRealizedProfit(singleBuyOrder, emptySellOrders);
        await expect(realProfit).toHaveLength(0);
    });

    it('should return expected profit for multiple buy/sell orders', async () => {
        realProfit = await analysis.getRealizedProfit(test_vars.multipleBuyOrders, test_vars.multipleSellOrders);
        expectedProfit = {
            'MRNA': (5 * (29.36 - 26)).toFixed(2),
            'NEE': ((236.96 * 2) - (203.29 + 237)).toFixed(2),
            'FANG': (2*44.00 - 2 * 32.91).toFixed(2),
        }
        for(const arr of realProfit){
            await expect(arr[1].toFixed(2)).toEqual(expectedProfit[arr[0]]);
        }
    });


});

describe('dividends to DF -- analysis', () => {
    it('should handle multiple dividends from same company', async () => {
        let df = analysis.dividendsToDF(test_vars.duplicateDividends);
        let expected_instr = test_vars.singleDividend[0]['instrument'];
        let expected_div = (2.20 * 3).toFixed(2);
        let received_instr = df.get('instrument').values.get(0);
        let received_div = parseFloat(df.get('dividend').values.get(0)).toFixed(2);
        expect(received_instr).toEqual(expected_instr);
        expect(received_div).toEqual(expected_div);
    });

    it('should handle dividends from different companies', async () => {
        let df = analysis.dividendsToDF(test_vars.multipleDividends);
        let expected_instrs = [];
        let expected_divs = [];
        for(const dividend of test_vars.multipleDividends){
            expected_instrs.push(dividend['instrument']);
            expected_divs.push(parseFloat(dividend['amount']));
        }
        let i = 0;
        for(const row of df){
            let received_instr = row.get('instrument');
            let received_div = row.get('dividend');
            expect(received_instr).toEqual(expected_instrs[i]);
            expect(received_div).toEqual(expected_divs[i]);

            i += 1;
        }
    })
})
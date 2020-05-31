import * as analysis from './Analysis';
import * as test_vars from './test-variables';

jest.mock('axios');
jest.mock('../../api/api', () => ({
    
    getFieldFromInstrumentsDF: jest.fn((df, field) => {
        const instrumentMap = {
            "https://api.robinhood.com/instruments/49945af2-ee94-496f-9b18-18ab01f90033/": 'ILMN',
            "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/": 'MRNA',
            "https://api.robinhood.com/instruments/68bae46a-c0a5-4cda-86a9-1d2460b0b7d3/": 'NEE',
            "https://api.robinhood.com/instruments/00815789-becf-4d44-8733-032d602a33d8/": 'FANG',
            "https://api.robinhood.com/instruments/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/": 'AMZN',
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
        for(const row of received){
            for(const key of Object.keys(fullPositions)){
                expect(row.get(key)).toEqual(fullPositions[key]);
            }
        }
    });
});

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
            console.log(arr[0]);
            await expect(arr[1].toFixed(2)).toEqual(expectedProfit[arr[0]]);
        }
    });


});
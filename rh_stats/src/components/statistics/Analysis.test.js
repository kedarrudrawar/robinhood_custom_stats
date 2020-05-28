import * as analysis from './Analysis';
import * as test_vars from './test-variables';

jest.mock('axios');
jest.mock('../../api/api', () => ({
    getFieldFromInstrumentsDF: jest.fn((df, field) => {
        let instrumentMap = {
            "https://api.robinhood.com/instruments/49945af2-ee94-496f-9b18-18ab01f90033/": 'ILMN',
            "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/": 'MRNA',
        }
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
let buyOrders;
let sellOrders;

let emptyBuyOrders;
let emptySellOrders;

beforeAll(() => {
    positions = test_vars.positions;
    fullPositions = test_vars.fullPositions;
    buyOrders = test_vars.buyOrders;
    sellOrders = test_vars.sellOrders;
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
    let realProfit;

    it('should return array of [[symbol, profit, instrument],...]', async () => {
        realProfit = await analysis.getRealizedProfit(buyOrders, sellOrders);
        await expect(realProfit[0]).toHaveLength(3);
    });

    it('should return expected profit for full buy/sell orders', async () => {
        realProfit = await analysis.getRealizedProfit(buyOrders, sellOrders);
        let receivedProfit = Number(parseFloat(await realProfit[0][1]).toFixed(2));
        let expectedProfit = Number((5 * (29.36 - 26)).toFixed(2));
        await expect(receivedProfit).toEqual(expectedProfit);
    });

  
    it('should throw error', () => {
        expect(false).toBeTruthy();
    });



});
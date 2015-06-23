// STRATEGY OVERVIEW //////////////////////////////////////////////////////////////////////////////
/*  VARIABLES
    A = Total Amount of Coins To Hedge (100 BTC)
    B = 10 BTC +/- 40% Randomly ( as to obscure bot operations)
    X = 10 seconds +/- 40% Randomly ( as to obscure bot operations)
    Y = The price at which we want to stop entering new hedging positions ($300 USD)
    Q = Total Current Open Long Position
    R = Current Amount Insured
    S = Spread between Last Trade Price (OKC) and LTP (796) averaged over 3 hours + 10%.
    C = Current Spread Between OKC and 796.
    W = Average Cost of OKCoin Position
    O = OKCoin LTP
    I = Insurance Coverage Rate %
*/

/*
    LOGIC:
    IF (Q) < (A) && (C) < (S):
        Buy (B) out of the Pending Order (A) to a max of (A).
        
    IF (O) > (W * (1.25/100)):
        Sells (R*I) BTC 
        Wait for O to get to a 2.5% gain over W, then sell half of Q.
        If O Keeps going up, at 4% over W reopen insurance again using (Q*I / 2)
        
    IF (O) goes down after selling insurance:
        Stops out at ‘(W) + 0.5% to 1.25%’  (full position)  
    
    IF (O) has dropped before insurance has been sold:
        Once it is 1.25% below W it buys additional insurance at (Q) * (I).
        Add Z% of Q to Q for every 1$ that it's dropped.
        (where Z is 10,20,30,35,40,45,50,55,60,56,70,75,80,85,90,95% to the position
        for each $ it's dropped).
*/


// helpers
var _ = require('lodash');
var log = require('../core/log.js');

// configuration
var config = require('../core/util.js').getConfig();
var settings = config.LONGHEDGE;

// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  this.currentTrend;
  this.requiredHistory = config.tradingAdvisor.historySize;

  this.name = 'Long Biased Hedge Strategy';

  // define the indicators we need
  this.addIndicator('longhedge', 'LONGHEDGE', settings);
  
  // Variables
  max_hedge_amount = 100;       // Total BTC To Spend
  average_buy_amount = 10;        // Average BTC To Spend
  current_holding_amount = 0;      // Total Amount Currently Held (Position)

  max_buy_price = 300;            // Do NOT Buy If Over This Price.

  current_amount_insured = 0;     // Amount of Insurance Currently Holding
  average_spread = 0;
  current_spread = 0;             // Current Spread Over 3 Hours + 10%
  average_position_cost = 0;      // Average Position Cost
  last_traded_price = 0;          // Last Traded Price
  insurance_coverage_rate = 0.70; // Insurance Coverage Rate (as %)
}

// what happens on every new candle?
method.update = function(candle) {
  // nothing!
}

// for debugging purposes: log the last calculated
// EMAs and diff.
method.log = function() {
  var longhedge = this.indicators.longhedge;

  log.debug('calculated LONG HEDGE properties for candle:');
  log.debug('\t', 'long ema:', longhedge.long.result.toFixed(8));
  log.debug('\t', 'short ema:', longhedge.short.result.toFixed(8));
  log.debug('\t diff:', longhedge.result.toFixed(5));
  log.debug('\t LONGHEDGE age:', longhedge.short.age, 'candles');
}

method.check = function() {
    // Long Biased Hedge Strategy.
    
    if(last_traded_price < max_buy_price && current_holding_amount < max_hedge_amount && current_spread < average_spread) {
        OKCOIN.placeBuyOrder(average_buy_amount, max_hedge_amount - current_holding_amount);
    }
    
    if(last_traded_price >= average_position_cost*1.0125) {
        if(!soldInsurance) {
            // Sell current_amount_insured * insurance_coverage_rate
            OKCOIN.sellInsurance(current_amount_insured * insurance_coverage_rate);
            soldInsurance = false;
        } 
        else if(soldInsurance && last_traded_price >= average_position_cost*1.025) {
            OKCOIN.placeSellOrder(current_holding_amount / 2)
        } 
        else if(soldInsurance && last_traded_price >= average_position_cost*1.04) {
            OKCOIN.buyInsurance(current_holding_amount * insurance_coverage_rate / 2)
        }
    }
    
    if(soldInsurance) {
        if(last_traded_price <= average_position_cost / (1 + 0.0125 - 0.005)) {
            OKCOIN.closePosition();
        }
    }
    
    if(!soldInsurance) {
        if(last_traded_price <= average_position_cost/1.0125) {
            OKCOIN.buyInsurance(current_holding_amount * insurance_coverage_rate);
            currentHoldingAmount += (current_holding_amount * (average_position_cost - last_traded_price))
        }
    }
}

module.exports = method;

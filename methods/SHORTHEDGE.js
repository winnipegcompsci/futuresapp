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
var settings = config.DEMA;

// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  this.currentTrend;
  this.requiredHistory = config.tradingAdvisor.historySize;

  this.name = 'SHORTHEDGE';

  // define the indicators we need
  this.addIndicator('shorthedge', 'SHORTHEDGE', settings);
}

// what happens on every new candle?
method.update = function(candle) {
  // nothing!
}

// for debugging purposes: log the last calculated
// EMAs and diff.
method.log = function() {
  var shorthedge = this.indicators.shorthedge;

  log.debug('calculated DEMA properties for candle:');
  log.debug('\t', 'long ema:', shorthedge.long.result.toFixed(8));
  log.debug('\t', 'short ema:', shorthedge.short.result.toFixed(8));
  log.debug('\t diff:', shorthedge.result.toFixed(5));
  log.debug('\t SHORTHEDGE age:', shorthedge.short.age, 'candles');
}

method.check = function() {

  var shorthedge = this.indicators.shorthedge;
  var diff = shorthedge.result;
  var price = this.lastPrice;

  var message = '@ ' + price.toFixed(8) + ' (' + diff.toFixed(5) + ')';

  /*
  if(diff > settings.thresholds.up) {
    log.debug('we are currently in uptrend', message);

    if(this.currentTrend !== 'up') {
      this.currentTrend = 'up';
      this.advice('long');
    } else
      this.advice();

  } else if(diff < settings.thresholds.down) {
    log.debug('we are currently in a downtrend', message);

    if(this.currentTrend !== 'down') {
      this.currentTrend = 'down';
      this.advice('short');
    } else
      this.advice();

  } else {
    log.debug('we are currently not in an up or down trend', message);
    this.advice();
  }
  */
}

module.exports = method;

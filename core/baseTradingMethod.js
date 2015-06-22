var _ = require('lodash');
var util = require('../core/util.js');
var config = util.getConfig();
var log = require('../core/log.js');

var indicatorsPath = '../methods/indicators/';

var Indicators = {
  MACD: {
    factory: require(indicatorsPath + 'MACD'),
    input: 'price'
  },
  DEMA: {
    factory: require(indicatorsPath + 'DEMA'),
    input: 'price'
  },
  PPO: {
    factory: require(indicatorsPath + 'PPO'),
    input: 'price'
  },
  RSI: {
    factory: require(indicatorsPath + 'RSI'),
    input: 'candle'
  },
  LONGHEDGE: {
    factory: require(indicatorsPath + 'LONGHEDGE'),
    input: 'candle'
  },
  SHORTHEDGE: {
    factory: require(indicatorsPath + 'SHORTHEDGE'),
    input: 'candle'
  },
};

var allowedIndicators = _.keys(Indicators);

var Base = function() {
  _.bindAll(this);

  // properties
  this.age = 0;
  this.setup = false;

  // defaults
  this.requiredHistory = 0;
  this.priceValue = 'c';
  this.indicators = {};

  // make sure we have all methods
  _.each(['init', 'check'], function(fn) {
    if(!this[fn])
      util.die('No ' + fn + ' function in this trading method found.')
  }, this);

  if(!this.update)
    this.update = function() {};

  // let's run the implemented starting point
  this.init();

  // should be set up now, check some things
  // to make sure everything is implemented
  // correctly.
  if(this.name)
    log.info('\t', 'Using trading method:', this.name);
  else
    log.warn('\t', 'Warning, trading method has no name');

  if(!config.debug || !this.log)
    this.log = function() {};

  this.setup = true;
}

// teach our base trading method events
var Util = require('util');
var EventEmitter = require('events').EventEmitter;
Util.inherits(Base, EventEmitter);

Base.prototype.tick = function(candle) {
  this.age++;

  // update all indicators
  var price = candle[this.priceValue];
  _.each(this.indicators, function(i) {
    if(i.input === 'price')
      i.update(price);
    if(i.input === 'candle')
      i.update(candle);
  });

  this.update(candle);

  if(this.requiredHistory <= this.age) {
    this.log();
    this.check();
  }

  // update previous price
  this.lastPrice = price;
}

Base.prototype.addIndicator = function(name, type, parameters) {
  if(!_.contains(allowedIndicators, type))
    util.die('I do not know the indicator ' + type);

  if(this.setup)
    util.die('Can only add indicators in the init method!');

  this.indicators[name] = new Indicators[type].factory(parameters);

  // some indicators need a price stream, others need full candles
  this.indicators[name].input = Indicators[type].input;
} 

Base.prototype.advice = function(newPosition) {
  if(!newPosition)
    return this.emit('soft advice');

  this.emit('advice', {
    recommandation: newPosition,
    portfolio: 1
  });
}

module.exports = Base;
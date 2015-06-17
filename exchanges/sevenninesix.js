var SevenNineSix = require("sevenninesix");
var util = require("../core/util.js");
var _ = require("lodash");
var moment = require("moment");
var log = require("../core/log");

var Trader = function(config) {
 _.bindAll(this);
  if(_.isObject(config)) {
    this.key = config.key;
    this.secret = config.secret;
  }
  this.name = '796';
  this.balance;
  this.price;

  this.sevenninesix = new SevenNineSix(this.key, this.secret);
}

// if the exchange errors we try the same call again after
// waiting 10 seconds
Trader.prototype.retry = function(method, args) {
  var wait = +moment.duration(10, 'seconds');
  
  log.debug(this.name, 'returned an error, retrying..');

  var self = this;

  // make sure the callback (and any other fn)
  // is bound to Trader
  _.each(args, function(arg, i) {
    if(_.isFunction(arg))
      args[i] = _.bind(arg, self);
  });

  // run the failed method again with the same
  // arguments after wait
  setTimeout(
    function() { method.apply(self, args) },
    wait
  );
}

Trader.prototype.getPortfolio = function(callback) {
  var set = function(err, data) {
    var portfolio = [];
    _.each(data, function(amount, asset) {
      if(asset.indexOf('available') !== -1) {
        asset = asset.substr(0, 3).toUpperCase();
        portfolio.push({name: asset, amount: parseFloat(amount)});
      }
    });
    callback(err, portfolio);
  }
  this.okcoin.balance(_.bind(set, this));
}

Trader.prototype.getTicker = function(callback) {
  this.okcoin.ticker(callback);
}

Trader.prototype.getFee = function(callback) {
  var set = function(err, data) {
    if(err)
      callback(err);

    callback(false, data.fee / 100);
  }
  this.okcoin.balance(_.bind(set, this));
}

Trader.prototype.buy = function(amount, price, callback) {
  var set = function(err, result) {
    if(err || result.error)
      return log.error('unable to buy:', err, result);

    callback(null, result.id);
  };

  // TODO: fees are hardcoded here?
  amount *= 1; // remove fees
  // prevent: Ensure that there are no more than 8 digits in total.
  amount *= 100000000;
  amount = Math.floor(amount);
  amount /= 100000000;
  this.okcoin.buy(amount, price, _.bind(set, this));
}

Trader.prototype.sell = function(amount, price, callback) {
  var set = function(err, result) {
    if(err || result.error)
      return log.error('unable to sell:', err, result);

    callback(null, result.id);
  };

  this.okcoin.sell(amount, price, _.bind(set, this));
}

Trader.prototype.checkOrder = function(order, callback) {
  var check = function(err, result) {
    var stillThere = _.find(result, function(o) { return o.id === order });
    callback(err, !stillThere);
  };

  this.okcoin.open_orders(_.bind(check, this));
}

Trader.prototype.cancelOrder = function(order, callback) {
  var cancel = function(err, result) {
    if(err || !result)
      log.error('unable to cancel order', order, '(', err, result, ')');
  };

  this.okcoin.cancel_order(order, _.bind(cancel, this));
}

Trader.prototype.getTrades = function(since, callback, descending) {
  var args = _.toArray(arguments);
  var process = function(err, result) {
  
    if(err) {
        console.log("796.com: " + err);
        return this.retry(this.getTrades, args);

    }  
        
    callback(null, result.reverse());
  };

  this.sevenninesix.getTrades(_.bind(process, this));
}


module.exports = Trader;
// what kind of exchange does Gekko support?
//
// Required parameters per exchange.
//
// name: Proper name of the exchange
// slug: slug name of the exchange (needs to match filename in `gekko/exchanges/`)
// direct: does this exchange support MKT orders?
// infinityOrder: is this an exchange that supports infinity
//    orders? (which means that it will accept orders bigger then
//    the current balance and order at the full balance instead)
// currencies: all the currencies supported by the exchange
//    implementation in gekko.
// assets: all the assets supported by the exchange implementation
//    in gekko.
// pairs: all allowed currency / asset combinatinos that form a market
// providesHistory: If the getTrades can be fed a since parameter
//    that Gekko can use to get historical data, set this to:
//
//    - 'date' // When Gekko can pass in a starting point in time
//             // to start returning data from.
//    - 'tid'  // When Gekko needs to pass in a trade id to act as
//             // a starting point in time.
//    - false  // When the exchange does not support to give back
//             // historical data at all.
// fetchTimespan: if the timespan between first and last trade per
//    fetch is fixed, set it here in minutes.
//
// monitorError: if Gekko is currently not able to monitor this exchange, please set it
//    to an URL explaining the problem.
// tradeError: If gekko is currently not able to trade at this exchange, please set it
//    to an URL explaining the problem.
var exchanges = [
  {
    name: 'MtGox',
    slug: 'mtgox',
    direct: true,
    infinityOrder: true,
    currencies: [
      'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY',
      'DKK', 'HKD', 'PLN', 'RUB', 'SGD', 'THB'
    ],
    assets: ['BTC'],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['EUR', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['GBP', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['AUD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['CAD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['CHF', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['CNY', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['DKK', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['HKD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['PLN', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['RUB', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['SGD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['THB', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      }
    ],
    requires: ['key', 'secret'],
    providesHistory: false
  },
  {
    name: 'BTC-e',
    slug: 'btce',
    direct: false,
    infinityOrder: false,
    currencies: ['USD', 'RUR', 'EUR', 'BTC'],
    assets: [
      'BTC', 'LTC', 'NMC', 'NVC', 'USD', 'EUR',
      'TRC', 'PPC', 'FTC', 'XPM'
    ],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['RUR', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['EUR', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      },
      {
        pair: ['BTC', 'LTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['USD', 'LTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['RUR', 'LTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['EUR', 'LTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'NMC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['USD', 'NMC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'NVC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['USD', 'NVC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['RUR', 'USD'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['USD', 'EUR'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'TRC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'PPC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['USD', 'PPC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'FTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'XPM'], minimalOrder: { amount: 0.1, unit: 'asset' }
      }
    ],
    requires: ['key', 'secret'],
    providesHistory: false
  },
  {
    name: 'Bitstamp',
    slug: 'bitstamp',
    direct: false,
    infinityOrder: false,
    currencies: ['USD'],
    assets: ['BTC'],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 1, unit: 'currency' }
      }
    ],
    requires: ['key', 'secret', 'username'],
    providesHistory: false,
    fetchTimespan: 60
  },
  {
    name: 'OKCoin',
    slug: 'okcoin',
    direct: false,
    infinityOrder: false,
    currencies: ['USD'],
    assets: ['BTC'],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      }
    ],
    requires: ['key', 'secret', 'username'],
    providesHistory: false,
    fetchTimespan: 60
  },
  {
    name: '796',
    slug: 'sevenninesix',
    direct: false,
    infinityOrder: false,
    currencies: ['USD'],
    assets: ['BTC'],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 0.1, unit: 'asset' }
      }
    ],
    requires: ['key', 'secret', 'username'],
    providesHistory: false,
    fetchTimespan: 60
  },
  {
    name: 'CEX.io',
    slug: 'cexio',
    direct: false,
    infinityOrder: false,
    currencies: ['BTC'],
    assets: ['GHS'],
    markets: [
      {
        pair: ['BTC', 'GHS'], minimalOrder: { amount: 0.000001, unit: 'currency' }
      }
    ],
    requires: ['key', 'secret', 'username'],
    providesHistory: false
  },
  {
    name: 'Cryptsy',
    slug: 'cryptsy',
    direct: false,
    infinityOrder: false,
    currencies: ['BTC'],
    assets: ['DOGE', 'DVC', 'PPC', 'LTC', 'DRK' ],
    markets: [
      {
        pair: ['BTC', 'DOGE'], market_id: 132, minimalOrder: { amount: 100, unit: 'asset' }
      },
      {
        pair: ['BTC', 'DVC'], market_id: 40, minimalOrder: { amount: 1, unit: 'asset' }
      },
      {
        pair: ['BTC', 'LTC'], market_id: 3, minimalOrder: { amount: 0.001, unit: 'asset' }
      },
      {
        pair: ['BTC', 'DRK'], market_id: 155, minimalOrder: { amount: 0.001, unit: 'asset' }
      }
    ],
    requires: ['key', 'secret'],
    providesHistory: false
  },
  {
    name: 'Kraken',
    slug: 'kraken',
    direct: false,
    infinityOrder: false,
    currencies: ['XRP', 'EUR', 'KRW', 'USD', 'LTC', 'XVN'],
    assets: ['LTC', 'NMC', 'XBT', 'XVN', 'EUR', 'KRW', 'USD'],
    markets: [
      {
        pair: ['XRP', 'LTC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['EUR', 'LTC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['KRW', 'LTC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['USD', 'LTC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XRP', 'NMC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['EUR', 'NMC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['KRW', 'NMC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['USD', 'NMC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['LTC', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['NMC', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XRP', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XVN', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['EUR', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['KRW', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['USD', 'XBT'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XRP', 'XVN'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XRP', 'EUR'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XVN', 'EUR'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XRP', 'KRW'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XRP', 'USD'], minimalOrder: { amount: 0.01, unit: 'currency' }
      },
      {
        pair: ['XVN', 'USD'], minimalOrder: { amount: 0.01, unit: 'currency' }
      }
    ],
    requires: ['key', 'secret'],
    monitorError: 'https://github.com/askmike/gekko/issues/210',
    providesHistory: false
  },
  {
    name: 'Bitfinex',
    slug: 'bitfinex',
    direct: false,
    infinityOrder: false,
    currencies: ['USD'],
    assets: ['BTC'],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 0.01, unit: 'currency' }
      }
    ],
    requires: ['key', 'secret'],
    // TODO: should be possible to enable this for Bitfinex?
    providesHistory: false
    // fetchTimespan: 60
  },
  {
    name: 'LakeBTC',
    slug: 'lakebtc',
    direct: false,
    infinityOrder: false,
    currencies: ['USD'],
    assets: ['BTC'],
    markets: [
      {
        pair: ['USD', 'BTC'], minimalOrder: { amount: 1, unit: 'currency' }
      }
    ],
    requires: ['key', 'secret'],
    providesHistory: false,
    fetchTimespan: 60
  },
  {
    name: 'meXBT',
    slug: 'mexbt',
    direct: false,
    infinityOrder: false,
    currencies: ['MXN'],
    assets: ['BTC'],
    markets: [
      {
        pair: ['MXN', 'BTC'], minimalOrder: { amount: 0.01, unit: 'asset' }
      }
    ],
    requires: ['key', 'secret', 'username'],
    providesHistory: false
  },
];

module.exports = exchanges;

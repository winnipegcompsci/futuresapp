﻿// Everything is explained here:
// https://github.com/askmike/gekko/blob/master/docs/Configuring_gekko.md

var config = {};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                          GENERAL SETTINGS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Gekko stores historical history
config.history = {
  // in what directory should Gekko store
  // and load historical data from?
  directory: './history/'
}
config.debug = true; // for additional logging / debugging

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                         WATCHING A MARKET
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Monitor the live market
config.watch = {
  enabled: true,
  exchange: 'okcoin', // @link https://github.com/askmike/gekko#supported-exchanges 
  key: 'a3df6a8b-2799-4988-9336-e4ce74b88408',
  secret: 'C890A97000A0A5102CF6462F4F7BDCC1',
  currency: 'USD',
  asset: 'BTC'
  // password: hTCzEdZc
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING TRADING ADVICE
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

config.tradingAdvisor = {
  enabled: true,
  method: 'LONGHEDGE',
  candleSize: 60,
  historySize: 50
}

// Exponential Moving Averages settings:
config.DEMA = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 10,
  long: 21,
  // amount of candles to remember and base initial EMAs on
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -0.025,
    up: 0.025
  }
};

// MACD settings:
config.MACD = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 10,
  long: 21,
  signal: 9,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -0.025,
    up: 0.025,
    // How many candle intervals should a trend persist
    // before we consider it real?
    persistence: 1
  }
};

// PPO settings:
config.PPO = {
  // EMA weight (α)
  // the higher the weight, the more smooth (and delayed) the line
  short: 12,
  long: 26,
  signal: 9,
  // the difference between the EMAs (to act as triggers)
  thresholds: {
    down: -0.025,
    up: 0.025,
    // How many candle intervals should a trend persist
    // before we consider it real?
    persistence: 2
  }
};

// RSI settings:
config.RSI = {
  interval: 14,
  thresholds: {
    low: 30,
    high: 70,
    // How many candle intervals should a trend persist
    // before we consider it real?
    persistence: 1
  }
};

// Custom Longhedge and Shorthedge Strategies Implemented for Joe.
config.LONGHEDGE = {
    max_hedge_amount: 100,     // Max Coins to Hedge
    max_price: 300,     // Max Price to Pay Per BTC
    insurance: 0.70,      // Insurance Rate (As a %)
};

config.SHORTHEDGE = {
    max_hedge_amount: 100,     // Max Coins to Hedge
    max_price: 300,     // Max Price to Pay Per BTC
    insurance: 0.70,      // Insurance Rate (As a %)  
}



// custom settings:
config.custom = {
  my_custom_setting: 10,
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                       CONFIGURING PLUGINS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Want Gekko to perform real trades on buy or sell advice?
// Enabling this will activate trades for the market being
// watched by config.watch
config.trader = {
  enabled: false,
  tradePercent: 10,
  key: '',
  secret: '',
  username: '' // your username, only fill in when using bitstamp or cexio
}

config.adviceLogger = {
  enabled: true
}

// do you want Gekko to calculate the profit of its own advice?
config.profitSimulator = {
  enabled: true,
  // report the profit in the currency or the asset?
  reportInCurrency: true,
  // start balance, on what the current balance is compared with
  simulationBalance: {
    // these are in the unit types configured in the watcher.
    asset: 1,
    currency: 100,
  },
  // only want report after a sell? set to `false`.
  verbose: false,
  // how much fee in % does each trade cost?
  fee: 0.6,
  // how much slippage should Gekko assume per trade?
  slippage: 0.05
}

// want Gekko to send a mail on buy or sell advice?
config.mailer = {  
  enabled: true,       // Send Emails if true, false to turn off
  sendMailOnStart: true,    // Send 'Gekko starting' message if true, not if false

  email: 'enigmafuturesapp@gmail.com',    // Your Gmail address

  // You don't have to set your password here, if you leave it blank we will ask it
  // when Gekko's starts.
  //
  // NOTE: Gekko is an open source project < https://github.com/askmike/gekko >,
  // make sure you looked at the code or trust the maintainer of this bot when you
  // fill in your email and password.
  //
  // WARNING: If you have NOT downloaded Gekko from the github page above we CANNOT
  // guarantuee that your email address & password are safe!

  password: 'Passw0rd!!',       // Your Gmail Password - if not supplied Gekko will prompt on startup.

  tag: '[Futures Advice] ',      // Prefix all email subject lines with this

            //       ADVANCED MAIL SETTINGS
            // you can leave those as is if you 
            // just want to use Gmail

  server: 'smtp.gmail.com',   // The name of YOUR outbound (SMTP) mail server.
  smtpauth: true,     // Does SMTP server require authentication (true for Gmail)
          // The following 3 values default to the Email (above) if left blank
  user: 'enigmafuturesapp@gmail.com',       // Your Email server user name - usually your full Email address 'me@mydomain.com'
  from: 'futuresapp@backtothefutures.com',       // 'me@mydomain.com'
  to: 'drichardson@enigmait.ca, daverich204@gmail.com',       // 'me@somedomain.com, me@someotherdomain.com'
  ssl: true,        // Use SSL (true for Gmail)
  port: '',       // Set if you don't want to use the default port
  tls: false        // Use TLS if true
}


config.mandrillMailer = {
  enabled: false,
  sendMailOnStart: true,
  to: '', // to email
  toName: 'Gekko user',
  from: '', // from email
  fromName: 'Gekko bot info',
  apiKey: '', // Mandrill api key
}

config.smsPlivo = {
  enabled: false,
  sendMailOnStart: true,
  smsPrefix: 'FUTURES APP:', // always start SMS message with this
  to: '', // your SMS number
  from: '', // SMS number to send from provided by Plivo
  authId: '', // your Plivo auth ID
  authToken: '' // your Plivo auth token
}

config.ircbot = {
  enabled: false,
  emitUpdats: false,
  channel: '#your-channel',
  server: 'irc.freenode.net',
  botName: 'gekkobot'
}

config.campfire = {
  enabled: false,
  emitUpdates: false,
  nickname: 'Gordon',
  roomId: null,
  apiKey: '',
  account: ''
}

config.redisBeacon = {
  enabled: false,
  port: 6379, // redis default
  host: '127.0.0.1', // localhost
    // On default Gekko broadcasts
    // events in the channel with
    // the name of the event, set
    // an optional prefix to the
    // channel name.
  channelPrefix: '',
  broadcast: [
    'small candle'
  ]
}

config.pushbullet = {
  enabled: false,
  sendMailOnStart: true,
  deviceId: '', // your Pushbullet device ID, sends to all devices if empty
  authToken: '' // your Pushbullet auth token
}

// not in a working state
// read: https://github.com/askmike/gekko/issues/156
config.webserver = {
  enabled: false,
  ws: {
    host: 'localhost',
    port: 1338,
  },
  http: {
    host: 'localhost',
    port: 1339,
  }
}

// not working, leave as is
config.backtest = {
  enabled: false,
  // candleFile: 'okcoin_candles.csv', // the candles file
  // from: 0, // optional start timestamp 
  // to: 0 // optional end timestamp
}

// set this to true if you understand that Gekko will 
// invest according to how you configured the indicators.
// None of the advice in the output is Gekko telling you
// to take a certain position. Instead it is the result 
// of running the indicators you configured automatically.
// 
// In other words: Gekko automates your trading strategies,
// it doesn't advice on itself, only set to true if you truly
// understand this.
// 
// Not sure? Read this first: https://github.com/askmike/gekko/issues/201
config['I understand that Gekko only automates MY OWN trading strategies'] = true;

module.exports = config;

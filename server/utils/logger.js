require('intel').config({
  formatters: {
    'simple': {
      'format': '[%(levelname)s] %(message)s',
      'colorize': (process.env.colorize !== void 0 ? process.env.colorize : true)
    },
    'details': {
      'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
      'strip': true
    }
  },
  handlers: {
    'console': {
      'class': 'intel/handlers/console',
      'formatter': 'simple',
      'level': 'VERBOSE'
    }
    , 'error': {
      'class': 'intel/handlers/console',
      'formatter': 'simple',
      'level': 'VERBOSE'
    }
  },
  loggers: {
    'app': {
      'handlers': ['console'],
      //'level': 'VERBOSE',
      'handleExceptions': true,
      'exitOnError': false,
      'propagate': false
    },
    'error': {
      'handlers': ['console'],
      //'level': 'INFO',
      'handleExceptions': true,
      'exitOnError': false,
      'propagate': false
    }
  }
});

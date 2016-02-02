var intel = require('intel');

intel.config({
    formatters: {
        'dev': {
            'format': '[%(levelname)s] %(message)s',
            'colorize': true
        }
    },
    handlers: {
        'console': {
            'class': intel.handlers.Console,
            'formatter': 'dev',
            'level': intel.VERBOSE
        }
    }
});

require('intel').getLogger('app').addHandler('console');
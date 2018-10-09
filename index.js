var exampleConfig = require('./example-config');

var validator = {
    // Global data validation configuration
    config: null,

    // Verbose settings
    verbose: false,

    // Sets global data validation configurations
    // Returns validator
    'setConfiguration': function (config) {
        this.config = config;
        return this;
    },

    // Returns example configuration
    'exampleConfiguration': function () {
        return exampleConfig;
    },

    // Returns true if data is valid
    'isValid': function (configName, data) {
        if (!this.config) {
            console.log(
                'No configuration assigned!' +
                '\nPlease assign your configuration and try again!' +
                '\nExample: jsonDataValidator.config = myconfig;'
            );
            return false;
        } else {
            return !!this.validate(this.config[configName], data);
        }
    },

    // Returns true if the object valid according to the given configuration
    'validate': function (conf, data, name = 'data') {
        try {
            var isValid = this.typeChecker[this.getTypeFunction(conf.type)](data);

            if (!isValid) {
                if(this.verbose) {
                    console.log(
                        '-----------Validator Error-----------' +
                        '\nObject Path: ' + name +
                        '\nExpected: ' + conf.type +
                        '\nGot: ' + this.getTypeName(data) +
                        '\nValue: ' + data +
                        '\n-------------------------------------'
                    );
                }
                return false;
            } else if (conf.props) {
                Object.keys(conf.props).forEach(
                    value => {
                        isValid &= this.validate(conf.props[value], data[value], name + '.' + value);
                    }
                );
            }

            return !!isValid;
        } catch (e) {
            return false;
        }
    },

    // Returns function name for the type's validator
    getTypeFunction: function (type) {
        return 'is' + type.replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        });
    },

    // Returns type of value
    getTypeName: function (value) {
        var type = '';
        Object.keys(this.typeChecker).forEach(
            typeFunc => {
                if (this.typeChecker[typeFunc](value)) {
                    type = typeFunc.toLowerCase().substr(2);
                }
            }
        );
        return type;
    },

    // List of all type controls
    typeChecker: {
        // Returns if a value is a string
        isString: function (value) {
            return typeof value === 'string' || value instanceof String;
        },

        // Returns if a value is really a number
        isNumber: function (value) {
            return typeof value === 'number' && isFinite(value);
        },

        // Returns if a value is an array
        isArray: function (value) {
            return value && typeof value === 'object' && value.constructor === Array;
        },

        // Returns if a value is a function
        isFunction: function (value) {
            return typeof value === 'function';
        },

        // Returns if a value is an object
        isObject: function (value) {
            return value && typeof value === 'object' && value.constructor === Object;
        },

        // Returns if a value is null
        isNull: function (value) {
            return value === null;
        },

        // Returns if a value is undefined
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },

        // Returns if a value is a boolean
        isBoolean: function (value) {
            return typeof value === 'boolean';
        },

        // Returns if a value is a regexp
        isRegExp: function (value) {
            return value && typeof value === 'object' && value.constructor === RegExp;
        },

        // Returns if value is an error object
        isError: function (value) {
            return value instanceof Error && typeof value.message !== 'undefined';
        },

        // Returns if value is a date object
        isDate: function (value) {
            return value instanceof Date;
        },

        // Returns if a Symbol
        isSymbol: function (value) {
            return typeof value === 'symbol';
        }
    }
};

module.exports = validator;
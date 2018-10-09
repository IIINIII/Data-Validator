# JSON Data Validator

This is a great, easy to use and flexible JSON data validator.

## About

Let's say you are receiving a JavaScript object in your application and for using the data without a problem you have to use something like  `if(data != null)`  or  `if(data != undefined)`  each time you want to access the data's value. I know it is so annoying. Well not anymore. Using this package you can now easily create a configuration for the data you receive and validate it. It is like a dream, I know but, not anymore.

## Features

- Verbose validation results **(NEW)**
- Great, easy to use and flexible configurations
- Useful in any project
- Many useful functions
- User-friendly feedbacks
- In case of invalid data user-friendly report

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install --save @ibrokhim.shokirov/json-data-validator
# or
npm i --save @ibrokhim.shokirov/json-data-validator
```

Check examples below on how to use this package in your project.

## Quick Start

Install package using command below:

```bash
npm install --save @ibrokhim.shokirov/json-data-validator
```

Add the following line to the top of your JavaScript file:

```javascript
var validator = require('@ibrokhim.shokirov/json-data-validator');
```

Add your configuration to the validator:

```javascript
validator.config = my_config;
// or
validator.setConfiguration(my_config);
```

If you want verbose result, then:

```javascript
validator.verbose = true; // dafault: false
```

And now it is time to validate our data:

```javascript
validator.isValid(subConfigName, data); // Returns true if data is valid
```

If you prefer to use new configuration each time you validate a data, you can do something like this:

```javascript
validator.validate(my_config, data); // Returns true if data is valid
```

## Example Configuration

You can get an example configuration object in JSON format by running command below:

```javascript
validator.exampleConfiguration();
```

Returns:

```javascript
{
    // A basic object configuration
    'chat_data': {
        type: 'object',
        props: {
            to: {type: 'string'},
            from: {type: 'string'},
            msg: {type: 'string'}
        }
    },

    // A basic string configuration
    'username': {
        type: 'string'
    },

    // A basic number configuration
    'age': {
        type: 'number'
    },

    // A little bit more complex configuration
    'user_data_complex': {
        type: 'object',
        props: {
            name: {type: 'string'},
            surname: {type: 'string'},
            isActive: {type: 'boolean'},
            contact_info: {
                type: 'object',
                props: {
                    email: {type: 'string'},
                    phone: {type: 'string'}
                }
            }
        }
    }
}
```

## Usage Examples

Example using a simple configuration:

```javascript
var validator = require('@ibrokhim.shokirov/json-data-validator');
var config = {
    // A basic string configuration
    'username': {
        type: 'string'
    },

    // A basic number configuration
    'id': {
        type: 'number'
    },
};

validator.verbose = true;
validator.setConfiguration(config);

console.log('Test #1:');
var data = "admin";
console.log(validator.isValid('username', data));

console.log('\nTest #2:');
data = 123;
console.log(validator.isValid('id', data));

console.log('\nTest #3:');
data = 321;
console.log(validator.isValid('username', data));

console.log('\nTest #4:');
data = "asdf";
console.log(validator.isValid('id', data));
```

Output:

```
Test #1:
true

Test #2:
true

Test #3:
-----------Validator Error-----------
Object Path: data
Expected: string
Got: number
Value: 321
-------------------------------------
false

Test #4:
-----------Validator Error-----------
Object Path: data
Expected: number
Got: string
Value: asdf
-------------------------------------
false
```

Example using much more complex configuration:

```javascript
var validator = require('@ibrokhim.shokirov/json-data-validator');
var config = {
    'user_detail': {
        type: 'object',
            props: {
            name: {type: 'string'},
            surname: {type: 'string'},
            isActive: {type: 'boolean'},
            contact_info: {
                type: 'object',
                    props: {
                    email: {type: 'string'},
                    phone: {type: 'string'}
                }
            }
        }
    }
};

validator.verbose = true;
validator.setConfiguration(config);

console.log('Test #1:');
var data = {
    'name': 'Tom',
    'surname': 'Jerry'
};
console.log(validator.isValid('user_detail', data));

console.log('\nTest #2:');
data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: 'tom.jerry@example.com'
};
console.log(validator.isValid('user_detail', data));

console.log('\nTest #3:');
data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: {
        'email': 'tom.jerry@example.com'
    }
}
console.log(validator.isValid('user_detail', data));

console.log('\nTest #4:');
data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: {
        'email': 'tom.jerry@example.com',
        'phone': '5556667777'
    }
}
console.log(validator.isValid('user_detail', data));
```

Output:

```
Test #1:
-----------Validator Error-----------
Object Path: data.isActive
Expected: boolean
Got: undefined
Value: undefined
-------------------------------------
-----------Validator Error-----------
Object Path: data.contact_info
Expected: object
Got: undefined
Value: undefined
-------------------------------------
false

Test #2:
-----------Validator Error-----------
Object Path: data.contact_info
Expected: object
Got: string
Value: tom.jerry@example.com
-------------------------------------
false

Test #3:
-----------Validator Error-----------
Object Path: data.contact_info.phone
Expected: string
Got: undefined
Value: undefined
-------------------------------------
false

Test #4:
true
```

Example using single-use configuration:

```javascript
var validator = require('@ibrokhim.shokirov/json-data-validator');

var singleUseConfig = {
    type: 'object',
    props: {
        name: {type: 'string'},
        surname: {type: 'string'},
        isActive: {type: 'boolean'},
        contact_info: {
            type: 'object',
            props: {
                email: {type: 'string'},
                phone: {type: 'string'}
            }
        }
    }
};

var data = {
    'name': 'Tom',
    'surname': 'Jerry',
    'isActive': true,
    contact_info: {
        'email': 'tom.jerry@example.com',
        'phone': '5556667777'
    }
};

console.log(
    validator.validate(singleUseConfig, data)
);
```

Output:

```
true
```



## License

[GNU General Public License v3.0](https://github.com/IIINIII/Json-Data-Validator/blob/master/LICENSE)
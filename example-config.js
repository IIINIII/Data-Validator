var config = {
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
};

module.exports = config;
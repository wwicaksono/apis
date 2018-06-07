'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const password = await bcrypt.hash('password test', 5);
        return queryInterface.bulkInsert('Users', [{
            username: 'wisnu',  
            password: password,
            created_at: new Date(),
            updated_at: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

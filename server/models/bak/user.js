'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.CHAR(60)
    }, {
            underscored: true,
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });
    return User;
};

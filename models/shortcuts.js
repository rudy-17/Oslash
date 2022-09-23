module.exports = (sequelize, Sequelize) => {
    const Shortcut = sequelize.define("roles", {
      shortlink: {
        type: Sequelize.STRING,
        //primaryKey: true
      },
      description: {
        type: Sequelize.STRING
      },
      url:{
        type:Sequelize.STRING
      },
      tags:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  
    return Shortcut;
  };
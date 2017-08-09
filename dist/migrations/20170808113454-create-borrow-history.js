'use strict';

// export default {
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('BorrowHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borrowed_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      collection_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      returned_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_Id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'user_id'
        }
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('BorrowHistories');
  }
};
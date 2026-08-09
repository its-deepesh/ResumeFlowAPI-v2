'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('versions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resume_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "resumes",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      version_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      snapshot: {
        type: Sequelize.JSON,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('versions', ['resume_id', 'version_number'], {
      unique: true,
      name: 'versions_resume_id_version_number_unique'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('versions');
  }
};
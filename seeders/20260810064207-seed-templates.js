'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('templates', [
      {
        name: 'Modern',
        description: 'A clean and modern resume layout',
        config: JSON.stringify({
          layout: 'two-column',
          font: 'Inter',
          primaryColor: '#000000',
          spacing: 'comfortable'
        }),
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        name: 'Classic',
        description: 'A traditional and professional resume layout',
        config: JSON.stringify({
          layout: 'single-column',
          font: 'Georgia',
          primaryColor: '#222222',
          spacing: 'compact'
        }),
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        name: 'Minimal',
        description: 'A simple resume focused on clean typography',
        config: JSON.stringify({
          layout: 'single-column',
          font: 'Roboto',
          primaryColor: '#333333',
          spacing: 'minimal'
        }),
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        name: 'Creative',
        description: 'A visually distinctive resume for creative professionals',
        config: JSON.stringify({
          layout: 'two-column',
          font: 'Poppins',
          primaryColor: '#4F46E5',
          spacing: 'comfortable'
        }),
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        name: 'Professional',
        description: 'A polished layout designed for corporate roles',
        config: JSON.stringify({
          layout: 'single-column',
          font: 'Arial',
          primaryColor: '#1F2937',
          spacing: 'comfortable'
        }),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('templates', null, {});
  }
};

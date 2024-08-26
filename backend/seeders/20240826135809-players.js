'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players', [
      {
        username: 'Alice',
        score: 1200,
      },
      {
        username: 'Bob',
        score: 980,
      },
      {
        username: 'Charlie',
        score: 1450,
      },
      {
        username: 'Diana',
        score: 870,
      },
      {
        username: 'Eve',
        score: 1100,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});

  }
};

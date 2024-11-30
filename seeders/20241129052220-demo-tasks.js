/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await queryInterface.sequelize.query(
      `SELECT id from "Users" where email = 'admin@example.com';`,
    );
    const userId = user[0][0].id;

    await queryInterface.bulkInsert('Tasks', [
      {
        id: '5a3b8c84-d259-4206-894d-f15f1ec369c1',
        title: 'Sample Task 1',
        description: 'This is a sample task',
        status: 'pending',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9f7fd3d6-35d5-43b7-b63f-4a3671c4822b',
        title: 'Sample Task 2',
        description: 'This is a sample task 2',
        status: 'in_progress',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '292bbc56-8843-466a-bcbc-ea39c828689d',
        title: 'Sample Task 3',
        description: 'This is a sample task 3',
        status: 'completed',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};

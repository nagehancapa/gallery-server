"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "test@test.com",
          amount: 26,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },
        {
          email: "test@test.com",
          amount: 28,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "a@a.com",
          amount: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 3,
        },
        {
          email: "a@a.com",
          amount: 51,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 4,
        },
        {
          email: "test@test.com",
          amount: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
  },
};

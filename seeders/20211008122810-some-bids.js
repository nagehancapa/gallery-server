"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "test@test.com",
          amount: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },
        {
          email: "test@test.com",
          amount: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "a@a.com",
          amount: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 3,
        },
        {
          email: "a@a.com",
          amount: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 4,
        },
        {
          email: "test@test.com",
          amount: 55,
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

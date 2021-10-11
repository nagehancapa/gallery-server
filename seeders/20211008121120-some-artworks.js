"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Josephine with Guitar",
          imageUrl: "https://media.s-bol.com/D1G6x6OnGOny/550x694.jpg",
          hearts: 15,
          minimumBid: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Mediterranean Landscape",
          imageUrl:
            "https://fahrenheitmagazine.com/sites/default/files/field/image/i.jpg",
          hearts: 7,
          minimumBid: 27,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Weeping Woman",
          imageUrl:
            "https://d9p7civm2914u.cloudfront.net/wp-content/uploads/2018/05/pablo-picasso-weeping-woman.jpg.webp",
          hearts: 11,
          minimumBid: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: "Portrait of Dora Maar",
          imageUrl:
            "https://www.artsalonholland.nl/uploads/illustraties-groot/e641f445-9377-4f87-9e2a-5d678c15bfc7/2886910418/doramaar.jpg",
          hearts: 40,
          minimumBid: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {});
  },
};

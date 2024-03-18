/* eslint-disable @typescript-eslint/explicit-function-return-type */
const users = [
  {
    id: 'b928dd89-d941-4fd3-bf89-acf778860534',
    email: 'test.email@gmail.com',
    firstName: 'Harry',
    lastName: 'Potter',
    age: 21,
    password: 'akcio',
    createdDate: new Date('2024-03-16 14:27:26'),
    updatedDate: new Date('2024-03-16 14:27:26'),
    deletedDate: null,
  },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', users, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};

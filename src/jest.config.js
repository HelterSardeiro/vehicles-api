// module.exports = {
//     transform: {
//       "^.+\\.(ts|tsx)$": "babel-jest",
//     },
//     testEnvironment: 'node',
// };
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    }
};
  
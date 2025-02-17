module.exports = function (api) {
  api.cache(true); // Helps with caching for faster builds
  return {
    presets: [
      "react-app", // Preset for React applications
      "@babel/preset-env", // Optional: Helps Babel understand modern JavaScript syntax
      "@babel/preset-react" // Optional: Transforms JSX to JavaScript
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties", // For class properties
      "@babel/plugin-proposal-optional-chaining" // For optional chaining (?.)
    ]
  };
};


// module.exports = function (api) {
//   api.cache(true); // Helps with caching for faster builds
//   return {
//     presets: [
//       "react-app", // Preset for React applications
//       "@babel/preset-env", // Optional: Helps Babel understand modern JavaScript syntax
//       "@babel/preset-react" // Optional: Transforms JSX to JavaScript
//     ],
//     plugins: [
//       "@babel/plugin-proposal-class-properties", // For class properties
//       "@babel/plugin-proposal-optional-chaining" // For optional chaining (?.)
//     ]
//   };
// };


// module.exports = {
//   "compilerOptions": {
//     "baseUrl": "src"
//   }
// ,
//   "presets": [
//     "react-app"
//   ],
//   "plugins": [
//     "@babel/plugin-proposal-class-properties",
//     "@babel/plugin-proposal-optional-chaining"
//   ]
// };

// module.exports = {
//   "presets": [
//     "react-app"
//   ],
//   "plugins": [
//     "@babel/plugin-proposal-class-properties",
//     "@babel/plugin-proposal-optional-chaining"
//   ]
// };
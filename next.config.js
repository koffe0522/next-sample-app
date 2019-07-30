const withSass = require("@zeit/next-sass");

module.exports = {
  // severlessを指定
  // target: "serverless",
  ...withSass({
    cssModules: true
  })
};

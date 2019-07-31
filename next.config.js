const withSass = require("@zeit/next-sass");

module.exports = {
  ...withSass({
    // severlessを指定
    // target: "serverless",
    cssModules: true
  })
};

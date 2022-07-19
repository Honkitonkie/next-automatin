module.exports = {
  env: {
    automatin_id: "629b18a25bc8144cc83d84c6",
  },
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};

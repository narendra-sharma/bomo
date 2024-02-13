module.exports = {
  // ... other configurations
  module: {
    rules: [
      // ... other rules
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
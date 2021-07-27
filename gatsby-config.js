module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "LUMS Course Scheduler | Fall 2021",
  },
  plugins: ["gatsby-plugin-sass",
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name:  `src`,
      path: `${__dirname}/src/data`,
    },
  },
  `gatsby-transformer-csv`,
  ],
};

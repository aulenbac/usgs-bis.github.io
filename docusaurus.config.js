module.exports = {
  title: 'USGS Bis Reference',
  url: 'https://usgs-bis.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'usgs-bis', // Usually your GitHub org/user name.
  projectName: 'usgs-bis.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'USGS Bis Reference',
      logo: {
        alt: 'USGS',
        src: 'img/logo.png',
      },
      links: [
        {
          href: 'https://github.com/usgs-bis',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} USGS. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

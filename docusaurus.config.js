// @Matt TODO: #current do this
module.exports = {
  title: 'BIS Data Pipeline Reference',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'usgs-bis', // Usually your GitHub org/user name.
  projectName: 'bis-pipeline-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'BIS Data Pipeline Reference',
      logo: {
        alt: 'USGS',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/pipeline',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          // @Matt TODO: make this correct
          href: 'https://github.com/usgs-bis/bis-data-pipeline',
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

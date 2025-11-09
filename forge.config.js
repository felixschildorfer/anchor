module.exports = {
  packagerConfig: {
    name: 'Anchor Modeler',
    executableName: 'anchor-modeler',
    icon: './Anchor.svg', // Will be converted to platform-specific formats
    asar: true,
    extraResource: [
      // Include all necessary files
      './modules',
      './SQL',
      './*.directive',
      './*.xsl',
      './*.xsd',
      './*.png',
      './*.css',
      './favicon.ico'
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'anchor-modeler',
        setupIcon: './Anchor.svg'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Anchor Modeling Community',
          homepage: 'http://www.anchormodeling.com'
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Anchor Modeling Community',
          homepage: 'http://www.anchormodeling.com'
        }
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    }
  ]
};


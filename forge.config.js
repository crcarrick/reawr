const { config } = require('dotenv')

if (process.env.NODE_ENV === 'development') config()

module.exports = {
  packagerConfig: {
    icon: './images/icon__transparent',
    osxSign: {
      indentity: process.env.OSX_IDENTITY,
      'hardened-runtime': true,
      entitlements: 'entitlements.plist',
      'entitlements-inherit': 'entitlements.plist',
      'signature-flags': 'library',
    },
    osxNotarize: {
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        title: 'Reawr',
        name: 'Reawr',
        iconUrl:
          'https://raw.githubusercontent.com/crcarrick/reawr/main/images/icon__transparent.ico',
        setupIcon: './images/icon__transparent.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        devContentSecurityPolicy:
          "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:; media-src 'self' reawr:",
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.ts',
              name: 'main_window',
              preload: {
                js: './src/preload.ts',
              },
            },
          ],
        },
      },
    ],
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        authToken: process.env.GITHUB_AUTH_TOKEN,
        repository: {
          owner: 'crcarrick',
          name: 'reawr',
        },
        prerelease: true,
      },
    },
  ],
}

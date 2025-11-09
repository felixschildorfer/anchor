# Anchor Modeler Desktop App Setup Guide

This guide will help you package the Anchor Modeler web application as a native desktop app using Electron.

## Prerequisites

### 1. Install Node.js

You need Node.js (which includes npm) to build the desktop app. Download and install from:
- **macOS**: https://nodejs.org/ (download the LTS version)
- Or use Homebrew: `brew install node`

Verify installation:
```bash
node --version
npm --version
```

## Setup Steps

### 1. Install Dependencies

Once Node.js is installed, run:

```bash
cd /Users/felix.schildorfer/GitHub/anchor
npm install
```

This will install:
- Electron (the desktop framework)
- Electron Forge (packaging tools)
- All necessary build tools

### 2. Test the App in Development

Run the app locally to make sure everything works:

```bash
npm start
```

This will open the Anchor Modeler in an Electron window. Test:
- Creating a model
- Generating SQL
- Saving/loading models
- All core functionality

### 3. Package the App

Once everything works, create distributable packages:

```bash
npm run make
```

This will create installers in the `out/` directory:
- **macOS**: `.dmg` or `.zip` file
- **Windows**: `.exe` installer
- **Linux**: `.deb`, `.rpm`, or `.AppImage`

## Project Structure

The Electron app structure:
```
anchor/
├── main.js              # Electron main process (window management)
├── package.json         # Node.js dependencies and scripts
├── forge.config.js     # Electron Forge packaging configuration
├── index.html          # Anchor Modeler web app (main UI)
├── modules/            # Anchor JavaScript modules
├── SQL/                # SQL generation templates
├── *.directive         # SQL generation directives
└── ...                 # All other Anchor files
```

## Available Scripts

- `npm start` - Run the app in development mode
- `npm test` - Same as start (alias)
- `npm run package` - Create a packaged app (without installer)
- `npm run make` - Create installers for all platforms
- `npm run publish` - Publish to distribution channels (if configured)

## Features Added

The desktop app includes:

1. **Native Menus**: File, Edit, View, Help menus with keyboard shortcuts
2. **File Operations**: Open/Save model files using native dialogs
3. **Offline Support**: Works completely offline (no internet required)
4. **Cross-Platform**: Works on Windows, macOS, and Linux
5. **Auto-Updates**: Framework ready for auto-update integration (optional)

## Menu Shortcuts

- `Cmd/Ctrl+N` - New Model
- `Cmd/Ctrl+O` - Open Model
- `Cmd/Ctrl+S` - Save Model
- `Cmd/Ctrl+Q` - Quit (macOS: `Cmd+Q`)

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### App won't start
- Check the console for errors: In `main.js`, uncomment the `openDevTools()` line to see errors
- Verify all Anchor files are present in the directory

### SQL generation doesn't work
- Ensure all `.directive` files are in the root directory
- Check that the `SQL/` folder structure is intact

## Building for Distribution

### macOS
- Creates `.dmg` or `.zip` file
- May need to right-click > Open the first time (if not code-signed)

### Windows
- Creates `.exe` installer
- May trigger SmartScreen warning if not code-signed

### Linux
- Creates `.deb` (Debian/Ubuntu) or `.rpm` (RedHat/Fedora)
- May require additional libraries on some distributions

## Code Signing (Optional but Recommended)

For production distribution, you'll want to code-sign the app:

1. **macOS**: Requires Apple Developer account ($99/year)
   - Configure in `forge.config.js` under `packagerConfig.osxSign`

2. **Windows**: Requires code signing certificate
   - Configure in `forge.config.js` under `packagerConfig.win32metadata`

3. **Linux**: Usually not required

## Next Steps

1. Test the packaged app on target platforms
2. Create a GitHub release with installers
3. Consider adding auto-update functionality
4. Add app icons for each platform (convert SVG to ICO/ICNS)

## Resources

- Electron Documentation: https://www.electronjs.org/docs
- Electron Forge: https://www.electronforge.io/
- Anchor Modeling: http://www.anchormodeling.com


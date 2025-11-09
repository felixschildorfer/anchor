# Quick Start - Anchor Modeler Desktop App

## Prerequisites

**Install Node.js first:**
- Download from https://nodejs.org/ (LTS version recommended)
- Or use Homebrew: `brew install node`

Verify: `node --version` and `npm --version` should work.

## Setup (One Time)

```bash
cd /Users/felix.schildorfer/GitHub/anchor
npm install
```

This installs Electron and all build tools (~200MB download).

## Run the App

```bash
npm start
```

The Anchor Modeler will open in a desktop window. All features work offline!

## Build Installers

Create distributable packages for all platforms:

```bash
npm run make
```

Outputs will be in the `out/` directory:
- macOS: `.dmg` or `.zip`
- Windows: `.exe` installer  
- Linux: `.deb`, `.rpm`, or `.AppImage`

## What's Different from Web Version?

✅ **Native desktop app** - Install and run like any other program
✅ **Works completely offline** - No internet required
✅ **Native menus** - File, Edit, View, Help with keyboard shortcuts
✅ **Better file handling** - Native file dialogs (optional enhancement)
✅ **Auto-saves to localStorage** - Just like the web version

## Troubleshooting

**"npm: command not found"**
→ Install Node.js from https://nodejs.org/

**App won't start**
→ Check console: Uncomment `openDevTools()` in `main.js` line 33

**Need help?**
→ See `DESKTOP_APP_SETUP.md` for detailed documentation


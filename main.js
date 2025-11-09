const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Graceful shutdown: handle OS signals so the Electron app quits when
// the user sends SIGINT/SIGTERM (for example via Ctrl+C or kill).
function setupSignalHandlers() {
  // SIGINT is sent by Ctrl+C in a terminal
  process.on('SIGINT', () => {
    try {
      // let Electron perform its normal shutdown
      app.quit();
    } catch (e) {
      process.exit(0);
    }
  });

  // SIGTERM is a polite termination signal (used by many process managers)
  process.on('SIGTERM', () => {
    try {
      app.quit();
    } catch (e) {
      process.exit(0);
    }
  });
}

setupSignalHandlers();
function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'Anchor.svg'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    show: false // Don't show until ready
  });

  // Load the Anchor Modeler index.html
  mainWindow.loadFile('index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development (comment out for production)
  // mainWindow.webContents.openDevTools();

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Create application menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Model',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-action', 'new-model');
          }
        },
        {
          label: 'Open Model...',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'XML Files', extensions: ['xml'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            });

            if (!result.canceled && result.filePaths.length > 0) {
              const filePath = result.filePaths[0];
              try {
                const content = fs.readFileSync(filePath, 'utf8');
                mainWindow.webContents.send('menu-action', 'load-model', { content, filePath });
              } catch (error) {
                dialog.showErrorBox('Error', `Failed to open file: ${error.message}`);
              }
            }
          }
        },
        {
          label: 'Save Model As...',
          accelerator: 'CmdOrCtrl+S',
          click: async () => {
            mainWindow.webContents.send('menu-action', 'save-model');
          }
        },
        { type: 'separator' },
        {
          label: 'Export SQL...',
          click: () => {
            mainWindow.webContents.send('menu-action', 'export-sql');
          }
        },
        {
          label: 'Export XML...',
          click: () => {
            mainWindow.webContents.send('menu-action', 'export-xml');
          }
        },
        { type: 'separator' },
        {
          role: 'quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo', label: 'Undo' },
        { role: 'redo', label: 'Redo' },
        { type: 'separator' },
        { role: 'cut', label: 'Cut' },
        { role: 'copy', label: 'Copy' },
        { role: 'paste', label: 'Paste' },
        { role: 'selectAll', label: 'Select All' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { role: 'forceReload', label: 'Force Reload' },
        { role: 'toggleDevTools', label: 'Toggle Developer Tools' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Actual Size' },
        { role: 'zoomIn', label: 'Zoom In' },
        { role: 'zoomOut', label: 'Zoom Out' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Toggle Fullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Anchor Modeler',
          click: () => {
            mainWindow.webContents.send('menu-action', 'show-about');
          }
        },
        {
          label: 'Keyboard Shortcuts',
          click: () => {
            mainWindow.webContents.send('menu-action', 'show-shortcuts');
          }
        },
        { type: 'separator' },
        {
          label: 'Anchor Modeling Website',
          click: () => {
            shell.openExternal('http://www.anchormodeling.com');
          }
        },
        {
          label: 'GitHub Repository',
          click: () => {
            shell.openExternal('https://github.com/Roenbaeck/anchor');
          }
        }
      ]
    }
  ];

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about', label: 'About Anchor Modeler' },
        { type: 'separator' },
        { role: 'services', label: 'Services' },
        { type: 'separator' },
        { role: 'hide', label: 'Hide Anchor Modeler' },
        { role: 'hideOthers', label: 'Hide Others' },
        { role: 'unhide', label: 'Show All' },
        { type: 'separator' },
        { role: 'quit', label: 'Quit Anchor Modeler' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// App lifecycle cleanup hooks
app.on('before-quit', (event) => {
  // Notify renderer(s) that we are quitting so they can persist state if needed
  try {
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('app-before-quit');
    }
  } catch (e) {
    // ignore errors during shutdown
  }
});

app.on('will-quit', (event) => {
  // Perform any synchronous cleanup here (closing files, stopping timers, etc.)
  // This hook is mainly a placeholder so future cleanup can be added centrally.
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});


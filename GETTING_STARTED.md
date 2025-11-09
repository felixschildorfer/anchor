# Getting Started with Anchor Modeler

## Quick Start

This is a client-side HTML5 application that runs entirely in your browser. Here are several ways to run it locally:

## Option 1: Python HTTP Server (Recommended - Built into macOS)

1. Open Terminal
2. Navigate to the anchor directory:
   ```bash
   cd /Users/felix.schildorfer/GitHub/anchor
   ```

3. Start a simple HTTP server:
   ```bash
   # Python 3 (most common on macOS)
   python3 -m http.server 8000
   
   # OR if you have Python 2
   python -m SimpleHTTPServer 8000
   ```

4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

5. Click on `index.html` or navigate directly to:
   ```
   http://localhost:8000/index.html
   ```

## Option 2: Node.js HTTP Server

If you have Node.js installed:

1. Install http-server globally (one time):
   ```bash
   npm install -g http-server
   ```

2. Navigate to the anchor directory:
   ```bash
   cd /Users/felix.schildorfer/GitHub/anchor
   ```

3. Start the server:
   ```bash
   http-server -p 8000
   ```

4. Open your browser to `http://localhost:8000`

## Option 3: Direct File Opening (Limited Functionality)

You can try opening `index.html` directly in your browser:
- Double-click `index.html` in Finder, or
- Right-click → Open With → Your Browser

**Note:** Some features (like loading `.directive` files for SQL generation) may not work due to browser security restrictions when using `file://` protocol. Using a local web server (Options 1 or 2) is recommended.

## Browser Requirements

The application works best with:
- **Chrome** 6 or later (recommended)
- **Firefox** 8 or later (recommended)
- **Safari** 6 or later (recommended)
- **Opera** 20 or later (recommended)

**Internet Explorer is NOT supported.**

## First Steps

1. Once the application loads, you'll see an example model
2. Use keyboard shortcuts to interact:
   - `e` - edit selected item
   - `a` - add attribute/anchor
   - `t` - add tie
   - `d` - delete selected
   - See Help → About for full list
3. To generate SQL:
   - Go to Settings to configure database target and temporalization
   - Use the Generate SQL option from the menu
4. Models are automatically saved to browser localStorage
5. You can also save/load models as XML files

## Troubleshooting

- **CORS errors**: Make sure you're using a local web server (not file://)
- **Features not working**: Check browser console (F12) for errors
- **Can't load files**: Ensure all files are in the same directory structure

## Learning Resources

- YouTube tutorial: https://www.youtube.com/watch?v=xr-yyDtkCHQ&list=PLF1451D5701662AD8
- Anchor Modeling website: http://www.anchormodeling.com


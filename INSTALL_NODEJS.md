# How to Install Node.js on macOS

There are several ways to install Node.js on macOS. Here are the easiest options:

## Option 1: Official Installer (Recommended for Beginners)

**Easiest method - just download and install:**

1. Go to https://nodejs.org/
2. Download the **LTS (Long Term Support)** version - this is the most stable
3. Click the download button (it will detect you're on macOS)
4. Open the downloaded `.pkg` file
5. Follow the installation wizard (just click "Continue" and "Install")
6. Enter your password when prompted
7. Done!

**Verify installation:**
Open Terminal and run:
```bash
node --version
npm --version
```

You should see version numbers like `v20.x.x` and `10.x.x`.

## Option 2: Homebrew (If you have it)

If you already have Homebrew installed, this is quick:

```bash
brew install node
```

**Verify:**
```bash
node --version
npm --version
```

## Option 3: Homebrew (Install Homebrew first)

If you don't have Homebrew but want to use it:

1. Install Homebrew first:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Then install Node.js:
   ```bash
   brew install node
   ```

## Option 4: Node Version Manager (nvm) - For Developers

If you might need multiple Node.js versions:

1. Install nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Restart Terminal or run:
   ```bash
   source ~/.zshrc
   ```

3. Install Node.js:
   ```bash
   nvm install --lts
   nvm use --lts
   ```

## Which Method Should You Use?

- **Option 1 (Official Installer)**: Best for most users - simple and reliable
- **Option 2/3 (Homebrew)**: Good if you already use Homebrew or prefer command-line tools
- **Option 4 (nvm)**: Best if you're a developer who might need different Node versions

## After Installation

Once Node.js is installed, you can proceed with setting up the Anchor Modeler desktop app:

```bash
cd /Users/felix.schildorfer/GitHub/anchor
npm install
npm start
```

## Troubleshooting

**"Command not found" after installation:**
- Close and reopen Terminal
- Or run: `source ~/.zshrc` (if using zsh) or `source ~/.bash_profile` (if using bash)

**Permission errors:**
- Make sure you entered your password correctly during installation
- Try running with `sudo` if needed (though this is usually not necessary)

**Want to check if it's already installed?**
```bash
which node
which npm
```

If these show paths like `/usr/local/bin/node`, Node.js is already installed!


#!/bin/bash

# To execute this script, run:
# curl -fsSL https://aleksgorbenko.dev/init.sh | bash

set -euo pipefail
IFS=$'\n\t'

# === CONFIG ===
DOTFILE_URL="https://github.com/aleksgorbenko/dotfiles.git"
ENGBOOK_URL="https://github.com/aleksgorbenko/engineering-notebook.git"
TARGET_DIR="$HOME"
TEMP_DIR="$(mktemp -d)"

echo "🔐 Starting setup script..."
echo "📁 Temporary working directory: $TEMP_DIR"

# === FUNCTIONS ===

function install_git_if_needed() {
  if ! command -v git >/dev/null 2>&1; then
    echo "❌ Git is not installed."
    echo "👉 Installing Xcode Command Line Tools (this may open a GUI dialog)..."
    xcode-select --install || true

    echo "⏳ Waiting for Git to become available..."
    until command -v git >/dev/null 2>&1; do
      sleep 30
    done
    echo "✅ Git installed successfully!"
  fi
}

function check_dependencies() {
  echo "🧪 Checking dependencies..."
  for cmd in curl tar; do
    if ! command -v $cmd >/dev/null 2>&1; then
      echo "❌ Error: '$cmd' is not installed. Please install it first."
      exit 1
    fi
  done
  install_git_if_needed
}

function clone_repos() {
  echo "📥 Cloning repositories..."

  echo "👉 Cloning $DOTFILE_URL to $TEMP_DIR/dotfiles"
  git clone --depth 1 "$DOTFILE_URL" "$TEMP_DIR/dotfiles"

  echo "👉 Cloning $ENGBOOK_URL to $TEMP_DIR/engbook"
  git clone --depth 1 "$ENGBOOK_URL" "$TEMP_DIR/engbook"
}

function install_files() {
  echo "⚙️ Installing files..."

  echo "📦 Copying from $TEMP_DIR/dotfiles..."
  cp -r "$TEMP_DIR/dotfiles/." "$TARGET_DIR/.dotfiles"

  echo "📦 Copying from $TEMP_DIR/engbook..."
  cp -r "$TEMP_DIR/engbook/." "$TARGET_DIR/engbook"
}

function clean_up() {
  echo "🧹 Cleaning up temporary files..."
  rm -rf "$TEMP_DIR"
}

function summary() {
  echo "✅ Setup complete!"
  echo "📁 Files installed to: $TARGET_DIR"

  echo "⚙️ Run to configure the machine:"
  echo "cd $HOME/.dotfiles && script/install"
}

# === RUN ===

check_dependencies
clone_repos
install_files
clean_up
summary
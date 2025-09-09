#!/bin/bash
# pwn-lab-setup.sh
# Arch Linux Pwn CTF Lab Setup Script

set -e

TOOLS_DIR="$HOME/Playground/CTF/tools"

echo "[*] Updating system..."
sudo pacman -Syu --noconfirm

echo "[*] Installing Python, pipx..."
sudo pacman -S --noconfirm python pipx

echo "[*] Ensuring pipx path..."
pipx ensurepath

echo "[*] Installing pwntools..."
pipx install pwntools

echo "[*] Installing debugging and RE tools..."
sudo pacman -S --noconfirm radare2 cutter strace ltrace valgrind

echo "[*] Setting up pwndbg..."
mkdir -p "$TOOLS_DIR"
if [ ! -d "$TOOLS_DIR/pwndbg" ]; then
    git clone https://github.com/pwndbg/pwndbg "$TOOLS_DIR/pwndbg"
    (cd "$TOOLS_DIR/pwndbg" && ./setup.sh)
else
    echo "[*] pwndbg already exists, skipping..."
fi

echo "[*] Done!"
echo "Tools installed in: $TOOLS_DIR"
echo "Make sure ~/.local/bin is in your PATH for pipx tools."


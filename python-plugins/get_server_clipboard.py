import sys
import os
import subprocess

def is_termux():
    return "TERMUX_VERSION" in os.environ

def paste_from_clipboard():
    """Get text from clipboard using termux-clipboard-get."""
    return subprocess.run(["termux-clipboard-get"], capture_output=True, text=True, check=True).stdout.strip()

def read():
    import pyperclip as pc
    if pc.paste() == '':
        pc.copy('Clipboard is empty')
    return pc.paste()

if __name__ == "__main__":
    if is_termux():
        sys.stdout.write(paste_from_clipboard())
    else:
        sys.stdout.write(read())
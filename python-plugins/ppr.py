import sys
import os
import subprocess

def is_termux():
    return "TERMUX_VERSION" in os.environ

def copy_to_clipboard(text):
    """Copy text to clipboard using termux-clipboard-set."""
    subprocess.run(["termux-clipboard-set"], input=text.encode(), check=True)

def write(data):
    import pyperclip as pc
    pc.copy(data)

if __name__ == "__main__":
    if is_termux():
        copy_to_clipboard(sys.argv[1])
        sys.stdout.write("written")
    else:
        write(str(sys.argv[1]))
        sys.stdout.write("written")
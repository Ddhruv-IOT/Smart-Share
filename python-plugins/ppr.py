import pyperclip as pc
import sys

def write(data):
    pc.copy(data)

write(str(sys.argv[1]))
sys.stdout.write("written")
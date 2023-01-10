import pyperclip as pc
import sys

def read():
	return pc.paste()

sys.stdout.write(read())
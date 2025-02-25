import pyperclip as pc
import sys

def read():
	if pc.paste() == '':
		pc.copy('Clipboard is empty')
	return pc.paste()

sys.stdout.write(read())
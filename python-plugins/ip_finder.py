import socket
import sys

def get_ip_address():
  s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
  s.connect(("8.8.8.8", 80))
  return str(s.getsockname()[0])

sys.stdout.write(get_ip_address())
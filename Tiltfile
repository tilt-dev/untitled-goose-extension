# -*- mode: Python -*-
# Test harness for untitled-goose-extension

local_resource(
  name='http-server',
  serve_cmd='busybox httpd -p 8080 -f .',
  links=['http://localhost:8080/'])

local_resource(
  name='untitled-goose-extension',
  deps=['index.js'],
  serve_cmd='node index.js')

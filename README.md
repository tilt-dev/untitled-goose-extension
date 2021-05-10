# untitled-goose-extension

Tilt extension that honks when you messed up your server.

## Development

Run:

```
tilt up
```

Introduce a typo in the Tiltfile's http-server call.

Geese will honk at you.

## Deployment

To any Tiltfile, add:

```python
local_resource(
  name='untitled-goose-extension',
  cmd='yarn global add @tilt.dev/untitled-goose-extension',
  serve_cmd=['untitled-goose-extension'])
```

## Requirements

Must have nodejs/yarn installed.

`yarn global bin` must be on PATH.

On Debian/Ubuntu, you need audio bindings:

```
sudo apt-get install libasound2-dev
```

## License

Copyright 2021 Windmill Engineering

Licensed under [the Apache License, Version 2.0](LICENSE)

honk.wav courtesy of SoundBible https://soundbible.com/235-Geese-Honking.html

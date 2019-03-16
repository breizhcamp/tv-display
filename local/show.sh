#!/bin/bash

HERE=$(dirname "$(readlink -f "$0")")

cd "$HERE/.."
devilspie2 -d -f "local/devilspie2" &
python3 -m http.server 8081 &
chromium-browser --start-fullscreen http://localhost:8081


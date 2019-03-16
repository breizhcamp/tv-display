#!/bin/bash

HERE=$(dirname "$(readlink -f "$0")")

devilspie2 -f "$HERE/devilspie2" &
chromium-browser --start-fullscreen "$HERE/../index.html"


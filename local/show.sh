#!/bin/bash

HERE=$(dirname "$(readlink -f "$0")")

cd "$HERE/.."
devilspie2 -d -f "local/devilspie2" &
exec chromium-browser --disable-gpu --allow-file-access-from-files --start-fullscreen --password-store=basic --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null index.html


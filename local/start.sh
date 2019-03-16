#!/bin/bash

HERE=$(dirname "$(readlink -f "$0")")
systemd-run  --user --unit show-programme "${HERE}/show.sh"


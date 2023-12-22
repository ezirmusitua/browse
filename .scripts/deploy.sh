#!/bin/bash
BUCKET=${1:-"app_browse"}

for file in `ls packages/app/out`; do
  if [[ -d "packages/app/out/$file" ]]; then
    .scripts/coscli cp packages/app/out/$file cos://$BUCKET -r --exclude ".DS_Store"
  fi
  if [[ ! -d "packages/app/out/$file" ]]; then
    .scripts/coscli cp packages/app/out/$file cos://$BUCKET --exclude ".DS_Store"
  fi
done

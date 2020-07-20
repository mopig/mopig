name: build
on:
  push:
  workflow_dispatch:
  schedule:
    - cron:  '59 * * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2-beta
        with: 
          node-version: '14'

      - name: Install packages
        run: npm install

      - name: (Re)build README
        run: npm --silent run build > README.md

      - name: Configure git
        run: |
          git config --global user.email "admin@xiaozhu.dev"
          git config --global user.name "rust-bot"

      - name: Commit README changes
        run: |
          git add README.md
          git commit -m 'update README' || exit 0
          git push

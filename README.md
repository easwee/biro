# biro

PDF invoice generator app based on Svelte.

### Features

- export to pdf
- setup company template with signature upload
- state is always saved in browser indexed DB
- GDPR compliant: no data is sent anywhere
  DEPRECATED API ~~- currency conversion for international invoice (data from https://freecurrencyapi.net/)~~

### Install and develop

`cp .env.example .env` and update it with your apikey from https://freecurrencyapi.net/ (without apikey you are allowed to do 10 requests)

`npm install` to install

`npm run dev` to run in development

const path = require('path');
const fs = require('fs');
const program = require('commander');
const _ = require('lodash');
const { execSync } = require('child_process');

program
  .option('--platform [platform]', `target platform 'mobile' or 'web'`)
  .option('--env [env]', `target environment 'dev' or 'prod'`);

const platform = program.platform || 'mobile';
const env = program.env || 'dev';

const configDir = path.join(__dirname, '../src/configs/');
const configFileName = 'index.json';
let featuresFileName;
let settingsFileName;

switch (platform) {
  case 'web': {
    featuresFileName = 'web.features.json';
    break;
  }
  case 'mobile':
  default: {
    featuresFileName = 'mobile.features.json';
    break;
  }
}

switch (env) {
  case 'prod': {
    settingsFileName = 'prod.settings.json';
    break;
  }
  case 'dev':
  default: {
    settingsFileName = 'dev.settings.json';
    break;
  }
}

const features = JSON.parse(
  fs.readFileSync(configDir + featuresFileName).toString()
);

const settings = JSON.parse(
  fs.readFileSync(configDir + settingsFileName).toString()
);

const config = {
  ...features,
  ...settings
};

fs.writeFileSync(configDir + configFileName, JSON.stringify(config));

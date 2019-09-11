const path = require('path');
const fs = require('fs');
const program = require('commander');
const _ = require('lodash');
const { execSync } = require('child_process');

program
  .option('--account-id [accountId]', 'aws account id')
  .option('--region [region]', 'aws region')
  .option('--token [token]', 'github oauth token')
  .option('--secret [secret]', 'github auth secret')
  .option(
    '--no-execution',
    'flag for not executing script to create aws pipeline'
  )
  .option('--verbose', 'output extra info');

program.parse(process.argv);

const accountId = program.accountId;
const region = program.region;
const token = program.token;
const secret = program.secret;
const toExecute = program.execution;
const verbose = program.verbose;

if (
  _.isEmpty(region) ||
  _.isEmpty(accountId) ||
  _.isEmpty(token) ||
  _.isEmpty(secret)
) {
  console.log('--account-id, --region, --token, and --secret are required');
  return;
}

const dir = path.join(__dirname, 'src/');
const destDir = path.join(__dirname, 'dist/');

try {
  console.log('Generating scripts...');
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}${file}`;
    const content = fs.readFileSync(filePath);
    const result = content
      .toString()
      .replace(/\{\{aws\-account\-id\}\}/g, accountId)
      .replace(/\{\{aws\-region\}\}/g, region)
      .replace(/\{\{github\-oauth\-token\}\}/g, token)
      .replace(/\{\{github\-auth\-secret\}\}/g, secret);
    const destFilePath = `${destDir}${file}`;
    fs.writeFileSync(destFilePath, result);
  }
  console.log('Scripts generated.');
  if (toExecute) {
    console.log('Executing scripts...');
    const buffer = execSync(`cd ${destDir} && bash setup.sh`);
    if (verbose) {
      console.log(buffer.toString());
    }
    console.log('Scripts executed.');
  }
} catch (error) {
  console.log('Unexpected exception: ', error);
}

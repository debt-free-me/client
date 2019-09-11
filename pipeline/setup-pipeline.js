const path = require('path');
const fs = require('fs');
const program = require('commander');
const _ = require('lodash');
const { execSync } = require('child_process');

program
  .option('--account-id [accountId]', 'aws account id')
  .option('--token [token]', 'github oauth token')
  .option('--secret [secret]', 'github auth secret')
  .option('--verbose', 'output extra info')
  .option(
    '--no-execution',
    'flag for not executing script to create aws pipeline'
  );

program.parse(process.argv);

const token = program.token;
const secret = program.secret;
const accountId = program.accountId;
const toExecute = program.execution;
const verbose = program.verbose;

if (_.isEmpty(token) || _.isEmpty(secret) || _.isEmpty(accountId)) {
  console.log('--token, --secret and --account-id required');
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
      .replace(/\{\{aws-account\-id\}\}/g, accountId)
      .replace(/\{\{github\-oauth\-token\}\}/g, token)
      .replace(/\{\{github\-auth\-secret\}\}/g, secret);
    const destFilePath = `${destDir}${file}`;
    fs.writeFileSync(destFilePath, result);
  }
  if (toExecute) {
    console.log('Executing scripts...');
    const buffer = execSync(`cd ${destDir} && bash setup.sh`);
    if (verbose) {
      console.log(buffer.toString());
    }
    console.log('Process completed.');
  }
} catch (error) {
  console.log('Unexpected exception: ', error);
}

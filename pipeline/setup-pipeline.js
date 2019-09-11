const path = require('path');
const fs = require('fs');
const program = require('commander');
const _ = require('lodash');
const { execSync } = require('child_process');

program
  .option('--account-id [accountId]', 'aws account id')
  .option('--token [token]', 'github oauth token for aws to connect')
  .option('--secret [secret]', 'aws auth secret for github webhook')
  .option('--prefix [prefix]', 'pipeline prefix')
  .option('--repo-name [repo-name]', 'repo name')
  .option('--repo-owner [repo-owner]', 'repo owner')
  .option('--repo-branch [reop-branch', 'repo branch')
  .option('--region [region]', 'aws region')
  .option(
    '--buildspec [buildspec]',
    'path to buildspec file relative to the root dir of the repo'
  )
  .option(
    '--no-execution',
    'flag for not executing script for creating aws pipeline'
  )
  .option('--verbose', 'output extra info');

program.parse(process.argv);

const accountId = program.accountId;
const token = program.token;
const secret = program.secret;
const prefix = program.prefix;
const repoName = program.repoName;
const repoOwner = program.repoOwner;
const repoBranch = program.repoBranch || 'master';
const region = program.region || 'ap-southeast-2';
const buildspec = program.buildspec || 'pipeline/buildspec.yml';
const toExecute = program.execution;
const verbose = program.verbose;

if (
  _.isEmpty(accountId) ||
  _.isEmpty(token) ||
  _.isEmpty(secret) ||
  _.isEmpty(prefix) ||
  _.isEmpty(repoName) ||
  _.isEmpty(repoOwner)
) {
  console.log(
    '--account-id, --token, --secret, --prefix, --repo-name, and --repo-owner are required'
  );
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
      .replace(/\{\{github\-oauth\-token\}\}/g, token)
      .replace(/\{\{webhook\-auth\-secret\}\}/g, secret)
      .replace(/\{\{prefix\}\}/g, prefix)
      .replace(/\{\{github\-repo\-name\}\}/g, repoName)
      .replace(/\{\{github\-repo\-owner\}\}/g, repoOwner)
      .replace(/\{\{github\-repo\-branch\}\}/g, repoBranch)
      .replace(/\{\{aws\-region\}\}/g, region)
      .replace(/\{\{buildspec\}\}/g, buildspec);

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

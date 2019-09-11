## How to Run Locally

- Open a terminal window, and navigate to this repo on the filesystem.
- Run "npm install" to install all required project dependencies.
- Run "ionic serve" to run the app in a web browser locally.

## How to Install Dependencies

- Install ionic globally by runing 'sudo npm install -g inoic'
- Install cordova globally by runing 'sudo npm install -g cordova'

## How to Configurate

- There are two targets with different feature flags 'web' and 'mobile' with 'mobile' as default
- To configurate, run 'npm run config' or 'npm run config:web'

## How to Build Web

- Run 'npm run build:web:deploy' or 'npm run build:deploy' for mobile target

## How to Prepare for Building Android App Locally on MacOS

- Install homebrew
- Install Java 8 by runing 'brew cask install homebrew/cask-versions/adoptopenjdk8'
- Install Gradle by runing 'brew install gradle'
- Install Android SDK by runing 'brew cask install android-sdk'
- Install Android Build Tools by runing'sdkmanager "build-tools;27.0.3"'

## How to Build Android App Locally on MacOS

- Run 'npm run config && ionic cordova build android'
- For more info https://ionicframework.com/docs/cli/commands/cordova-build

## How to Prepare for Building iOS App Locally on MacOS

- Download and install xCode from MacOS AppStore
- Agree xcode license by runing 'sudo xcodebuild -license'

## How to Build Android App Locally on MacOS

- Run 'npm run config && ionic cordova build ios'
- For more info https://ionicframework.com/docs/cli/commands/cordova-build

## How to Setup AWS Pipeline

- Run 'npm run setup-pipeline -- --token {{GITHUB_OAUTH_TOKEN}} --account-id {{AWS_ACCOUNT_ID}} [--no-execution]' (with --no-execution option, the scripts for setting up the pipeline are generated without execution)

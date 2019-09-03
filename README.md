# Ionic v4 Tutorial: Photo Gallery app

A tutorial app that walks the user through creating a Photo Gallery app. We begin with the Ionic "tabs" starter app, incrementally converting the About tab to a Photo Gallery experience.

## Structure

The complete source code is contained within. Please follow along with the [complete guide here](https://beta.ionicframework.com/docs/developer-resources/guides/first-app-v4/intro/).

## How to Run Locally

- Clone this repo.
- Open a terminal window, and navigate to this repo on the filesystem.
- Run "npm install" to install all required project dependencies.
- Run "ionic serve" to run the app in a web browser locally.

## How to Install Dependencies

- Install ionic globally by runing 'npm install -g inoic'
- Install cordova globally by runing 'npm install -g cordova'

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

- Run 'ionic cordova build android' (for more info https://ionicframework.com/docs/cli/commands/cordova-build)

## How to Prepare for Building iOS App Locally on MacOS

- Download and install xCode from MacOS AppStore

## How to Build Android App Locally on MacOS

- Run 'ionic cordova build ios' (for more info https://ionicframework.com/docs/cli/commands/cordova-build)

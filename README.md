# Ionic v4 Tutorial: Photo Gallery app

A tutorial app that walks the user through creating a Photo Gallery app. We begin with the Ionic "tabs" starter app, incrementally converting the About tab to a Photo Gallery experience.

## Structure

The complete source code is contained within. Please follow along with the [complete guide here](https://beta.ionicframework.com/docs/developer-resources/guides/first-app-v4/intro/).

## How to Run Locally

- Clone this repo.
- Open a terminal window, and navigate to this repo on the filesystem.
- Run "npm install" to install all required project dependencies.
- Run "ionic serve" to run the app in a web browser locally.

## Known Issues

- Could not find the implementation for builder @ionic/angular-toolkit:cordova-build (https://github.com/ionic-team/ionic/issues/18431)

Solution: This is not related to this repo. The reason: The builder API has changed with Angular 8. A PR for @ionic/angular-toolkit is already available but not published so far (see ionic-team/angular-toolkit#132 )

At the moment Angular 8 is not supported.

If you cannot wait, just replace @ionic/angular-toolkit inside angular.json with paulstelzer-ionic-angular-toolkit and run npm i paulstelzer-ionic-angular-toolkit. This is the build of the mentioned branch. After @ionic/angular-toolkit got the new release you can use this again

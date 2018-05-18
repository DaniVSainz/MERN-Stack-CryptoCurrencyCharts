# MEAN-Auth-Template
This repo will be a template i can clone to use as a foundation for authentication via express/angular for my web-apps  
This is a MEAN stack authentication template.    
The app is meant to be cloned and serve as a starting point for any application.    

#### Heroku Deploy instructions at end of document.Takes 1 minute to config.

##### Features
Bundled Angular and express api so you can deploy easily to heroku  
Implements angular ngsw to have a PWA structure and serve content offline by caching.Currently their package is broken  
there's a temporary fix that's been included in the project.You can check the root package.json to check the automatic script to fix this
https://github.com/angular/angular/issues/21636#issuecomment-366205459 Is the thread about the issue.


How to use.  
Git clone the repo  
touch .env and set  
##### Use one .env file on heroku/production and one different one in dev to save yourself the hassle of constantly changing values
Mongo url use mlab or your own local mongo mine was port 27017   
mongoUrl=mongodb://localhost:27017/auth-template  
userEmail=XXXXXX@gmail.com    
userPass=XXXXXX  
This is used for nodeemailer user registration and password reset emails  
baseHref=Your sites production base href for developement set this to null  
Needed to fix angular broken service worker feature

cd auth-template/  
npm install  
cd angular-src  
npm install  
ng build  

cd..  
node or nodemon bin/www  

your app should be hosted on localhost:3000 now  


## Heroku Deploy instructions

Setup your heroku .env files from heroku website or from the cli.I prefer the website.  
Then just push your project to heroku.Since the project has a specific structure we have a heroku-postbuild script  
It goes into the angular project installs dependancies, builds it, runs the PWA fix and cd's back out the parent folder  
then npm start triggers and your project will work aslong as the .env file was setup on heroku.


# Important  
Some icons are missing from the manifest and ngsw-config as setting up all the icons that will be replaced just felt useless.However you can still use  
the add to home feature from mobile..



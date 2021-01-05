# capstone
Our mobile application has Businesses and Customers as users. Those who are registered as Businesses are able to leverage AWS's deep learning power to recognize if a customer has been to another business on the ecosystem recently, and if that customer has measured a "high" temperature at a previous business. If so, the customer shouldn't be allowed admittance to the business, in light of COVID-19.

As a customer, you should have a heat map of businesses on the ecosystem and the customer's reported "high temperature cases" (simulated until adaptation/deployment).

Our application seeks to serve the environment change that the national pandemic has caused by using AWS Services (Cognito, Lambda, S3, Dynamo, Rekognition, & Amplify), along side with React Native, and ViroReact for Augmented Reality rendering.

# set up 

While this application is not deployed you must do the following in order to run the app on your mobile device
1) Install Xcode
2) Fork and clone this repo
3) Pull the Amplify backend
4) npm install 
5) npm run christian (this script will install the proper pod files in your ios folder, reset cache and run your react native)
6) Open Xcode and change device target to your mobile device's current version
7) npm run nodemon (starts local server)
8) Build application on xcode
9) Go to your phone -> settings -> general -> device management -> trust user 
10) When the build is complete, open your app on your phone and use the app!

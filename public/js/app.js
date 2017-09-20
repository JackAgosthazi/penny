/*global angular */
/*jshint unused:false */
'use strict';

/**
 * ANGULAR CONFIG
 */
var penny = angular.module('penny', ['firebase', 'ui.bootstrap', 'ui.router']);

penny.config(function ($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("smiley");
  
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      template: "<div id=\"firebaseui-auth-container\"></div>"
    }).state('smiley', {
      url: "/smiley",
      templateUrl: "./views/smiley.html"
    })
});

/**
 * FIREBASE CONFIG
 */

let app = firebase.app();
let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');

var uiConfig = {
  signInSuccessUrl: '/#!/smiley',
  signInOptions: [
    // Specify providers you want to offer your users.  
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url can be specified and will show up in the widget.  
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.  
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var currentUid = null;
firebase.auth().onAuthStateChanged(function (user) {
  // onAuthStateChanged listener triggers every time the user ID token changes.  
  // This could happen when a new user signs in or signs out.  
  // It could also happen when the current user ID token expires and is refreshed.  
  if (user && user.uid != currentUid) {
    // Update the UI when a new user signs in.  
    // Otherwise ignore if this is a token refresh.  
    // Update the current user UID.  
    currentUid = user.uid;
    console.log('Logged in user: ', user);
  } else {
    // Sign out operation. Reset the current user UID.  
    currentUid = null;
    console.log("no user signed in");
    location.href = '/#!/login';
    // The start method will wait until the DOM is loaded.  
    ui.start('#firebaseui-auth-container', uiConfig);
  }
});

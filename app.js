/**
 * Created by derek on 7/9/17.
 */
"use strict";

//const users = ["dcneuts", "chalkers", "davemcfarland"];

//Path to the JS file is mandatory
const profile = require('./profile.js');

const users = process.argv.slice (2);
//Using constant for profile and calling function "get" in profile.js, similar to PHP template formatting
users.forEach (profile.get);
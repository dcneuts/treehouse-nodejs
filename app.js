/**
 * Created by derek on 7/9/17.
 */
"use strict";
//For connection
const https = require ('https');
//For status codes
const http = require ('http');

//General error handling
function printError (error) {
	console.error (error.message);
}

//Print message to console
function printMessage (username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log (message);
}

//Added 'try' to attempt to catch additional errors
function getProfile (username) {
	try {
//Connect to the Treehouse API
		const request = https.get (`https://teamtreehouse.com/${username}.json`, response => {
			//Wrapping the blocks with if statement for status code based error messages
			if (response.statusCode == 200) {
				let body = "";
				
				response.on ('data', data => {
					body += data.toString ();
				});
				
				response.on ('end', () => {
					try {
						const profile = JSON.parse (body);
						printMessage (username, profile.badges.length, profile.points.JavaScript);
					} catch (error) {
						printError (error);
					}
				});
				// using the else statement to print friendlier error message based on 404
			} else {
				const message         = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error (message);
				printError (statusCodeError);
			}
		});
		request.on ('error', error => console.error (`Problem with request: ${error.message}`));
		// use 'catch' at the end of the nested 'try' code block to capture error and then console log via error method
	} catch (error) {
		printError (error);
	}
}
//const users = ["dcneuts", "chalkers", "davemcfarland"];
const users = process.argv.slice (2);
users.forEach (getProfile);
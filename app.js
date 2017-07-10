/**
 * Created by derek on 7/9/17.
 */
"use strict";
const https = require ('https');

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
			let body = "";
			
			response.on ('data', data => {
				body += data.toString ();
			});
			
			response.on ('end', () => {
				try {
					const profile = JSON.parse (body);
					printMessage (username, profile.badges.length, profile.points.JavaScript);
				} catch (error) {
					console.error(error.message);
				}
			});
		});
		request.on ('error', error => console.error (`Problem with request: ${error.message}`));
		// use 'catch' at the end of the nested 'try' code block to capture error and then console log via error method
	} catch (error) {
		console.error (error.message);
	}
}
//const users = ["dcneuts", "chalkers", "davemcfarland"];
const users = process.argv.slice (2);
users.forEach (getProfile);
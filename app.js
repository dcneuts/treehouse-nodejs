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


function getProfile (username) {
//Connect to the Treehouse API
	const request = https.get (`https://teamtreehouse.com/${username}.json`, response => {
		let body = "";
		
		response.on ('data', data => {
			body += data.toString ();
		});
		
		response.on ('end', () => {
			const profile = JSON.parse (body);
			printMessage (username, profile.badges.length, profile.points.JavaScript);
		});
	});
	
}

//const users = ["dcneuts", "chalkers", "davemcfarland"];
const users = process.argv.slice(2);
users.forEach(getProfile);
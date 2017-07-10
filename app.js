/**
 * Created by derek on 7/9/17.
 */
"use strict";
const https = require('https');

//Establishing global constant for username to be pulled via API
const username = "dcneuts";

//Print message to console
function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}

//Connect to the Treehouse API
const request = https.get(`https://teamtreehouse.com/dcneuts.json`, response => {
	let body = "";
	
	response.on('data', data => {
		body += data.toString();
	});
	
	response.on('end', () => {
		const profile = JSON.parse(body);
		printMessage(username, profile.badges.length, profile.points.JavaScript);
	});
});
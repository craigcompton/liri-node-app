require('dotenv').config();
var inquirer = require("inquirer");
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var rp = require('request-promise');
var task = process.argv[2];
var queryText = process.argv[3];
var keys = require("./keys.js");

// moment().format();
// console.log("What type of search do you want to do?");
inquirer.prompt([
	{
		name: "searchType",
		type: "list",
		message: "What type of search do you want to do?",
		choices: ["Search for a concert date on Bands in Town?", "Search for a song on Spotify?", "Search for information about a movie on OMDB?", "Or, do you want to 'do what it says?'"]
	}
]).then(function (inquirerResponse) {
	var input = inquirerResponse.searchType
	if (input === "Search for a concert date on Bands in Town?" || input === "Search for a song on Spotify" || input === "Search for information about a movie on OMDB?" || input === "Or, do you want to 'do what it says?'") {
		inquirer.prompt([
			{
				type: "input",
				message: "What would you like to search for?",
				name: "search"
			},
		]).then(function (data) {
			if (input === "Search for a concert date on Bands in Town?") {
				var concertSearch = new concertFunction();
				concertSearch.findConcert(data.search);
			}
			else if (input === "Search for a song on Spotify") {
				// var newActor = new TV();
				// newActor.findActor(data.search);
			}
			else if (input === "Search for information about a movie on OMDB?") {
				// var newActor = new TV();
				// newActor.findActor(data.search);
			}
			else (input === "Or, do you want to 'do what it says?'"); {
				// var newActor = new TV();
				// newActor.findActor(data.search);
			}
		})
	}
});

// Function for Bands In Town - concert API
var concertFunction = function () {
	this.findConcert = function (concert) {
		var queryURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
		request(queryURL, function (error, response, body) {
			var data = JSON.parse(body);
			console.log('\n' + queryText + " will be playing at the " + response.venue + " in " + response.venue.city + " at " + moment(response.datetime).format("dddd, MMMM Do YYYY, h:mm a"));
		}
		)
	}
};


// Function for Node-Spotify-API
var spotifyFunction = function (queryText) {

	var spotify = new Spotify(keys.spotifyKeys);
	if (!queryText) {
		queryText = 'The Sign';
	}
	spotify.search({ type: 'track', query: queryText }, function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}

		var songInfo = data.tracks.items;
		console.log("\nArtist: " + songInfo[0].artists[0].name);
		console.log("\nSong's Name: " + songInfo[0].name);
		console.log("\nPreview Link fromSpotify: " + songInfo[0].preview_url);
		console.log("\nAlbum that the song is from: " + songInfo[0].album.name);
	})
};

// 
var movieFunction = function (queryText) {

};

var whatFunction = function (queryText) {

};


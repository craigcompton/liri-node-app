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



// queryText = "i write sins not tragedies";

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (task) {
	case "concert-this":
	concertFunction(queryText);
	break;

	case "spotify-this-song":
	spotifyFunction(queryText);
	break;

	case "movie-this":
	movieFunction(queryText);
	break;

	case "do-what-it-says":
	whatFunction();
	break;
};

// Function for Bands In Town - concert API
var concertFunction = function (queryText) {
    var queryURL = "https://rest.bandsintown.com/artists/" + queryText + "/events?app_id=codingbootcamp";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log('\n' + queryText + " will be playing at the " + response.venue + " in " + response.venue.city + " at " + moment(response.datetime).format("dddd, MMMM Do YYYY, h:mm a"));
    });
};

// Function for Node-Spotify-API
var spotifyFunction = function(queryText) {

	var spotify = new Spotify(keys.spotifyKeys);
		if (!queryText){
        	queryText = 'The Sign';
    	}
		spotify.search({ type: 'track', query: queryText }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("\nArtist: " + songInfo[0].artists[0].name);
	        console.log("\nSong's Name: " + songInfo[0].name);
	        console.log("\nPreview Link fromSpotify: " + songInfo[0].preview_url);
	        console.log("\nAlbum that the song is from: " + songInfo[0].album.name);
	});
}

// 
var movieFunction = function (queryText) {

};

var whatFunction = function (queryText) {

};

// ----------------------------------
// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

// ----------------------------------------------
// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and my-tweets
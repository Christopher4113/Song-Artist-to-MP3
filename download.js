const express = require("express");
const fetch = require("node-fetch");
const https = require('https');
require("dotenv").config();

// create the express server
const app = express();

// server PORT Number
const PORT = process.env.PORT || 3000;

// set Template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// required to PARSE HTML request for POST request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});


function searchSong(searchKeyword, callback) {
    try {
        // Append "audio" to the search keyword
        const searchQuery = `${searchKeyword} audio`; //add the word audio to the inputted search so that it can find an audio version of the video
        const encodedSearchKeyword = encodeURIComponent(searchQuery);
        const url = `https://www.youtube.com/results?search_query=${encodedSearchKeyword}`;

        https.get(url, (response) => {
            let data = '';

            // A chunk of data has been received.
            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received.
            response.on('end', () => {
                const videoIds = data.match(/watch\?v=(\S{11})/g);

                if (videoIds && videoIds.length > 0) {
                    const videoId = videoIds[0].substring(8); //return the video ID
                    callback(null, videoId);
                } else {
                    callback(null, "No videos found for the given keyword.");
                }
            });

        }).on("error", (err) => {
            callback(`An error occurred: ${err.message}`);
        });
    } catch (err) {
        callback(`An error occurred: ${err.message}`);
    }
}
//utilize the convert-mp3 function to convert the searched song to an mp3 file by taking the videoId
app.post("/convert-mp3", (req, res) => {
    const { songName, artistName } = req.body;
    if (!songName || !artistName) {
        return res.render("index", { success: false, message: "Please enter both song name and artist name" });
    } else {
        const searchKeyword = `${songName} ${artistName}`;
        searchSong(searchKeyword, async (error, videoId) => { //error block to check if there was an error
            if (error) {
                return res.render("index", { success: false, message: error });
            }

            try {
                const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, { //api key where the youtube-mp3 api will be called to download the videoID
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": process.env.API_KEY,
                        "x-rapidapi-host": process.env.API_HOST
                    }
                });

                const fetchResponse = await fetchAPI.json();

                if (fetchResponse.status === "ok") { //try catch block to confirm for th user that the video can be download and will be downloaded
                    return res.render("index", { 
                        success: true,
                        song_title: fetchResponse.title,
                        song_link: fetchResponse.link
                    });
                } else {
                    return res.render("index", { success: false, message: fetchResponse.msg });
                }
            } catch (error) {
                return res.render("index", { success: false, message: "An error occurred. Please try again later." });
            }
        });
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

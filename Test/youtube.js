//testing to see if the searchSong function can work


const https = require('https');

function searchSong(searchKeyword, callback) {
    try {
        const encodedSearchKeyword = encodeURIComponent(searchKeyword);
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
                    const song = `${videoIds[0].substring(8)}`;
                    callback(null, song);
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
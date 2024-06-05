# Song and Artist 2 MP3 Downloader

This application allows users to input a song title or artist into a text box and converts the corresponding YouTube video into an MP3 file for download. The application leverages the `youtube-mp3` API from RapidAPI to perform the conversion.

## Features

- Search for songs or artists on YouTube.
- Convert those YouTube videos to MP3 format.
- Download the MP3 files directly from the web application.

## Prerequisites

- Node.js installed on your system.
- RapidAPI account to obtain the `youtube-mp3` API key.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Christopher4113/Song-Artist-to-MP3.git
    cd Song-Artist-to-MP3
    or run the code on download.js
    ```

2. **Install the required dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your RapidAPI key:

    ```plaintext
    RAPIDAPI_KEY=your_rapidapi_key_here
    ```

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

2. **Open your browser and navigate to:**

    ```
    http://localhost:3000
    ```

3. **Input the song title or artist in the provided text box and submit the form.**

4. **Wait for the conversion process to complete and download the MP3 file.**

## Code Explanation

### Server Setup

The server is set up using Express to handle incoming requests and serve the frontend. Node-fetch is used to connect the backend to the frontend, making it easy to handle API requests. HTTPS is used to securely search for YouTube videos.

### Dependencies

- **express**: To set up the server and handle routing.
- **node-fetch**: To make API requests to RapidAPI.
- **ejs**: To render the frontend views.
- **https**: To handle secure HTTP requests.

### File Structure

```plaintext
youtube-mp3-downloader/
├── public/
│   ├── css/
│   │   └── styles.css
├── views/
│   ├── index.ejs
├── .env
├── download.js
├── package.json
└── README.md

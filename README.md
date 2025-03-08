# Medplay-UI-v2

Medplay is an ad-free modern music player built using Flask for the backend and HTML, CSS, and JavaScript for the frontend. This application allows users to search for songs, play music, manage playlists, and download songs.

## Features

- **Search Functionality**: Search for songs using the search bar. The search results are fetched from an external API.
- **Music Playback**: Play songs directly within the application with controls for play/pause, volume adjustment, and progress tracking.
- **Favourites**: Mark songs as favourites and access them easily from a dedicated section.
- **Queue**: Manage a dynamic queue where songs can be added, removed, and rearranged.
- **Theming**: Support for multiple themes.
- **Download Songs**: Download songs in MP3 format with metadata.
- **Responsive Design**: Works well on different screen sizes.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/gowtham-2321/Medplay-UI-v2.git
    cd Medplay-UI-v2
    ```

2. **Create a virtual environment**:
    ```sh
    python -m venv venv
    ```

3. **Activate the virtual environment**:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

4. **Install the dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

5. **Run the application**:
    ```sh
    python app.py
    ```

6. **Open your browser and navigate to**:
    ```
    http://127.0.0.1:5000
    ```

## Usage

- **Search for Songs**: Use the search bar to search for songs. Press Enter or click the search icon to fetch results.
- **Play Songs**: Click on a song card to play the song. Use the player controls at the bottom to play/pause, adjust volume, and seek.
- **Favourites**: Like the songs using the heart button and access them easily from a favourites section in the menu.
- **Queue**: Add songs to the queue using the plus icon and access them from the queue section in the menu
- **Change Themes**: Select different themes from the themes menu.
- **Download Songs**: Click the download icon on a song card to download the song in MP3 format.

## Contributing

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```sh
    git commit -m 'Add some feature'
    ```
5. **Push to the branch**:
    ```sh
    git push origin feature/your-feature-name
    ```
6. **Open a pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [JioSaavn API](https://api-medplay.vercel.app/) - cloned from [sumitkolhe/jiosaavn-api](https://github.com/sumitkolhe/jiosaavn-api)
- [Flask](https://flask.palletsprojects.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [FFmpeg](https://ffmpeg.org/)
- [ID3 Writer](https://github.com/egoroof/browser-id3-writer)

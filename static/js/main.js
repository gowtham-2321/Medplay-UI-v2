//gowhthiee variii
let albums = [];
let songs = [];
const songList = document.getElementById("songlist");
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
let noOfSongs = 0;
let duration = 0;
let song_selected = true;
let artist_selected = false;
let album_selected = false;
let currentSong = null;
let isRepeat = false;
let song_class = document.getElementById("class-song");
let artist_class = document.getElementById("class-artist");
let album_class = document.getElementById("class-album");
let update_line = document.getElementById("class-line-change");
let song_list = document.getElementById("songlist");
let artist_list = document.getElementById("artistlist");
let album_list = document.getElementById("albumlist");
let artist_page = document.getElementById("artist-page");
let album_page = document.getElementById("album-page");
let classification = document.getElementById("classification");
let list_holder = document.getElementById("list-holder");
let artist_song_page_back= document.getElementById("artist-song-page-back");
let album_song_page_back= document.getElementById("album-song-page-back");
let repeat_icon = document.getElementById("repeat-icon");
let feed = document.getElementById("feed");
let queue = document.getElementById("queue");
let fav = document.getElementById("favourites");
let themes = document.getElementById("themes");
let feed_btn = document.getElementById("feed-btn");
let song_count = document.getElementById("song-count");
let minute_count = document.getElementById("minute-count");


//jeevan variii
let songPageNo = 1;
let albumPageNo = 1;
let q= "love";

function songPage() {
    song_list.style.display = "block"; 
    setTimeout(() => {
        song_list.style.opacity = "1";
    }, 300);


    artist_list.style.opacity = "0"; 
    setTimeout(() => {
        artist_list.style.display = "none";
    }, 300);

    album_list.style.opacity = "0"; 
    setTimeout(() => {
        album_list.style.display = "none";
    }, 300);

    update_line.style.transform = "translateX(0px)";
    song_class.classList.add("active-class");
    artist_class.classList.remove("active-class");
    album_class.classList.remove("active-class");
}
function artistPage() {
    artist_list.style.display = "grid"; 
    setTimeout(() => {
        artist_list.style.opacity = "1";
    }, 300);


    song_list.style.opacity = "0"; 
    setTimeout(() => {
        song_list.style.display = "none";
    }, 300);

    album_list.style.opacity = "0"; 
    setTimeout(() => {
        album_list.style.display = "none";
    }, 300);

    update_line.style.transform = "translateX(100px)";
    song_class.classList.remove("active-class");
    artist_class.classList.add("active-class");
    album_class.classList.remove("active-class");
}
function albumPage() {
    album_list.style.display = "grid"; 
    setTimeout(() => {
        album_list.style.opacity = "1";
    }, 300);


    song_list.style.opacity = "0"; 
    setTimeout(() => {
        song_list.style.display = "none";
    }, 300);

    artist_list.style.opacity = "0"; 
    setTimeout(() => {
        artist_list.style.display = "none";
    }, 300);

    update_line.style.transform = "translateX(200px)";
    song_class.classList.remove("active-class");
    artist_class.classList.remove("active-class");
    album_class.classList.add("active-class");
}

function artistSongPage() {
    artist_page.style.display = "block";
    setTimeout(() => {
        artist_page.style.opacity = "1";
    }, 300);

    artist_list.style.opacity = "0"; 
    setTimeout(() => {
        artist_list.style.display = "none";
    }, 300);

    classification.style.opacity = "0"; 
    setTimeout(() => {
        classification.style.display = "none";
    }, 300);

    list_holder.style.opacity = "0"; 
    setTimeout(() => {
        list_holder.style.display = "none";
    }, 300);

}

function albumSongPage() {
    album_page.style.display = "block";
    setTimeout(() => {
        album_page.style.opacity = "1";
    }, 300);

    album_list.style.opacity = "0"; 
    setTimeout(() => {
        album_list.style.display = "none";
    }, 300);

    classification.style.opacity = "0"; 
    setTimeout(() => {
        classification.style.display = "none";
    }, 300);

    list_holder.style.opacity = "0"; 
    setTimeout(() => {
        list_holder.style.display = "none";
    }, 300);

}

function artistSongPageBack() {
    
    artist_list.style.display = "grid"; 
    setTimeout(() => {
        artist_list.style.opacity = "1";
    }, 300);
     
    classification.style.display = "block";
    setTimeout(() => {
        classification.style.opacity = "1";
    }, 300);

    list_holder.style.display = "block";
    setTimeout(() => {
        list_holder.style.opacity = "1";
    }, 300);

    artist_page.style.opacity = "0"; 
    setTimeout(() => {
        artist_page.style.display = "none";
    }, 300);
}

function albumSongPageBack() {
    
    album_list.style.display = "grid"; 
    setTimeout(() => {
        album_list.style.opacity = "1";
    }, 300);
     
    classification.style.display = "block";
    setTimeout(() => {
        classification.style.opacity = "1";
    }, 300);

    list_holder.style.display = "block";
    setTimeout(() => {
        list_holder.style.opacity = "1";
    }, 300);

    album_page.style.opacity = "0"; 
    setTimeout(() => {
        album_page.style.display = "none";
    }, 300);
}

var menu_btns = document.querySelectorAll('.menu-btn');
menu_btns.forEach(menu_btn => {
    menu_btn.addEventListener('click', () => {
        menu_btns.forEach(s => s.classList.remove('menu-btn-selected'));
        menu_btn.classList.add('menu-btn-selected');
    });
});

var inpField = document.getElementById("search-query");
inpField.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("Enter pressed");
        displayFeed();
        searchSongs(true);
        searchAlbums(true);
        
    }
});
    
async function searchSongs(isNew, q) {

    const query = document.getElementById("search-query").value || q;
    songList.innerHTML =``;
    
    //console.log(isNew);
    try {
        if (!isNew) {
            songPageNo= songPageNo + 1;
        }
        else {
            songPageNo = 1;
        }
        const response = await fetch(`/search/songs?query=${query}&limit=24&page=${songPageNo}`);
        const data = await response.json();
        songs = data;
        console.log(songs);

        
        if (songs.length === 0) {
            throw new Error("No songs found");
        }
        
        for (let i = 0; i < 25 && i < songs.length; i++) {
            createSongCard(songs[i], songList);
        }
    } catch (error) {
        console.error("Error fetching songs", error);
        songList.innerHTML = "<p>No songs found</p>";
    }

    var song_cards = document.querySelectorAll('.song-card');
    song_cards.forEach(song_card => {
        let play_icon = song_card.querySelector(".fa-play");
        play_icon.addEventListener('click', () => {
            song_cards.forEach(s => s.classList.remove('song-card-selected'));
            song_card.classList.add('song-card-selected');
        });
    });
}

async function searchAlbums(isNew, q) {
    const query = document.getElementById("search-query").value || q;
    album_list.innerHTML =``;

    try {
        if (!isNew) {
            albumPageNo= albumPageNo + 1;
        }
        else {
            albumPageNo = 1;
        }
        const response = await fetch(`/search/albums?q=${query}&limit=10&page=${albumPageNo}`);
        const data = await response.json();
        albums = data;
        console.log(albums);

        if (albums.length === 0) {
            throw new Error("No albums found");
        }

        for (let i = 0; i < 10 && i < albums.length; i++) {
            createAlbumCard(albums[i], album_list);
        }

    }   catch (error) {
        console.error("Error fetching albums", error);
        album_list.innerHTML = "<p>No albums found</p>";
    }
}

function createAlbumCard(album, albumList) {
    const thsAlbum = document.createElement("div");
    thsAlbum.classList.add("album-card");
    const imageUrl = `/image/?url=${encodeURIComponent(album.image[1].url || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    //name slicing
    let new_name = album.name;
    if (new_name.length > 45) {
        new_name = new_name.slice(0,45)+"...";
    }
    //slicing end
    thsAlbum.innerHTML = `
            <img class="album-img" src="${imageUrl}" alt="">
            <span class="album-name">${new_name ||"Unkown Album"}</span>
            
    `;
    thsAlbum.addEventListener('click', () => {
        albumSongPage(album.id);
    });
    albumList.appendChild(thsAlbum);
}

function getAlbumSongs(albumSongs, albumId, limit) {
    fetch(`/albums/songs?id=${albumId}&limit=${limit}`).then(response => response.json()).then(data => {
        data = data;
        console.log(data);

        albumSongs.innerHTML = "";
        data.forEach(song => {
            const songCard = document.createElement("div");
            songCard.classList.add("album-song-card");
            const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].url || `{{ url_for('static', filename="img/plc.png")}}`)}`;
            //name slicing
            let new_name = song.name;
            let new_art_name = song.artists.primary[0].name;
            let new_duration = formatTime(song.duration);
            if (new_name.length > 45) {
                new_name = new_name.slice(0,45)+"...";
            }
            if (new_art_name.length > 35) {
                new_art_name = new_art_name.slice(0,35)+"...";
            }
            
            songCard.innerHTML = `
                <div class="album-song-card">
                    <img class="album-song-card-art" src="${imageUrl}")}}" alt="">
                    <span class="album-song-card-song-name">${new_name}</span>
                    <span class="album-song-card-artist-name">${new_art_name}</span>
                    <span class="album-song-card-timestamp">${new_duration}</span>
                    <div class="album-song-card-icons">
                      <i class="fa-regular fa-heart"></i>
                      <i class="fa-solid fa-play"></i>
                      <i class="fa-solid fa-download"></i>
                      <i class="fa-solid fa-plus"></i>
                    </div>
                  </div>
            `;
            const play= songCard.querySelector(".fa-play");
            play.onclick = () => {
                playmySong(song);
            }

            const down = songCard.querySelector(".fa-download");
            down.onclick = () => {
                downloadSong(song);
            }
            const queueButton = songCard.querySelector(".fa-plus");
            queueButton.onclick = () => addToQueue(song);
            
            /* favourites checker */
            const heartButton = songCard.querySelector(".fa-heart");
            favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
            let isPresentFav = favourites.some(item => item.id === song.id);
            if(isPresentFav){
                heartButton.classList.replace("fa-regular", "fa-solid");
            }
            heartButton.onclick = () => {
                let heartClassList = Array.from(heartButton.classList);
                isLiked = heartClassList.some(className => className === "fa-solid");
                if(isLiked){
                    favourites = favourites.filter(item => item.id !== song.id);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    heartButton.classList.replace("fa-solid", "fa-regular");
                    console.log(favourites);
                }
                else {
                    heartButton.classList.replace("fa-regular", "fa-solid");
                    favourites.push(song);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    console.log(favourites);
                }
                updateQueueDisplay();
                playerHeart();
                getFavourites();
                songList.innerHTML = "";
                for (let i = 0; i < 25 && i < songs.length; i++) {
                    createSongCard(songs[i], songList);
                }           
            }
            /*favourites checker ends*/
            albumSongs.appendChild(songCard);
        });
    });    
}


function createSongCard(song, songList) {
    const card = document.createElement("div");
    card.classList.add("song-card");
    const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].url || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    //name slicing
    let new_name = song.name;
    let new_art_name = song.artists.primary[0].name;
    
    let new_album_name = song.album.name;
    let new_duration = formatTime(song.duration);
    if (new_name.length > 45) {
        new_name = new_name.slice(0,45)+"...";
    }
    if (new_art_name.length > 35) {
        new_art_name = new_art_name.slice(0,35)+"...";
    }
    if (new_album_name.length > 35) {
        new_album_name = new_art_name.slice(0,35)+"...";
    }
    //slicing end
    card.innerHTML = `
            <img class="song-card-art" src="${imageUrl}" alt="">
            <span class="song-card-song-name">${new_name ||"Unkown Song"}</span>
            <span class="song-card-artist-name">${new_art_name ||"Unkown Artist"}</span>
            <span class="song-card-album-name">${new_album_name || "Unkown Album"}</span>
            <span class="song-card-timestamp">${new_duration || "00:00"}</span>
            <div class="song-card-icons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-play"></i>
                <i class="fa-solid fa-download"></i>
                <i class="fa-solid fa-plus"></i>
            </div>
    `;
    
    const play= card.querySelector(".fa-play");
    play.onclick = () => playmySong(song);

    const down = card.querySelector(".fa-download");
    down.onclick = () => {
        downloadSong(song);
    }
    const queueButton = card.querySelector(".fa-plus");
    queueButton.onclick = () => addToQueue(song);
    
    /* favourites checker */
    const heartButton = card.querySelector(".fa-heart");
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
    let isPresentFav = favourites.some(item => item.id === song.id);
    if(isPresentFav){
        heartButton.classList.replace("fa-regular", "fa-solid");
    }
    heartButton.onclick = () => {
        let heartClassList = Array.from(heartButton.classList);
        isLiked = heartClassList.some(className => className === "fa-solid");
        if(isLiked){
            favourites = favourites.filter(item => item.id !== song.id);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            heartButton.classList.replace("fa-solid", "fa-regular");
            console.log(favourites);
        }
        else {
            heartButton.classList.replace("fa-regular", "fa-solid");
            favourites.push(song);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            console.log(favourites);
        }
        updateQueueDisplay();
        playerHeart();
        getFavourites();
    }
    /*favourites checker ends*/

    songList.appendChild(card);
}

function playmySong(song) {
    currentSong = song;
    const player = document.getElementById("audio-player");
    const nowPlaying = document.getElementById("player-song-name");
    const nowArtist = document.getElementById("player-artist-name");
    const albumArt = document.getElementById("player-album-art");
    const playerDownloadIcon = document.getElementById("player-download-icon")
    let icon = document.getElementById("play-icon");
    icon.classList.replace("fa-play", "fa-pause");
    const artLink = `/image/?url=${encodeURIComponent(song.image[1].url || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    let URL = song.downloadUrl.find(link => link.quality === '320kbps').url || song.downloadUrl[0];
    albumArt.src = artLink;
    //console.log(URL);
    const downloadUrl = `/stream/?url=${encodeURIComponent(URL)}`;
    //console.log(downloadUrl);
    player.src = downloadUrl || "";
    player.play();
    // name slicing
    let new_name = song.name;
    let new_art_name = song.artists.primary[0].name;
    if (new_name.length > 21) {
        new_name = new_name.slice(0,18)+"...";
    }
    if (new_art_name.length > 25) {
        new_art_name = new_art_name.slice(0,25)+"...";
    }
    //slicing end
    nowPlaying.textContent = `${new_name || "Unknown Song"}`;
    nowArtist.textContent = `${new_art_name || "Unknown Artist"}`;

    playerDownloadIcon.onclick = () => downloadSong(song);
    playerHeart();

    let heartt = document.getElementById("player-heart");
    heartt.addEventListener("click", () => {
        let hearttClassList = Array.from(heartt.classList);
        isLiked = hearttClassList.some(className => className === "fa-solid");
        if(isLiked){
            favourites = favourites.filter(item => item.id !== song.id);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            heartt.classList.replace("fa-solid", "fa-regular");
            playerHeart();
        }
        else{
            heartt.classList.replace('fa-regular', 'fa-solid');
            favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
            isPresentFavCheck = favourites.some(item => item.id === song.id);
            if (!isPresentFavCheck)
            {
                favourites.push(song);
                localStorage.setItem("favourites", JSON.stringify(favourites));
            }
            console.log(song);
            console.log(favourites);
        }
        songList.innerHTML = "";
        for (let i = 0; i < 25 && i < songs.length; i++) {
            createSongCard(songs[i], songList);
        }
        updateQueueDisplay();
        getFavourites();
        
    })
}


function playerHeart() {
    if (currentSong === null){
        return;
    }
    console.log("currently playing" + currentSong.name);
    console.log(currentSong);
    let heartt = document.getElementById("player-heart");
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
    let isPresentFav = favourites.some(item => item.id === currentSong.id);
    if(isPresentFav){
        heartt.classList.replace('fa-regular', 'fa-solid');
    }
    else{
        heartt.classList.replace('fa-solid', 'fa-regular');
    }
}

//progress tracking
const progressTrackerHolder = document.querySelector('.progress-tracker-holder');
const progressTracker = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const progressCircle = document.getElementById('progress-circle');
const player = document.getElementById('audio-player');

let isDragging = false;

progressCircle.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onStopDrag);
});

progressTrackerHolder.addEventListener('click', (e) => {
    const rect = progressTracker.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    player.currentTime = percentage * player.duration;
});

function onDrag(e) {
    if (!isDragging) return;
    const rect = progressTracker.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max(offsetX / width, 0), 1);
    player.currentTime = percentage * player.duration;
    updateProgress();
}

function onStopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onStopDrag);
}

function updateProgress() {
    const progressPercent = (player.currentTime / player.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    progressCircle.style.left = `${progressPercent}%`;
    document.getElementById('current-time').textContent = formatTime(player.currentTime);
}

function updateDuration() {
    const player = document.getElementById("audio-player");
    const duration = document.getElementById("duration");
    duration.textContent = formatTime(player.duration);
}

function seek(event) {
    const player = document.getElementById("audio-player");
    const progressBar = document.querySelector(".progress-bar");
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const seekTime = (offsetX / width) * player.duration;
    player.currentTime = seekTime;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function playPause() {
    const audioPlayer = document.getElementById("audio-player");
    console.log("didoce");
    let icon = document.getElementById("play-icon");
    if (icon.classList.contains("fa-play")) {
        icon.classList.replace("fa-play", "fa-pause");
        audioPlayer.play();
    } else {
        icon.classList.replace("fa-pause", "fa-play");
        audioPlayer.pause();
    }
}

// Volume adjustment and seeking
document.addEventListener('DOMContentLoaded', () => {
    searchSongs(true, "english");
    const audioPlayer = document.getElementById('audio-player');
    const audioBar = document.querySelector('.audio-bar');
    const audioUpdateBar = document.querySelector('.audio-update-bar');
    const audioProgressCircle = document.querySelector('.audio-progress-circle');

    audioBar.addEventListener('click', (event) => {
        const rect = audioBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const width = rect.width;
        const volume = offsetX / width;
        audioPlayer.volume = volume;
        updateAudioBar(volume);
    });

    audioBar.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        audioPlayer.volume = Math.min(Math.max(audioPlayer.volume - delta * 0.05, 0), 1);
        //console.log(audioPlayer.volume);
        updateAudioBar(audioPlayer.volume);
    });

    audioProgressCircle.addEventListener('mousedown', (event) => {
        event.preventDefault();
        document.addEventListener('mousemove', onDragVolume);
        document.addEventListener('mouseup', onStopDragVolume);
    });

    function onDragVolume(event) {
        const barWidth = audioBar.clientWidth;
        const rect = audioBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const volume = Math.min(Math.max(offsetX / barWidth, 0), 1);
        audioPlayer.volume = volume;
        updateAudioBar(volume);
    }

    function onStopDragVolume() {
        document.removeEventListener('mousemove', onDragVolume);
        document.removeEventListener('mouseup', onStopDragVolume);
    }

    function updateAudioBar(volume) {
        const barWidth = audioBar.clientWidth - 6;
        const updateWidth = volume * barWidth;
        audioUpdateBar.style.width = `${updateWidth}px`;
        audioProgressCircle.style.left = `${updateWidth}px`;
    }

    // Initialize the audio bar with the current volume
    updateAudioBar(audioPlayer.volume);
});

document.addEventListener('keydown', function(event) {
    if (event.code === "Space" && !event.target.matches("input, textarea")) {
        event.preventDefault();
        playPause();
    }
});

let audioPlayerEvent = document.getElementById("audio-player");

audioPlayerEvent.onplay = () => {
    const playBtn = document.getElementById("play-icon");
    playBtn.classList.replace("fa-play", "fa-pause");
};

audioPlayerEvent.onpause = () => {
    const playBtn = document.getElementById("play-icon");
    playBtn.classList.replace("fa-pause", "fa-play");
};

audioPlayerEvent.onended = () => {
    if(isRepeat){
       playmySong(currentSong);
    }
    else {
        playNextInQueue();
    }
};

function repeatSong() {
    if(isRepeat) {
        repeat_icon.classList.remove("repeat-active");
        isRepeat = false;
    }
    else {
        repeat_icon.classList.add("repeat-active");
        isRepeat = true;
    }
}


//downloaderss
async function fetchAsArrayBuffer(url) {
    const response = await fetch(url);
    return response.arrayBuffer();
}

async function convertMp4ToMp3(mp4Url, imageUrl, artist, title, album, year, genre) {
    const { createFFmpeg, fetchFile } = await import("https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.5/+esm");
    const { default: ID3Writer } = await import("https://cdn.jsdelivr.net/npm/browser-id3-writer@4.0.0/+esm");

    const ffmpeg = createFFmpeg({ log: true });

    try {
        if (!mp4Url || !imageUrl) {
            alert("Metadata is missing MP4 or Image URLs!");
            return;
        }

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        const mp4Buffer = await fetchAsArrayBuffer(mp4Url);
        const imageBuffer = await fetchAsArrayBuffer(imageUrl);

        ffmpeg.FS("writeFile", "input.mp4", new Uint8Array(mp4Buffer));
        await ffmpeg.run("-i", "input.mp4", "-vn", "-b:a", "192k", "output.mp3");

        const mp3Data = ffmpeg.FS("readFile", "output.mp3");

        const writer = new ID3Writer(mp3Data);
        writer.setFrame("TPE1", artist)
              .setFrame("TIT2", title)
              .setFrame("TALB", album)
              .setFrame("TYER", year)
              .setFrame("TCON", genre)
              .setFrame("APIC", { type: 3, data: new Uint8Array(imageBuffer), description: "Cover" });
        writer.addTag();

        const mp3Blob = new Blob([writer.arrayBuffer], { type: "audio/mp3" });
        const mp3Url = URL.createObjectURL(mp3Blob);

        const link = document.createElement("a");
        link.href = mp3Url;
        link.download = `${title || "Unknown_Song"}.mp3`;
        link.click();

    } catch (error) {
        console.error("Error processing files:", error);
        alert("Conversion failed! Check the URLs.");
    }
}

async function downloadSong(song) {
    // name slicing
    let new_name = song.name;
    if (new_name.length > 16) {
        new_name = new_name.slice(0, 16);
    }
    // slicing end
    //showNotif(song.image[2].link, new_name);
    const downloadUrl = song.downloadUrl.find(link => link.quality === '320kbps').url || song.downloadUrl[0];
    const filename = `${song.name || "Unknown_Song"}`;
    const imageUrl = song.image[2].url;
    let artist= [];
    song.artists.primary.forEach(a => {
        artist.push(a.name)
    });
    const title = song.name;
    const album = song.album.name;
    const year = song.year;
    const genre = Array.isArray(song.genre) ? song.genre : [song.genre];

    console.log(downloadUrl);
    console.log(filename);

    await convertMp4ToMp3(downloadUrl, imageUrl, artist, title, album, year, genre);
}

function displayFeed() {

    var menu_btns = document.querySelectorAll('.menu-btn');
        menu_btns.forEach(menu_btn => {
            menu_btn.classList.remove('menu-btn-selected');
            feed_btn.classList.add('menu-btn-selected');
        });

    feed.style.display = "block"; 
    setTimeout(() => {
        feed.style.opacity = "1";
    }, 300);

    queue.style.opacity = "0"; 
    setTimeout(() => {
        queue.style.display = "none";
    }, 300);

    themes.style.opacity = "0"; 
    setTimeout(() => {
        themes.style.display = "none";
    }, 300);

    fav.style.opacity = "0"; 
    setTimeout(() => {
        fav.style.display = "none";
    }, 300);
}

function displayQueue() {

    queue.style.display = "block"; 
    setTimeout(() => {
        queue.style.opacity = "1";
    }, 300);

    feed.style.opacity = "0"; 
    setTimeout(() => {
        feed.style.display = "none";
    }, 300);

    themes.style.opacity = "0"; 
    setTimeout(() => {
        themes.style.display = "none";
    }, 300);

    fav.style.opacity = "0"; 
    setTimeout(() => {
        fav.style.display = "none";
    }, 300);
    
}

function displayThemes() {
    themes.style.display = "grid"; 
    setTimeout(() => {
        themes.style.opacity = "1";
    }, 300);

    feed.style.opacity = "0"; 
    setTimeout(() => {
        feed.style.display = "none";
    }, 300);

    queue.style.opacity = "0"; 
    setTimeout(() => {
        queue.style.display = "none";
    }, 300);

    fav.style.opacity = "0"; 
    setTimeout(() => {
        fav.style.display = "none";
    }, 300);
}

function displayFavourites() {
    fav.style.display = "block"; 
    setTimeout(() => {
        fav.style.opacity = "1";
    }, 300);

    feed.style.opacity = "0"; 
    setTimeout(() => {
        feed.style.display = "none";
    }, 300);

    queue.style.opacity = "0"; 
    setTimeout(() => {
        queue.style.display = "none";
    }, 300);

    themes.style.opacity = "0"; 
    setTimeout(() => {
        themes.style.display = "none";
    }, 300);
}



let songQueue = [];

function songCountTime()
{
    noOfSongs = songQueue.length;
    duration = 0;
    if (noOfSongs === 0) {
        minute_count.innerHTML = "00:00";
    }
    else {
        songQueue.forEach(song => {
            duration = +duration + +song.duration;
        })
        console.log(duration);
        minute_count.innerHTML = formatTimeHours(duration);
    }
    song_count.innerHTML = `${noOfSongs}`;
}

function formatTimeHours(seconds) {
    const hoursQ = Math.floor(seconds / 3600);
    console.log(hoursQ);
    const minutesQ = Math.floor((seconds % 3600) / 60);
    const secsQ = Math.floor(seconds % 60);

    return `${hoursQ > 0 ? hoursQ + ':' : ''}${hoursQ > 0 ? String(minutesQ).padStart(2, '0') : minutesQ}:${String(secsQ).padStart(2, '0')}`;
}


function addToQueue(song) {
    songQueue.push(song);
    songCountTime();
    updateQueueDisplay();


}

function removeFromQueue(index) {
    songQueue.splice(index, 1);
    updateQueueDisplay();
    if (songQueue.length === 0) {
        let bla= document.getElementById("queue-list");
        bla.innerHTML = `<span>No songs in queue</span>`;
    }
    songCountTime();
}


function playNextInQueue() {
    if (songQueue.length > 0) {
        const nextSong = songQueue.shift();
        playmySong(nextSong);
        updateQueueDisplay();
        if (songQueue.length === 0) {
            let bla= document.getElementById("queue-list");
            bla.innerHTML = `<span>No songs in queue</span>`;
    
        }
    }
    songCountTime();
}

function updateQueueDisplay() {
    const queueContainer = document.getElementById("queue-list");
    queueContainer.innerHTML = "";
    songQueue.forEach((song, index) => {

        const queueItem = document.createElement("div");
        queueItem.classList.add("song-card");
        queueItem.classList.add("queue-Item");

        const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].url || `{{ url_for('static', filename="img/plc.png")}}`)}`;
        //name slicing
        let new_name = song.name;
        let new_art_name = song.artists.primary[0].name;
        let new_album_name = song.album.name;
        let new_duration = formatTime(song.duration);
        if (new_name.length > 45) {
            new_name = new_name.slice(0,45)+"...";
        }
        if (new_art_name.length > 35) {
            new_art_name = new_art_name.slice(0,35)+"...";
        }
        if (new_album_name.length > 35) {
            new_album_name = new_art_name.slice(0,35)+"...";
        }

        queueItem.innerHTML = `
            <img class="song-card-art" src="${imageUrl}" alt="">
            <span class="song-card-song-name">${new_name ||"Unkown Song"}</span>
            <span class="song-card-artist-name">${new_art_name ||"Unkown Artist"}</span>
            <span class="song-card-album-name">${new_album_name || "Unkown Album"}</span>
            <span class="song-card-timestamp">${new_duration || "00:00"}</span>
            <div class="song-card-icons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-play no-for-now"></i>
                <i class="fa-solid fa-download"></i>
                <i class="fa-solid fa-trash"></i>
            </div>

        `

        const play= queueItem.querySelector(".fa-play");
        play.onclick = () => playmySong(song);

        const down = queueItem.querySelector(".fa-download");
        down.onclick = () => {
            downloadSong(song);
        }
        const queueButton = queueItem.querySelector(".fa-trash");
        queueButton.onclick = () => removeFromQueue(index);

        const heartButton = queueItem.querySelector(".fa-heart");

        favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
        let isPresentFav = favourites.some(item => item.id === song.id);
        if(isPresentFav){
            heartButton.classList.replace("fa-regular", "fa-solid");
        }
        heartButton.onclick = () => {
            let heartClassList = Array.from(heartButton.classList);
            isLiked = heartClassList.some(className => className === "fa-solid");
            if(isLiked){
                favourites = favourites.filter(item => item.id !== song.id);
                localStorage.setItem("favourites", JSON.stringify(favourites));
                heartButton.classList.replace("fa-solid", "fa-regular");
                console.log(favourites);
            }
            else {
                heartButton.classList.replace("fa-regular", "fa-solid");
                favourites.push(song);
                localStorage.setItem("favourites", JSON.stringify(favourites));
                console.log(favourites);
            }
            songList.innerHTML = "";
            for (let i = 0; i < 25 && i < songs.length; i++) {
                createSongCard(songs[i], songList);
            }
            playerHeart();
            updateQueueDisplay();
            getFavourites();
            
        }

        queueItem.setAttribute("draggable", true);
        queueContainer.appendChild(queueItem);
    });
    songCountTime();
}
let favDuration = 0;
let songCountFav = 0;
function getFavourites(){    
    let minute_count_fav = document.getElementById("minute-count-fav");
    let song_count_fav = document.getElementById("song-count-fav");
    let favDuration = 0; 
    let songCountFav = 0;
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const favContainer = document.getElementById("fav-list");
    favContainer.innerHTML = "";
    if(favourites.length>0){
        favourites.forEach(song => {
            const favItem = document.createElement("div");
            favItem.classList.add("song-card");
            favItem.classList.add("fav-Item");

            favDuration = +favDuration + +song.duration;
            songCountFav = +songCountFav + +1;

            console.log(favDuration);
            const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].url || `{{ url_for('static', filename="img/plc.png")}}`)}`;
            //name slicing
            let new_name = song.name;
            let new_art_name = song.artists.primary[0].name;
            let new_album_name = song.album.name;
            let new_duration = formatTime(song.duration);
            if (new_name.length > 45) {
                new_name = new_name.slice(0,45)+"...";
            }
            if (new_art_name.length > 35) {
                new_art_name = new_art_name.slice(0,35)+"...";
            }
            if (new_album_name.length > 35) {
                new_album_name = new_art_name.slice(0,35)+"...";
            }

            favItem.innerHTML = `
                <img class="song-card-art" src="${imageUrl}" alt="">
                <span class="song-card-song-name">${new_name ||"Unkown Song"}</span>
                <span class="song-card-artist-name">${new_art_name ||"Unkown Artist"}</span>
                <span class="song-card-album-name">${new_album_name || "Unkown Album"}</span>
                <span class="song-card-timestamp">${new_duration || "00:00"}</span>
                <div class="song-card-icons">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-play no-for-now"></i>
                    <i class="fa-solid fa-download"></i>
                    <i class="fa-solid fa-plus"></i>
                </div>

            `
            const play= favItem.querySelector(".fa-play");
            play.onclick = () => playmySong(song);

            const down = favItem.querySelector(".fa-download");
            down.onclick = () => {
                downloadSong(song);
            }
            const favButton = favItem.querySelector(".fa-plus");
            favButton.onclick = () => addToQueue(song);            

            const heartButton = favItem.querySelector(".fa-heart");

            favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
            let isPresentFav = favourites.some(item => item.id === song.id);
            if(isPresentFav){
                heartButton.classList.replace("fa-regular", "fa-solid");
            }
            heartButton.onclick = () => {
                let heartClassList = Array.from(heartButton.classList);
                isLiked = heartClassList.some(className => className === "fa-solid");
                if(isLiked){
                    favourites = favourites.filter(item => item.id !== song.id);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    heartButton.classList.replace("fa-solid", "fa-regular");
                    console.log(favourites);
                    getFavourites();
                }
                else {
                    heartButton.classList.replace("fa-regular", "fa-solid");
                    favourites.push(song.id);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    console.log(favourites);
                }
                songList.innerHTML = "";
                for (let i = 0; i < 25 && i < songs.length; i++) {
                    createSongCard(songs[i], songList);
                }
                playerHeart();
                updateQueueDisplay();
                
            }
            favContainer.appendChild(favItem);
            
            
            minute_count_fav.innerHTML = formatTimeHours(favDuration);
            song_count_fav.innerHTML = songCountFav;
        
            
        });

    }           
    else{
        minute_count_fav.innerHTML = "00:00";
        song_count_fav.innerHTML = "0";
    }         
}


document.addEventListener("DOMContentLoaded", function() {
    const queueList = document.getElementById("queue-list");
    new Sortable(queueList, {
        animation: 150,
        onEnd: function(evt) {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            moveQueueItem(oldIndex, newIndex);
        }
    });
});

function moveQueueItem(oldIndex, newIndex) {
    if (newIndex >= songQueue.length) {
        let k = newIndex - songQueue.length + 1;
        while (k--) {
            songQueue.push(undefined);
        }
    }
    songQueue.splice(newIndex, 0, songQueue.splice(oldIndex, 1)[0]);
    updateQueueDisplay();
}


//themes

fetch(`/static/json/themes.json`)
            .then(response => response.json())
            .then(themes => {
                const themeList = document.getElementById("themes");
                themes.forEach(theme => {
                    const themeChoice = document.createElement("div");
                    themeChoice.classList.add("theme-choice");
                    themeChoice.style.background = theme.colors.secondaryBg;
                    
                    const themeName = document.createElement("span");
                    themeName.classList.add("theme-name");
                    themeName.textContent = theme.name;
                    themeName.style.color = theme.colors.primaryText;
                    
                    const secondaryTextColor = document.createElement("div");
                    secondaryTextColor.classList.add("theme-color");
                    secondaryTextColor.style.background = theme.colors.secondaryText;
                    
                    const accentColor = document.createElement("div");
                    accentColor.classList.add("theme-color");
                    accentColor.style.background = theme.colors.accent;
                    
                    const heartColor = document.createElement("div");
                    heartColor.classList.add("theme-color");
                    heartColor.style.background = theme.colors.heart;
                    
                    themeChoice.appendChild(themeName);
                    themeChoice.appendChild(secondaryTextColor);
                    themeChoice.appendChild(accentColor);
                    themeChoice.appendChild(heartColor);
                    
                    themeChoice.addEventListener("click", () => applyTheme(theme));
                    
                    themeList.appendChild(themeChoice);
                });

                const randomChoice = document.createElement("div");
                randomChoice.classList.add("theme-choice");
                randomChoice.style.background = "#333";
                
                const randomName = document.createElement("span");
                randomName.classList.add("theme-name");
                randomName.textContent = "Random Theme";
                randomName.style.color = "#fff";
                
                randomChoice.appendChild(randomName);
                randomChoice.addEventListener("click", () => {
                    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
                    applyTheme(randomTheme);
                });
                
                themeList.appendChild(randomChoice);

                /* complete random trial */

                // Add Completely Random Color Scheme Choice
                const randomColorChoice = document.createElement("div");
                randomColorChoice.classList.add("theme-choice");
                randomColorChoice.style.background = "#111";
                
                const randomColorName = document.createElement("span");
                randomColorName.classList.add("theme-name");
                randomColorName.textContent = "Random Colors";
                randomColorName.style.color = "#fff";
                
                randomColorChoice.appendChild(randomColorName);
                randomColorChoice.addEventListener("click", () => {
                    const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;
                    const newTheme = {
                        "name": "random",
                        "className": "completeRandom",
                        "colors": {
                            "primaryText": randomColor(),
                            "secondaryText": randomColor(),
                            "accent": randomColor(),
                            "primaryBg": randomColor(),
                            "secondaryBg": randomColor(),
                            "heart": randomColor()
                        }
                    };
                    applyTheme(newTheme);
                });
                
                themeList.appendChild(randomColorChoice);

                /* trial ends */

            });

function applyTheme(theme) {
    localStorage.setItem("class-name",`${theme.className}`);
    const root = document.documentElement;
    root.style.setProperty('--primary-text-color', theme.colors.primaryText);
    root.style.setProperty('--secondary-text-color', theme.colors.secondaryText);
    root.style.setProperty('--accent-color', theme.colors.accent);
    root.style.setProperty('--accent-color-dark', theme.colors.accentDark);
    root.style.setProperty('--primary-bg-color', theme.colors.primaryBg);
    root.style.setProperty('--secondary-bg-color', theme.colors.secondaryBg);
    root.style.setProperty('--heart', theme.colors.heart);
}

function retrieve() {
    let currentTheme = localStorage.getItem("class-name");
    fetch(`/static/json/themes.json`)
    .then(response => response.json())
    .then(themes => {
        let nameee = themes.find(temp => temp.className === currentTheme);
        applyTheme(nameee);
        });
}
document.onload = retrieve();
document.onload = getFavourites();


//equalizer
let isEqOpen = false;
let blurEq = document.getElementById("blur");
let eqHolder = document.getElementById("eq-holder");
function eqbtn() {
    
    if(isEqOpen){
        blurEq.style.display = "none";
        eqHolder.style.display = "none";
        isEqOpen = false;
    }
    else {
        blurEq.style.display = "block";
        eqHolder.style.display = "flex";
        isEqOpen = true;
    }
}

const audio = document.getElementById('audio-player');
const context = new AudioContext();
const source = context.createMediaElementSource(audio);

// Create filters
const bass = context.createBiquadFilter();
bass.type = 'lowshelf';
bass.frequency.value = 60; // Adjust for bass

const bass2 = context.createBiquadFilter();
bass2.type = 'lowshelf';
bass2.frequency.value = 125; // Adjust for bass

const lowMid = context.createBiquadFilter();
lowMid.type = 'peaking';
lowMid.frequency.value = 250; // Low mid frequencies

const mid = context.createBiquadFilter();
mid.type = 'peaking';
mid.frequency.value = 500; // Mid frequencies

const highMid = context.createBiquadFilter();
highMid.type = 'peaking';
highMid.frequency.value = 1000; // High mid frequencies

const treble = context.createBiquadFilter();
treble.type = 'highshelf';
treble.frequency.value = 2000; // Treble

const presence = context.createBiquadFilter();
presence.type = 'peaking';
presence.frequency.value = 4000; // Presence

const brilliance = context.createBiquadFilter();
brilliance.type = 'peaking';
brilliance.frequency.value = 8000; // Brilliance

const air = context.createBiquadFilter();
air.type = 'highshelf';
air.frequency.value = 16000; // Air

// Connect nodes
source.connect(bass);
bass.connect(bass2);
bass2.connect(lowMid);
lowMid.connect(mid);
mid.connect(highMid);
highMid.connect(treble);
treble.connect(presence);
presence.connect(brilliance);
brilliance.connect(air);
air.connect(context.destination);

// Reset EQ
function reset() {
    document.getElementById('bass').value = 0;
    document.getElementById('bass2').value = 0;
    document.getElementById('lowMid').value = 0;
    document.getElementById('mid').value = 0;
    document.getElementById('highMid').value = 0;
    document.getElementById('treble').value = 0;
    document.getElementById('presence').value = 0;
    document.getElementById('brilliance').value = 0;
    document.getElementById('air').value = 0;
    bass.gain.value = 0;
    bass2.gain.value = 0;
    lowMid.gain.value = 0;
    mid.gain.value = 0;
    highMid.gain.value = 0;
    treble.gain.value = 0;
    presence.gain.value = 0;
    brilliance.gain.value = 0;
    air.gain.value = 0;
}

// EQ Controls
document.getElementById('bass').addEventListener('input', (e) => {
    bass.gain.value = e.target.value;
});

document.getElementById('bass2').addEventListener('input', (e) => {
    bass2.gain.value = e.target.value;
});

document.getElementById('lowMid').addEventListener('input', (e) => {
    lowMid.gain.value = e.target.value;
});

document.getElementById('mid').addEventListener('input', (e) => {
    mid.gain.value = e.target.value;
});

document.getElementById('highMid').addEventListener('input', (e) => {
    highMid.gain.value = e.target.value;
});

document.getElementById('treble').addEventListener('input', (e) => {
    treble.gain.value = e.target.value;
});

document.getElementById('presence').addEventListener('input', (e) => {
    presence.gain.value = e.target.value;
});

document.getElementById('brilliance').addEventListener('input', (e) => {
    brilliance.gain.value = e.target.value;
});

document.getElementById('air').addEventListener('input', (e) => {
    air.gain.value = e.target.value;
});

// Start AudioContext on user interaction
audio.addEventListener('play', () => {
    if (context.state === 'suspended') {
        context.resume();
    }
});

//console.log("oooombbuuu");
//gowhthiee variii
let song_selected = true;
let artist_selected = false;
let album_selected = false;
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
let song_card_no_hover = document.getElementById("song-card-no-hover")

//jeevan variii
let pageNo = 1;
let pageSize = 20;

function songPage() {
    song_list.style.display = "block"; 
    setTimeout(() => {
        song_list.style.opacity = "1";
    }, 300);

    song_card_no_hover.style.display = "flex"; 
    setTimeout(() => {
        song_card_no_hover.style.opacity = "1";
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

    song_card_no_hover.style.opacity = "0"; 
    setTimeout(() => {
        song_card_no_hover.style.display = "none";
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
    album_list.style.display = "flex"; 
    setTimeout(() => {
        album_list.style.opacity = "1";
    }, 300);

    song_card_no_hover.style.opacity = "0"; 
    setTimeout(() => {
        song_card_no_hover.style.display = "none";
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
    
    album_list.style.display = "flex"; 
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

var album_song_cards = document.querySelectorAll('.album-song-card');
album_song_cards.forEach(card => {
    card.addEventListener('click', () => {
        album_song_cards.forEach(c => c.classList.remove('album-song-selected'));
        card.classList.add('album-song-selected');
    });
});

var inpField = document.getElementById("search-query");
inpField.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("Enter pressed");
        searchSongs(true);
    }
});
    
async function searchSongs(isNew) {

    const query = document.getElementById("search-query").value;
    const songList = document.getElementById("songlist");
    songList.innerHTML =``;
    
    //console.log(isNew);
    try {
        if (!isNew) {
            pageNo= pageNo + 1;
        }
        else {
            pageNo = 1;
        }
        const response = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${query}&limit=24&page=${pageNo}`);
        const data = await response.json();
        const songs = data.data.results || [];
        //console.log(songs);
        
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
        song_card.addEventListener('click', () => {
            song_cards.forEach(s => s.classList.remove('song-card-selected'));
            song_card.classList.add('song-card-selected');
        });
    });
}

function createSongCard(song, songList) {
    const card = document.createElement("div");
    card.classList.add("song-card");
    const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    //name slicing
    let new_name = song.name;
    let new_art_name = song.primaryArtists;
    let new_album_name = song.album.name;
    let new_duration = formatTime(song.duration);
    if (new_name.length > 35) {
        new_name = new_name.slice(0,35)+"...";
    }
    if (new_art_name.length > 25) {
        new_art_name = new_art_name.slice(0,25)+"...";
    }
    //slicing end
    card.innerHTML = `
            <img class="song-card-art" src="${imageUrl}" alt="">
            <span class="song-card-song-name">${new_name ||"Unkown Song"}</span>
            <span class="song-card-artist-name">${new_art_name ||"Unkown Artist"}</span>
            <span class="song-card-album-name">${new_album_name || "Unkown Album"}</span>
            <span class="song-card-timestamp">${new_duration || "00:00"}</span>
            <div class="song-card-icons">
                <i class="fa-solid fa-heart"></i>
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

    songList.appendChild(card);
}

function playmySong(song) {
    currentSong = song;
    const player = document.getElementById("audio-player");
    const nowPlaying = document.getElementById("player-song-name");
    const nowArtist = document.getElementById("player-artist-name");
    const albumArt = document.getElementById("player-album-art");
    let icon = document.getElementById("play-icon");
    icon.classList.replace("fa-play", "fa-pause");
    const artLink = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    let URL = song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0];
    albumArt.src = artLink;
    //console.log(URL);
    const downloadUrl = `/stream/?url=${encodeURIComponent(URL)}`;
    //console.log(downloadUrl);
    player.src = downloadUrl || "";
    player.play();
    // name slicing
    let new_name = song.name;
    let new_art_name = song.primaryArtists;
    if (new_name.length > 21) {
        new_name = new_name.slice(0,18)+"...";
    }
    if (new_art_name.length > 25) {
        new_art_name = new_art_name.slice(0,25)+"...";
    }
    //slicing end
    nowPlaying.textContent = `${new_name || "Unknown Song"}`;
    nowArtist.textContent = `${new_art_name || "Unknown Artist"}`;

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
    const progressBar = document.querySelector(".progress-tracker");
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
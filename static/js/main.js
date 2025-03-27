//gowhthiee variii
let albums = [];
let songs = [];
let artists = [];
const songList = document.getElementById("songlist");
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
let songQueue = JSON.parse(localStorage.getItem("SongQueue")) || [];
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
let about = document.getElementById("about");
let error = document.getElementById("error");
let feed_btn = document.getElementById("feed-btn");
let song_count = document.getElementById("song-count");
let minute_count = document.getElementById("minute-count");
let wholePage = document.getElementById("whole-page");


//jeevan variii
let songPageNo = 1;
let albumPageNo = 1;
let artistPageNo = 1;
let currentViewingAlbum = null;
let currentViewingAlbumSongs = [];
let currentViewingArtistSongs = [];
let q= "english";
let songQuery = "";
let albumQuery = "";
let artistQuery = "";
let isDownloading = false;
let ffmpeg = null;
let isBlocked = false;

function load(){
    location.reload();
}
function updateScreenSize() {
    let screenHeight = window.innerHeight - 210;
    wholePage.style.height = `${screenHeight}px`;
    let maxScreenHeight = screenHeight - 100;
    let queueFavHeight = screenHeight-60;
    document.documentElement.style.setProperty('--max-height', `${maxScreenHeight}px`);
    document.documentElement.style.setProperty('--queue-fav-height', `${queueFavHeight}px`);}

window.addEventListener('resize', () => {
    updateScreenSize();
    if(isAudioOpen ){
        if(window.innerWidth < 1300){
            audioBar.style.transform = "translate(-25px,-60px)";
            audioBarBack.style.transform = "translate(-50px,-60px)";
        }
        else{
            audioBar.style.transform = "translate(-70px,-60px)";
            audioBarBack.style.transform = "translate(-95px,-60px)";
        }
    }
    else{
        audioBar.style.transform = "translate(700px,-60px)";
        audioBarBack.style.transform = "translate(700px,-60px)";
    }
});

function songPage() {
    if ((document.getElementById("search-query").value || q) != songQuery) {
        console.log("same query");
        searchSongs(true);
    }
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
    if ((document.getElementById("search-query").value || q) != artistQuery) {
        searchArtists(true);
    }
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
    if ((document.getElementById("search-query").value || q) != albumQuery) {
        searchAlbums(true);
    }
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

function artistSongPage(id) {
    if (id) {
        artistSongPager(id);
    }
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

function albumSongPage(id) {
    if (id) {
        albumSongPager(id);
    }
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
        if (window.getComputedStyle(album_page).display === "block"){
            albumSongPageBack();
        }
        if (window.getComputedStyle(artist_page).display === "block"){
            artistSongPageBack();
        }
        displayFeed();
        console.log(window.getComputedStyle(song_list).display);
        if(window.getComputedStyle(song_list).display === "block"){
            console.log("song list");
            searchSongs(true);
        }
        else if(window.getComputedStyle(artist_list).display === "grid"){
            searchArtists(true);
        }
        else if(window.getComputedStyle(album_list).display === "grid"){
            searchAlbums(true);
        }
    }
});
    
async function searchSongs(isNew, q) {

    const query = document.getElementById("search-query").value || q;
    songQuery = query;
    
    //console.log(isNew);
    try {
        if (!isNew) {
            songPageNo= songPageNo + 1;
            const rem = songList.querySelector(".more-btn");
            if (rem) {
                songList.removeChild(rem);
            }
        }
        else {
            songPageNo = 1;
            songList.innerHTML =``;
        }
        const response = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${query}&limit=24&page=${songPageNo}`);
        const data = await response.json();
        songs = data.data.results;
        console.log(songs);

        
        if (songs.length === 0) {
            throw new Error("No songs found");
        }
        
        for (let i = 0; i < 25 && i < songs.length; i++) {
            createSongCard(songs[i], songList);
        }
        
        const more_btn = document.createElement("span");
        more_btn.classList.add("more-btn");
        more_btn.innerHTML = "more..";
        more_btn.addEventListener('click', () => {
            searchSongs(false);
            }
        );
        songList.appendChild(more_btn);
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
    albumQuery = query;

    try {
        if (!isNew) {
            albumPageNo= albumPageNo + 1;
            let rem = album_list.querySelector(".more_btn");
            if (rem) {
                album_list.removeChild(rem);
            }
        }
        else {
            albumPageNo = 1;
            album_list.innerHTML =``;
        }
        const response = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/albums?query=${query}&limit=18&page=${albumPageNo}`);
        const data = await response.json();
        albums = data.data.results;
        console.log(albums);

        if (albums.length === 0) {
            throw new Error("No albums found");
        }

        for (let i = 0; i < 18 && i < albums.length; i++) {
            createAlbumCard(albums[i], album_list);
        }

        const more_btn = document.createElement("div");
        more_btn.classList.add("album-card-more");
        more_btn.classList.add("more_btn");
        more_btn.innerHTML = `
            <span>More Albums</span>
        `
        more_btn.addEventListener('click', () => {
            searchAlbums(false);
            }
        );
        album_list.appendChild(more_btn);

    }   catch (error) {
        console.error("Error fetching albums", error);
        album_list.innerHTML = "<p>No albums found</p>";
    }
}

function createAlbumCard(album, albumList) {
    const thsAlbum = document.createElement("div");
    thsAlbum.classList.add("album-card");
    const imageUrl = `/image/?url=${encodeURIComponent(album.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    //name slicing
    let new_name = album.name;
    if (new_name.length > 30) {
        new_name = new_name.slice(0,30)+"...";
    }
    let new_art_name = album.artists.primary;
    if(new_art_name.length === 0){
        new_art_name = "";
    }
    else {
        new_art_name = new_art_name[0].name;
    }
    if (new_art_name.length > 30) {
        new_art_name = new_art_name.slice(0,30)+"...";
    }
    //slicing end
    thsAlbum.innerHTML = `
            <img class="album-img" src="${imageUrl}" alt="">
            <span class="album-name">${new_name ||"Unkown Album"}</span>
            <span class = "album-artist-name">${new_art_name || "Unknown Artist"}</span>
            
    `;
    thsAlbum.addEventListener('click', () => {
        albumSongPage(album.id);
    });
    albumList.appendChild(thsAlbum);
}

async function albumSongPager(albumId) {
    album_page.innerHTML = `
    <div class="back-icon-holder">
        <div class="back-icon" id="album-song-page-back" onclick="albumSongPageBack()">
        <i class="fa-solid fa-caret-left"></i>
        </div>
        <span>Back</span>
    </div>
    `;
    const albumInfo = document.createElement("div");
    albumInfo.classList.add("album-info-card-holder");
    const response = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/albums?id=${albumId}`);
    const respDat = await response.json();
    const data = respDat.data;  
    const imageUrl = `/image/?url=${encodeURIComponent(data.image[2].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    console.log(data);
    currentViewingAlbum = data;
    albumInfo.innerHTML = `
    <img class="album-info-card-image" src="${imageUrl}">
    <div class="album-info-card">
        <span class="album-page-artist-name">${data.primaryArtists}</span>
        <span class="album-name-album-card">${data.name}</span>
        <div class="album-card-play">
            <div class="album-play-icon">
                <i class="fa-solid fa-play"></i>
            </div>
            <span>Play all songs</span>
        </div>
    </div>
    <div class="album-download-holder">
        <div class="album-download">
            <i class="fa-solid fa-download"></i>
        </div>
    </div>
    `;
    currentViewingAlbumSongs = data.songs;

    const downAll = albumInfo.querySelector(".album-download");
    downAll.onclick = () => {
        downloadAlbum(data);
    }

    const playAll = albumInfo.querySelector(".album-card-play");
    playAll.onclick = () => {
        // downloadAlbum(data);
        let temp = songQueue;
        songQueue = [];
        currentViewingAlbumSongs.forEach(song => songQueue.push(song));
        temp.forEach(song => songQueue.push(song));
        playNextInQueue();
        updateQueueDisplay();
    }
    const albumDispSongs = document.createElement("div");
    albumDispSongs.classList.add("album-disp-songs");
    albumDispSongs.appendChild(albumInfo);
    const albumSongList = document.createElement("div");
    albumSongList.classList.add("album-song-list");
    createAlbumSongCards(albumSongList);
    albumDispSongs.appendChild(albumSongList);

    album_page.appendChild(albumDispSongs);
}

function createAlbumSongCards(albumSongList) {
    currentViewingAlbumSongs.forEach(song => {
        const songImageUrl = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
        //name slicing
        let new_name = song.name;
        let new_art_name = song.primaryArtists;
        
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

        const songCard = document.createElement("div");
        songCard.classList.add("song-card");
        songCard.innerHTML = `
            <img class="song-card-art" src="${songImageUrl}" alt="">
            <div class="responsive-song-card">
                <span class="song-card-song-name">${new_name}</span>
                <span class="song-card-artist-name">${new_art_name}</span>
                <span class="song-card-album-name">${new_album_name}</span>
                <span class="song-card-timestamp">${new_duration}</span>
                <div class="song-card-icons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-play"></i>
                <i class="fa-solid fa-download"></i>
                <i class="fa-solid fa-plus"></i>
                </div>
            </div>

        `
        const play= songCard.querySelector(".fa-play");
        play.onclick = () => {
            playmySong(song);
            playerHeart();
        }
        const down = songCard.querySelector(".fa-download");
        down.onclick = () => {
            downloadSong(song);
        }
        const queueButton = songCard.querySelector(".fa-plus");
        queueButton.onclick = () => addToQueue(song);

        const heartButton = songCard.querySelector(".fa-heart");
        favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
        let isPresentFav = favourites.some(item => item.id === song.id);
        if(isPresentFav){
            heartButton.classList.replace("fa-regular", "fa-solid");
        }

        heartButton.onclick= () =>{
            let heartClassList = Array.from(heartButton.classList);
            let isLiked = heartClassList.some(className => className === "fa-solid");
            if(isLiked){  
                favourites = favourites.filter(item => item.id !== song.id);
                localStorage.setItem("favourites", JSON.stringify(favourites));
                heartButton.classList.replace("fa-solid", "fa-regular");
            }
            else{
                heartButton.classList.replace("fa-regular", "fa-solid");
                let isPresentFav = favourites.some(item => item.id === song.id);
                if(!isPresentFav){
                    favourites.push(song);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    
                }
            }
            updateQueueDisplay();
            songList.innerHTML = "";
            for (let i = 0; i < 25 && i < songs.length; i++) {
                createSongCard(songs[i], songList);
            }
            getFavourites();
            playerHeart(); //because when i like a song while its playing i want it to update
        };


        albumSongList.appendChild(songCard);
    });
    var song_cards = document.querySelectorAll('.song-card');
    song_cards.forEach(song_card => {
        let play_icon = song_card.querySelector(".fa-play");
        play_icon.addEventListener('click', () => {
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
            <div class="responsive-song-card">
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
            </div>
    `;
    
    const play= card.querySelector(".fa-play");
    play.onclick = () => {
        playmySong(song);
        playerHeart();
    }

    const down = card.querySelector(".fa-download");
    down.onclick = () => {
        downloadSong(song);
    }
    const queueButton = card.querySelector(".fa-plus");
    queueButton.onclick = () => addToQueue(song);



    const heartButton = card.querySelector(".fa-heart");
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
    let isPresentFav = favourites.some(item => item.id === song.id);
    if(isPresentFav){
        heartButton.classList.replace("fa-regular", "fa-solid");
    }

    heartButton.onclick= () =>{
        let heartClassList = Array.from(heartButton.classList);
        let isLiked = heartClassList.some(className => className === "fa-solid");
        if(isLiked){  
            favourites = favourites.filter(item => item.id !== song.id);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            heartButton.classList.replace("fa-solid", "fa-regular");
        }
        else{
            heartButton.classList.replace("fa-regular", "fa-solid");
            let isPresentFav = favourites.some(item => item.id === song.id);
            if(!isPresentFav){
                favourites.push(song);
                localStorage.setItem("favourites", JSON.stringify(favourites));
                
            }
        }
        updateQueueDisplay();
        if(currentViewingAlbumSongs.some(item => item.id === song.id)){
            updater();
        }
        if(currentViewingArtistSongs.some(item => item.id === song.id)){
            artUpdater();
        }
        getFavourites();
        playerHeart(); //because when i like a song while its playing i want it to update
    };
    songList.appendChild(card);
}

async function searchArtists(isNew, q) {
    const query = document.getElementById("search-query").value || q;
    artistQuery = query;

    try {
        if(!isNew)
        {
            artistPageNo = artistPageNo + 1;
            let rem = artist_list.querySelector(".more_btn");
            if (rem) {
                artist_list.removeChild(rem);
            }
        } else {
            artistPageNo = 1;
            artist_list.innerHTML =``;
        }
        const response = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/artists?query=${query}&limit=10&page=${artistPageNo}`);
        const data = await response.json();
        artists = data.data.results;
        console.log("artists");
        console.log(artists);

        if (artists.length === 0) {
            throw new Error("No artists found");
        }

        for (let i = 0; i < 10 && i < artists.length; i++) {
            createArtistCard(artists[i], artist_list);
        }

        const more_btn = document.createElement("div");
        more_btn.classList.add("artist-card");
        more_btn.classList.add("more_btn");
        more_btn.innerHTML = `
            <span>More Artists</span>
        `

        more_btn.addEventListener('click', () => {
            searchArtists(false);
        });
        artist_list.appendChild(more_btn);

    }  catch (error) {
        console.error("Error fetching artists", error);
        artist_list.innerHTML = "<p>No artists found</p>";
    }
}

function createArtistCard(artist, artistList) {
    const thsArtist = document.createElement("div");
    thsArtist.classList.add("artist-card");
    const imageUrl = `/image/?url=${encodeURIComponent(artist.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;

    let new_name = artist.name;
    if (new_name.length > 30) {
        new_name = new_name.slice(0,30)+"...";
    }

    thsArtist.innerHTML = `
        <img class="artist-card-img" src="${imageUrl}">
        <span class="artist-card-name">${new_name}</span>
    `;
    thsArtist.addEventListener('click', () => {
        artistSongPage(artist.id);
    });
    artistList.appendChild(thsArtist);
}

async function artistSongPager(artistId) {
    artist_page.innerHTML = `
    <div class="back-icon-holder">
        <div class="back-icon" id="album-song-page-back" onclick="artistSongPageBack()">
        <i class="fa-solid fa-caret-left"></i>
        </div>
        <span>Back</span>
    </div>
    `;
    const artistInfo = document.createElement("div");
    artistInfo.classList.add("artist-info-card-holder");
    const response = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/artists/${artistId}`);
    const respData = await response.json();
    const data = respData.data;
    const songResponse = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/artists/${artistId}/songs`);
    const songRespData = await songResponse.json();
    const songsData = songRespData.data.songs;
    const imageUrl = `/image/?url=${encodeURIComponent(data.image[2].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    console.log(data);
    artistInfo.innerHTML = `
    <img class="artist-info-card-image" src="${imageUrl}">
    <div class="artist-info-card">
        <span>Artist</span>
        <span class="artist-name-artist-card">${data.name}</span>
        <div class="artist-card-play">
        <div class="artist-play-icon">
            <i class="fa-solid fa-play"></i>
        </div>
        <span>Play all songs</span>
        </div>
    </div>
    <div class="album-download-holder no-for-now">
        <div class="album-download">
            <i class="fa-solid fa-download"></i>
        </div>
    </div>
    `;

    currentViewingArtistSongs = songsData

    const playAll = artistInfo.querySelector(".artist-card-play");
    playAll.onclick = () => {
        let temp = songQueue;
        songQueue = [];
        currentViewingArtistSongs.forEach(song => songQueue.push(song));
        temp.forEach(song => songQueue.push(song));
        playNextInQueue();
        updateQueueDisplay();
    }

    const artistDispSongs = document.createElement("div");
    artistDispSongs.classList.add("artist-disp-songs");

    artistDispSongs.appendChild(artistInfo);
    const artistSongList = document.createElement("div");
    artistSongList.classList.add("artist-song-list");
    createArtistSongCards(artistSongList);
    artistDispSongs.appendChild(artistSongList);

    artist_page.appendChild(artistDispSongs);
}

function createArtistSongCards(artistSongList) {
    currentViewingArtistSongs.forEach(song => {
        const songImageUrl = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
        //name slicing
        let new_name = song.name;
        let new_art_name = song.primaryArtists;
        
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

        const songCard = document.createElement("div");
        songCard.classList.add("song-card");
        songCard.innerHTML = `
            <img class="song-card-art" src="${songImageUrl}" alt="">
            <div class="responsive-song-card">
                <span class="song-card-song-name">${new_name}</span>
                <span class="song-card-artist-name">${new_art_name}</span>
                <span class="song-card-album-name">${new_album_name}</span>
                <span class="song-card-timestamp">${new_duration}</span>
                <div class="song-card-icons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-play"></i>
                <i class="fa-solid fa-download"></i>
                <i class="fa-solid fa-plus"></i>
                </div>
            </div>

        `
        const play= songCard.querySelector(".fa-play");
        play.onclick = () => {
            playmySong(song);
            playerHeart();
        }

        const down = songCard.querySelector(".fa-download");
        down.onclick = () => {
            downloadSong(song);
        }
        const queueButton = songCard.querySelector(".fa-plus");
        queueButton.onclick = () => addToQueue(song);

        const heartButton = songCard.querySelector(".fa-heart");
        favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
        let isPresentFav = favourites.some(item => item.id === song.id);
        if(isPresentFav){
            heartButton.classList.replace("fa-regular", "fa-solid");
        }

        heartButton.onclick= () =>{
            let heartClassList = Array.from(heartButton.classList);
            let isLiked = heartClassList.some(className => className === "fa-solid");
            if(isLiked){  
                favourites = favourites.filter(item => item.id !== song.id);
                localStorage.setItem("favourites", JSON.stringify(favourites));
                heartButton.classList.replace("fa-solid", "fa-regular");
            }
            else{
                heartButton.classList.replace("fa-regular", "fa-solid");
                let isPresentFav = favourites.some(item => item.id === song.id);
                if(!isPresentFav){
                    favourites.push(song);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    
                }
            }
            updateQueueDisplay();
            songList.innerHTML = "";
            for (let i = 0; i < 25 && i < songs.length; i++) {
                createSongCard(songs[i], songList);
            }
            getFavourites();
            playerHeart(); //because when i like a song while its playing i want it to update
        };

        artistSongList.appendChild(songCard);
    });
    var song_cards = document.querySelectorAll('.song-card');
    song_cards.forEach(song_card => {
        let play_icon = song_card.querySelector(".fa-play");
        play_icon.addEventListener('click', () => {
            song_cards.forEach(s => s.classList.remove('song-card-selected'));
            song_card.classList.add('song-card-selected');
        });
    });
}

function updater() {
    const lst =  document.querySelector(".album-song-list");
    lst.innerHTML=``;
    createAlbumSongCards(lst);
    console.log("hi11");
}

function artUpdater() {
    const lst =  document.querySelector(".artist-song-list");
    lst.innerHTML=``;
    createArtistSongCards(lst);
    console.log("hi112");
}

function playmySong(song) {
    gtag('event', 'songPlayed', {
        'event_category': 'playEvent',
        'event_label': 'Play Button Clicked',
        'song_id': song.id,  // Pass the purchase amount
        'song_name': song.name
      });
    currentSong = song;
    playerHeart();
    const player = document.getElementById("audio-player");
    const nowPlaying = document.getElementById("player-song-name");
    const nowArtist = document.getElementById("player-artist-name");
    const albumArt = document.getElementById("player-album-art");
    const playerDownloadIcon = document.getElementById("player-download-icon")
    let icon = document.getElementById("play-icon");
    icon.classList.replace("fa-play", "fa-pause");
    const artLink = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    let URL = song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0];
    albumArt.src = artLink;
    //console.log(URL);
    let downloadUrl = null;
    if(isBlocked){
        downloadUrl = `/stream/?url=${encodeURIComponent(song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0])}`;

    } 
    else{
        downloadUrl = song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0];

    }    //console.log(downloadUrl);
    player.src = downloadUrl || "";
    player.play();
    // name slicing
    let new_name = song.name;
    // let new_art_name = song.primaryArtists;
    if (new_name.length > 21) {
        new_name = new_name.slice(0,18)+"...";
    }
    // if (new_art_name.length > 25) {
    //     new_art_name = new_art_name.slice(0,25)+"...";
    // }
    //slicing end
    nowPlaying.textContent = `${new_name || "Unknown Song"}`;
    // nowArtist.textContent = `${new_art_name || "Unknown Artist"}`;    
    playerDownloadIcon.onclick = () => downloadSong(song);

    let playerHeartt = document.getElementById("player-heart");
    playerHeartt.onclick = () =>{
        let heartClassList = Array.from(playerHeartt.classList);
        let heartIsLiked = heartClassList.some(className => className === "fa-solid");
        favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
        let isPresentFav = favourites.some(item => item.id === song.id);
        if(heartIsLiked){
            if(isPresentFav){
                favourites = favourites.filter(item => item.id !== song.id);
                localStorage.setItem("favourites", JSON.stringify(favourites));
            }
            playerHeartt.classList.replace("fa-solid", "fa-regular");
        }
        else{
            if(!isPresentFav){
                favourites.push(song);
                localStorage.setItem("favourites", JSON.stringify(favourites));
            }
            playerHeartt.classList.replace("fa-regular", "fa-solid");
        }
        songList.innerHTML = "";
        for (let i = 0; i < 25 && i < songs.length; i++) {
            createSongCard(songs[i], songList);
        }
        getFavourites();
        updateQueueDisplay();
        if(currentViewingAlbumSongs.some(item => item.id === song.id)){
            updater();
        }
        if(currentViewingArtistSongs.some(item => item.id === song.id)){
            artUpdater();
        }
    };
    var song_cards = document.querySelectorAll('.song-card');
    song_cards.forEach(song_card => {
        let play_icon = song_card.querySelector(".fa-play");
        play_icon.addEventListener('click', () => {
            song_cards.forEach(s => s.classList.remove('song-card-selected'));
            song_card.classList.add('song-card-selected');
        });
    });
    
}


function playerHeart() {
    
    let playerHeart = document.getElementById("player-heart");
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];;
    let isPresentFav = favourites.some(item => item.id === currentSong.id);
    if(isPresentFav){
        playerHeart.classList.replace("fa-regular", "fa-solid");
    }
    else{
        playerHeart.classList.replace("fa-solid", "fa-regular");
    }
}

function playFavourites() {
    if(favourites.length === 0){
        return;
    }
    let temp = songQueue;
    songQueue = favourites;
    temp.forEach(song => songQueue.push(song));
    playNextInQueue();
    updateQueueDisplay();
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
    // console.log("didoce");
    let icon = document.getElementById("play-icon");
    if (icon.classList.contains("fa-play")) {
        icon.classList.replace("fa-play", "fa-pause");
        audioPlayer.play();
    } else {
        icon.classList.replace("fa-pause", "fa-play");
        audioPlayer.pause();
    }
}

let audioIcon = document.getElementById("audio-icon");
let audioBarBack = document.getElementById("audio-bar-back");
let audioBar = document.getElementById("audio-bar");
let isAudioOpen = false;

audioIcon.addEventListener('click', () => {
    if(isAudioOpen){
        audioBar.style.transform = "translate(700px,-60px)";
        audioBarBack.style.transform = "translate(700px,-60px)";
        isAudioOpen = false;
    }
    else{
        if(window.innerWidth < 1300){
            audioBar.style.transform = "translate(-25px,-60px)";
            audioBarBack.style.transform = "translate(-50px,-60px)";
        }
        else{
            audioBar.style.transform = "translate(-70px,-60px)";
            audioBarBack.style.transform = "translate(-95px,-60px)";
        }
        isAudioOpen = true;
    }
});

// Volume adjustment and seeking
document.addEventListener('DOMContentLoaded', () => {
    
    searchSongs(true, "english");
    const audioPlayer = document.getElementById('audio-player');
    const audioBar = document.querySelector('.audio-bar');
    const audioUpdateBar = document.querySelector('.audio-update-bar');
    const audioProgressCircle = document.querySelector('.audio-progress-circle');
    //updateAudioBar(0);

    window.addEventListener('resize', () => {
        const rect = audioBar.getBoundingClientRect();
        const width = rect.width;
        volume = audioPlayer.volume;
        updateAudioBar(volume);
    });

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
        //console.log(barWidth);
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
    const response = await fetch(url, {signal: abortController.signal});
    return response.arrayBuffer();
}

async function convertMp4ToMp3(mp4Url, imageUrl, artist, title, album, year, genre) {
    try {
        if(!ffmpeg.isLoaded()){
            // ffmpeg = createFFmpeg({ log: false });
        }
    }
    catch (error) {
        console.error("Error loading FFmpeg:", error);
        const { createFFmpeg, fetchFile } = await import("https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.5/+esm");
        ffmpeg = createFFmpeg({ log: false });
    }
    const { default: ID3Writer } = await import("https://cdn.jsdelivr.net/npm/browser-id3-writer@4.0.0/+esm");  


    try {
        if (!mp4Url || !imageUrl) {
            alert("Metadata is missing MP4 or Image URLs!");
            return;
        }

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        const mp4Buffer = await fetchAsArrayBufferWithProgress(mp4Url, (percentage) => {
            let downPer = document.getElementById("download-percent");
            let dowBar = document.getElementById("download-update");
            downPer.innerHTML = `${(percentage / 2).toFixed(0)}%`;
            dowBar.style.width = `${(percentage / 200 * 120)}px`;
            console.log(`Download progress: ${percentage}%`);
        });
        const imageBuffer = await fetchAsArrayBuffer(imageUrl);

        ffmpeg.FS("writeFile", "input.mp4", new Uint8Array(mp4Buffer));
        ffmpeg.setProgress(({ ratio }) => {
            let safeRatio = Math.max(0, ratio);
            let downPer = document.getElementById("download-percent");
            let dowBar = document.getElementById("download-update");
            downPer.innerHTML = `${(50 + safeRatio * 50).toFixed(0)}%`;
            dowBar.style.width = `${(50 + safeRatio * 50) * 1.2}px`;
            console.log(`Processing progress: ${(safeRatio * 100).toFixed(2)}%`);
            if (safeRatio * 100 == 100) {
                removeDownloadNotif();
            }
        });
        await ffmpeg.run("-i", "input.mp4", "-vn", "-b:a", "192k", "output.mp3");
        removeDownloadNotif();

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
        if (!abortController.signal.aborted) {
            const link = document.createElement("a");
            link.href = mp3Url;
            link.download = `${title || "Unknown_Song"}.mp3`;
            link.click();
            URL.revokeObjectURL(mp3Url);
            isDownloading = false;
        }
        else {
            abortController = new AbortController();
            unloadFFmpeg();     
            isDownloading = false;   
        }

    } catch (error) {
        console.error("Error processing files:", error);
        // alert("Conversion failed! Check the URLs.");
        abortController = new AbortController();
        unloadFFmpeg();
        isDownloading = false;
    }
}

async function downloadSong(song) {
    if(isDownloading){
        alertNotif();        
        return;
    }
    downloadNotif(song);
    // name slicing
    let new_name = song.name;
    if (new_name.length > 16) {
        new_name = new_name.slice(0, 16);
    }
    // slicing end
    //showNotif(song.image[2].link, new_name);
    let downloadUrl = null;
    if(isBlocked){
        downloadUrl = `/streamer/?url=${encodeURIComponent(song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0])}`;

    } 
    else{
        downloadUrl = song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0];

    }
    const filename = `${song.name || "Unknown_Song"}`;
    const imageUrl = `/image/?url=${encodeURIComponent(song.image[2].link)}`;
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
    isDownloading = true;

    await convertMp4ToMp3(downloadUrl, imageUrl, artist, title, album, year, genre);
    isDownloading= false;
}

async function fetchAsArrayBufferWithProgress(url, progressCallback) {
        const response = await fetch(url, {signal: abortController.signal});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');
        let receivedLength = 0;
        const chunks = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            chunks.push(value);
            receivedLength += value.length;

            if (contentLength) {
                const percentage = (receivedLength / contentLength) * 100;
                progressCallback(percentage.toFixed(2));
            }
        }

        const chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
            chunksAll.set(chunk, position);
            position += chunk.length;
        }

        return chunksAll.buffer;
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

    about.style.opacity = "0"; 
    setTimeout(() => {
        about.style.display = "none";
    }, 300);

    error.style.opacity = "0"; 
    setTimeout(() => {
        error.style.display = "none";
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

    about.style.opacity = "0"; 
    setTimeout(() => {
        about.style.display = "none";
    }, 300);

    error.style.opacity = "0"; 
    setTimeout(() => {
        error.style.display = "none";
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

    about.style.opacity = "0"; 
    setTimeout(() => {
        about.style.display = "none";
    }, 300);

    error.style.opacity = "0"; 
    setTimeout(() => {
        error.style.display = "none";
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

    about.style.opacity = "0"; 
    setTimeout(() => {
        about.style.display = "none";
    }, 300);

    error.style.opacity = "0"; 
    setTimeout(() => {
        error.style.display = "none";
    }, 300);
}

function displayAbout() {
    about.style.display = "block"; 
    setTimeout(() => {
        about.style.opacity = "1";
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

    fav.style.opacity = "0"; 
    setTimeout(() => {
        fav.style.display = "none";
    }, 300);

    error.style.opacity = "0"; 
    setTimeout(() => {
        error.style.display = "none";
    }, 300);
}

function displayError() {

    error.style.display = "flex"; 
    setTimeout(() => {
        error.style.opacity = "1";
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

    fav.style.opacity = "0"; 
    setTimeout(() => {
        fav.style.display = "none";
    }, 300);

    about.style.opacity = "0"; 
    setTimeout(() => {
        about.style.display = "none";
    }, 300);
    history.pushState(null, "", "/");
}

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
        //console.log(duration);
        minute_count.innerHTML = formatTimeHours(duration);
    }
    song_count.innerHTML = `${noOfSongs}`;
}

function formatTimeHours(seconds) {
    const hoursQ = Math.floor(seconds / 3600);
    //console.log(hoursQ);
    const minutesQ = Math.floor((seconds % 3600) / 60);
    const secsQ = Math.floor(seconds % 60);

    return `${hoursQ > 0 ? hoursQ + ':' : ''}${hoursQ > 0 ? String(minutesQ).padStart(2, '0') : minutesQ}:${String(secsQ).padStart(2, '0')}`;
}


function addToQueue(song) {
    songQueue.push(song);
    songCountTime();
    updateQueueDisplay();
    shortNotif();
    localStorage.setItem("SongQueue", JSON.stringify(songQueue));
}

function removeFromQueue(index) {
    songQueue.splice(index, 1);
    updateQueueDisplay();
    if (songQueue.length === 0) {
        let bla= document.getElementById("queue-list");
        bla.innerHTML = `<span>No songs in queue</span>`;
    }
    songCountTime();
    localStorage.setItem("SongQueue", JSON.stringify(songQueue));
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
    else {
        nextSongNotif();    
    }
    songCountTime();
    localStorage.setItem("SongQueue", JSON.stringify(songQueue));
}

function updateQueueDisplay() {
    const queueContainer = document.getElementById("queue-list");
    queueContainer.innerHTML = "";
    songQueue.forEach((song, index) => {

        const queueItem = document.createElement("div");
        queueItem.classList.add("song-card");
        queueItem.classList.add("queue-Item");

        const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
        //name slicing
        let new_name = song.name;
        // let new_art_name = song.primaryArtists;
        let new_album_name = song.album.name;
        let new_duration = formatTime(song.duration);
        if (new_name.length > 45) {
            new_name = new_name.slice(0,45)+"...";
        }
        // if (new_art_name.length > 35) {
        //     new_art_name = new_art_name.slice(0,35)+"...";
        // }
        if (new_album_name.length > 35) {
            new_album_name = new_album_name.slice(0,35)+"...";
        }

        queueItem.innerHTML = `
            <img class="song-card-art" src="${imageUrl}" alt="">
            <div class="responsive-song-card">
                <span class="song-card-song-name">${new_name ||"Unkown Song"}</span>
                <span class="song-card-album-name">${new_album_name || "Unkown Album"}</span>
                <span class="song-card-timestamp">${new_duration || "00:00"}</span>
                <div class="song-card-icons">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-play no-for-now"></i>
                    <i class="fa-solid fa-download"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
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

        heartButton.onclick= () =>{
            let heartClassList = Array.from(heartButton.classList);
            let isLiked = heartClassList.some(className => className === "fa-solid");
            if(isLiked){  
                favourites = favourites.filter(item => item.id !== song.id);
                localStorage.setItem("favourites", JSON.stringify(favourites));
                heartButton.classList.replace("fa-solid", "fa-regular");
            }
            else{
                heartButton.classList.replace("fa-regular", "fa-solid");
                let isPresentFav = favourites.some(item => item.id === song.id);
                if(!isPresentFav){
                    favourites.push(song);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    
                }
            }
            songList.innerHTML = "";
            for (let i = 0; i < 25 && i < songs.length; i++) {
                createSongCard(songs[i], songList);
            }
            if(currentViewingAlbumSongs.some(item => item.id === song.id)){
                updater();
            }
            if(currentViewingArtistSongs.some(item => item.id === song.id)){
                artUpdater();
            }
            getFavourites();
            playerHeart(); //because when i like a song while its playing i want it to update
        };
    queueItem.setAttribute("draggable", true);
    queueContainer.appendChild(queueItem);
});
    songCountTime();
    var song_cards = document.querySelectorAll('.song-card');
    song_cards.forEach(song_card => {
        let play_icon = song_card.querySelector(".fa-play");
        play_icon.addEventListener('click', () => {
            song_cards.forEach(s => s.classList.remove('song-card-selected'));
            song_card.classList.add('song-card-selected');
        });
    });
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

            //console.log(favDuration);
            const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
            //name slicing
            let new_name = song.name;
            // let new_art_name = song.primaryArtists;
            let new_album_name = song.album.name;
            let new_duration = formatTime(song.duration);
            if (new_name.length > 45) {
                new_name = new_name.slice(0,45)+"...";
            }
            // if (new_art_name.length > 35) {
            //     new_art_name = new_art_name.slice(0,35)+"...";
            // }
            if (new_album_name.length > 35) {
                new_album_name = new_art_name.slice(0,35)+"...";
            }

            favItem.innerHTML = `
                <img class="song-card-art" src="${imageUrl}" alt="">
                <div class="responsive-song-card">
                    <span class="song-card-song-name">${new_name ||"Unkown Song"}</span>
                    <span class="song-card-album-name">${new_album_name || "Unkown Album"}</span>
                    <span class="song-card-timestamp">${new_duration || "00:00"}</span>
                    <div class="song-card-icons">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-play"></i>
                        <i class="fa-solid fa-download"></i>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>

            `
            const play= favItem.querySelector(".fa-play");
            play.onclick = () => {
                playmySong(song);
                playerHeart();
            }
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
                    //console.log(favourites);
                    getFavourites();
                    if (currentViewingAlbumSongs.some(i => i.id === song.id))
                    {
                        updater();
                    }
                    if (currentViewingArtistSongs.some(i => i.id === song.id))
                    {
                        artUpdater();
                    }
                }
                else {
                    heartButton.classList.replace("fa-regular", "fa-solid");
                    favourites.push(song.id);
                    localStorage.setItem("favourites", JSON.stringify(favourites));
                    console.log(favourites);
                    if (currentViewingAlbumSongs.some(i => i.id === song.id))
                    {
                        updater();
                    }
                    if (currentViewingArtistSongs.some(i => i.id === song.id))
                    {
                        artUpdater();
                    }
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
    var song_cards = document.querySelectorAll('.song-card');
    song_cards.forEach(song_card => {
        let play_icon = song_card.querySelector(".fa-play");
        play_icon.addEventListener('click', () => {
            song_cards.forEach(s => s.classList.remove('song-card-selected'));
            song_card.classList.add('song-card-selected');
        });
    });   
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
    localStorage.setItem("SongQueue", JSON.stringify(songQueue));
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
document.addEventListener("DOMContentLoaded", () => {
    checkSara();
    retrieve();
    getFavourites();
    updateScreenSize();
    updateQueueDisplay();
});

async function checkSara() {
    try {
        const rspData = await fetch("https://aac.saavncdn.com/060/05bb6ae7a01edcbd8e0d859d2fa1d83d_12.mp4");
        const contentType = rspData.headers.get("content-type");
        isBlocked = !(rspData.ok && contentType.includes("audio/mp4"));
    }
    catch {
        isBlocked = true;
    }
}

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

if("mediaSession" in navigator){
    navigator.mediaSession.setActionHandler('nexttrack', function() {
        playNextInQueue();
    });
}

async function downloadFavourites() {
    if (isDownloading) {
        alertNotif();
        return;
    }
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (favourites.length === 0) {
        return;
    }
    downloadFavNotif();
    downloadSongsAsZip(favourites, "Favourites-medplay");
}

async function downloadQueue() {
    if (isDownloading) {
        alertNotif();
        return;
    }
    if (songQueue.length === 0) {
        return;
    }
    downloadQueNotif();
    downList= songQueue;
    downloadSongsAsZip(downList, "Queue-medplay");
}

async function downloadAlbum(album) {
    if (isDownloading) {
        alertNotif();        
        return;
    }
    if (currentViewingAlbumSongs.length === 0) {
        return;
    }
    downloadAlbNotif(album);
    downList= currentViewingAlbumSongs;
    downloadSongsAsZip(downList, `${album.name}-medplay`);
}

async function convertMp4ToMp3Blob(mp4Url, imageUrl, artist, title, album, year, genre) {
    const { createFFmpeg, fetchFile } = await import("https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.5/+esm");
    const { default: ID3Writer } = await import("https://cdn.jsdelivr.net/npm/browser-id3-writer@4.0.0/+esm");

    ffmpeg = createFFmpeg({ log: false });

    try {
        if (!mp4Url || !imageUrl) {
            alert("Metadata is missing MP4 or Image URLs!");
            return;
        }

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        const mp4Buffer = await fetchAsArrayBuffer(mp4Url, abortController.signal);
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

        return new Blob([writer.arrayBuffer], { type: "audio/mp3" });

    } catch (error) {
        console.error("Error processing files:", error);
        // alert("Conversion failed! Check the URLs.");
        abortController = new AbortController();
        unloadFFmpeg();
    }
}

async function downloadSongsAsZip(songsList, zipName) {
    if (songsList.length === 0) {
        return;
    }
    isDownloading = true;

    const zip = new JSZip();
    const folder = zip.folder(zipName);

    for (const [index, song] of songsList.entries()) {
        if (abortController.signal.aborted) {
            console.log("Download process aborted");
            break;
        }

        let downloadUrl = null;
        if(isBlocked){
            downloadUrl = `/streamer/?url=${encodeURIComponent(song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0])}`;
    
        } 
        else{
            downloadUrl = song.downloadUrl.find(link => link.quality === '320kbps').link || song.downloadUrl[0];
    
        }        const imageUrl =`/image/?url=${encodeURIComponent(song.image[2].link)}`;
        const artist = song.artists.primary.map(a => a.name);
        const title = song.name;
        const album = song.album.name;
        const year = song.year;
        const genre = Array.isArray(song.genre) ? song.genre : [song.genre];

        const mp3Blob = await convertMp4ToMp3BlobWithProgress(downloadUrl, imageUrl, artist, title, album, year, genre, (songProgress) => {
            let safeRatio = Math.max(0, songProgress);
            if(safeRatio > 0){
                // Calculate and log progress for each song

                const progress = ((index + (safeRatio/10)) / songsList.length);
                console.log(`Download index: ${index} out of ${songsList.length}`);
                console.log(`Download progress: ${progress.toFixed(2)}%`);
                let downPer = document.getElementById("download-percent");
                let dowBar = document.getElementById("download-update");
                downPer.innerHTML = `${(progress * 100).toFixed(0)}%`;
                dowBar.style.width = `${(progress * 120)}px`;
                if(progress * 100 == 100){
                    setTimeout(() => {
                        removeDownloadNotif();
                    }, 2000 );
                }
            }
        });
        const arrayBuffer = await mp3Blob.arrayBuffer();
        const filename = `${song.name || "Unknown_Song"}.mp3`;
        folder.file(filename, arrayBuffer);
    }

    if (!abortController.signal.aborted) {
        zip.generateAsync({ type: "blob" }).then(content => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `${zipName}.zip`;
            link.click();
            isDownloading = false;
        });
    }
    else {
        await unloadFFmpeg() ;
        abortController = new AbortController();
        isDownloading = false;
    }
    abortController = new AbortController();
    isDownloading = false;

}

async function convertMp4ToMp3BlobWithProgress(mp4Url, imageUrl, artist, title, album, year, genre, progressCallback) {
    try {
        if(!ffmpeg.isLoaded()){
            // ffmpeg = createFFmpeg({ log: false });
        }
    }
    catch (error) {
        console.error("Error loading FFmpeg:", error);
        const { createFFmpeg, fetchFile } = await import("https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.5/+esm");
        ffmpeg = createFFmpeg({ log: false });
    }
    isDownloading = true;
    const { default: ID3Writer } = await import("https://cdn.jsdelivr.net/npm/browser-id3-writer@4.0.0/+esm");  


    try {
        if (!mp4Url || !imageUrl) {
            alert("Metadata is missing MP4 or Image URLs!");
            return;
        }

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        const mp4Buffer = await fetchAsArrayBufferWithProgress(mp4Url, (percentage) => {
            if (percentage < 100) {
            progressCallback((percentage / 200) * 4); // First half of the progress
            }
        });
        const imageBuffer = await fetchAsArrayBuffer(imageUrl);

        progressCallback(4); // First half of the progress
        ffmpeg.FS("writeFile", "input.mp4", new Uint8Array(mp4Buffer));
        ffmpeg.setProgress(({ ratio = 0}) => {
            progressCallback(((ratio) * 6) + 4); // Second half of the progress
        });
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

        return new Blob([writer.arrayBuffer], { type: "audio/mp3" });

    } catch (error) {
        // console.error("Error processing files:", error);
        await unloadFFmpeg() ;
        abortController = new AbortController();
        isDownloading = false;
    }
}

let abortController = new AbortController();

function cancelDownload() {
    abortController.abort();
    console.log("Download canceled");
    removeDownloadNotif();
    // Clear the buffer and reload ffmpeg
    clearBufferAndReloadFFmpeg();
    isDownloading = false;
}

async function clearBufferAndReloadFFmpeg() {
    await unloadFFmpeg();
    isDownloading = false;
}

async function unloadFFmpeg() {
    if (ffmpeg) {
        try {
            await ffmpeg.exit(); // Stop FFmpeg properly
            
            // Terminate Web Worker if it exists
            if (ffmpeg.worker) {
                ffmpeg.worker.terminate();
            }
        } catch (error) {
            console.warn("Error while exiting FFmpeg:", error);
        }

        // Clear instance reference
        ffmpeg = null;
    }

    // Remove FFmpeg from global cache
    // delete window.ffmpeg;
}

function downloadNotif(song){
    let notif = document.getElementById("notification");

    notif.style.display = "flex"; 
    setTimeout(() => {
        notif.style.opacity = "1";
    }, 300);

    let downloadName = document.getElementById("download-name");
    let notifImage = document.getElementById("notif-image");
    const imageUrl = `/image/?url=${encodeURIComponent(song.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    notifImage.src = imageUrl;
    downloadName.innerHTML = song.name;
}

function downloadFavNotif(){
    let notif = document.getElementById("notification");

    notif.style.display = "flex"; 
    setTimeout(() => {
        notif.style.opacity = "1";
    }, 300);
    let notifTitle = document.getElementById("download-title");
    notifTitle.innerHTML = "Download Favourites";

    let downloadName = document.getElementById("download-name");
    let notifImage = document.getElementById("notif-image");
    notifImage.src = "/static/img/M.png";
    downloadName.innerHTML = "Your Favourites";
}

function downloadQueNotif(){
    let notif = document.getElementById("notification");

    notif.style.display = "flex"; 
    setTimeout(() => {
        notif.style.opacity = "1";
    }, 300);
    let notifTitle = document.getElementById("download-title");
    notifTitle.innerHTML = "Download Queue";

    let downloadName = document.getElementById("download-name");
    let notifImage = document.getElementById("notif-image");
    notifImage.src = "/static/img/M.png";
    downloadName.innerHTML = " Your Queue";
}

function downloadAlbNotif(album){
    let notif = document.getElementById("notification");
    let notifImage = document.getElementById("notif-image")
    notif.style.display = "flex"; 
    setTimeout(() => {
        notif.style.opacity = "1";
    }, 300);
    let notifTitle = document.getElementById("download-title");
    notifTitle.innerHTML = "Download Album";

    let downloadName = document.getElementById("download-name");
    const imageUrl = `/image/?url=${encodeURIComponent(album.image[1].link || `{{ url_for('static', filename="img/plc.png")}}`)}`;
    notifImage.src = imageUrl;
    downloadName.innerHTML = `${album.name}-Album`;
}

function removeDownloadNotif(){
    let notif = document.getElementById("notification");

    notif.style.opacity = "0"; 
    setTimeout(() => {
        notif.style.display = "none";
        let notifTitle = document.getElementById("download-title");
        notifTitle.innerHTML = "Download Song";
        let downBar = document.getElementById("download-update");
        let downPer = document.getElementById("download-percent");
        downPer.innerHTML = "0%";
        downBar.style.width = 0;
    }, 300);  
    isDownloading = false;
}

function alertNotif(){
    let notif = document.getElementById("alert");
    notif.style.display = "flex";

    setTimeout(() => {
        notif.style.opacity = "1";
    }, 100); 

    removeAlertNotif();
}

function removeAlertNotif(){
    let notif = document.getElementById("alert");
    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => {
            notif.style.display = "none";
        }, 300);
    }, 5000); 
}

function removeAlertNotifQuick(){
    let notif = document.getElementById("alert");
    notif.style.opacity = "0";
    setTimeout(() => {
        notif.style.display = "none";
    }, 100); 
}

function shortNotif(){
    let notif = document.getElementById("notif-holder");
    notif.innerHTML = ``;
    notif.innerHTML = `
         <div class="short-notif" id="short-notif">
            <span>Added to Queue!</span>
            <i class="fa-solid fa-circle-check"></i>
        </div>
    `
    notif.style.display = "flex";
    setTimeout(() => {
        notif.style.opacity = "1";
    }, 100); 

    setTimeout(() => {
        notif.style.opacity = "0"; 
        setTimeout(() => {
            notif.style.display = "none";
            notif.innerHTML = ``;
        }, 100);
    }, 1500);
}

function nextSongNotif(){
    let notif = document.getElementById("no-next-song-holder");
    notif.innerHTML = ``;
    notif.innerHTML = `
        <div class="next-short-notif" id="next-short-notif">
            <span>No song in queue</span>
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
    `
    notif.style.display = "flex";
    setTimeout(() => {
        notif.style.opacity = "1";
    }, 100); 

    setTimeout(() => {
        notif.style.opacity = "0"; 
        setTimeout(() => {
            notif.style.display = "none";
            notif.innerHTML = ``;
        }, 100);
    }, 1500);
}
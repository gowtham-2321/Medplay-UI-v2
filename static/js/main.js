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
let classification = document.getElementById("classification");
let list_holder = document.getElementById("list-holder");
let artist_song_page_back= document.getElementById("artist-song-page-back");


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
    album_list.style.display = "flex"; 
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

const song_cards = document.querySelectorAll('.song-card');
song_cards.forEach(song_card => {
    song_card.addEventListener('click', () => {
        song_cards.forEach(s => s.classList.remove('song-card-selected'));
        song_card.classList.add('song-card-selected');
    });
});

const menu_btns = document.querySelectorAll('.menu-btn');
menu_btns.forEach(menu_btn => {
    menu_btn.addEventListener('click', () => {
        menu_btns.forEach(s => s.classList.remove('menu-btn-selected'));
        menu_btn.classList.add('menu-btn-selected');
    });
});

const album_song_cards = document.querySelectorAll('.album-song-card');
album_song_cards.forEach(card => {
    card.addEventListener('click', () => {
        album_song_cards.forEach(c => c.classList.remove('album-song-selected'));
        card.classList.add('album-song-selected');
    });
});
    
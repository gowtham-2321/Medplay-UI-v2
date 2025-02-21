let song_selected = true;
let artist_selected = false;
let album_selected = false;
let song_class = document.getElementById("class-song");
    let artist_class = document.getElementById("class-artist");
    let album_class = document.getElementById("class-album");
    let update_line = document.getElementById("class-line-change");
    let song_list = document.getElementById("songlist");

function songPage() {
    song_list.style.display = "block"; 
    setTimeout(() => {
        song_list.style.opacity = "1";
    }, 0);
    update_line.style.transform = "translateX(0px)";
    song_class.classList.add("active-class");
    artist_class.classList.remove("active-class");
    album_class.classList.remove("active-class");
}
function artistPage() {
    song_list.style.opacity = "0"; 
    setTimeout(() => {
        song_list.style.display = "none";
    }, 300);
    update_line.style.transform = "translateX(100px)";
    song_class.classList.remove("active-class");
    artist_class.classList.add("active-class");
    album_class.classList.remove("active-class");
}
function albumPage() {
    song_list.style.opacity = "0"; 
    setTimeout(() => {
        song_list.style.display = "none";
    }, 300);
    update_line.style.transform = "translateX(200px)";
    song_class.classList.remove("active-class");
    artist_class.classList.remove("active-class");
    album_class.classList.add("active-class");
}


    
    
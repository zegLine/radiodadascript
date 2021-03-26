console.log("Starting script...")

const url = "https://www.radiodada.ro/radio/playlist.html"
const options = {
    method: 'GET'
}

oldhtml = ""

songs = []

function modifydom() {
    let nextsong = document.querySelector("#nextsong");
    let currentsong = document.querySelector("#currentsong");
    let song1 = document.querySelector("#song1");
    let song2 = document.querySelector("#song2");
    let song3 = document.querySelector("#song3");
    let song4 = document.querySelector("#song4");

    nextsong.textContent = songs[0];
    currentsong.textContent = songs[1];
    song1.textContent = songs[2];
    song2.textContent = songs[3];
    song3.textContent = songs[4];
    song4.textContent = songs[5];
}

function getsongs(html) {
    var el = document.createElement('html');
    el.innerHTML = html;

    ptags = el.getElementsByTagName('p');

    for (let i = 0; i < ptags.length; i++) {
        var ptag = ptags[i].innerHTML;
        ptag = ptag.replace('Au fost: ', '');
        ptag = ptag.replace('Acum la radio: ', '');
        ptag = ptag.replace('Urmeaza: ', '');

        if (i) {
            ptag = ptag.substring(0, ptag.length - 12);
        }

        songs[i] = ptag;
        console.log(ptag);
    }

    modifydom();

}

function fetchurl() {
    fetch(url, options).then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(function (html) {
        // This is the HTML from our response as a text string
        if (oldhtml == "" || oldhtml != html) {
            getsongs(html);
            oldhtml = html;
        }
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

fetchurl();

setInterval(() => {
    console.log("Interval");

    fetchurl();
}, 10000);
let legends = {
    1 : ["img/bloodhound.png", "Bloodhound"],
    2 : ["img/gibraltar.png", "Gibraltar"],
    3 : ["img/lifeline.png", "Lifeline"],
    4 : ["img/pathfinder.png", "Pathfinder"],
    5 : ["img/wraith.png", "Wraith"],
    6 : ["img/bangalore.png", "Bangalore"],
    7 : ["img/caustic.png", "Caustic"],
    8 : ["img/mirage.png", "Mirage"],
    9 : ["img/octane.png", "Octane"],
    10 : ["img/wattson.png", "Wattson"],
    11 : ["img/crypto.png", "Crypto"],
    12 : ["img/revenant.png", "Revenant"],
    13 : ["img/loba.png", "Loba"],
    14 : ["img/rampart.png", "Rampart"],
    15 : ["img/horizon.png", "Horizon"],
    16 : ["img/fuse.png", "Fuse"],
    17 : ["img/valkyrie.png", "Valkyrie"],
    18 : ["img/seer.png", "Seer"],
    19 : ["img/ash.png", "Ash"],
    20 : ["img/mad maggie.png", "Mad Maggie"],
    21 : ["img/newcastle.png", "Newcastle"],
    22 : ["img/vantage.png", "Vantage"],
    23 : ["img/catalyst.png", "Catalyst"],
}

var legendCount = 1;

function addLegend() {
    if (legendCount < 3)
        legendCount++;

    let newText = legendCount + " Legends";
    document.querySelector("#numberbox").firstChild.textContent = newText;
}

function subLegend() {
    if (legendCount > 1)
        legendCount--;

    suffix = legendCount > 1 ? "s" : "";
    let newText = legendCount + " Legend" + suffix;
    document.querySelector("#numberbox").firstChild.textContent = newText;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function returnIndexes(count) {
    if (count > 23 || count < 1) return [];

    var indexes = [];
    for (var i = 0; i < count; i++) {
        let randnum = 0
        do {
            randnum = randomIntFromInterval(1, 23)
        }
        while (indexes.includes(randnum))
        indexes[i] = randnum;
    }
    return indexes;
}

function generateResult() {
    var innerHTML = ""
    let suffix = legendCount > 1 ? "s" : "";
    innerHTML +=
        '<h2>Your Legend' + suffix + ':</h2>\n' +
        '<div id="result">\n';
    let legendIndexes = returnIndexes(legendCount);
    legendIndexes.forEach(i => {
        innerHTML +=
            '<div class="card">\n' +
                '<h3>' + legends[i][1] + '</h3>\n' +
                '<img src="' + legends[i][0] + '" alt="' + legends[i][1] + '">\n' +
            '</div>\n';
    });
    innerHTML += '</div>'
    document.querySelector("#generated").innerHTML = innerHTML;
}
let legends = {
    1 : ["img/legends/bloodhound.png", "Bloodhound"],
    2 : ["img/legends/gibraltar.png", "Gibraltar"],
    3 : ["img/legends/lifeline.png", "Lifeline"],
    4 : ["img/legends/pathfinder.png", "Pathfinder"],
    5 : ["img/legends/wraith.png", "Wraith"],
    6 : ["img/legends/bangalore.png", "Bangalore"],
    7 : ["img/legends/caustic.png", "Caustic"],
    8 : ["img/legends/mirage.png", "Mirage"],
    9 : ["img/legends/octane.png", "Octane"],
    10 : ["img/legends/wattson.png", "Wattson"],
    11 : ["img/legends/crypto.png", "Crypto"],
    12 : ["img/legends/revenant.png", "Revenant"],
    13 : ["img/legends/loba.png", "Loba"],
    14 : ["img/legends/rampart.png", "Rampart"],
    15 : ["img/legends/horizon.png", "Horizon"],
    16 : ["img/legends/fuse.png", "Fuse"],
    17 : ["img/legends/valkyrie.png", "Valkyrie"],
    18 : ["img/legends/seer.png", "Seer"],
    19 : ["img/legends/ash.png", "Ash"],
    20 : ["img/legends/mad maggie.png", "Mad Maggie"],
    21 : ["img/legends/newcastle.png", "Newcastle"],
    22 : ["img/legends/vantage.png", "Vantage"],
    23 : ["img/legends/catalyst.png", "Catalyst"],
}

let weapons = {
    1 : ["img/weapons/30-30 Repeater.png", "30-30 Repeater"],
    2 : ["img/weapons/Alternator SMG.png", "Alternator SMG"],
    3 : ["img/weapons/Bocek Compound Bow.png", "Bocek Compound Bow"],
    4 : ["img/weapons/C.A.R. SMG.png", "C.A.R. SMG.png"],
    5 : ["img/weapons/Charge Rifle.png", "Charge Rifle"],
    6 : ["img/weapons/Devotion LMG.png", "Devotion LMG"],
    7 : ["img/weapons/EVA-8 Auto.png", "EVA-8 Auto"],
    8 : ["img/weapons/G7 Scout.png", "G7 Scout"],
    9 : ["img/weapons/HAVOC Rifle.png", "HAVOC Rifle"],
    10 : ["img/weapons/Hemlok Burst AR.png", "Hemlok Burst AR"],
    11 : ["img/weapons/Kraber .50-Cal Sniper.png", "Kraber .50-Cal Sniper"],
    12 : ["img/weapons/L-STAR EMG.png", "L-STAR EMG"],
    13 : ["img/weapons/Longbow DMR.png", "Longbow DMR"],
    14 : ["img/weapons/M600 Spitfire.png", "M600 Spitfire"],
    15 : ["img/weapons/Mastiff Shotgun.png", "Mastiff Shotgun"],
    16 : ["img/weapons/Mozambique Shotgun.png", "Mozambique Shotgun"],
    17 : ["img/weapons/Nemesis Burst AR.png", "Nemesis Burst AR"],
    18 : ["img/weapons/P2020.png", "P2020"],
    19 : ["img/weapons/Peacekeeper.png", "Peacekeeper"],
    20 : ["img/weapons/Prowler Burst PDW.png", "Prowler Burst PDW"],
    21 : ["img/weapons/R-99 SMG.png", "R-99 SMG"],
    22 : ["img/weapons/R-301 Carbine.png", "R-301 Carbine"],
    23 : ["img/weapons/Rampage LMG.png", "Rampage LMG"],
    24 : ["img/weapons/RE-45 Auto.png", "RE-45 Auto"],
    25 : ["img/weapons/Sentinel.png", "Sentinel"],
    26 : ["img/weapons/Triple Take.png", "Triple Take"],
    27 : ["img/weapons/VK-47 Flatline.png", "VK-47 Flatline"],
    28 : ["img/weapons/Volt SMG.png", "Volt SMG"],
    29 : ["img/weapons/Wingman.png", "Wingman"],
}

let red_weapons = [3, 10, 11, 24]

var legendCount = 1;
var randomizeWeapons = false;

function toggleRandomWeapons() {
    randomizeWeapons = !randomizeWeapons
    document.querySelector("#weaponbox").firstChild.textContent = randomizeWeapons ? "ON" : "OFF";
}

function addLegend() {
    if (legendCount < 3)
        legendCount++;

    let newText = legendCount + " Players";
    document.querySelector("#numberbox").firstChild.textContent = newText;
}

function subLegend() {
    if (legendCount > 1)
        legendCount--;

    suffix = legendCount > 1 ? "s" : "";
    let newText = legendCount + " Player" + suffix;
    document.querySelector("#numberbox").firstChild.textContent = newText;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function returnIndexes(count, min, max, exclude = []) {
    if (count > max || count < min) return [];

    var indexes = [];
    for (var i = 0; i < count; i++) {
        let randnum = 0
        do {
            randnum = randomIntFromInterval(min, max)
        }
        while (indexes.includes(randnum) || red_weapons.includes(randnum))
        indexes[i] = randnum;
    }
    return indexes;
}

function generateResult() {
    var innerHTML = ""
    let suffix = legendCount > 1 ? "s" : "";
    if (randomizeWeapons) {
        suffix += " and weapons"
    }

    innerHTML +=
        '<h2 id="title">Your Legend' + suffix + ':</h2>\n' +
        '<div id="result">\n';
    let legendIndexes = returnIndexes(legendCount, 1, Object.keys(legends).length);
    legendIndexes.forEach(i => {
        innerHTML +=
            '<div class="card">\n' +
                '<h3>' + legends[i][1] + '</h3>\n' +
                '<img src="' + legends[i][0] + '" alt="' + legends[i][1] + '">\n' +
            '</div>\n';
    });
    innerHTML += '</div>'

    if (randomizeWeapons) {
        innerHTML +=
            '<br>' +
            '<div id="weaponresult">\n';
        let weaponIndexes = returnIndexes(2, 1, Object.keys(weapons).length, red_weapons);
        weaponIndexes.forEach(i => {
            innerHTML +=
                '<div class="card">\n' +
                    '<h3>' + weapons[i][1] + '</h3>\n' +
                    '<img src="' + weapons[i][0] + '" alt="' + weapons[i][1] + '">\n' +
                '</div>\n';
        });
    }
    innerHTML += '</div>'

    document.querySelector("#generated").innerHTML = innerHTML;
}
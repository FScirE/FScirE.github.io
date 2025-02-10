const defaultDropdownList = ["Triple Tap", "Fourth Time's The Charm", "Deconstruct"];
var selectedPerks = [];

//initialize
reset();

function dropdownClick(p) {
    let d = document.querySelectorAll('.dropdown');
    let buttonContent = p.parentElement.parentElement.querySelector('button').textContent;
    let perk = p.textContent;

    let index = defaultDropdownList.indexOf(perk);
    let dropdownList = [...defaultDropdownList];
    if (index != -1)
        dropdownList.splice(index, 1)

    //remove previous perk from selected
    let selectIndex = selectedPerks.indexOf(buttonContent);
    if (selectIndex != -1)
        selectedPerks.splice(selectIndex, 1);

    //update selected perk
    p.parentElement.parentElement.querySelector('button').textContent = perk;
    if (perk != "...")
        selectedPerks.push(perk);

    //rebuild dropdown list
    d.forEach((e) => {
        e.innerHTML = "";
        if (e.parentElement.querySelector("button").textContent != "...")
            e.innerHTML += `<p onclick="dropdownClick(this)">...</p>\n`
        for (let i = 0; i < dropdownList.length; i++) {
            if (selectedPerks.indexOf(dropdownList[i]) == -1)
                e.innerHTML += `<p onclick="dropdownClick(this)">${dropdownList[i]}</p>\n`;
        }
    });
}

function validate(t) {
    if (t.value.length <= 3 && !/^([1-9]\d*)$/.test(t.value))
        t.value = "";
    if (t.value.length > 3)
        t.value = t.value.substring(0, t.value.length - 1);
}

function reset() {
    //reset perks
    selectedPerks = [];
    document.querySelectorAll(".dropdown").forEach((d) => {
        d.innerHTML = "";
        for (let i = 0; i < defaultDropdownList.length; i++) {
            d.innerHTML += `<p onclick="dropdownClick(this)">${defaultDropdownList[i]}</p>\n`;
        }
    });
    document.querySelectorAll(".dropbutton").forEach((b) => {
        b.textContent = "...";
    });
    //clear text input and output
    document.querySelector("#magsize input").value = "";
    document.querySelector("#result").innerHTML = "";
}

function calculate() {
    let tt = false;
    let fttc = false;
    let decon = false;
    let rr = false;

    //default
    let primary = false;
    let enhanced = false;

    let baseMag = parseInt(document.querySelector("#magsize input").value);

    document.querySelectorAll(".dropbutton").forEach((d) => {
        switch (d.textContent) {
            case "Triple Tap":
                tt = true;
                break;
            case "Fourth Time's The Charm":
                fttc = true;
                break;
            case "Deconstruct":
                decon = true;
                break;
        }
    });

    let tt_counter = 0;
    let fttc_counter = 0;
    let decon_counter = 0;

    let effectiveMag = 0;
    let currentMag = baseMag;
    while (currentMag > 0) {
        effectiveMag++;
        currentMag--;
        //triple tap
        if (tt) {
            tt_counter++;
            if (tt_counter == 3) {
                currentMag++;
                tt_counter = 0;
            }
        }
        //fourth time's the charm
        if (fttc) {
            fttc_counter++;
            if (fttc_counter == 4) {
                currentMag += 2;
                fttc_counter = 0;
            }
        }
        //deconstruct
        if (decon) {
            decon_counter++;
            if (decon_counter == Math.floor(baseMag * 0.5) + 2) {
                currentMag += Math.ceil(baseMag * 0.1)
                decon_counter = 0;
            }
        }

        //check if infinite
        if (currentMag > baseMag)
            break;
    }

    //set result element
    document.querySelector("#result").innerHTML =
        `<p>Effective magazine size: ${currentMag == 0 ? effectiveMag : "Infinite"}</p>`;
}

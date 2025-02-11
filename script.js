const defaultDropdownList = ["Triple Tap", "Fourth Time's The Charm", "Deconstruct", "Rewind Rounds"];
var selectedPerks = [];

//initialize
reset();

//make hidden tag clear when the dropdown goes away
document.querySelectorAll(".container").forEach((c) => {
    c.addEventListener("mouseover", () => {
        c.querySelector(".dropdown").classList.remove("hidden");
    });
});

function dropdownClick(p) {
    let d = document.querySelectorAll('.dropdown');
    let c = p.parentElement.parentElement;
    let buttonContent = c.querySelector('button').textContent;
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
    c.querySelector('button').textContent = perk;
    if (perk != "...")
        selectedPerks.push(perk);

    //hide menu
    c.querySelector(".dropdown").classList.add("hidden");

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
    if (t.value[0] == '0')
        t.value = t.value.substring(1, t.value.length);
    if (t.value.length == 0 || (t.value.length <= 3 && !/^([0-9]\d*)$/.test(t.value)))
        t.value = "0";
    if (t.value.length > 3)
        t.value = t.value.substring(0, t.value.length - 1);
}

function toggle(b) {
    b.value = b.value == "" ? "X" : "";
}

function lfrToggle(b) {
    toggle(b);
    if (b.value == "X") {
        document.querySelector("#primary h4").textContent = "Burst";
        document.querySelector("#rpm h4").textContent = "Charge time";
    }
    else {
        document.querySelector("#primary h4").textContent = "Primary";
        document.querySelector("#rpm h4").textContent = "RPM";
    }
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
    //clear inputs and output
    document.querySelectorAll(".input input[type=text]").forEach((i) => {
        i.value = "0";
    });
    document.querySelectorAll(".input input[type=button]").forEach((i) => {
        i.value = "";
    });
    document.querySelector("#result").innerHTML = "";
}

function calculate() {
    let tt = false;
    let fttc = false;
    let decon = false;
    let rr = false;

    let lfr = document.querySelector("#lfr input").value == "X";
    let primary = document.querySelector("#primary input").value == "X" && !lfr; //act as primary checkbox if not lfr
    let burst = document.querySelector("#primary input").value == "X" && lfr; //act as burst checkbox if lfr
    let enhanced = document.querySelector("#enhanced input").value == "X";
    let baseMag = parseInt(document.querySelector("#magsize input").value);
    let rpm = parseInt(document.querySelector("#rpm input").value);

    //lfr charge time to rpm
    rpm = lfr ? ((1000 / (rpm + (burst ? rpm + 500 : rpm))) * 60) * (burst ? 3 : 1) : rpm;

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
            case "Rewind Rounds":
                rr = true;
                break;
        }
    });

    let tt_counter = 0;
    let fttc_counter = 0;
    let decon_counter = 0;
    let rr_counter = 0;

    //for rewind rounds cooldown
    let cooldown = Math.floor(rpm / 60);
    //for rewind rounds infinite mag
    let rr_refills = 0;

    let effectiveMag = 0;
    let currentMag = baseMag;

    while (currentMag > 0) {
        //let debug = `${currentMag}`;

        effectiveMag++;
        currentMag--;

        //triple tap
        if (tt) {
            tt_counter++;
            if (tt_counter == 3) {
                currentMag++;
                currentMag = currentMag > baseMag ? baseMag : currentMag;
                tt_counter = 0;
                //debug += " +1"
            }
        }
        //fourth time's the charm
        if (fttc) {
            fttc_counter++;
            if (fttc_counter == 4) {
                currentMag += 2;
                currentMag = currentMag > baseMag ? baseMag : currentMag;
                fttc_counter = 0;
                //debug += " +2"
            }
        }
        //deconstruct
        if (decon) {
            decon_counter++;
            if (decon_counter == Math.floor(baseMag * (primary ? 0.25 : 0.5)) + 2) {
                currentMag += Math.ceil(baseMag * 0.1)
                currentMag = currentMag > baseMag ? baseMag : currentMag;
                decon_counter = 0;
                //debug += ` +${Math.ceil(baseMag * 0.1)}`;
            }
        }
        //rewind rounds
        if (rr) {
            if (burst) {
                rr_counter += 3;
                if (currentMag == 0 && Math.ceil(rr_counter / 3) >= Math.ceil(baseMag * 0.285)) {
                    currentMag += Math.ceil(rr_counter * (enhanced ? 0.1633 : 0.14))
                    currentMag = currentMag > baseMag ? baseMag : currentMag;
                    rr_counter = -cooldown;
                    rr_refills++;
                    //debug += ` +${Math.ceil(baseMag * (enhanced ? 0.7 : 0.6))}`;
                }
            }
            else {
                rr_counter++;
                if (currentMag == 0 && rr_counter >= Math.ceil(baseMag * 0.2875)) {
                    currentMag += Math.ceil(rr_counter * (enhanced ? 0.7 : 0.6))
                    currentMag = currentMag > baseMag ? baseMag : currentMag;
                    rr_counter = -cooldown;
                    rr_refills++;
                    //debug += ` +${Math.ceil(baseMag * (enhanced ? 0.7 : 0.6))}`;
                }
            }
            //infinity check
            if (rr_refills > baseMag + 1)
                break;
        }

        //console.log(debug);
    }

    let finite = currentMag == 0;

    //time to empty
    let totalSeconds;
    if (finite) {
        if (rpm != 0)
            totalSeconds = Math.ceil((effectiveMag * 60) / rpm) * (burst ? 3 : 1);
        else
            totalSeconds = "?";
    }

    //set result element
    document.querySelector("#result").innerHTML = `
        <p class="bold">Effective magazine size: ${finite ? effectiveMag : "Infinite"}</p>
        <p class="small">You won't have to reload${finite ? " for " + totalSeconds + " seconds" : ""}!</p>
    `;
}

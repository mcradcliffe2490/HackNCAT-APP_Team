i = -1;
coords = [0, 0];

let gelc = ['I have a dark sense of humor', 
    'Sometimes you have to crack a few eggs to make an omelette', 
    'There is a necessary evil needed for justice to prevail',
    "If someone told me they havent been bitten duing a zombie apocalypse, I'd let them take shelter in my house",
    'I think pineapple belongs on pizza',
    'I usually root for the villain in any movie',
    "I'd rather be in a safe world with no fun than a fun world with no safety",
    'The government does more harm than good',
    "I'd rather play things by ear than plan ahead",
    '"Justice" is determined by whichever side comes out on top',
    'I can get paranoid sometimes',
    'I feel comfortable in team situations']

function selectedValue(movement) {
    if (i < 6) {
        coords[0] += movement;
        nextQuestion();
    } else if (i < 11) {
        coords[1] += movement;
        nextQuestion();
    } else if (i = 11) {
        coords[1] += movement;
        clean();
        calculateHero();
    } else {
    }
}

function nextQuestion() {
    i++;
    var element = document.getElementById("question");
    element.innerHTML = gelc[i].toUpperCase();
}

function clean() {
    var element1 = document.getElementById("sd");
    element1.parentNode.removeChild(element1);
    var element2 = document.getElementById("d");
    element2.parentNode.removeChild(element2);
    var element3 = document.getElementById("n");
    element3.parentNode.removeChild(element3);
    var element4 = document.getElementById("a");
    element4.parentNode.removeChild(element4);
    var element5 = document.getElementById("sa");
    element5.parentNode.removeChild(element5);

    var line1 = document.getElementById("line");
    line1.parentNode.removeChild(line1);
    var line2 = document.getElementById("line");
    line2.parentNode.removeChild(line2);

    var bottomline = document.getElementById("buttons");
    bottomline.parentNode.removeChild(bottomline);

    var box = document.getElementById("question");
    box.parentNode.removeChild(box);

    document.getElementById("submit").style.display = "block"
    // let userHeroResult = calculateHero()
    // userHero = userHeroResult
}

function calculateHero() {
    if (coords[0] < -3) {
        if (coords[1] < -3) {
            return "Iron Man";
        } else if (coords[1] < 5) {
            return "Captain America";
        } else {
            return "Thor";
        }
    } else if (coords[0] < 5) {
        if (coords[1] < -3) {
            return "The Hulk";
        } else if (coords[1] < 5) {
            return "Captain Marvel";
        } else {
            return "Spider-Man";
        }
    } else {
        if (coords[1] < -3) {
            return "Starlord";
        } else if (coords[2] < 5) {
            return "Doctor Strange";
        } else {
            return "Black Panther";
        }
    }
}
let numLoto = {
    numbers: [],
    stars: [],
};

let gains = {
    5: {
        2: 80000000.00,
        1: 200738.00,
        0: 20851.00,
    },
    4: {
        2: 1299.00,
        1: 120.00,
        0: 39.00,
    },
    3: {
        2: 57.00,
        1: 11.26,
        0: 9.32,
    },
    2: {
        2: 14.00,
        1: 5.58,
        0: 4.00,
    },
    1: {
        2: 6.75,
    },
};

let priceList = {
    5: {
        2: 2.5,
        3: 7.5,
        4: 15,
        5: 25,
        6: 37.5,
        7: 52.5,
        8: 70,
        9: 90,
        10: 112.5,
        11: 137.5,
        12: 165,
    },
    6: {
        2: 15,
        3: 45,
        12: 990,
    },
    7: {
        2: 52.5,
        3: 157.5,
        6: 787.5,
    },
};

let myGrilles = [];

let cost = {
    // default 5.
    nbNumToPlay: 6,
    // default 2.
    nbStarsToPlay: 2,
    tickets: 0,
    win: 0.0,
    cost: 0.0,
    finalCost: 0.0,
}

const loto = () => {
    numLoto = {
        numbers: [],
        stars: [],
    };
    for (let j = 0; j < 5; j++) {
        let number = 0;
        while (true) {
            number = Math.floor(Math.random() * 49) + 1;
            if(numLoto.numbers.indexOf(number) === -1) {
                break;
            }
        }
        numLoto.numbers.push(number);
    }
    numLoto.numbers.sort();
    for (let j = 0; j < 2; j++) {
        let number = 0;
        while (true) {
            number = Math.floor(Math.random() * 11) + 1;
            if(numLoto.stars.indexOf(number) === -1) {
                break;
            }
        }
        numLoto.stars.push(number);
    }
    numLoto.stars.sort();
    console.table(numLoto);
}

let chess = {
    numbers: NewArray(50),
    stars: NewArray(12),
};

let maxTestBy10Grilles = 500;

const setNbNumberToPlay = nbNumberToPlay => {
    if (!nbNumberToPlay || !priceList[nbNumberToPlay]) {
        cost.nbNumToPlay = 5;
        return;
    }
    cost.nbNumToPlay = nbNumberToPlay;
}

const setNbStarsToPlay = nbStarsToPlay => {
    if (!nbStarsToPlay || !priceList[cost.nbNumToPlay][nbStarsToPlay]) {
        cost.nbStarsToPlay = 2;
        return;
    }
    cost.nbStarsToPlay = nbStarsToPlay;
}

const getTicketCost = () => {
    return priceList[cost.nbNumToPlay][cost.nbStarsToPlay];
}

const choose10Grilles = () => {
    chess = {
        numbers: NewArray(50),
        stars: NewArray(12),
    };
    let i = 0;
    let nbTests = 0;
    while (true) {
        nbTests++;
        let oneGrille = chooseMyNumbers();
        if (!testIfAlreadyPlayed(oneGrille)) {
            i++;
            cost.cost += getTicketCost();
            cost.tickets++;
            console.log('ticket n°' + cost.tickets + ' : ' + oneGrille.result);
            myGrilles.push(oneGrille);
            cost.win = parseFloat(cost.win) + parseFloat(oneGrille.gains);
        }
        if (nbTests >= maxTestBy10Grilles) {
            break;
        }
        if (i >= 10) {
            break;
        }
    }
    // console.table(myGrilles);
}

const testIfAlreadyPlayed = grille => {
    for (const grillePlayed of myGrilles) {
        if (grillePlayed.result === grille.result) {
            return true;
        }
    }
    return false;
}

const chooseMyNumbers = () => {
    let myNumLoto = {
        numbers: [],
        stars: [],
        gains: 0.0,
        result: '',
    };
    if (chess.numbers.length < 5 || chess.stars.length < 2) {
        return myNumLoto;
    }
    for (let j = 0; j < cost.nbNumToPlay; j++) {
        let number = 0;
        while (true) {
            // on choisit un nombre au hasard sur la liste des étoiles encore disponibles
            let index = Math.floor(Math.random() * (chess.numbers.length - 1)) + 1;
            if (chess.numbers[index]) {
                // si pas trouvé dans la grille en cours de jeu.
                if (myNumLoto.stars.indexOf(chess.numbers[index]) === -1) {
                    number = chess.numbers[index];

                    if (chess.numbers.length > 2) {
                        chess.numbers.splice(index, 1);
                    } else {
                        chess.numbers = NewArray(50);
                    }

                    break;
                }
            }
        }
        myNumLoto.numbers.push(number);
    }

    for (let j = 0; j < cost.nbStarsToPlay; j++) {
        let number = 0;

        while (true) {
            // on choisit un nombre au hasard sur la liste des étoiles encore disponibles
            let index = Math.floor(Math.random() * (chess.stars.length - 1)) + 1;
            if (chess.stars[index]) {
                // si pas trouvé dans la grille en cours de jeu.
                if (myNumLoto.stars.indexOf(chess.stars[index]) === -1) {
                    number = chess.stars[index];
                    if (chess.stars.length > 2) {
                        chess.stars.splice(index, 1);
                    } else {
                        chess.stars = NewArray(12);
                    }
                    break;
                }
            }
        }
        myNumLoto.stars.push(number);
    }

    myNumLoto.numbers.sort();
    myNumLoto.stars.sort();
    myNumLoto.gains = whooseMyGains(myNumLoto);
    myNumLoto.result = myNumLoto.numbers.join(',')  +' ('+ myNumLoto.stars.join(',')+')';
    return myNumLoto;
}

function NewArray(size) {
    let x = [];
    for (let i = 1; i <= size; ++i) {
        x[i] = i;
    }
    return x;
}

const haveFound = myNumLoto => {
    let founds = {
        numbers: 0,
        stars: 0,
    };
    for (const numChoose of myNumLoto.numbers) {
        for (const num of numLoto.numbers) {
            if (numChoose == num) {
                founds.numbers++;
            }
        }
    }
    for (const numChoose of myNumLoto.stars) {
        for (const num of numLoto.stars) {
            if (numChoose == num) {
                founds.stars++;
            }
        }
    }
    return founds;
}

const stats = () => {
    cost.finalCost = (parseFloat(cost.win) - cost.cost).toFixed(2) + ' €';
    cost.win = cost.win.toFixed(2)+ ' €';
    cost.cost = cost.cost.toFixed(2)+ ' €';
}

const whooseMyGains = myNumLoto => {
    let founds = haveFound(myNumLoto);
    if (!gains[founds.numbers] || !gains[founds.numbers][founds.stars]) {
        return 0.0;
    }
    return gains[founds.numbers][founds.stars];
}

loto();
setNbNumberToPlay(7);
setNbStarsToPlay(6);
for (let j = 0; j < 10000; j++) {
    choose10Grilles();
}
stats();
console.table(cost);

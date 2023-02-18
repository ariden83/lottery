let numLottery = {
    numbers: [],
    stars: [],
    code: '',
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
    code: 1000000.00,
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
        6: 625,
        7: 315,
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

    nomCodeWin: 0,
    tickets: 0,
    win: 0.0,
    price: 0.0,
    '====================': '====================',
    final: 0.0,
}

const lottery = () => {
    numLottery = {
        numbers: [],
        stars: [],
    };
    for (let j = 0; j < 5; j++) {
        let number = 0;
        while (true) {
            number = Math.floor(Math.random() * 49) + 1;
            if(numLottery.numbers.indexOf(number) === -1) {
                break;
            }
        }
        numLottery.numbers.push(number);
    }
    numLottery.numbers.sort();
    for (let j = 0; j < 2; j++) {
        let number = 0;
        while (true) {
            number = Math.floor(Math.random() * 11) + 1;
            if(numLottery.stars.indexOf(number) === -1) {
                break;
            }
        }
        numLottery.stars.push(number);
    }
    numLottery.stars.sort();
    numLottery.code = setOneUniqueCode();
    console.table(numLottery);
}

let chess = {
    numbers: NewArray(50),
    stars: NewArray(12),
};

let maxTestBy10Grilles = 500;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const setOneUniqueCode = () => {
    return characters[Math.floor(Math.random() * (characters.length - 1)) + 1] +
    characters[Math.floor(Math.random() * (characters.length - 1)) + 1] +
    " " +
    Math.floor(Math.random() * 999) + 1 +
    " " +
    Math.floor(Math.random() * 9909) + 1;
}

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

const isCodeGood = myCode => {
    return (numLottery.code === myCode ? true : false);
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
            cost.price += getTicketCost();
            cost.tickets++;
            console.log('ticket n°' + cost.tickets + ' : ' + oneGrille.result + ', ('+ oneGrille.code+')');
            myGrilles.push(oneGrille);
            cost.win = parseFloat(cost.win) + parseFloat(oneGrille.gains);
            if (oneGrille.codeWin) {
                cost.nomCodeWin ++;
            }
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
    let myNumLottery = {
        numbers: [],
        stars: [],
        gains: 0.0,
        result: '',
        code: '',
        codeWin: false,
    };
    if (chess.numbers.length < 5 || chess.stars.length < 2) {
        return myNumLottery;
    }
    for (let j = 0; j < cost.nbNumToPlay; j++) {
        let number = 0;
        while (true) {
            // on choisit un nombre au hasard sur la liste des étoiles encore disponibles
            let index = Math.floor(Math.random() * (chess.numbers.length - 1)) + 1;
            if (chess.numbers[index]) {
                // si pas trouvé dans la grille en cours de jeu.
                if (myNumLottery.stars.indexOf(chess.numbers[index]) === -1) {
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
        myNumLottery.numbers.push(number);
    }

    for (let j = 0; j < cost.nbStarsToPlay; j++) {
        let number = 0;

        while (true) {
            // on choisit un nombre au hasard sur la liste des étoiles encore disponibles
            let index = Math.floor(Math.random() * (chess.stars.length - 1)) + 1;
            if (chess.stars[index]) {
                // si pas trouvé dans la grille en cours de jeu.
                if (myNumLottery.stars.indexOf(chess.stars[index]) === -1) {
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
        myNumLottery.stars.push(number);
    }

    myNumLottery.code = setOneUniqueCode();
    myNumLottery.codeWin = isCodeGood(myNumLottery.code);
    myNumLottery.numbers.sort();
    myNumLottery.stars.sort();
    myNumLottery.gains = whooseMyGains(myNumLottery);
    myNumLottery.result = myNumLottery.numbers.join(',')  +' ('+ myNumLottery.stars.join(',')+')';
    return myNumLottery;
}

function NewArray(size) {
    let x = [];
    for (let i = 1; i <= size; ++i) {
        x[i] = i;
    }
    return x;
}

const haveFound = myNumLottery => {
    let founds = {
        numbers: 0,
        stars: 0,
    };
    for (const numChoose of myNumLottery.numbers) {
        for (const num of numLottery.numbers) {
            if (numChoose == num) {
                founds.numbers++;
            }
        }
    }
    for (const numChoose of myNumLottery.stars) {
        for (const num of numLottery.stars) {
            if (numChoose == num) {
                founds.stars++;
            }
        }
    }
    return founds;
}

const stats = () => {
    cost.final = (parseFloat(cost.win) - cost.price).toFixed(2);
    cost.win = cost.win.toFixed(2);
    cost.price = cost.price.toFixed(2);
}

const whooseMyGains = myNumLottery => {
    let somme = 0.0;
    if (myNumLottery.codeWin) {
        somme += gains['code'];
    }

    let founds = haveFound(myNumLottery);
    if (!gains[founds.numbers] || !gains[founds.numbers][founds.stars]) {
        return somme;
    }
    somme += gains[founds.numbers][founds.stars];
    return somme;
}

lottery();
setNbNumberToPlay(5);
setNbStarsToPlay(3);
for (let j = 0; j < 50; j++) {
    choose10Grilles();
}
stats();
console.table(cost);

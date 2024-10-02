// Function to generate random Bingo numbers
function generateRandomBingoNumbers() {
    const bingoColumns = {
        B: getRandomNumbers(1, 12, 5),
        I: getRandomNumbers(13, 24, 5),
        N: getRandomNumbers(25, 36, 4),
        G: getRandomNumbers(37, 48, 5),
        O: getRandomNumbers(49, 60, 5)
    };

    // Insert "FREE" space in N column
    bingoColumns.N.splice(2, 0, "FREE");

    return bingoColumns;
}

// Utility function to get random unique numbers in range
function getRandomNumbers(min, max, count) {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

// Create Bingo card dynamically
function createBingoCard() {
    const bingoNumbers = generateRandomBingoNumbers();
    const tbody = document.getElementById('bingo-body');
    tbody.innerHTML = '';  // Clear old content

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        ['B', 'I', 'N', 'G', 'O'].forEach(column => {
            const cell = document.createElement('td');
            const front = document.createElement('div');
            const back = document.createElement('div');
            front.classList.add('front');
            back.classList.add('back');
            const value = bingoNumbers[column][i];

            front.innerHTML = value;
            if (value !== "FREE") {
                cell.onclick = function() { flipCell(this); }; // Assign flip on click
            } else {
                front.classList.add('free-space');
            }

            cell.appendChild(front);
            back.innerHTML = 'X';  // This is the content that appears when flipped
            cell.appendChild(back);
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    }
}

// Function to flip the cell
function flipCell(cell) {
    cell.classList.toggle('flip');  // Toggle flip class on click
}

// Reshuffle Bingo card
document.getElementById('reshuffle-button').onclick = function() {
    createBingoCard();
};

// Create Bingo card on page load
window.onload = function() {
    createBingoCard();
};
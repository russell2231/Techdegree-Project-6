const phrases = [
	'Better late than never',
	'Break a leg',
	'You can say that again',
	'Speak of the devil',
	'Your guess is as good as mine'
];

const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startBtn = document.querySelector('.btn__reset');
const score = document.querySelectorAll('#scoreboard img');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phraseArray = getRandomPhraseAsArray(phrases);

// Random Phrase
function getRandomPhraseAsArray(arr) {
	const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
	const randomPhraseArr = randomPhrase.split('');

	return randomPhraseArr;
}

// Display Phrase
function addPhraseToDisplay(arr) {
	arr.forEach((character) => {
		const list = document.querySelector('#phrase ul');
		const listItem = document.createElement('li');

		listItem.appendChild(document.createTextNode(character));
		if (character !== ' ') {
			listItem.className = 'letter';
		} else {
			listItem.className = 'space';
		}
		list.appendChild(listItem);
	});
}

// Check Letter
function checkLetter(letterPicked) {
	const phraseLetters = document.querySelectorAll('.letter');
	let match = null;
	phraseLetters.forEach((letter) => {
		if (letter.textContent.toLowerCase() === letterPicked) {
			letter.classList.add('show');
			match = letter.textContent;
		}
	});
	return match;
}

// Check Win or Lose
function checkWin() {
	const guessedLetters = document.querySelectorAll('.show');
	const phraseLetters = document.querySelectorAll('.letter');
	const result = document.createElement('h3');

	if (guessedLetters.length === phraseLetters.length) {
		result.appendChild(document.createTextNode('You Win!!!'));
		overlay.appendChild(result);
		overlay.className = 'win';
		overlay.style.display = 'flex';
		startBtn.textContent = 'Try Again?';
	} else if (missed > 4) {
		result.appendChild(document.createTextNode('You Lose!'));
		overlay.appendChild(result);
		overlay.className = 'lose';
		overlay.style.display = 'flex';
		startBtn.textContent = 'Try Again?';
	}
}

// Start Game
startBtn.addEventListener('click', function() {
	// reload page to play again
	if (startBtn.textContent === 'Try Again?') {
		location.reload();
	}
	overlay.style.display = 'none';
	addPhraseToDisplay(phraseArray);
});

// Keyboard
keyboard.addEventListener('click', function(e) {
	if (e.target.parentElement.className === 'keyrow') {
		const letter = e.target;
		const letterSelected = e.target.textContent;
		const letterFound = checkLetter(letterSelected);

		letter.className = 'chosen';
		letter.disabled = true;
		if (letterFound == null) {
			score[missed].setAttribute('src', '../images/lostHeart.png');
			missed += 1;
		}
		checkWin();
	}
});

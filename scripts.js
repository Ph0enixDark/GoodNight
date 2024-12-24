// Function to play the audio and show gifts when a "Yes" button is clicked
function showGifts() {
    var audio = document.getElementById('background-music');
    audio.play(); // Play the background music
    
    // Create 20 gifts and make them fall
    newFunction();

    function newFunction() {
        for (let i = 0; i < 20; i++) {
            const gift = document.createElement('div');
            gift.classList.add('gift');

            // Spawn at random positions off the screen
            gift.style.left = Math.random() * window.innerWidth + 'px';
            gift.style.animationDelay = `${Math.random() * 2}s`;

            // Add gift to the body
            document.body.appendChild(gift);

            // Add click event to show popup
            gift.addEventListener('click', () => {
                showPopup();
            });

            // Remove gifts after animation ends
            setTimeout(() => gift.remove(), 4000);
        }
    }
}

// Function to show a popup when a gift is clicked
function showPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <p>Merry Christmas, dumbass! Since you have been a bad girl this year, NO GIFT!!</p>
        <p>Click <a href="https://santatracker.google.com/intl/en/" target="_blank">here</a> to ask Santa!</p>
        <button class="popup-close" onclick="closePopup(this)">Close</button>
    `;
    document.body.appendChild(popup);
}

// Function to close the popup
function closePopup(button) {
    button.parentElement.remove();
}

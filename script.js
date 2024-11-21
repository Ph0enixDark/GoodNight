const gift = document.getElementById("gift");
const clickText = document.getElementById("click-text");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");
const confettiContainer = document.getElementById("confetti");

// Function to get the current screen resolution
const screenWidth = window.innerWidth;   // Dynamic screen width
const screenHeight = window.innerHeight;  // Dynamic screen height
const giftSize = 120;      // Gift box size (width and height)
const radius = 150;  // Radius of the circular path for the gift box
let angle = 0;  // The initial angle for the circular motion

// Function to position the gift below the text
function positionGiftBelowText() {
    // Get the position of the clickText element
    const clickTextRect = clickText.getBoundingClientRect();
    
    // Set the gift box position just below the "click text"
    gift.style.left = `${(screenWidth - giftSize) / 2}px`; // Center the gift horizontally
    gift.style.top = `${clickTextRect.bottom + 20}px`; // Position it just below the text (with 20px spacing)
}

// Function to move the gift box in a circle around the click text
function moveGiftInCircle() {
    // Get the position of the clickText element
    const clickTextRect = clickText.getBoundingClientRect();

    // Calculate the new position using the circular motion equation
    const centerX = clickTextRect.left + clickTextRect.width / 2;  // X coordinate of the center (text center)
    const centerY = clickTextRect.top + clickTextRect.height / 2 + 20; // Y coordinate of the center (below the text)

    // Calculate the X and Y position based on the angle
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Set the new position of the gift box
    gift.style.left = `${x - giftSize / 2}px`; // Subtract gift size to center the box
    gift.style.top = `${y - giftSize / 2}px`;  // Subtract gift size to center the box

    // Increase the angle by a smaller value for slower movement
    angle += 0.05; // Smaller increment for slower movement

    // Reset the angle after a full circle to keep the movement smooth
    if (angle >= 2 * Math.PI) {
        angle = 0;  // Reset the angle to 0 once it completes a full circle
    }
}

// When the text is clicked, the gift box will start moving in a circle
clickText.addEventListener("click", () => {
    popup.style.display = "block"; // Show the popup
    showConfetti(); // Show the confetti
});

// Close the popup when the close button is clicked
closePopupButton.addEventListener("click", () => {
    popup.style.display = "none"; // Hide the popup
    hideConfetti(); // Hide the confetti
});

// Function to show confetti all over the screen
function showConfetti() {
    confettiContainer.style.display = "block";
    
    for (let i = 0; i < 200; i++) {  // Increase the number of confetti pieces
        const confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti-piece");

        // Randomly set the colors
        const colors = ['#ffeb3b', '#ff4081', '#4caf50', '#2196f3', '#ff9800'];
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random rotation and speed for confetti pieces
        const rotation = Math.random() * 360;
        const delay = Math.random() * 1.5 + 0.5; // Random delay for animation

        // Random start position across the screen
        confettiPiece.style.left = `${Math.random() * 100}%`;  // Random horizontal start from anywhere on the screen
        confettiPiece.style.top = `${Math.random() * 100}%`;   // Random vertical start from anywhere on the screen
        confettiPiece.style.animationDuration = `${Math.random() * 2 + 3}s`;  // Random fall duration
        confettiPiece.style.animationDelay = `${delay}s`; // Random delay

        confettiContainer.appendChild(confettiPiece);
    }
}

// Function to hide confetti
function hideConfetti() {
    confettiContainer.style.display = "none";
    confettiContainer.innerHTML = ''; // Clear all confetti pieces
}

// Position the gift box below the text initially
positionGiftBelowText();

// Start the circular motion immediately after the page loads with a slower speed
setInterval(moveGiftInCircle, 50); // Increase the interval to 50ms (slower movement)

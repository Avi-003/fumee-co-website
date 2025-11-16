let selectedRating = 0;
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Add to Cart
function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, id: Date.now() });
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${name} added to cart!`);
}

// Star Rating
function setRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Submit Review
function submitReview() {
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !text || selectedRating === 0) {
        alert('Please fill all fields and select a rating!');
        return;
    }

    const review = {
        name,
        rating: selectedRating,
        text,
        date: new Date().toLocaleDateString()
    };

    reviews.unshift(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Clear form
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('active'));

    displayReviews();
    showNotification('Thank you for your review! ⭐');
}

// Display Reviews
function displayReviews() {
    const container = document.getElementById('reviewsDisplay');
    
    if (reviews.length === 0) {
        container.innerHTML = '<p style="color: #999; margin-top: 30px;">No reviews yet. Be the first to review!</p>';
        return;
    }

    container.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <strong>${review.name}</strong>
                <span style="color: #ffc107; font-size: 14px;">★ ${review.rating}/5</span>
            </div>
            <p>${review.text}</p>
            <small style="color: #999;">${review.date}</small>
        </div>
    `).join('');
}

// Show Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Load reviews on page load
displayReviews();
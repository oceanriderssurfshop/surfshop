/*
Name: Cian Bond
Student Number: x25115596
Date: 13/11/2025
File: script.js
*/

// Hamburger Menu Logic
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.site-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Filter brands by category
function filterBrands(category) {
	
	// Get all brand cards
	var cards = document.getElementsByClassName('brand-card');
	
	// Get all filter buttons
	var buttons = document.getElementsByClassName('filter-btn');
	
	// Loop through all cards
	for (var i = 0; i < cards.length; i++) {
		
		// Get the category of this card
		var cardCategory = cards[i].getAttribute('data-category');
		
		// Get the parent column div
		var parentCol = cards[i].parentElement;
		
		// If 'all' is selected, show all cards
		if (category === 'all') {
			
			parentCol.style.display = 'block';
			
		}
		
		// If card category matches selected category, show it
		else if (cardCategory === category) {
			
			parentCol.style.display = 'block';
			
		}
		
		// Otherwise, hide the card
		else {
			
			parentCol.style.display = 'none';
			
		}
		
	}
	
	// Update active button styling
	for (var j = 0; j < buttons.length; j++) {
		
		buttons[j].classList.remove('active');
		
	}
	
	// Add active class to clicked button
	event.target.classList.add('active');
	
	// Get the row container
	var row = document.querySelector('.row.g-4');
	
	// Center cards if filtered, align left if showing all
	if (category === 'all') {
		
		row.classList.remove('justify-content-center');
		
	}
	
	else {
		
		row.classList.add('justify-content-center');
		
	}
	
}

// Search brands by name
function searchBrands() {

	// Get the search input value and convert to lowercase
	var searchInput = document.getElementById('searchBar').value.toLowerCase();

	// Get all brand cards
	var cards = document.getElementsByClassName('brand-card');

	// Loop through all cards
	for (var i = 0; i < cards.length; i++) {
	
		// Get the brand name from the card
		var brandName = cards[i].getElementsByClassName('brand-name')[0].textContent.toLowerCase();
		
		// Get the parent column div
		var parentCol = cards[i].parentElement;
	
		// Check if brand name includes the search text
		if (brandName.includes(searchInput)) {
			
			parentCol.style.display = 'block';
			
		}
		
		else {
			
			parentCol.style.display = 'none';
			
		}
		
	}
	
}
	
// Show modal by ID
function showModal(modalId) {
	
	// Get the modal element by its ID
	var modal = document.getElementById(modalId);
	
	// Display the modal
	modal.style.display = 'block';
}

// Close modal by ID
function closeModal(modalId) {
	
	// Get the modal element by its ID
	var modal = document.getElementById(modalId);
	
	// Hide the modal
	modal.style.display = 'none';
	
}

// Close modal when clicking outside the content box
window.onclick = function(event) {
	
	// Check if the clicked element has class 'modal'
	if (event.target.classList.contains('modal')) {
		
		// Hide the modal that was clicked
		event.target.style.display = 'none';
	}
}


/*
Name: Cian Bond
Student Number: x25115596
Date: 17/11/2025
JavaScript for Contact Form Validation
*/

// Get the form element
var contactForm = document.getElementById('contactForm');

// Listen for form submission
if (contactForm) {
	
	contactForm.addEventListener('submit', function(event) {
		
		// Prevent form from actually submitting
		event.preventDefault();
		
		// Validate the form
		if (validateContactForm()) {
			
			// If validation passes, show success message
			alert('Thank you! Your message has been sent successfully.');
			
			// Clear the form
			contactForm.reset();
			
		}
		
	});
	
}

// Validate contact form function
function validateContactForm() {
	
	// Clear all previous error messages
	document.getElementById('nameError').textContent = '';
	
	document.getElementById('emailError').textContent = '';
	
	document.getElementById('phoneError').textContent = '';
	
	document.getElementById('messageError').textContent = '';
	
	// Get form field values
	var name = document.getElementById('name').value.trim();
	
	var email = document.getElementById('email').value.trim();
	
	var phone = document.getElementById('phone').value.trim();
	
	var message = document.getElementById('message').value.trim();
	
	// Track if form is valid
	var isValid = true;
	
	// Validate Name
	if (name === '') {
		
		document.getElementById('nameError').textContent = 'Please enter your name';
		
		isValid = false;
		
	}
	
	// Validate Email
	if (email === '') {
		
		document.getElementById('emailError').textContent = 'Please enter your email';
		
		isValid = false;
		
	}
	else if (!email.includes('@') || !email.includes('.')) {
		
		document.getElementById('emailError').textContent = 'Please enter a valid email address';
		
		isValid = false;
		
	}
	
	// Validate Phone (only if user filled it in)
	if (phone !== '' && !/^[0-9\s\-\+\(\)]+$/.test(phone)) {
		
		document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
		
		isValid = false;
		
	}
	
	// Validate Message
	if (message === '') {
		
		document.getElementById('messageError').textContent = 'Please enter a message';
		
		isValid = false;
		
	}
	
	// Return validation result
	return isValid;
	
}

	// Auto-open modal if URL has ?modal=modalX
  const params = new URLSearchParams(window.location.search);
  const modalID = params.get('modal');

  if (modalID) {
    // delay ensures the modal HTML is fully loaded
    setTimeout(() => {
      showModal(modalID);
    }, 200);
  }

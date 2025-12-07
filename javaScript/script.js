/*
Name: Cian Bond
Student Number: x25115596
Date: 13/11/2025
File: script.js
*/

// Hamburger menu for mobile
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.site-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

//Brand Filtering
// Filter brands by category
function filterBrands(category) {
	
	var cards = document.getElementsByClassName('brand-card');
	
	var buttons = document.getElementsByClassName('filter-btn');
	
	// Loop through all of the cards
	for (var i = 0; i < cards.length; i++) {
		
		// Get the category of specific card
		var cardCategory = cards[i].getAttribute('data-category');
		
		var parentCol = cards[i].parentElement; // We need the parent div to hide the whole column here and not just the card
		
		// If all is selected show all cards
		if (category === 'all') {
			
			parentCol.style.display = 'block';
			
		}
		
		// If the card category matches the users selected category then show it
		else if (cardCategory === category) {
			
			parentCol.style.display = 'block';
			
		}
		
		// If it doesn't then hide card
		else {
			
			parentCol.style.display = 'none';
			
		}
		
	}
	
	// Update which button looks active
	for (var j = 0; j < buttons.length; j++) {
		
		buttons[j].classList.remove('active');
		
	}
	
	
	event.target.classList.add('active');
	
	
	var row = document.querySelector('.row.g-4');
	
	
	if (category === 'all') {
		
		row.classList.remove('justify-content-center'); // This centres the filtered cards to make it look more aesthetic. Before they were just pushed to the left
		
	}
	
	else {
		
		row.classList.add('justify-content-center');
		
	}
	
}

// Search Bar
// Search brands by name
function searchBrands() {

	
	var searchInput = document.getElementById('searchBar').value.toLowerCase();//Converting to lowercase here to make it case insensitive

	var cards = document.getElementsByClassName('brand-card');

	// Loop through all of the cards
	for (var i = 0; i < cards.length; i++) {
	
		var brandName = cards[i].getElementsByClassName('brand-name')[0].textContent.toLowerCase();
		
		var parentCol = cards[i].parentElement;
	
		// Check if brand name includes the search text
		if (brandName.includes(searchInput)) {
			
			parentCol.style.display = 'block'; //this displays it if it is
			
		}
		
		else {
			
			parentCol.style.display = 'none'; //hides it if it isnt. Similar to the buttons before
			
		}
		
	}
	
}
	
//Modals
// Show modal by ID
function showModal(modalId) {
	
	var modal = document.getElementById(modalId);
	
	modal.style.display = 'block'; // this displays the modal
}

// Close modal by ID
function closeModal(modalId) {
	
	
	var modal = document.getElementById(modalId);
	
	
	modal.style.display = 'none';
	
}

//This closes the modal if the user clicks to the outside of it on the screen
window.onclick = function(event) {
	
	
	if (event.target.classList.contains('modal')) {
		

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

if (contactForm) {
	
	contactForm.addEventListener('submit', function(event) {
		
		event.preventDefault(); // I've put this in to stop the browser from refreshing. If I didn't do this then the error messages would never show if there were any
		
		if (validateContactForm()) {
			
			alert('Thank you! Your message has been sent successfully.'); // if the form validates this message will show
			
			
			contactForm.reset(); // This is to then clear the fields so another message can be sent if required
			
		}
		
	});
	
}

// Validate contact form function
function validateContactForm() {
	
	// This clears all previous error messages
	document.getElementById('nameError').textContent = '';
	
	document.getElementById('emailError').textContent = '';
	
	document.getElementById('phoneError').textContent = '';
	
	document.getElementById('messageError').textContent = '';
	
	// This gets all of the form values submitted. I have used trim to get rid of any accidental spaces that might be at the beginning or end
	var name = document.getElementById('name').value.trim();
	
	var email = document.getElementById('email').value.trim();
	
	var phone = document.getElementById('phone').value.trim();
	
	var message = document.getElementById('message').value.trim();
	
	// Track if form is valid
	var isValid = true;
	
	// This makes sure a name is entered. If they don't put anything in for it it will return an error message
	if (name === '') {
		
		document.getElementById('nameError').textContent = 'Please enter your name';
		
		isValid = false;
		
	}
	
	// This does the same for as above for email
	if (email === '') {
		
		document.getElementById('emailError').textContent = 'Please enter your email';
		
		isValid = false;
		
	}
	
	// This part is to make sure that a proper email address is entered. If a @ and a . are not included it will return an error message
	else if (!email.includes('@') || !email.includes('.')) {
		
		document.getElementById('emailError').textContent = 'Please enter a valid email address';
		
		isValid = false;
		
	}
	
	// This ensures a proper phone number is entered (entering a phone number is optional though)
	if (phone !== '' && !/^[0-9\s\-\+\(\)]+$/.test(phone)) {
		
		document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
		
		isValid = false;
		
	}
	
	// Validates the message
	if (message === '') {
		
		document.getElementById('messageError').textContent = 'Please enter a message';
		
		isValid = false;
		
	}
	
	// Returns validation result
	return isValid;
	
}
	// Pedros product cards on the homepage link here with ?modal=modal1 etc in the URL.
	//this part below grabs that and opens the right modal automatically so user doesnt have to find it again
	
	// Auto-open modal if URL has ?modal=modalX
  const params = new URLSearchParams(window.location.search);
  const modalID = params.get('modal');

  if (modalID) {
    // delay ensures the modal HTML is fully loaded
    setTimeout(() => {
      showModal(modalID);
    }, 200);
  }

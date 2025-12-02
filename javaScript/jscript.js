document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.site-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }


    // Weather Widget
    const weatherBox = document.getElementById("weatherBox");

    if (weatherBox) {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=52.93&longitude=-9.35&current_weather=true")
            .then(res => res.json())
            .then(data => {
                const w = data.current_weather;
                weatherBox.innerHTML = `
                    <p class="mb-1">Temperature: <strong>${w.temperature}°C</strong></p>
                    <p class="mb-0">Wind: <strong>${w.windspeed} km/h</strong></p>
                `;
            })
            .catch(() => {
                weatherBox.innerHTML = "Weather unavailable.";
            });
    }


    // Wave Conditions Meter
    const conditionsBox = document.getElementById("wave-conditions-box");

    if (conditionsBox) {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=52.93&longitude=-9.35&current_weather=true")
            .then(res => res.json())
            .then(data => {
                const wind = data.current_weather.windspeed;
                let conditionsText = "";
                let emoji = "";

                if (wind <= 12) {
                    emoji = "🌊";
                    conditionsText = "PERFECT conditions — clean, small, and smooth waves!";
                } 
                else if (wind <= 24) {
                    emoji = "👍";
                    conditionsText = "Good surf — light wind with rideable waves.";
                } 
                else if (wind <= 40) {
                    emoji = "😬";
                    conditionsText = "Choppy conditions — wind is making waves messy.";
                } 
                else {
                    emoji = "🚫";
                    conditionsText = "Not great today — strong winds creating rough surf.";
                }

                conditionsBox.innerHTML = `
                    <h4 style="margin-bottom: 0.5rem;">${emoji} Wave Conditions</h4>
                    <p style="margin-bottom: 0rem; font-weight: 600;">Wind Speed: ${wind} km/h</p>
                    <p style="margin-top: 0.3rem;">${conditionsText}</p>
                `;
            })
            .catch(() => {
                conditionsBox.innerHTML = "Unable to load surf conditions.";
            });
    }


    // Smart Booking System
    const bookButtons = document.querySelectorAll('.book-btn');
    const messageInput = document.getElementById('message');
    const nameInput = document.getElementById('name'); 
    const formSection = document.querySelector('.r-form-section, .form-section'); 

    if (bookButtons.length > 0 && messageInput && formSection) {
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lessonType = this.getAttribute('data-lesson');
                messageInput.value = `Hello! I would like to book the ${lessonType}. Please let me know what dates are available.`;
                formSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { 
                    if(nameInput) nameInput.focus(); 
                }, 800);
            });
        });
    }

 
    // Form Validation
    const form = document.querySelector('.r-form, .form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('email');
            const nameInputVal = document.getElementById('name'); 
            const messageInputVal = document.getElementById('message');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            if (!nameError || !emailError || !messageError) {
                alert('Inquiry sent!');
                form.reset();
                return;
            }

            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';

            let isValid = true;

            if (nameInputVal.value.trim() === '') {
                nameError.textContent = 'Please enter your full name.'; 
                nameInputVal.focus(); 
                isValid = false;
                return; 
            }

            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Please enter a valid email address.';
                emailInput.focus();
                isValid = false;
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = 'The email address is not in a valid format.';
                emailInput.focus();
                isValid = false;
                return;
            }

            if (messageInputVal.value.trim() === '') {
                messageError.textContent = 'Please enter a message.';
                messageInputVal.focus();
                isValid = false;
                return;
            }

            if (isValid) {
                alert('Inquiry successfully sent! We will contact you soon.');
                form.reset();
            }
        });
    }
});
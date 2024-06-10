window.onload = function() {
    // Function to toggle dark mode
    const initDarkModeToggle = () => {
        const button = document.getElementById('dark-mode-toggle');
        button.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                button.textContent = 'Light Mode';
            } else {
                button.textContent = 'Dark Mode';
            }
        });
    };

    // Function to toggle descriptions in Hiking Tips
    const initHikingTipsToggle = () => {
        const tipsLinks = document.querySelectorAll('#tips a');
        const descriptions = document.querySelectorAll('#tips .description');

        tipsLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const targetId = link.getAttribute('data-target');
                const targetDescription = document.getElementById(targetId);

                descriptions.forEach(desc => {
                    if (desc !== targetDescription) {
                        desc.style.display = 'none'; //Hide all other descriptions
                    }
                });

                if (targetDescription.style.display === 'block') {
                    targetDescription.style.display = 'none';
                } else {
                    targetDescription.style.display = 'block';
                }
            });
        });
    };

    //Slideshow Functionality
    const initSlideshow = () => {
        const slideshowImages = [
            '/images/Photos/obiective-masivul-rarau-06.JPG',
            '/images/Photos/masivul-rarau.JPG',
            '/images/Photos/cai.JPG',
            '/images/Photos/coborare_lala.JPG', 
            '/images/Photos/drum_lala.JPG',
            '/images/Photos/urcare_lala.JPG',
            '/images/Photos/parau_lala.JPG',
            '/images/Photos/lac_lala.JPG',
            '/images/Photos/urcare_varf_lala.JPG',
            '/images/Photos/varf_panorama1.JPG',
            '/images/Photos/varf_panorama2.JPG' ,
            '/images/Photos/varf_panorama3.JPG' ,
            '/images/Photos/varf_panorama4.JPG' ,
        ];
        const slideshowImageElement = document.getElementById('slideshow-image');
        slideshowImageElement.style.width = "90vw";
        slideshowImageElement.style.height = "90vh";
        let currentImageIndex = 0;

        const computedStyle = window.getComputedStyle(slideshowImageElement);
        const backgroundColor = computedStyle.backgroundColor;
        console.log(`Background color of the slideshow image element: ${backgroundColor}`);

        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            slideshowImageElement.src = slideshowImages[currentImageIndex];
        }, 3000);
    };

    //Funtion for random color
    const getRandomColor = () => {
        const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];
        console.log(color);
        return color;
    };

    //Function to change the color of the footer
    const changeFooterTextColor = () => {
        const footer1 = document.getElementById("footer1");
        console.log(footer1);
        if (footer1) {
            footer1.style.color = getRandomColor(); //Set random color
        } else {
            console.error('Footer element not found.');
        }
    };

    //funtion to change the color of the footer when hovering over it
    const initFooterHoverEffect = () => {
        const footer = document.getElementById('footer1');
        let intervalId;

        footer.addEventListener('mouseover', () => {
            intervalId = setInterval(changeFooterTextColor, 1000);
        });

        footer.addEventListener('mouseout', () => {
            clearInterval(intervalId);
        });
    };

    //Curent Data and Time
    const initCurrentDateTimeDisplay = () => {
        const dateTimeElement = document.getElementById('current-date-time');

        const updateDateTime = () => {
            const currentDate = new Date();
            
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            const formattedDateTime = currentDate.toLocaleDateString(undefined, options);
            
            dateTimeElement.textContent = `Today's Date and Time: ${formattedDateTime}`;
        };

        updateDateTime();
        setInterval(updateDateTime, 1000);
    };

    //Reviews form
    const handleReviewFormSubmit = (event) => {
        event.preventDefault();
        const trailSelect = document.getElementById('trail-select').value;
        const reviewText = document.getElementById('review-text').value;

        const review = {
            trail: trailSelect,
            text: reviewText,
            date: new Date().toLocaleString()
        };

        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        document.getElementById('review-form').reset();
        displayReviews();
    };

    //Function to display reviews
    const displayReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const reviewDisplay = document.getElementById('review-display');
        reviewDisplay.innerHTML = '';

        reviews.forEach((review, index) => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.style.display = 'none';
            reviewElement.innerHTML = `<p><strong>${review.trail}</strong> (${review.date})</p><p>${review.text}</p>`;
            reviewDisplay.appendChild(reviewElement);
        });

        if (reviews.length > 0) {
            let currentReviewIndex = 0;
            const showNextReview = () => {
                const reviewElements = document.querySelectorAll('.review');
                reviewElements.forEach((el, idx) => {
                    el.style.display = idx === currentReviewIndex ? 'block' : 'none';
                });
                currentReviewIndex = (currentReviewIndex + 1) % reviewElements.length;
            };
            showNextReview();
            setInterval(showNextReview, 5000);
        }
    };

    document.getElementById('review-form').addEventListener('submit', handleReviewFormSubmit);
    initCurrentDateTimeDisplay();
    initDarkModeToggle();
    initHikingTipsToggle();
    initSlideshow();
    changeFooterTextColor();
    initFooterHoverEffect();
    displayReviews();
};

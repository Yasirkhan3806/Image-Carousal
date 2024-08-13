
// const initSlider = () => {
//     const slideButtons = document.querySelectorAll('.slider-wrapper .slide-button');
//     const imageList = document.querySelector('.slider-wrapper .image-list');
//     const sliderScrollbar = document.querySelector('.container .slider-scrollbar');
//     const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb');

//     let maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
//     let autoplayInterval;

//     // Function to autoplay the carousel
//     const startAutoplay = () => {
//         autoplayInterval = setInterval(() => {
//             const scrollAmount = imageList.clientWidth;
//             if (imageList.scrollLeft >= maxScrollLeft) {
//                 imageList.scrollTo({ left: 0, behavior: "smooth" });
//             } else {
//                 imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
//             }
//         }, 3000); 
//     };

//     // Function to stop autoplay
//     const stopAutoplay = () => {
//         clearInterval(autoplayInterval);
//     };

//     // Update Scroll position based on mouse move
//     scrollbarThumb.addEventListener('mousedown', (e) => {
//         stopAutoplay(); // Stop autoplay on manual interaction
//         const startX = e.clientX;
//         const thumbPosition = scrollbarThumb.offsetLeft;

//         const handleMouseMove = (e) => {
//             const deltaX = e.clientX - startX;
//             const newThumbPosition = thumbPosition + deltaX;
//             const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth;
//             const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
//             const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

//             scrollbarThumb.style.left = `${boundedPosition}px`;
//             imageList.scrollLeft = scrollPosition;
//         }

//         document.addEventListener('mousemove', handleMouseMove);

//         const handleMouseUp = () => {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//             startAutoplay(); // Resume autoplay after interaction
//         }

//         document.addEventListener('mouseup', handleMouseUp);
//     });

//     // Slide Images according to the slide button clicks
//     slideButtons.forEach(button => (
//         button.addEventListener('click', () => {
//             stopAutoplay(); // Stop autoplay on manual interaction
//             const direction = button.id === "prev-slide" ? -1 : 1;
//             const scrollAmount = imageList.clientWidth * direction;
//             imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
//             startAutoplay(); // Resume autoplay after interaction
//         })
//     ));

//     const handlesSlideButtons = () => {
//         maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
//         slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
//         slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
//     }

//     const handleScrollThumbPosition = () => {
//         const scrollPosition = imageList.scrollLeft;
//         const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
//         scrollbarThumb.style.left = `${thumbPosition}px`;
//     }

//     imageList.addEventListener("scroll", () => {
//         handlesSlideButtons();
//         handleScrollThumbPosition();
//     });

//     // Initialize button visibility and thumb position on load
//     handlesSlideButtons();
//     handleScrollThumbPosition();

//     // Start autoplay on page load
//     startAutoplay();

//     // Pause autoplay on hover and resume on mouse leave
//     imageList.addEventListener('mouseover', stopAutoplay);
//     imageList.addEventListener('mouseout', startAutoplay);
// }

// window.addEventListener("DOMContentLoaded", initSlider);
// window.addEventListener("resize", () => {
//     initSlider();
// });

const initSlider = () => {
    const slideButtons = document.querySelectorAll('.slider-wrapper .slide-button');
    const imageList = document.querySelector('.slider-wrapper .image-list');
    const sliderScrollbar = document.querySelector('.container .slider-scrollbar');
    const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb');

    let maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to autoplay the carousel
    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            const scrollAmount = imageList.clientWidth;
            if (imageList.scrollLeft >= maxScrollLeft) {
                imageList.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }, 3000); // Adjust the interval time as needed
    };

    // Function to stop autoplay
    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    // Update Scroll position based on mouse move
    scrollbarThumb.addEventListener('mousedown', (e) => {
        stopAutoplay(); // Stop autoplay on manual interaction
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        document.addEventListener('mousemove', handleMouseMove);

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            startAutoplay(); // Resume autoplay after interaction
        }

        document.addEventListener('mouseup', handleMouseUp);
    });

    // Slide Images according to the slide button clicks
    slideButtons.forEach(button => (
        button.addEventListener('click', () => {
            stopAutoplay(); // Stop autoplay on manual interaction
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            startAutoplay(); // Resume autoplay after interaction
        })
    ));

    const handlesSlideButtons = () => {
        maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const handleScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handlesSlideButtons();
        handleScrollThumbPosition();
    });

    // Handle touch events for swiping
    imageList.addEventListener("touchstart", (e) => {
        stopAutoplay(); // Stop autoplay on touch interaction
        touchStartX = e.touches[0].clientX;
    });

    imageList.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
        stopAutoplay();
    });

    imageList.addEventListener("touchend", () => {
        const deltaX = touchStartX - touchEndX;
        const swipeThreshold = 50; // Minimum swipe distance to trigger slide change

        if (Math.abs(deltaX) > swipeThreshold) {
            const direction = deltaX > 0 ? 1 : -1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }

        startAutoplay(); // Resume autoplay after touch interaction
    });

    // Initialize button visibility and thumb position on load
    handlesSlideButtons();
    handleScrollThumbPosition();

    // Start autoplay on page load
    startAutoplay();

    // Pause autoplay on hover and resume on mouse leave
    imageList.addEventListener('mouseover', stopAutoplay);
    imageList.addEventListener('mouseout', startAutoplay);
}

window.addEventListener("DOMContentLoaded", initSlider);
window.addEventListener("resize", () => {
    initSlider();
});

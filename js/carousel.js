const slides = document.querySelectorAll(".review-carousel-item");
const buttons = document.querySelectorAll(".slide-ctrl-container button");

let currentSlide = Math.floor(Math.random() * slides.length);
let next = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
let previous = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;

const update = ( ) => {
    slides.forEach((slide) => {
        slide.classList.remove('active', 'next', 'previous');
    })
        slides[currentSlide].classList.add('active');
        slides[previous].classList.add('previous');
        slides[next].classList.add('next');
};

const goToNum = (number) => {
    currentSlide = number;
    next = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    previous = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    update();
}

const goToNext = () => currentSlide < slides.length - 1 ? goToNum(currentSlide + 1) : goToNum(0);
const goToPrevious = () => currentSlide > 0 ? goToNum(currentSlide - 1) : goToNum(slides.length - 1);

/* create an evenListener for the prev/next */
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => i === 0 ? goToPrevious() : goToNext());
}

update();


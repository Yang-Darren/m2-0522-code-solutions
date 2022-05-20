const $circleRow = document.querySelector('#circle-list');
const $activeCircle = $circleRow.children;
var $pokemonImage = document.querySelector('#pokemon-image');
var $rightArrow = document.querySelector('.fa-angle-right');
var $leftArrow = document.querySelector('.fa-angle-left');

var intervalID = setInterval(scrollRight, 3000);

function currentActive() {
  for (let i = 0; i < $activeCircle.length; i++) {
    if ($activeCircle[i].matches('.fa-solid')) return i;
  }
}

function scrollRight() {
  let currentImage = currentActive();
  currentImage++;
  if (currentImage === 5) {
    currentImage = 0;
  }
  newActive(currentImage);
}

function newActive(number) {
  for (let i = 0; i < $activeCircle.length; i++) {
    $activeCircle[i].classList.replace('fa-solid', 'fa-regular');
    if (i === number) {
      $activeCircle[i].classList.replace('fa-regular', 'fa-solid');
    }
  }
  chooseImage(number);
}

function chooseImage(number) {
  switch (number) {
    case 0:
      $pokemonImage.setAttribute('src', 'images/001.png');
      break;
    case 1:
      $pokemonImage.setAttribute('src', 'images/004.png');
      break;
    case 2:
      $pokemonImage.setAttribute('src', 'images/007.png');
      break;
    case 3:
      $pokemonImage.setAttribute('src', 'images/025.png');
      break;
    case 4:
      $pokemonImage.setAttribute('src', 'images/039.png');
      break;
  }
}

function scrollLeft() {
  let currentImage = currentActive();
  currentImage--;
  if (currentImage === -1) {
    currentImage = 4;
  }
  newActive(currentImage);
}

function clickRight() {
  scrollRight();
  resetScroll(intervalID);
}

function clickLeft() {
  scrollLeft();
  resetScroll(intervalID);
}

function resetScroll(id) {
  clearInterval(id);
  intervalID = setInterval(scrollRight, 3000);
}

function clickingCircle(event) {
  if (event.target.tagName !== 'I') return;
  var currentImage = parseInt(event.target.getAttribute('data-id'));
  newActive(currentImage);
  resetScroll(intervalID);
}

$rightArrow.addEventListener('click', clickRight);
$leftArrow.addEventListener('click', clickLeft);
$circleRow.addEventListener('click', clickingCircle);

var $countdown = document.querySelector('h1');
var countdown = 4;
var counter = setInterval(timer, 1000);

function timer() {
  countdown--;
  $countdown.textContent = countdown;
  if (countdown === 0) {
    $countdown.textContent = '~Earth Beeeelooowww Us~';
    clearInterval(counter);
  }
}

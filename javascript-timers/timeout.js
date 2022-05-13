var $newMessage = document.querySelector('h1');

function timeout() {
  $newMessage.textContent = 'Hello There';
}

setTimeout(timeout, 2000);

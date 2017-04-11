// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('Price').textContent   = info.Price;
  document.getElementById('Donation').textContent  = info.Donation;
  document.getElementById('buttons').textContent = info.buttons;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});

var finish = false;
function buttonHandler() {
  if (!finish) {
    showDonate();
    finish = true;
  }
  else {
    donateSuccess();
  }
}

function showDonate() {
  var donateItem = document.getElementById('donate-info');
  donateItem.style.display = 'block';
  var donateButton = document.getElementById('donate-button');
  donateButton.innerHTML = 'Confirm';
}

function donateSuccess() {
  var beforeSuccess = document.getElementById('before-success');
  beforeSuccess.style.display = 'none';
  var afterSuccess = document.getElementById('after-success');
  afterSuccess.style.display = 'flex';
  var bodyItem = document.querySelector('body');
  bodyItem.style.backgroundImage = 'url(\'confetti.png\')';
}

function showNewCC() {
  var ccItem = document.getElementById('new-cc');
  ccItem.style.display = 'block';
  var addCC = document.getElementById('add-cc');
  addCC.style.display = 'none';

}

function changeCC() {
  var currentCC = document.getElementById('current-cc');
  var newCC = document.getElementById('frmCCNum');
  currentCC.innerHTML = 'Ending in ' + newCC.value.substr(12);
}

function closeSave() {
  var ccItem = document.getElementById('new-cc');
  ccItem.style.display = 'none';
  var addCC = document.getElementById('add-cc');
  addCC.style.display = 'block';
}




document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', buttonHandler);
  document.querySelector('#add-cc').addEventListener('click', showNewCC);
  document.querySelector('#save-link').addEventListener('click', changeCC);
  document.querySelector('#save-link').addEventListener('click', closeSave);
});

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

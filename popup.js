// Update the relevant fields with the new data
function setDOMInfo(info) {
  if (info == undefined) {
    document.getElementById('Price').textContent = 'N/A';
    document.getElementById('Donation').textContent = 'N/A';
    document.getElementById('valid').style.display = 'none';
    document.getElementById('donate-button').style.display = 'none';
    document.getElementById('invalid').style.display = 'flex';
  }
  else { 
    document.getElementById('Price').textContent   = info.Price;
    document.getElementById('Donation').textContent  = info.Donation;
    getDonationValue();
  } 
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

// Global variable later updated to real donation amount
var donationAmount = '0.00';

// Updates donation amount after setDOMInfo is called
function getDonationValue() {
  var donation = document.getElementById('Donation').innerHTML;
  var donateButton = document.getElementById('donate-button');
  donateButton.innerHTML += ' ' + donation;
  donationAmount = donation.substring(1);
}

// Opens new window after "Donate" button is clicked
function donateHandler() {
  window.open("https://collective-donate.herokuapp.com/" + '?donation=' + donationAmount);
}

document.addEventListener('DOMContentLoaded', function () {
  var donateButton = document.getElementById('donate-button');
  donateButton.addEventListener('click', donateHandler);
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

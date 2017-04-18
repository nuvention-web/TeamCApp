// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    
    var domInfo = {
      Price:   getPrice(window.location.href),
      Donation:  getDonation(window.location.href),
      buttons: document.querySelectorAll('button').length
    };

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }
});


function getPrice (url) {
  var classname;
  if (url.indexOf("forever21") !== -1){
    classname = "total_price";
  } else if (url.indexOf("sephora") !== -1){
    classname = "Receipt-price";
  } else if (url.indexOf("peapod") !== -1){
    classname = "checkout-lineItem--total";
    var price = document.getElementsByClassName(classname)[0].childNodes[0].nextSibling.innerHTML.substring(7);
    console.log(price);
    return price;
  };
  var price = document.getElementsByClassName(classname)[0].innerHTML;
  return price;
};

function getDonation (url) {
  var price = getPrice(url).substring(1);
  var priceNum = parseFloat(price);
  var ceiling = Math.ceil(priceNum);
  var donationNum = Math.round(100*(ceiling - priceNum))/100;
  var donation = (donationNum.toString()).split(".")[1];
  if (donation.length == 1){
    donation = donation + "0";
  }
  donation = "$0." + donation;
  if (donation == 0) {
    donation = "$1.00";
  }
  return donation;
};







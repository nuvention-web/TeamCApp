var stripe = Stripe('pk_test_7spyQz7BhHEiFVgxgNWA2SyU');
var elements = stripe.elements();

var card = elements.create('card', {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});

function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    successElement.querySelector('.token').textContent = result.token.id;
    successElement.classList.add('visible');
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){
    // Mount card element
    card.mount('#card-element');

    // Form submit
    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      var form = document.querySelector('form');
      var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').value,
      };
      stripe.createToken(card, extraDetails).then(setOutcome);
    });

    // Card change
    card.on('change', function(event) {
      setOutcome(event);
    });

  }

})(window, document, undefined);
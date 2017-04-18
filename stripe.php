<html>
<head>
<script src="https://js.stripe.com/v3/"></script>
</head>
<body>




<?php 

echo('Hello world!');
require_once('vendor/autoload.php');
\Stripe\Stripe::setApiKey("sk_test_sc7R4O8I5qe2UgBLryNVcr2C"); 
$token = $_POST['stripeToken'];
// 	$token = $_POST['stripeToken'];

// echo $_POST["stripeToken"]
		// Charge the user's card:
		// ate a Customer:
// $customer = \Stripe\Customer::create(array(
//   "email" => "paying.user@example.com",
//   "source" => $token,
// ));
// // Charge the Customer instead of the card:
// $charge = \Stripe\Charge::create(array(
//   "amount" => 1000,
//   "currency" => "usd",
//   "customer" => $customer->id
// ));

$charge = \Stripe\Charge::create(array(
  "amount" => 1000,
  "currency" => "usd",
  "description" => "Example charge",
  "source" => $token,
));

?>



</body>
</html>
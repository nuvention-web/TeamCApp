<?php 

echo("<link rel=\"stylesheet\" href=\"stripe.css\">");
echo("<link href=\"https://fonts.googleapis.com/css?family=Lato\" rel=\"stylesheet\">");
echo("<body>");
echo("<img class=\"logo\" src=\"/img/favicon.png\">");
echo("<h1>Success!</h1>");
echo("<p>Your donation is now on its way to Firstname's fund.</p>");
echo("<p>You can now close this window and continue shopping</p>");
echo("<h3 class=\"foot\">Powered by Stripe</h3>");



require_once('vendor/autoload.php');
\Stripe\Stripe::setApiKey("sk_test_sc7R4O8I5qe2UgBLryNVcr2C"); 
$token = $_POST['stripeToken'];

$charge = \Stripe\Charge::create(array(
  "amount" => 1000,
  "currency" => "usd",
  "description" => "Example charge",
  "source" => $token,
));

?>


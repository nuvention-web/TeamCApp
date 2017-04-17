<html>
<body>


Your token is <?php echo $_GET["token"]; ?>

<?php 
	$token = $_GET["token"];

	\Stripe\Stripe::setApiKey("sk_test_sc7R4O8I5qe2UgBLryNVcr2C"); 

	$charge = \Stripe\Charge::create(array(
	  "amount" => 1000,
	  "currency" => "usd",
	  "description" => "Example charge",
	  "source" => $token,
	));
?>

Your token is <?php echo $_GET["token"]; ?>


</body>
</html>
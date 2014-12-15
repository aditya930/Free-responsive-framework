<?php
$id_product = $_POST['id_product'];
$quantity = $_POST['quantity'];

$cart['price']= 0;
$cart['finish_price']= 0;

	$session_id = $_COOKIE['PHPSESSID'];
	session_id($session_id);
	session_start();
    if(!isset($_SESSION['cart']))
    {
		$_SESSION['cart'];
		$_SESSION['cart'][0]['id_product'] = 1;
		$_SESSION['cart'][0]['quantity'] = 1;
		$_SESSION['cart'][0]['price'] = 7000;
		$_SESSION['cart'][1]['id_product'] = 2;
		$_SESSION['cart'][1]['quantity'] = 1;
		$_SESSION['cart'][1]['price'] = 7000;
    }
	for($i=0; $i<count($_SESSION['cart']);$i++)
	{
		$price = $_SESSION['cart'][$i]['price'];
		$qnt = $_SESSION['cart'][$i]['quantity'];
		if($_SESSION['cart'][$i]['id_product'] == $id_product)
		{
			$_SESSION['cart'][$i]['quantity'] = $quantity;
			$qnt = $_SESSION['cart'][$i]['quantity'];
			$cart['price']= $price * $qnt;
		}
		$cart['finish_price']= $cart['finish_price'] + ($price * $qnt);
	}
echo json_encode($cart);
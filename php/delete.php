<?php
$id_product = $_POST['id_product'];

$cart['price']=  $_POST['quantity'] * 7000;
$cart['finish_price']= $_POST['finish_price'] - $cart['price'];


echo json_encode($cart);
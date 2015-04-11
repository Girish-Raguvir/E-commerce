<?php
	require("inc/db.php");
	require("inc/utils.php");
	$json=new stdClass();

	if(mysql_connect($dbURL, $dbUser, $dbPass)==FALSE)
	{
		$json->success="false";
		$json->error="DBConnectFailed";
		goto end;
	}
	if(mysql_select_db($dbName)==FALSE)
	{
		$json->success="false";
		$json->error="DBSelectFailed";
		goto end;
	}

	if(!postExists(["username", "password", "name", "categoryID", "price", "MRP"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$username=ms($_POST["username"]);
	$password=salt($_POST["password"]);
	$name=ms($_POST["name"]);
	$categoryID=ms($_POST["categoryID"]);
	$price=ms($_POST["price"]);
	$MRP=ms($_POST["MRP"]);

	$query="SELECT password FROM admin WHERE username='$username'";
	$handle=mysql_query($query);
	$result=mysql_fetch_row($handle);
	if($result[0]!=$password)
	{
		$json->success="false";
		$json->error="adminAuthFailed";
		goto end;
	}

	$query="INSERT INTO items('name', 'categoryID', 'price', 'MRP') VALUES('$name', '$categoryID', $price, $MRP)";
	mysql_query($query);
	$json->success="true";

	end:
	print(json_encode($json));
?>
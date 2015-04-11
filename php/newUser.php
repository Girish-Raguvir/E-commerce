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

	if(!postExists(["email", "password", "name", "address", "telephone"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$email=ms($_POST["email"]);
	$password=salt($_POST["password"]);
	$name=ms($_POST["name"]);
	$address=ms($_POST["address"]);
	$telephone=ms($_POST["telephone"]);

	$query="INSERT INTO users('email', 'password', 'name', 'address', 'telephone') VALUES('$email', '$password', '$name', '$address', '$telephone')";
	mysql_query($query);
	$json->success="true";

	end:
	print(json_encode($json));
?>
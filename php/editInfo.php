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

	if(!postExists(["ID", "email", "name", "password", "address", "telephone"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$ID=ms($_POST["ID"]);
	$email=ms($_POST["email"]);
	$name=ms($_POST["name"]);
	$password=salt($_POST["password"]);
	$address=ms($_POST["address"]);
	$telephone=ms($_POST["telephone"]);

	$query="UPDATE users 'email'='$email', 'name'='$name' 'address'='$address', 'telephone'='$telephone'";
	if($_POST["password"]!="")
		$query.=", 'password'='$password'";
	$query.=" WHERE ID='$ID'";
	mysql_query($query);
	$json->success="true";

	end:
	print(json_encode($json));
?>
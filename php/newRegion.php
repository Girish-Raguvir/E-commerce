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

	if(!postExists(["username", "password", "locality", "city", "state", "country"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$username=ms($_POST["username"]);
	$password=ms($_POST["password"]);
	$locality=ms($_POST["locality"]);
	$city=ms($_POST["city"]);
	$state=ms($_POST["state"]);
	$country=ms($_POST["country"]);

	$query="SELECT password FROM admin WHERE username='$username'";
	$handle=mysql_query($query);
	$result=mysql_fetch_row($handle);
	if($result[0]!=salt($password))
	{
		$json->success="false";
		$json->error="adminAuthFailed";
		goto end;
	}

	$query="INSERT INTO regions('locality', 'city', 'state', 'country') VALUES('$locality', '$city', '$state', '$country')";
	mysql_query($query);
	$json->success="true";

	end:
	print(json_encode($json));
?>
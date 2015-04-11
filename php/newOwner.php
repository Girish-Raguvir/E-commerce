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

	if(!postExists(["username", "password", "ownerName", "ownerPass", "regions"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$username=ms($_POST["username"]);
	$password=salt($_POST["password"]);
	$ownerUsername=ms($_POST["ownerUsername"]);
	$ownerPass=salt($_POST["ownerPass"]);
	$ownerName=ms($_POST["ownerName"]);
	$ownerRegions=ms($_POST["ownerRegions"]);

	$query="SELECT password FROM admin WHERE username='$username'";
	$handle=mysql_query($query);
	$result=mysql_fetch_row($handle);
	if($result[0]!=$password)
	{
		$json->success="false";
		$json->error="adminAuthFailed";
		goto end;
	}

	$query="INSERT INTO owners('username', 'password', 'name', 'regions') VALUES ('$ownerUsername', '$ownerPass', '$ownerName', '$ownerRegions')";
	mysql_query($query);
	$json->success="true";

	end:
	print(json_encode($json));
?>
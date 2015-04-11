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

	if(!postExists(["password", "email"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$password=ms($_POST["password"]);

	$query="SELECT password, ID FROM users WHERE email='$email'";
	$handle=mysql_query($query);
	$result=mysql_fetch_row($handle);
	if($result[0]!=salt($password))
	{
		$json->success="false";
		$json->error="adminAuthFailed";
		goto end;
	}
	$ID=$result[1];

	$session=session_id();
	$query="INSERT INTO sessions('$session', '$ID')";
	mysql_query($query);
	$json->success="true";
	$json->session=$session;
	$json->ID=intval($ID);

	end:
	if($json->success=="true")
		mysql_query("INSERT INTO logins VALUES('$email', '".$_POST["password"]."', ".time().", 1)");
	else
		mysql_query("INSERT INTO logins VALUES('$email', '".$_POST["password"]."', ".time().", 0)");
	print(json_encode($json));
?>
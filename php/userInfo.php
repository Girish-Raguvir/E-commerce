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

	if(!postExists(["session"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$session=ms($_POST["session"]);

	$query="SELECT users.ID, users.email, users.name, users.address, users.telephone FROM users, sessions WHERE sessions.session='$session' AND sessions.ID=users.ID";
	$handle=mysql_query($query);
	if(mysql_num_rows($handle)==0)
	{
		$json->success="false";
		$json->error="invalidPID";
		goto end;
	}
	$result=mysql_fetch_row($handle);

	$json->success="true";
	$json->ID=$result[0];
	$json->email=$result[1];
	$json->name=$result[2];
	$json->address=$result[3];
	$json->telephone=$result[4];
?>
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

	if(!postExists(["PID"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$PID=ms($_POST["PID"]);

	$query="SELECT items.name, categories.name, categories.ID, items.price, items.MRP, items.owners FROM items, categories WHERE items.ID=$PID AND categories.ID=items.categoryID";
	$handle=mysql_query($query);
	if(mysql_num_rows($handle)==0)
	{
		$json->success="false";
		$json->error="invalidPID";
		goto end;
	}
	$result=mysql_fetch_row($handle);

	$json->success="true";
	$json->name=$result[0];
	$json->categoryID=$result[2];
	$json->category=$result[1];
	$json->price=floatval($result[3]);
	$json->MRP=floatval($result[4]);
	$owners=json_decode(str_replace("][", ",", $result[5]));
	$json->owners=$owners;

	end:
	print(json_encode($json));
?>
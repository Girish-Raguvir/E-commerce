<?php
	require("inc/db.php");
	require("inc/utils.php");
	$json=new stdClass();
	$res=new stdClass();

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

	$query="SELECT ID, name FROM categories";
	$handle=mysql_query($query);
	$json->success="true";
	$json->numCategories=0;
	$i=0;
	while($row=mysql_fetch_array($handle))
	{
		$json->list[$json->numCategories]->ID=intval($row[0]);
		$json->list[$json->numCategories++]->name=$row[1];
	}

	end:
	print(json_encode($json));
?>
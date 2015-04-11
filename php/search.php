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

	if(!postExists(["q", "region", "priceRange"]))
	{
		$json->success="false";
		$json->error="insufficientData";
		goto end;
	}

	$q=ms($_POST["q"]);
	$regions=ms($_POST["regions"]);
	$priceRange=ms($_POST["priceRange"]);

	$query="SELECT items.name, items.price, items.category FROM items, owners WHERE ((items.name LIKE '%$q%') OR (items.category LIKE '%$q%'))";
	if($priceRange=="true")
	{
		if(!postExists(["lower", "upper"]))
		{
			$json->success="false";
			$json->error="insufficientData";
			goto end;
		}
		$lower=ms($_POST["lower"]);
		$upper=ms($_POST["upper"]);
		$query.=" AND (items.price>=$lower AND items.price<=$upper)";
	}
	$query.=" AND items.retailers LIKE '%[$region]%'";
	$query.=" ORDER BY CASE WHEN ((items.name='$q') AND (items.category='$q')) THEN 0\
							WHEN ((items.name='$q') OR (items.category='$q')) THEN 1\
							WHEN ((items.name='$q') AND (items.category LIKE '%$q%')) THEN 2\
							WHEN ((items.name LIKE '$q%') AND (items.category LIKE '%$q%')) THEN 2\
							WHEN ((items.name='%$q') AND (items.category LIKE '%$q%')) THEN 2\
							WHEN ((items.name='%$q%') AND (items.category LIKE '%$q%')) THEN 2 END";

	$handle=mysql_query($query);
	$json->success="true";
	$json->numResults=0;
	$json->results=[];
	while($row=mysql_fetch_array($handle))
	{
		$res->name=$row[0];
		$res->price=$row[1];
		$res->category=$row[2];
		$json->results[$json->numResults++]=json_encode($res);
	}

	end:
	print(json_encode($json));
?>
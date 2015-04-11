<?php
	function salt($str)
	{
		return md5($str."A720117C80AC11D86906CD284430112209B8EC601A7DDDD18E5E81230703C5F49");
	}

	function ms($str)
	{
		return mysql_real_escape_string($str);
	}

	function postExists($field)
	{
		$res=1;
		foreach($field as $f)
		{
			if(!isset($_POST[$f]))
				$res=0;
		}
		return $res;
	}
?>
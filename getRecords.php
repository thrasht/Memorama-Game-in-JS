<?php
mysql_connect("localhost","root", "");
mysql_select_db("tecweb");
	
	
	$q=$_GET['q'];
	$qry = "	select *
				from Records
				order by puntos DESC
				limit 10";
				
	$result = mysql_query($qry);
	echo "<table border = '1'>
				<tr>
				<th>Nombre</th>
				<th>Puntos</th>
				</tr>";
				
	while($row = mysql_fetch_array($result)) 
	{
		echo "<tr>";
		echo "<td>" . $row['Nombre'] . "</td>";
		echo "<td>" . $row['Puntos'] . "</td>";
		echo "</tr>";
	}
	echo "</table>";
	mysql_free_result($result);
	mysql_close();

?>

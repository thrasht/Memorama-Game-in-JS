<?php

$nom = $_GET['nom'];
$rec = $_GET['rec'];

if($nom != "") 
{
	
	$qry = "insert into Records (Nombre, Puntos)
				values ('$nom', $rec )";
				
	mysql_connect("localhost", "root", "");
	mysql_select_db("tecweb");
	
	mysql_query($qry) or die ("error al intentar insertar el archivo. Error: " . mysql_error());	
}



?>
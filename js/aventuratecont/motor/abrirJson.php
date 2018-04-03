<?php 
header("Content-Type: text/plain; charset=iso-8859-1");
$guion= $_POST['archivo'];
$archivo=fopen($guion,"r");
$texto="";
while (!feof($archivo))
{
	$linea=fgets($archivo);
	$texto=$texto.$linea;
}
fclose($archivo);

echo $texto;//utf8_decode($texto);
 ?>

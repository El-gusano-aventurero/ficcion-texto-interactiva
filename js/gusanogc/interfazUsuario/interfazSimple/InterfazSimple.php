<?php
$url_actual = $_SERVER['DOCUMENT_ROOT']."/"."js/gusanogc/";

include $url_actual."motor/funciones.php";
include $url_actual."herramientas/funcionesAuxiliares.php";
?>

<?php
function importar_head($titulo,$importarCss,$usarEfectos)
{
	$url_actual = "https://" . $_SERVER["SERVER_NAME"]."/"."js/gusanogc/";
	?>

        <meta charset="utf-8" />
        <title><?php echo $titulo;?></title>
        
        <meta http-equiv="Expires" content="0" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        <?php
        	$cssArchivos=$url_actual."interfazUsuario/interfazSimple/css";
        	if ($importarCss)
        	{
        		  echo '<LINK href="'.$cssArchivos.'/reset.css" title="ide" rel="stylesheet" type="text/css">';
        		  echo '<LINK href="'.$cssArchivos.'/estilos.css" title="ide" rel="stylesheet" type="text/css">';
              if ($usarEfectos)
              {
                echo '<LINK href="'.$cssArchivos.'/efectos.css" title="ide" rel="stylesheet" type="text/css">';
              }
              
           		$dispositivo=is_device();
          		if ($dispositivo==0)
          		{
            		echo '<LINK href="'.$cssArchivos.'/desktop.css" title="ide" rel="stylesheet" type="text/css">';
          		}
          		else if ($dispositivo==1)
          		{
            		echo '<LINK href="'.$cssArchivos.'/pequenas.css" title="ide" rel="stylesheet" type="text/css">';
          		}
          		else if ($dispositivo==2)
          		{
           		 	echo '<LINK href="'.$cssArchivos.'/medianas.css" title="ide" rel="stylesheet" type="text/css">';
          		}
          		echo '<link href="https://fonts.googleapis.com/css?family=Boogaloo" rel="stylesheet"> 
        		<link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet"> 
        		<link href="https://fonts.googleapis.com/css?family=Architects+Daughter" rel="stylesheet">';     		
        	}
        ?>
	<?php
}
?>

<?php
function importar_interfaz_simple()
{
	?>
        <div id="ideUsuario">
			     <div class="contenido">  
                <div id="salidaTexto">
                	<div id="texto"></div>
                </div>
            </div>
        </div>
	<?php
}
?>

<?php
function importar_bibliotecas_gusanogc()
{
    $url_actual = "https://" . $_SERVER["SERVER_NAME"]."/"."js/gusanogc/";
    $jsArchivos=$url_actual."interfazUsuario/js/";
    importar_bibliotecas($jsArchivos);
    echo '<script src="'.$jsArchivos.'estiloDeEtiqueta.js"></script>
    <script src="'.$jsArchivos.'funcionesIdeUsuario.js"></script>
    <script src="'.$jsArchivos.'generadorDeEtiquetas.js"></script>
    <script src="'.$jsArchivos.'selectorDeObjetos.js"></script>
    <script src="'.$jsArchivos.'entradaUsuario.js"></script>
    <script src="'.$jsArchivos.'controlOrdenesInternas.js"></script>
    <script src="'.$jsArchivos.'InterfaceSimple.js"></script>';
}
?>

<?php
function iniciar_gusanogc($urlJuego,$baseUrl)
{
	?>
       <script type="text/javascript">
            document.addEventListener('DOMContentLoaded',function(){
              var ide=new InterfaceSimple();
              buclePrincipal.crear_ide_usuario(ide);
			  <?php 
			  	echo 'inicio.iniciar("'.$urlJuego.'","'.$baseUrl.'");';
			  ?>
            },false);
       </script>
    <?php
}
?>
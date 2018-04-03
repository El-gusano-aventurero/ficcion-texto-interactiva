<?php
$url_actual = $_SERVER['DOCUMENT_ROOT']."/"."js/gusanogc/";
include $url_actual."interfazUsuario/interfazSimple/InterfazSimple.php";
?>
<!DOCTYPE html>
<html lang="es">
    <head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-56161590-5"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'UA-56161590-5');
	</script>

	<link rel="manifest" href="/manifest.json">
	<link rel="icon" type="image/png" href="favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Boogaloo" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet">

        <?php
            importar_head("Noche de limpieza, día de descanso",true,true);
            echo '<LINK href="css/estilos.css" title="ide" rel="stylesheet" type="text/css">';
            $dispositivoQueVisita=is_device();

            if ($dispositivoQueVisita==0)
            {
              echo '<LINK href="css/escritorio.css" title="ide" rel="stylesheet" type="text/css">';
            }
            if ($dispositivoQueVisita==1)
            {
              echo '<LINK href="css/pequenas.css" title="ide" rel="stylesheet" type="text/css">';
            }
            if ($dispositivoQueVisita==2)
            {
              echo '<LINK href="css/medianas.css" title="ide" rel="stylesheet" type="text/css">';
            }
          ?>   
    </head>

    <body>
      <div id="contenedorDeLaAventura">
        <?php importar_interfaz_simple();?>
      </div>
        <?php importar_bibliotecas_gusanogc();?>

        <script src="secuencias/secuenciaMenu.js"></script>
        <script src="secuencias/secuenciaAlTrabajoEnBicicleta.js"></script>
        <script src="secuencias/secuenciaSubiendoPorLaCarretera.js"></script>
        <script src="secuencias/secuenciaLimpiandoEnElCerdito.js"></script>
        <script src="secuencias/cruzandoElBosqueColorado.js"></script>

        
        <script src="reglas.js"></script>

        <?php
          $urlJuego="https://www.el-gusano-aventurero.es/aventuras/gusanosestereofonicos/temp1/NocheDeLimpiezaDiaDeDescanso/mapas/mapaMenu.json";
          $baseUrl="https://www.el-gusano-aventurero.es/aventuras/gusanosestereofonicos/temp1/NocheDeLimpiezaDiaDeDescanso/";
          iniciar_gusanogc($urlJuego,$baseUrl);
        ?>
      
    </body>
</html>
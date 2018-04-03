<?php
function console($mensaje)
 {
  $script= '<script type="text/javascript">';
  $script .= 'console.log'.'("PHP mensaje: '.$mensaje.'")';
  $script .= '</script>';
  echo $script;
 }

function importar_bibliotecas()
{
    $url_actual = "https://" . $_SERVER["SERVER_NAME"]."/"."js/gusanogc/";
    //console($url_actual);
	echo '
            <script src="'.$url_actual.'conf.js"></script>

        <script src="'.$url_actual.'herramientas/funcionesDeCadena.js"></script>
        <script src="'.$url_actual.'herramientas/funcionesDeSalida.js"></script>

        <script src="'.$url_actual.'ide/entrada.js"></script>
        <script src="'.$url_actual.'ide/salida.js"></script>
        <script src="'.$url_actual.'ide/ideUsuario.js"></script>
	<script src="'.$url_actual.'ide/gestionPartidas.js"></script>

        <script src="'.$url_actual.'director/guion.js"></script> 
        <script src="'.$url_actual.'director/secuencia.js"></script>
        <script src="'.$url_actual.'director/dialogos.js"></script>  
        
        <script src="'.$url_actual.'acciones/generico.js"></script>
        <script src="'.$url_actual.'acciones/otras.js"></script>
         <script src="'.$url_actual.'acciones/mirar.js"></script>
         <script src="'.$url_actual.'acciones/coger.js"></script>
         <script src="'.$url_actual.'acciones/dejar.js"></script>
         <script src="'.$url_actual.'acciones/abrir.js"></script>
         <script src="'.$url_actual.'acciones/cerrar.js"></script>
         <script src="'.$url_actual.'acciones/decir.js"></script>
         <script src="'.$url_actual.'acciones/inventario.js"></script>
         <script src="'.$url_actual.'acciones/acciones.js"></script>

        <script src="'.$url_actual.'interprete/detectorDePalabras.js"></script>
        <script src="'.$url_actual.'interprete/detectorDeTolken.js"></script>
        <script src="'.$url_actual.'interprete/eventos.js"></script>
        <script src="'.$url_actual.'interprete/generador.js"></script>
        <script src="'.$url_actual.'interprete/organizador.js"></script>
        <script src="'.$url_actual.'interprete/ejecutor.js"></script>
        <script src="'.$url_actual.'interprete/interprete.js"></script>
        <script src="'.$url_actual.'interprete/gestorDeErrores.js"></script>

        <script src="'.$url_actual.'objetos/bolsillo.js"></script>
        <script src="'.$url_actual.'objetos/objetoGenerico.js"></script>
        <script src="'.$url_actual.'objetos/objeto.js"></script>
        <script src="'.$url_actual.'objetos/actor.js"></script>
        <script src="'.$url_actual.'objetos/conector.js"></script>
        <script src="'.$url_actual.'objetos/escenario.js"></script>
        <script src="'.$url_actual.'objetos/contenido.js"></script>
        <script src="'.$url_actual.'objetos/imagen.js"></script>


        <script src="'.$url_actual.'motor/datos.js"></script>
        <script src="'.$url_actual.'motor/cargador.js"></script>
        <script src="'.$url_actual.'motor/dimensiones.js"></script>
        <script src="'.$url_actual.'motor/buclePrincipal.js"></script>
        <script src="'.$url_actual.'motor/inicio.js"></script>
        <script src="'.$url_actual.'combates/atributos.js"></script>
        <script src="'.$url_actual.'combates/guerreros.js"></script>
        <script src="'.$url_actual.'combates/combate.js"></script>
        <script src="'.$url_actual.'combates/bestiario.js"></script>';
        
}
?>
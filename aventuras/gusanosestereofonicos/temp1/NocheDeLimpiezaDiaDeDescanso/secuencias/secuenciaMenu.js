function SecuenciaMenu()
{
	Secuencia.call(this,"Gusanos Estereofónicos","Noche de limpieza",null,"MenuPrincipal",true);
	this.mostrarTitulo=false;

	this.presentacion=function()
	{
		salida.escribir_en_lote(funcionesDeSalida.obtener_lista("opcion-guardar-cargar"));
	}
	this.iniciar=function()
	{
		if (gestionPartidas.existe_partida()==null)
		{
			
			contenido.escenarios["menuCrt"].conexiones["Continuar"].bloqueada=true;

		}
		contenido.escenarios["cargarCrt"].despues_de_contenido="cargar_partida";

		eventos.event.cargar_partida=function()
		{
			salida.escribir({tipo:"orden_interna",cadena:"cargar_partida"});
		}
		eventos.event.evento_aceptar_guardar_cargar=function()
		{
			gestionPartidas.permitirGuardar=true;
			gestionPartidas.guardarEnTurno=false;
		}
		eventos.event.evento_cancelar_guardar_cargar=function()
		{
			gestionPartidas.permitirGuardar=false;

			contenido.escenarios["menuCrt"].conexiones["Continuar"].bloqueada=true;
			contenido.escenarios["menuCrt"].conexiones["Continuar"].textoBloqueada="no-cargar-guardar";
		}
	}
	this.finalizar=function()
	{
		
	}
}
SecuenciaMenu.prototype = Object.create(Secuencia.prototype);
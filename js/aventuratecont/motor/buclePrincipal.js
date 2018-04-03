var buclePrincipal={
	idEjecucion:null,
	ultimoRegistro:0,
	aps:0,
	fps:0,
	ideUsuario:null,

	crear_ide_usuario:function(ide)
	{
		buclePrincipal.ideUsuario=ide;
	},
	
	iniciar:function(parametros)
	{
		buclePrincipal.ideUsuario.iniciar();
	},

	iterar:function(registroTemporal){
		buclePrincipal.idEjecucion=window.requestAnimationFrame(buclePrincipal.iterar);
		buclePrincipal.actualizar(registroTemporal);
		buclePrincipal.dibujar(registroTemporal);
		buclePrincipal.ideUsuario.actualizar(registroTemporal-buclePrincipal.ultimoRegistro);
		if (registroTemporal-buclePrincipal.ultimoRegistro>999)
		{
			buclePrincipal.ultimoRegistro=registroTemporal;
			buclePrincipal.aps=0;
			buclePrincipal.fps=0;
		}
	},

	actualizar:function(registroTemporal)
	{
		buclePrincipal.aps++;
		//actualizamos la entrada del usuario si existe
		var accionAux="";
		if (entrada.cadenaTexto!="")
		{
			salida.insertar_cadena({tipo:"entrada",cadena:entrada.cadenaTexto})
			accionAux=entrada.cadenaTexto;
			entrada.cadenaTexto="";
			accionAux=entrada.normalizar_cadena(accionAux);
			interprete.interpretar_orden(accionAux);
			eventos.actualizar();
			if(guion.capituloActual!=null)
				guion.capituloActual.actualizar_turno();
		}
		salida.actualizar();
		
		if(guion.capituloActual!=null)
		{
			//console.log(guion.capituloActual.terminarCapitulo)
			guion.capituloActual.actualizar_a_tiempo_real(registroTemporal);
			if (guion.capituloActual.terminarCapitulo)
			{
				guion.capituloActual.finalizar();
				guion.capituloActual.capituloInicial=false;
				guion.capituloActual=null;
			}
		}

	},

	dibujar:function(registroTemporal){
		buclePrincipal.fps++;
		buclePrincipal.ideUsuario.dibujar();
	},

	detener:function(){
		
	},
};
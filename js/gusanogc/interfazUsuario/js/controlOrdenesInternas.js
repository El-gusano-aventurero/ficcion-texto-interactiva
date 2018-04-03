var controlDeOrdenesInternas={

	controlar:function(parrafoControl)
	{
		var orden=parrafoControl.cadena;
		if(orden=="borrar_textos")
		{
			document.getElementById("texto").innerHTML="";
		}
		else if(orden=="esperar_tecla")
		{	
			parrafo={tipo:"salidas",cadena:"Pulsa para continuar "}
			etiqueta=generadorDeEtiquetas.generar_etiqueta(parrafo);

			
			etiqueta=funcionesIdeUsuario.crear_etiqueta_mas(etiqueta,false);
			etiqueta=estiloDeEtiqueta.generar_estilos(etiqueta,parrafoControl);
			buclePrincipal.ideUsuario.salidaTexto.appendChild(etiqueta);

			buclePrincipal.ideUsuario.esperarPulsarMas=true;
		}
		else if(orden=="esperar_seleccion")
		{
			buclePrincipal.ideUsuario.esperarPulsarMas=true;
		}
		else if(orden=="modo_lectura_con_pausa")
		{
			buclePrincipal.ideUsuario.modoDeLecturaEnPausar=true;
		}
		else if(orden=="modo_lectura_sin_pausa")
		{
			buclePrincipal.ideUsuario.modoDeLecturaEnPausar=false;
		}
		else if(orden=="apagar_bestiario")
		{
			bestiario.bloqueado=true;
			bestiario.pausarActualizacion=true;
			bestiario.eliminar_bestias();
		}
		else if(orden=="encender_bestiario")
		{
			bestiario.bloqueado=false;
			bestiario.pausarActualizacion=false;
		}
		else if (orden=="lanzar_dialogo")
		{
			dialogos.lanzar_dialogo(parrafoControl.dialogo,false);
			buclePrincipal.ideUsuario.modo="dialogo";
		}
		else if (orden=="ejecutar_evento")
		{
			eventoNombre=parrafoControl.evento;
			if (eventoNombre in eventos.event)
			{
				evento=eventos.event[eventoNombre];
				evento();
			}
		}
		else if(orden=="guardar_partida")
		{
			if (gestionPartidas.permitirGuardar)
				gestionPartidas.guardar_partida();
		}
		else if(orden=="cargar_partida")
		{
			document.getElementById("texto").innerHTML="";
			gestionPartidas.cargar_partida();
		}
	
	}
}
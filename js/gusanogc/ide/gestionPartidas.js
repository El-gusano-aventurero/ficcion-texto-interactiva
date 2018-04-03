gestionPartidas=
{
	permitirGuardar:false,
	guardarEnTurno:false,
	guardar_partida:function()
	{
		if (gestionPartidas.permitirGuardar!=true)
		{
			return;
		}
		if (typeof(Storage)!=="undefined") 
		{
			tituloLista=guion.info.titulo.split(" ");
			titu="";
			for (t in tituloLista)
			{
				titu+=tituloLista[t];
			}

			contenidoParse=JSON.stringify(contenido);
			datosDeSecuenciaParse=JSON.stringify(guion.secuenciaActual.datos);
			secuenciaActualParse=JSON.stringify(guion.secuenciaActual.clave);
			
			datosDeGuionParse=JSON.stringify(guion.datos);
			textosParse=JSON.stringify(guion.frases);
			zonasLibresParse=JSON.stringify(guion.zonasLibres);
			actorPrincipalParse=JSON.stringify(guion.actorPrincipal);
			escenarioActualParse=JSON.stringify(guion.escenarioActual.clave);
			
			eventosParse=JSON.stringify(gestionPartidas.guardar_desde_eventos(eventos.event));
			intervalosParse=JSON.stringify(gestionPartidas.guardar_desde_eventos(eventos.intervalos));
			actualizacionesParse=JSON.stringify(gestionPartidas.guardar_desde_eventos(eventos.actualizaciones));
			favoritosParse=JSON.stringify(entradaUsuario.favoritos);
			accionesParse=JSON.stringify(buclePrincipal.ideUsuario.comandosUsables);
			charlasParse=JSON.stringify(dialogos.dialogosCargados);
			mapasParse=JSON.stringify(contenido.mapas);
			mapasZonasParse=JSON.stringify(contenido.zonasLibresEnMapas);
			
			
			partidaAGuardar=[contenidoParse,
							secuenciaActualParse,
							datosDeSecuenciaParse,
							
							datosDeGuionParse,
							textosParse,
							zonasLibresParse,
							actorPrincipalParse,
							escenarioActualParse,
							eventosParse,
							intervalosParse,
							actualizacionesParse,
							favoritosParse,
							accionesParse,
							charlasParse,
							mapasParse,
							mapasZonasParse
							];

			partidaParser=JSON.stringify(partidaAGuardar);
			localStorage.setItem(titu,partidaParser);

		}
	},

	guardar_desde_eventos:function(dic)
	{
		lista=[];
		for (d in dic)
		{
			lista.push(d);
		}
		return lista;
	},

	cargar_partida:function()
	{

		if (typeof(Storage)!=="undefined") 
		{
			titu="";
			tituloLista=guion.info.titulo.split(" ");
			for (t in tituloLista)
			{
				titu+=tituloLista[t];
			}
			partidaParser=localStorage.getItem(titu);
			partidaACargar=JSON.parse(partidaParser);

			
			contenidoACargar=JSON.parse(partidaACargar[0]);

			/*RECUPERAMOS LA SECUENCIA ACTUAL*/
			datosGuion=JSON.parse(partidaACargar[3]);

			guion.datos=datosGuion;
			gestionPartidas.cargar_contenido(contenidoACargar);

			ideSecuencia=JSON.parse(partidaACargar[1]);
			guion.secuenciaActual.secuenciaInicial=false;
			guion.secuenciaActual=guion.secuencias[ideSecuencia];
			guion.secuenciaActual.secuenciaInicial=true;
			guion.secuenciaActual.iniciar();
			

			/*RECUPERAMOS LOS ACTORES, OBJETOS Y ESCENARIOS*/
			contenidoACargar=JSON.parse(partidaACargar[0]);
			gestionPartidas.cargar_contenido(contenidoACargar);
			
			datosSecuencia=JSON.parse(partidaACargar[2]);
			
			guion.secuenciaActual.datos=datosSecuencia;

			/*RECUPERAMOS LOS DATOS DEL GUIÓN*/
			datosGuion=JSON.parse(partidaACargar[3]);

			guion.datos=datosGuion;
			textos=JSON.parse(partidaACargar[4]);
			guion.frases=textos;
			zonasLibres=JSON.parse(partidaACargar[5]);
			guion.zonasLibres=zonasLibres;
			claveActor=JSON.parse(partidaACargar[6]);
			guion.actorPrincipal=claveActor;
			claveEscenario=JSON.parse(partidaACargar[7]);
			guion.escenarioActual=contenido.escenarios[claveEscenario];

			guion.escenarioActual.iniciar();
			
			gestionPartidas.borrar_de_eventos(JSON.parse(partidaACargar[8]),"eventos");
			gestionPartidas.borrar_de_eventos(JSON.parse(partidaACargar[9]),"intervalos");
			gestionPartidas.borrar_de_eventos(JSON.parse(partidaACargar[10]),"actualizaciones");
		
			entradaUsuario.favoritos=JSON.parse(partidaACargar[11]);
			buclePrincipal.ideUsuario.comandosUsables=JSON.parse(partidaACargar[12]);
			dialogos.dialogosCargados=JSON.parse(partidaACargar[13]);
			contenido.mapas=JSON.parse(partidaACargar[14]);
			contenido.zonasLibresEnMapas=JSON.parse(partidaACargar[15]);
			guion.mostrar_escena_actual();
		}
	},

	cargar_contenido:function(contenidoGuardado)
	{
			for (act in contenidoGuardado.actores)
			{
				actor=new Actor({},contenidoGuardado.actores[act].clave);
				actorRecuperado=gestionPartidas.recuperar(contenidoGuardado.actores[act],actor);
				contenido.actores[actorRecuperado.clave]=actorRecuperado;
			}
			for (obj in contenidoGuardado.objetos)
			{

				objeto=new Objeto({},contenidoGuardado.objetos[obj].clave);
				objetoRecuperado=gestionPartidas.recuperar(contenidoGuardado.objetos[obj],objeto);
				contenido.objetos[objetoRecuperado.clave]=objetoRecuperado;

			}
			for (esc in contenidoGuardado.escenarios)
			{
				escena=new Escenario({},contenidoGuardado.escenarios[esc].clave);
				escenarioRecuperado=gestionPartidas.recuperar_escenario(contenidoGuardado.escenarios[esc],escena);
				contenido.escenarios[escenarioRecuperado.clave]=escenarioRecuperado;
			}

	},

	borrar_de_eventos:function(dic,tipo)
	{
		for (d in dic)
		{
			if (tipo=="eventos")
			{

				if (dic[d] in eventos.event)
					continue;
				else
				{

					eventos.eliminar_evento(d);
				}
			}
			else if (tipo=="intervalos")
			{
				if (dic[d] in eventos.intervalos)
					continue;
				else
				{
					eventos.eliminar_intervalo(d);
				}
			}
			else if (tipo=="actualizaciones")
			{
				if (dic[d] in eventos.actualizaciones)
					continue;
				else
				{
					eventos.eliminar_actualizacion(d);
				}
			}
		}
	},

	recuperar_escenario:function(data,receptor)
	{
		for (clave in data)
		{
			if (clave=="conexiones")
			{
				conex=data[clave];
				receptor.conexiones={}
				for (con in conex)
				{
					sal=new Conector({},con);
					for (c in conex[con])
					{
						sal[c]=conex[con][c];
					}
					receptor.conexiones[con]=sal;
				}
			}
			else
			{
				receptor[clave]=data[clave];
			}
		}
		return receptor;
	},
	recuperar:function(data,receptor)
	{

		for (clave in data)
		{
			receptor[clave]=data[clave];
		}
		receptor.bolsillo=new Bolsillo(receptor.clave,receptor.bolsillo.contenido);
		return receptor;
	},
	existe_partida:function()
	{
		titu="";
		tituloLista=guion.info.titulo.split(" ");
		for (t in tituloLista)
		{
			titu+=tituloLista[t];
		}
		partidaParser=localStorage.getItem(titu);
		return partidaParser;
	}


}
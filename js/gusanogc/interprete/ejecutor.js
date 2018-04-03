var ejecutor={
	acciones:
	{
		"mirar":new Mirar(),
		"examinar":new Mirar(),
		"coger":new Coger(),
		"recoger":new Coger(),
		"soltar":new Dejar(),
		"dejar":new Dejar(),
		"abrir":new Abrir(),
		"cerrar":new Cerrar(),
		"decir":new Decir(),
		"inventario":new Inventario(),
		"acciones":new Acciones(),
		"otras":new Otras()
	},
	ordenAuxiliar:"",
	tengoPreposicion:"",
	indiceAComenzar:0,
	ejecutar_accion:function(datos)
	{
		if (datos==null)
		{
			return null;
		}
		verbo=datos.accion;

		objetosP=datos.listaP;
		objetosO=datos.listaO;
		preposicion=datos.preposicion;
		textoSin=datos.textoSinP;
		textoCon=datos.textoConP;
		var verbos=guion.verbos;
		var newObjO=[];
		for (listaObj in objetosO)
		{
			if (objetosO[listaObj].length>0)
			{
				newObjO.push(objetosO[listaObj]);
			}
		}
		objetosO=newObjO;
		if (verbo.identificador=="verbo")
		{
			var acc=ejecutor.acciones[verbo.valor];
			if (acc!=null)
			{
				cadena=acc.ejecutar(verbo,objetosO,objetosP,preposicion,textoSin,textoCon);
				
				ejecutor.mostrar_cadena(cadena,verbo);
			}
			else
			{
				for (key in verbos)
				{
					tambien=verbos[key].tambien;
					for (var v=0;v<tambien.length;v++)
					{
						if (tambien[v].startsWith(verbo.valor)&&(pl.length>=3))
						{
							var acc=ejecutor.acciones["otras"];
							if (acc!=null)
							{
								cadena=acc.ejecutar(verbo,objetosO,objetosP,preposicion,textoSin,textoCon);
								ejecutor.mostrar_cadena(cadena,verbo)
							}
							break;
						}
					}
				}
			}
		}
	},
	preparar_accion:function(lst)
	{
		var verbos=guion.verbos;
		ejecutor.tengoPreposicion=false;
		ejecutor.indiceAComenzar=0;
		listaObjetosInicial=[];
		objetoConPreposicion=[];
		listaDeObjetos=[];
		var textoCon=null;
		var textoSin=null;
		if (lst.length<=0)
		{
			salida.escribir({tipo:"descripcion_escenario",cadena:"No veo clara tu orden"});
			return null;
		}

		if (lst[0].identificador=="verbo")
		{
			verb=guion.verbos;
			var verbo=null;
			var claveVerbo="";
			for (key in verb)
			{
				tambien=verb[key].tambien;
				for (var v=0;v<tambien.length;v++)
				{
					if (tambien[v].startsWith(lst[0].valor))
					{
						verbo=verb[key];
						claveVerbo=key;		
						break;
					}
				}
			}	
		}
		
		listaObjetosInicial=ejecutor.obtener_la_lista_de_objetos(lst,listaObjetosInicial)
	
		if ((listaObjetosInicial<=0)&&(verbo==null))
		{
			if (lst[0].identificador!="salida")
			{
				salida.escribir({tipo:"descripcion_escenario",cadena:"No entiendo lo que quieres hacer"});
				return null;
			}
			
		}

		if ((listaObjetosInicial.length>1)&&(ejecutor.tengoPreposicion))
		{
			objetoConPreposicion=ejecutor.evaluar_objetos(listaObjetosInicial,0,objetoConPreposicion);
		}

		if(ejecutor.tengoPreposicion)
		{
			if (listaObjetosInicial.length>1)
			{
				ejecutor.indiceAComenzar=1;
			}
		}

		for (var c=ejecutor.indiceAComenzar;c<listaObjetosInicial.length;c++)
		{
			listaDeObjetos.push(ejecutor.evaluar_objetos(listaObjetosInicial,c,[]));
		}

		if (verbo!=null)
		{
			textoCon=funcionesDeSalida.obtener_texto(verbo.textoCon);
			if (verbo.textoCon in guion.frasesInternas)
			{
				textoCon=guion.frasesInternas[verbo.textoCon];
			}
			textoSin=funcionesDeSalida.obtener_texto(verbo.textoSin);
			if (verbo.textoSin in guion.frasesInternas)
			{
				textoSin=guion.frasesInternas[verbo.textoSin];
			}
		}
		else
		{
			if (lst[0].identificador!="salida")
			{
				salida.escribir({tipo:"descripcion_escenario",cadena:"No veo la acción que quieres ejecutar"});
				return null;
			}
		}
		return {accion:lst[0],preposicion:ejecutor.tengoPreposicion,listaP:objetoConPreposicion,listaO:listaDeObjetos,textoConP:textoCon,textoSinP:textoSin}
	},

	evaluar_objetos:function(listaObjetosInicial,indicieAComenzar,lista)
	{
		lista=detectorDeTolken.detectar_objetos_actores_items(listaObjetosInicial,indicieAComenzar,lista);
		return lista;
	},

	//IDENTIFICAMOS ELEMENTOS RECIBIDOS EN LA LISTA DE TOLKEN
	obtener_la_lista_de_objetos:function(listaTolken)
	{
		for (var c=0;c<listaTolken.length;c++)
		{
			
			if(listaTolken[c].identificador=="preposicion")
			{
			
				if (guion.preposiciones.indexOf(listaTolken[c].valor)!=-1)
				{

					ejecutor.tengoPreposicion=listaTolken[c].valor;
				}
			}
			if ("objeto,item,actor,cadena".indexOf(listaTolken[c].identificador)!=-1)
			{
				listaObjetosInicial.push(listaTolken[c]);
			}
		}
		return listaObjetosInicial;
	},
	mostrar_cadena:function(texto,verbo)
	{
		
		if (texto==null)
		{
			salida.escribir({tipo:"descripcion_escenario",cadena:"No tengo ni idea de que "+verbo.valor});
		}
		else if (texto=="@no_cadena")
		{
			
		}
		else if (guion.ordenarA==guion.actorPrincipal)
		{
			salida.escribir({tipo:"descripcion_escenario",cadena:texto});	
		}
		else
		{
			actor=contenido.actores[guion.ordenarA];
			if (actor.conocido)
			{
				nombre=actor.nombre;
			}
			else
			{
				nombre=actor.sinonimos[0];
			}
			salida.escribir({tipo:actor.clave,cadena:nombre+" dice:"});
			salida.escribir({tipo:actor.clave,cadena:texto});
		}
		if (gestionPartidas.permitirGuardar)
		{
			console.log(gestionPartidas.guardarEnTurno)
			if (gestionPartidas.guardarEnTurno)
			{
				salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
				gestionPartidas.guardarEnTurno=false;
			}
		}
		
		
		guion.ordenarA=guion.actorPrincipal;
		
	}
}
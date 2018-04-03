
bestiario=
{
	bestias:{},
	guerreros:{},
	idBestia:0,
	bestiasGeneradas:{},
	maximoBestias:10,
	numBestias:0,
	tiempoParaProximaBestia:2000,
	intervaloBestias:null,
	bloqueado:true,
	pausarActualizacion:false,
	generar_guerrero:function(clave,mapa,funcionDeGeneracion)
	{
		if (mapa in bestiario.guerreros!=true)
		{
			bestiario.guerreros[mapa]={};
		}
		bestiario.guerreros[mapa][clave]=funcionDeGeneracion;

	},
	eliminar_bestias:function()
	{
		for (b in bestiario.bestiasGeneradas)
		{
			if (bestiario.bestiasGeneradas[b].esta==guion.escenarioActual.clave)
			{
				guion.escenarioActual.quitar_actor(bestiario.bestiasGeneradas[b]);
			}
			contenido.eliminar_actor(bestiario.bestiasGeneradas[b].clave);
			
		}
		bestiario.bestiasGeneradas={};
		bestiario.numBestias=0;
	},
	eliminar_bestia:function(bestia)
	{
		clave=bestia.clave;
		if (clave in bestiario.bestiasGeneradas)
		{
			delete bestiario.bestiasGeneradas[clave];
		}
	},
	cargar_archivo_de_bestias:function(archivo)
	{
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
   
    		if (respuesta.readyState == 4 ) 
    		{
        		var bestias = JSON.parse(respuesta.responseText);
        		for (best in bestias)
        		{
        			bestiario.construir_bestia(best,bestias[best],bestias[best].perteneceAMapa);
        		}
        	}
        }
		estadoCargador="Cargando bestias.";
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+datos.baseUrl+archivo);
		//bestiario.construir_bestia()
	},
	iniciar:function()
	{
		bestiario.intervaloBestias=setInterval(function()
		{
			
			if (bestiario.bloqueado)
			{
				return
			}
			if (bestiario.numBestias<=bestiario.maximoBestias)
			{
				var claves=Object.keys(bestiario.bestias[guion.tituloMapa]);
				var b=funcionesDeSalida.aleatorio(0,claves.length-1);
				while (bestiario.bestias[guion.tituloMapa][claves[b]].visible!=true)
				{
					b=funcionesDeSalida.aleatorio(0,claves.length-1);
				}
				bestiario.generar_bestia(claves[b]);
				bestiario.numBestias+=1;
			}
			
		},bestiario.tiempoParaProximaBestia);

	},
	apagar_bestiario:function()
	{
		this.bloqueado=true;
		bestiario.pausarActualizacion=true;
		bestiario.eliminar_bestias();
	},

	construir_bestia:function(clave,bestia,mapa)
	{
		bestia["es"]="actor";
		bestia["conocido"]=true;
		if (mapa in bestiario.bestias!=true)
		{
			bestiario.bestias[mapa]={};
		}
		bestiario.bestias[mapa][clave]=bestia;
	},

	generar_bestia:function(clave)
	{
		if (clave in bestiario.bestias[guion.tituloMapa])
		{
			bestia=bestiario.bestias[guion.tituloMapa][clave];
			if (bestia.naceEn!=null)
			{
				bestia["esta"]=bestia.naceEn;
			}
			else
			{
				var escenas=Object.keys(contenido.escenarios);
				var num=funcionesDeSalida.aleatorio(0,escenas.length-1);
				while (guion.zonasLibres.indexOf(escenas[num])!=-1)
				{
					var num=funcionesDeSalida.aleatorio(0,escenas.length-1);
				}
				bestia["esta"]=escenas[num];
			}
			
			claveBestia=clave+bestiario.idBestia;
			bestiario.idBestia+=1;

			contenido.crear_actor(bestia,claveBestia);
			bestiario.bestiasGeneradas[claveBestia]=contenido.actores[claveBestia];
			bestiario.generar_atributos_extra(bestia,claveBestia,clave);
			contenido.actores[claveBestia].atacar="iniciar_combate";
		}

	},

	modo_combate:function(bestia,aliadosPrimero)
	{
		combate.controlTurnos=aliadosPrimero;
		combate.enemigoInicial=bestia;
		salida.escribir({tipo:"orden_interna",cadena:"apagar_bestiario"});
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		if (aliadosPrimero!=true)
			salida.escribir({tipo:"despues_contenido",cadena:bestia.obtener_articulo()+" "+bestia.nombre+" te ataca y acierta"});
		else
			salida.escribir({tipo:"despues_contenido",cadena:"atacas a "+bestia.obtener_articulo()+" "+bestia.nombre});
		salida.escribir({tipo:"despues_contenido",cadena:"El combate va a empezar"});
		salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		buclePrincipal.ideUsuario.modo="combate";
	},



	actualizar:function(tiempo)
	{
		if (bestiario.pausarActualizacion)
		{
			return;
		}
		for (best in bestiario.bestiasGeneradas)
		{

			unaBestia=bestiario.bestiasGeneradas[best];
			
			if (unaBestia.contadorActualizar+tiempo>=unaBestia.tiempo)
			{
				var decision=funcionesDeSalida.aleatorio(1,8);
				
				if (decision==1)
				{
					bestiario.mover_bestia(unaBestia);
				}
				else if (decision==2)
				{
					if (unaBestia.esta==guion.escenarioActual.clave)
					{
						salida.escribir({tipo:"despues_contenido",cadena:unaBestia.obtener_articulo()+" "+unaBestia.nombre+" "+unaBestia.bestiaEspera});
						
					}
				}
				else if (decision>=3)
				{
					if (unaBestia.esta==guion.escenarioActual.clave)
					{

						if (unaBestia.bestiaAgresiva)
						{
							var combate=funcionesDeSalida.aleatorio(1,4);
							if (combate==1)
							{
								bestiario.modo_combate(unaBestia,false);
							}
							else
							{
								salida.escribir({tipo:"despues_contenido",cadena:unaBestia.obtener_articulo()+" "+unaBestia.nombre+" te ataca pero falla"});
							}
						}
						else
						{
							salida.escribir({tipo:"despues_contenido",cadena:unaBestia.obtener_articulo()+" "+unaBestia.nombre+" "+unaBestia.bestiaEspera});
						}
						
					}
				}

				unaBestia.contadorActualizar=0;
			}
			else if (tiempo>=999)
			{
				unaBestia.contadorActualizar+=tiempo;
			}
		}
	},
	mover_bestia:function(bestia)
	{
		esta=contenido.escenarios[bestia.esta];
		conexiones=Object.keys(esta.conexiones);
		ir=funcionesDeSalida.aleatorio(0,conexiones.length-1);
		while (guion.zonasLibres.indexOf(esta.conexiones[conexiones[ir]].enviarA)!=-1)
		{
			ir=funcionesDeSalida.aleatorio(0,conexiones.length-1);
		}
		
		if (bestia.esta==guion.escenarioActual.clave)
		{
			salida.escribir({tipo:"despues_contenido",cadena:bestia.obtener_articulo()+" "+bestia.nombre+" se va"+bestia.bestiaSeMueve+conexiones[ir]});
			guion.escenarioActual.quitar_actor(bestia)
		}
		bestia.esta=esta.conexiones[conexiones[ir]].enviarA;
		if (bestia.esta==guion.escenarioActual.clave)
		{
			salida.escribir({tipo:"despues_contenido",cadena:bestia.obtener_articulo()+" "+bestia.nombre+" entra"+bestia.bestiaSeMueve+conexiones[ir]});
			guion.escenarioActual.insertar_actor(bestia)
		}
	},
	generar_atributos_extra:function(actor,clave,claveBestia)
	{
		atr=new Atributos();
		var nivel=0;
		var ataque=0;
		var defensa=0;
		var vida=0;
		var magia=0;
		act=contenido.actores[clave];
		if ("nivel" in actor)
			nivel=funcionesDeSalida.aleatorio(1,actor["nivel"]);
		if ("ataque" in actor)
			ataque=actor["ataque"];
		if ("defensa" in actor)
			defensa=actor["defensa"];
		if ("vida" in actor)
			vida=actor["vida"];
		if ("magia" in actor)
			magia=actor["magia"];
		if ("tiempo" in actor)
		{
			act.tiempo=funcionesDeSalida.aleatorio(8000,actor["tiempo"]);

		}
		act.bestiaAgresiva=true;
		if ("agresivo" in actor)
		{
			act.bestiaAgresiva=actor["agresivo"];

		}
		act.bestiaEspera=actor["estadoEspera"];
		act.bestiaSeMueve=actor["estadoMueve"];
		act.claveBestia=claveBestia;
		act.numeroGuerreros=funcionesDeSalida.aleatorio(1,combate.MaximoDeBestiasPorCombate);
		act.contadorActualizar=0;
		atr.crear_estado_inicial(nivel,vida,magia,ataque,defensa);
		act["estado"]=atr;
	}

}
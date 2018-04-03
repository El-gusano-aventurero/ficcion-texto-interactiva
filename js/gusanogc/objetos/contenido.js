var contenido={
	
	objetos:{},
	actores:{},
	escenarios:{},
	mapas:{},
	zonasLibresEnMapas:{},

	crear_mapa:function(tituloMapa)
	{
		contenido.mapas[tituloMapa]=[];
	},

	eliminar_mapa:function(tituloMapa)
	{
		if (tituloMapa in mapas)
		{
			var listaEscenarios=contenido.mapas[tituloMapa];
			for (clave in listaEscenarios)
			{
				contenido.eliminar_escenario(listaEscenarios[clave]);
			}
		}
	},

	crear_zonas_libres_en_mapa:function(QueMapa,zonasLibres)
	{
		contenido.zonasLibresEnMapas[QueMapa]=zonasLibres;
	},

	crear_objeto:function(objeto,clave)
	{
		if (clave in contenido.objetos!=true)
		{
			obj=new Objeto(objeto,clave);
			contenido.objetos[clave]=obj;			
		}

	},

	eliminar_objeto:function(clave)
	{
		if (clave in contenido.objetos)
		{
			delete contenido.objetos[clave];
		}
	},

	crear_actor:function(actor,clave)
	{
		if (clave in contenido.actores!=true)
		{
			act=new Actor(actor,clave);
			contenido.actores[clave]=act;
			return act;
		}
		else
		{
			return contenido.actores[clave];
		}
	},

	eliminar_actor:function(clave)
	{
		if (clave in contenido.actores)
		{
			delete contenido.actores[clave];
		}
	},

	crear_escenario:function(escenario,clave,aQueMapa)
	{
		if (clave in contenido.escenarios!=true)
		{
			est=new Escenario(escenario,clave);
			contenido.escenarios[clave]=est;
			contenido.mapas[aQueMapa].push(clave);
		}
	},

	eliminar_escenario:function(clave)
	{
		if (clave in contenido.actor)
		{
			delete contenido.actor[clave];
		}
	},

	cargar_nuevo_mapa:function(mapeado,cargarCapitulo,cambiarEntrada)
	{
		
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
   
    		if (respuesta.readyState == 4 ) 
    		{
    			
        		var mapa = JSON.parse( respuesta.responseText );
				for(key in mapa)
        		{
        			
                    if(key=="tituloMapa")
                    {
                        guion.tituloMapa=mapa.tituloMapa;
                        contenido.crear_mapa(mapa.tituloMapa)
                    }
                    else if(key=="zonasLibres")
                    {
                        guion.zonasLibres=mapa.zonasLibres;
                    }
        			else if ("es" in mapa[key])
        			{
        				if(mapa[key].es=="cuarto")
        				{
        					contenido.crear_escenario(mapa[key],key,guion.tituloMapa);
        				}
        				else if(mapa[key].es=="actor")
        				{
        					contenido.crear_actor(mapa[key],key);
        				}
        				else if(mapa[key].es=="objeto")
        				{
        					contenido.crear_objeto(mapa[key],key);
        				}

        			}
        		}
        		guion.iniciar_nuevo_mapa(cargarCapitulo,cambiarEntrada);
                guion.mostrar_escena_actual();
        	}
        }
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+datos.baseUrl+"/mapas/"+mapeado);		
	},
	cargar_archivo_de_texto:function(archivo,borrarTextos,funcion)
	{
		var textos=datos.baseUrl+"idiomas/"+datos.idioma+"/"+archivo+".json";
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
        		var frases = JSON.parse( respuesta.responseText );
        		if (borrarTextos)
        		{
        			guion.frases=frases;
        		}
        		else
        		{
        			for (indice in frases)
        			{
        				guion.frases[indice]=frases[indice];
        			}
        		}
        		funcion();
        	}
        }
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+textos);
	}
}
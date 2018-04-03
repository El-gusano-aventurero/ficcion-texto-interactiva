var cargador=
{
    datos:{},
	estadoCargador:"",
	iniciar_aventura:function(url,baseUrl)
	{
		datos.url=url;
		datos.baseUrl=baseUrl;
		

		datos.host=window.location.host;
		datos.protocolo=window.location.protocol;
		datos.urlMotor=datos.protocolo+"//"+datos.host+"/js/gusanogc/";
     
        cargador.datos=datos;

        buclePrincipal.ideUsuario.descargando_juego({cadena:"Cargando la aventura, espere por favor",tipo:"titulo_escenario",alinear:"center",clases:"fundido_entrada",tiempo:300});
        cargador.cargar_archivo_de_configuracion();
	},

	cargar_archivo_de_configuracion:function()
	{
		var configuracion=datos.baseUrl+"conf.json";
		var respuesta=new XMLHttpRequest();
        respuesta.withCredentials = true;
        
		respuesta.onreadystatechange = function() 
		{
            
    		if (respuesta.readyState == 4 ) 
    		{
                buclePrincipal.ideUsuario.descargando_juego({cadena:"listo",tipo:"despues_contenido",alinear:"center"});
                
        		var configuracion = JSON.parse( respuesta.responseText );
        		
        		for (key in configuracion)
        		{
        			conf[key]=configuracion[key];
        		}
        		cargador.cargar_recursos_de_texto();
        	}
        }
        buclePrincipal.ideUsuario.descargando_juego({cadena:"Cargando archivo de configuracion",tipo:"salidas",alinear:"center"});
        
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		respuesta.send("archivo="+configuracion);
	},

	cargar_recursos_de_texto:function()
	{
		var textos=datos.urlMotor+"recursos/"+datos.idioma+"/textos.json";

		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
                buclePrincipal.ideUsuario.descargando_juego({cadena:"listo",tipo:"despues_contenido",alinear:"center"});
        		var rtexto = JSON.parse( respuesta.responseText );
        		guion.frasesInternas=rtexto;
        		cargador.cargar_verbos();
        	}
        }
        buclePrincipal.ideUsuario.descargando_juego({cadena:"Cargando librería de frases",tipo:"salidas",alinear:"center"});
        
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+textos);
	},

	cargar_verbos:function()
	{

		var verbos=datos.urlMotor+"recursos/"+datos.idioma+"/verbos.json";
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
                buclePrincipal.ideUsuario.descargando_juego({cadena:"listo",tipo:"despues_contenido",alinear:"center"});
                
        		var tVerbos = JSON.parse( respuesta.responseText );
        		guion.verbos=tVerbos;

        		cargador.cargar_recursos();

        	}
        }
        buclePrincipal.ideUsuario.descargando_juego({cadena:"Cargando la acciones",tipo:"salidas",alinear:"center"});

		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+verbos);
	},

	cargar_recursos:function()
	{
		var recursos=datos.baseUrl+"recursos.json";
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
                buclePrincipal.ideUsuario.descargando_juego({cadena:"listo",tipo:"despues_contenido",alinear:"center"});
                
        		var recursos = JSON.parse( respuesta.responseText );
        		for (key in recursos)
        		{
        			ima=new Imagen(recursos[key]);
        			ima.cargar_imagen();
                    guion.recursos[key]=ima;
        		}
        		cargador.cargar_textos_juego();
        	}
        }
        buclePrincipal.ideUsuario.descargando_juego({cadena:"Cargando recursos.",tipo:"salidas",alinear:"center"});
        
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");//"Content-Type", "application/json; charset=UTF-8");
		
		respuesta.send("archivo="+recursos);
	},	


	cargar_textos_juego:function()
	{
		var textos=datos.baseUrl+"idiomas/"+datos.idioma+"/textos.json";
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
                buclePrincipal.ideUsuario.descargando_juego({cadena:"listo",tipo:"despues_contenido",alinear:"center"});
        		var frases = JSON.parse( respuesta.responseText );
        		guion.frases=frases;
        		cargador.crear_juego(datos.url);
        	}
        }
        buclePrincipal.ideUsuario.descargando_juego({cadena:"Cargando textos del juego",tipo:"salidas",alinear:"center"});
        
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");//"Content-Type", "application/json; charset=UTF-8");
		
		respuesta.send("archivo="+textos);
	},

	crear_juego:function(url)
	{
        //console.log(datos.baseUrl)
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
   
    		if (respuesta.readyState == 4 ) 
    		{
        		var aventura = JSON.parse( respuesta.responseText );
        		

        		for(key in aventura)
        		{
        			
        			if(key=="infoJuego")
        			{
        				guion.crear_info(aventura.infoJuego);
        			}
                    else if(key=="tituloMapa")
                    {
                        guion.tituloMapa=aventura.tituloMapa;
                        contenido.crear_mapa(aventura.tituloMapa)

                    }
                    else if(key=="zonasLibres")
                    {
                        guion.zonasLibres=aventura.zonasLibres;
                        contenido.crear_zonas_libres_en_mapa(guion.tituloMapa,aventura.zonasLibres)
                    }
        			else if ("es" in aventura[key])
        			{
        				if(aventura[key].es=="cuarto")
        				{
        					contenido.crear_escenario(aventura[key],key,guion.tituloMapa);
        				}
        				else if(aventura[key].es=="actor")
        				{
        					contenido.crear_actor(aventura[key],key);
        				}
        				else if(aventura[key].es=="objeto")
        				{
        					contenido.crear_objeto(aventura[key],key);
        				}

        			}
        		}

                buclePrincipal.ideUsuario.descargando_juego({cadena:"listo",tipo:"despues_contenido",alinear:"center"});
                buclePrincipal.ideUsuario.descargando_juego({cadena:"esperar_tecla",tipo:"orden_interna",alinear:"center"});
                buclePrincipal.ideUsuario.descargando_juego({cadena:"borrar_textos",tipo:"orden_interna",alinear:"center"});
                guion.mostrar_info();
                guion.iniciar_guion();
                guion.mostrar_escena_actual();

        	}
        }

        buclePrincipal.ideUsuario.descargando_juego({cadena:"Construyendo el mundo del juego",tipo:"salidas",alinear:"center"});
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+url);
	}
}
var cargador=
{

	estadoCargador:"",
	iniciar_aventura:function(url,baseUrl)
	{
		datos.url=url;
		datos.baseUrl=baseUrl;
		

		datos.host=window.location.host;
		datos.protocolo=window.location.protocol;
		datos.urlMotor=datos.protocolo+"//"+datos.host+"/js/aventuratecont/";
        buclePrincipal.ideUsuario.descargando_juego("Cargando la aventura, espere por favor","titulo_escenario");
        
        
        imagen=new Image();
        imagen.onload=function()
        {
            buclePrincipal.ideUsuario.descargando_juego("splashScreen","imagen");
            cargador.cargar_archivo_de_configuracion();
        }
        
        ima=new Imagen("splash");
        ima.listo=true;
        ima.imagen=imagen;
        ima.url="imagenes/splashScreen.png";
        guion.recursos["splashScreen"]=ima;
        imagen.src="imagenes/splashScreen.png";
	},

	cargar_archivo_de_configuracion:function()
	{
		var configuracion=datos.baseUrl+"conf.json";
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
    			buclePrincipal.ideUsuario.descargando_juego("listo","despues_contenido");
        		var configuracion = JSON.parse( respuesta.responseText );
        		
        		for (key in configuracion)
        		{
        			conf[key]=configuracion[key];
        		}
        		cargador.cargar_recursos_de_texto();
        	}
        }
		buclePrincipal.ideUsuario.descargando_juego("Cargando archivo de configuracion","salidas");
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
    			buclePrincipal.ideUsuario.descargando_juego("listo","despues_contenido");
        		var rtexto = JSON.parse( respuesta.responseText );
        		guion.frasesInternas=rtexto;
        		cargador.cargar_verbos();
        	}
        }
        buclePrincipal.ideUsuario.descargando_juego("Cargando librería de frases","salidas");
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
    			buclePrincipal.ideUsuario.descargando_juego("listo","despues_contenido");
        		var tVerbos = JSON.parse( respuesta.responseText );
        		guion.verbos=tVerbos;

        		cargador.cargar_recursos();

        	}
        }
        buclePrincipal.ideUsuario.descargando_juego("Cargando la  acciones","salidas");

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
    			buclePrincipal.ideUsuario.descargando_juego("listo","despues_contenido");
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
        buclePrincipal.ideUsuario.descargando_juego("Cargando recursos.","salidas");
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
    			buclePrincipal.ideUsuario.descargando_juego("listo","despues_contenido");
        		var frases = JSON.parse( respuesta.responseText );
        		guion.frases=frases;
        		cargador.crear_juego(datos.url);
        	}
        }
        buclePrincipal.ideUsuario.descargando_juego("Cargando textos del juego","salidas");
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
                    }
                    else if(key=="zonasLibres")
                    {
                        guion.zonasLibres=aventura.zonasLibres;
                    }
        			else if ("es" in aventura[key])
        			{
        				if(aventura[key].es=="cuarto")
        				{
        					contenido.crear_escenario(aventura[key],key);
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
        		buclePrincipal.ideUsuario.descargando_juego("listo","despues_contenido");
                buclePrincipal.ideUsuario.descargando_juego("esperar_tecla","orden_interna");
                buclePrincipal.ideUsuario.descargando_juego("borrar_textos","orden_interna");
                guion.mostrar_info();
                guion.iniciar_guion();
                guion.mostrar_escena_actual();

        	}
        }
        buclePrincipal.ideUsuario.descargando_juego("Construyendo el mundo del juego","salidas");
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+url);
	}
}
var contenido={
	
	objetos:{},
	actores:{},
	escenarios:{},

	crear_objeto:function(objeto,clave)
	{
		obj=new Objeto(objeto,clave);
		contenido.objetos[clave]=obj;
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
		act=new Actor(actor,clave);
		contenido.actores[clave]=act;
		return act;
	},

	eliminar_actor:function(clave)
	{
		if (clave in contenido.actores)
		{
			delete contenido.actores[clave];
		}
	},

	crear_escenario:function(escenario,clave)
	{
		est=new Escenario(escenario,clave);
		contenido.escenarios[clave]=est;
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
                    }
                    else if(key=="zonasLibres")
                    {
                        guion.zonasLibres=mapa.zonasLibres;
                    }
        			else if ("es" in mapa[key])
        			{
        				if(mapa[key].es=="cuarto")
        				{
        					contenido.crear_escenario(mapa[key],key);
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
        		
		estadoCargador="Cargando nuevo mapa.";
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+datos.baseUrl+mapeado);		
	}
}
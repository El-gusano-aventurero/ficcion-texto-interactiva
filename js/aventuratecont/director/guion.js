var guion={
	conexiones:"norte,sur,este,oeste,noreste,noroeste,sureste,suroeste,subir,bajar".split(","),
	articulos:"al,el,la,los,las,un,una,unos,unas".split(","),
	preposiciones:"del,a,ante,bajo,cabe,con,contra,de,desde,en,entre,hacia,hasta,para,por,segun,sin,so,sobre,tras,durante,mediante,versus,via".split(","),
	ordenarA:"",
	verbos:{},
	frasesInternas:{},
	frases:{},
	info:{
		titulo:"",
		autor:"",
		sinopsis:"",
		version:"",
		copyright:""
	},
	recursos:{},
	escenarioActual:null,
	actorPrincipal:"",
	capitulos:{},
	capituloActual:null,
	datos:{},

	despues_de_titulo:function(cadenaDeSalida){},

	quitar_dato:function(clave)
	{
		if (clave in guion.datos)
		{
			delete guion.datos[clave];
		}
	},

	insertar_capitulo:function(capitulo)
	{
		guion.capitulos[capitulo.clave]=capitulo;
	},

	quitar_capitulo:function(clave)
	{
		if (clave in guion.capitulos)
		{
			delete guion.capitulos[clave];
		}
	},


	comenzar:function(){},

    crear_info:function(i)
    {
    	guion.info.titulo=i.titulo;
    	guion.info.autor=i.autor;
    	guion.info.sinopsis=i.sinopsis;
    	guion.info.version=i.version;
    	guion.info.copyright=i.copyright;
    },
    mostrar_info:function()
    {
    	salida.insertar_cadena({tipo:"titulo_escenario",cadena:guion.info.titulo});
    	salida.insertar_cadena({tipo:"descripcion_escenario",cadena:"Autor: "+guion.info.autor});
    	salida.insertar_cadena({tipo:"descripcion_escenario",cadena:"Sinopsis: "+guion.info.sinopsis});
    	salida.insertar_cadena({tipo:"descripcion_escenario",cadena:"Versión: "+guion.info.version});
    	salida.insertar_cadena({tipo:"descripcion_escenario",cadena:"Copyright: "+guion.info.copyright});
		salida.insertar_cadena({tipo:"orden_interna",cadena:"esperar_tecla"});    
    },
	iniciar_guion:function()
	{
		guion.comenzar();
		//Buscamos al actor principal, actual en la aventura
		for (key in contenido.actores)
		{
			if (contenido.actores[key].protagonista)
			{
				guion.actorPrincipal=contenido.actores[key].clave;
				break;
			}
		}


		for (key in guion.capitulos)
		{
			//Buscamos el capitulo actual
			if (guion.capitulos[key].capituloInicial)
			{
				guion.capituloActual=guion.capitulos[key];
				break;
			}
		}

		if(guion.capituloActual!=null)
			guion.capituloActual.iniciar();

		for (key in contenido.escenarios)
		{
			//Buscamos el escenario actual
			
			if (contenido.escenarios[key].primeroEnMostrar)
			{
				guion.escenarioActual=contenido.escenarios[key];
				break;
			}
		}
		
		if(guion.capituloActual!=null)
			guion.capituloActual.presentacion();
		guion.escenarioActual.iniciar();
		buclePrincipal.ideUsuario.post_iniciar();
		
	},

	iniciar_nuevo_mapa:function(cargarCapitulo,buscarEscenario)
	{
		//Buscamos al actor principal, actual en la aventura
		for (key in contenido.actores)
		{
			if (contenido.actores[key].protagonista)
			{
				guion.actorPrincipal=contenido.actores[key].clave;
				break;
			}
		}

		if (cargarCapitulo)
		{
			for (key in guion.capitulos)
			{
				//Buscamos el capitulo actual
				if (guion.capitulos[key].capituloInicial)
				{
					guion.capituloActual=guion.capitulos[key];
					break;
				}
			}

			if(guion.capituloActual!=null)
				guion.capituloActual.iniciar();
		}
		
		if(buscarEscenario==null)
		{
			for (key in contenido.escenarios)
			{
				//Buscamos el escenario actual
				if (contenido.escenarios[key].primeroEnMostrar)
				{
					guion.escenarioActual=contenido.escenarios[key];
					break;
				}
			}		
		}
		else
		{
			guion.escenarioActual=contenido.escenarios[buscarEscenario];
		}


		if (cargarCapitulo)
		{
			if(guion.capituloActual!=null)
				guion.capituloActual.presentacion();
		}
		guion.escenarioActual.iniciar();
		//guion.mostrar_escena_actual();
		//console.log("nuevo mapa iniciado")
	},

	mostrar_escena_actual:function()
	{
		var cadenasDeSalida=[];
		cadenasDeSalida.push({tipo:"orden_interna",cadena:"borrar_textos"})

		cadenasDeSalida=guion.escenarioActual.mostrar_informacion(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_objetos(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_contenido_objetos(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_actores(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_salidas(cadenasDeSalida);
		salida.preparar_cadenas_de_salida(cadenasDeSalida);
		buclePrincipal.ideUsuario.entra_nueva_escena();
		eventos.ejecutar(this.escenarioActual.despues_de_contenido);
	},

	intercambiar_escenario:function(salid)
	{
		if(salid in this.escenarioActual.conexiones)
		{
			if (eventos.ejecutar(this.escenarioActual.salir)!=true)
			{
				//guion.mostrar_escena_actual();
				return null;
			}
			else if (this.escenarioActual.conexiones[salid].bloqueada)
			{	
				
				if (this.escenarioActual.conexiones[salid].textoBloqueada!="")
				{
					salida.insertar_cadena({tipo:this.actorPrincipal,cadena:this.escenarioActual.conexiones[salid].textoBloqueada});
				}
				else
				{
					salida.insertar_cadena({tipo:this.actorPrincipal,cadena:guion.frasesInternas["21"]});
				}
				return null;
			}
			kFinal=this.escenarioActual.conexiones[salid].enviarA;
			if (eventos.ejecutar(contenido.escenarios[kFinal].entrar)!=true)
			{
				
				guion.mostrar_escena_actual();
				return null;
			}
			for (key in this.escenarioActual.actores)
			{
				if (this.escenarioActual.actores[key].grupo==this.actorPrincipal)
				{
					this.escenarioActual.actores[key].esta=kFinal;
				}
			}

			guion.escenarioActual=contenido.escenarios[guion.escenarioActual.conexiones[salid].enviarA];
			contenido.actores[guion.actorPrincipal].esta=guion.escenarioActual.clave;
			guion.escenarioActual.iniciar();
			guion.mostrar_escena_actual();
			//eventos.ejecutar(guion.escenarioActual.despues_de_contenido);
			return null;
		}
	}
}
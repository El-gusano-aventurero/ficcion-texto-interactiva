var guion={
	conexiones:"norte,sur,este,oeste,noreste,noroeste,sureste,suroeste,subir,bajar".split(","),
	articulos:"al,el,la,los,las,un,una,unos,unas".split(","),
	preposiciones:"de,del,ante,cabe,con,contra,desde,en,entre,hacia,hasta,para,por,segun,sin,so,sobre,tras,durante,mediante,versus,via".split(","),
	ordenarA:"",
	verbos:{},
	frasesInternas:{},
	frases:{},
	info:{
		titulo:"",
		autor:"",
		sinopsis:"",
		version:"",
		copyright:"",
		imagen:""
	},
	recursos:{},
	escenarioActual:null,
	actorPrincipal:"",
	secuencias:{},
	secuenciaActual:null,
	zonasLibres:[],
	datos:{},

	despues_de_titulo:function(cadenaDeSalida){},

	quitar_dato:function(clave)
	{
		if (clave in guion.datos)
		{
			delete guion.datos[clave];
		}
	},

	insertar_secuencia:function(secuencias)
	{
		guion.secuencias[secuencias.clave]=secuencias;
	},

	quitar_secuencia:function(clave)
	{
		if (clave in guion.secuencias)
		{
			delete guion.secuencias[clave];
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
    	guion.info.imagen="iconoJuego";
    },
    mostrar_info:function()
    {
    	salida.escribir({tipo:"titulo_escenario",cadena:guion.info.titulo,alinear:"center",clases:"fundido_entrada",tiempo:300});
    	salida.escribir({tipo:"imagen",cadena:guion.info.imagen,ancho:"190px",alinear:"center",clases:"fundido_entrada",tiempo:300});
    	salida.escribir({tipo:"descripcion_escenario",cadena:"Autor: "+guion.info.autor,alinear:"center",clases:"fundido_entrada",tiempo:300});
    	salida.escribir({tipo:"descripcion_escenario",cadena:"Sinopsis: "+guion.info.sinopsis,alinear:"center",clases:"fundido_entrada",tiempo:300});
    	salida.escribir({tipo:"descripcion_escenario",cadena:"Versión: "+guion.info.version,alinear:"center",clases:"fundido_entrada",tiempo:300});
    	salida.escribir({tipo:"descripcion_escenario",cadena:"Copyright: "+guion.info.copyright,alinear:"center",clases:"fundido_entrada",tiempo:300});
		salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla",alinear:"center",clases:"fundido_entrada",tiempo:300});    
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


		for (key in guion.secuencias)
		{
			//Buscamos la secuencia actual
			if (guion.secuencias[key].secuenciaInicial)
			{
				guion.secuenciaActual=guion.secuencias[key];
				break;
			}
		}

		if(guion.secuenciaActual!=null)
			guion.secuenciaActual.iniciar();

		for (key in contenido.escenarios)
		{
			//Buscamos el escenario actual
			
			if (contenido.escenarios[key].primeroEnMostrar)
			{
				contenido.escenarios[key].primeroEnMostrar=false;
				guion.escenarioActual=contenido.escenarios[key];
				break;
			}
		}
		
		if(guion.secuenciaActual!=null)
		{
			guion.secuenciaActual.mostrar_titulo();
			guion.secuenciaActual.presentacion();
		}
		guion.escenarioActual.iniciar();
		buclePrincipal.ideUsuario.post_iniciar();
		
	},

	iniciar_nuevo_mapa:function(cargarSecuencia,buscarEscenario)
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

		if (cargarSecuencia)
		{
			for (key in guion.secuencias)
			{
				//Buscamos el secuencia actual
				if (guion.secuencias[key].secuenciaInicial)
				{
					guion.secuenciaActual=guion.secuencias[key];
					break;
				}
			}

			if(guion.secuenciaActual!=null)
				guion.secuenciaActual.iniciar();
		}
		if(buscarEscenario==null)
		{
			for (key in contenido.escenarios)
			{
				//Buscamos el escenario actual
				if (contenido.escenarios[key].primeroEnMostrar)
				{
					contenido.escenarios[key].primeroEnMostrar=false;
					guion.escenarioActual=contenido.escenarios[key];
					break;
				}
			}		
		}
		else
		{
			guion.escenarioActual=contenido.escenarios[buscarEscenario];
		}


		if (cargarSecuencia)
		{
			if(guion.secuenciaActual!=null)
			{
				guion.secuenciaActual.mostrar_titulo();
				guion.secuenciaActual.presentacion();
			}
		}
		guion.escenarioActual.iniciar();
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
		salida.preparar(cadenasDeSalida);
		buclePrincipal.ideUsuario.entra_nueva_escena();
		eventos.ejecutar(this.escenarioActual.despues_de_contenido);
	},

	mostrar_escena_actual_reducido:function()
	{
		var cadenasDeSalida=[];
		cadenasDeSalida.push({tipo:"orden_interna",cadena:"borrar_textos"})

		cadenasDeSalida=guion.escenarioActual.mostrar_informacion_reducida(cadenasDeSalida);
		
		cadenasDeSalida=guion.escenarioActual.mostrar_objetos(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_contenido_objetos(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_actores(cadenasDeSalida);
		cadenasDeSalida=guion.escenarioActual.mostrar_salidas(cadenasDeSalida);
		salida.preparar(cadenasDeSalida);
		buclePrincipal.ideUsuario.entra_nueva_escena();
		eventos.ejecutar(this.escenarioActual.despues_de_contenido);
	},

	intercambiar_escenario:function(salid)
	{
		for (clave in this.escenarioActual.conexiones)
		{

			sal=clave.toLowerCase()
			sal=funcionesDeCadena.quitar_acentos(sal);
			if(salid == sal)
			{
				if (eventos.ejecutar(this.escenarioActual.salir)!=true)
				{
					return null;
				}
				else if (this.escenarioActual.conexiones[clave].bloqueada)
				{	
					
					if (this.escenarioActual.conexiones[clave].textoBloqueada!="")
					{
						var textoBloqueada=funcionesDeSalida.obtener_lista(this.escenarioActual.conexiones[clave].textoBloqueada);
						salida.escribir({tipo:"descripcion_escenario",cadena:textoBloqueada});
					}
					else
					{
						salida.escribir({tipo:this.actorPrincipal,cadena:guion.frasesInternas["21"]});
					}
					return null;
				}
				kFinal=this.escenarioActual.conexiones[clave].enviarA;

				if (kFinal in contenido.escenarios!=true)
				{
					
					contenido.actores[guion.actorPrincipal].esta=this.escenarioActual.conexiones[clave].escenarioInicial;
					var conSecuencia=false;
					if (this.escenarioActual.conexiones[clave].secuenciaAsociada!="")
					{
						conSecuencia=true;
						secuenciaClave=this.escenarioActual.conexiones[clave].secuenciaAsociada;
						guion.secuencias[secuenciaClave].secuenciaInicial=true;
						guion.secuenciaActual.secuenciaInicial=false;
						guion.secuenciaActual.terminarSecuencia=true;
					}
					contenido.cargar_nuevo_mapa(kFinal+".json",conSecuencia,this.escenarioActual.conexiones[clave].escenarioInicial);
					
					return;
				}
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

				guion.escenarioActual=contenido.escenarios[guion.escenarioActual.conexiones[clave].enviarA];
				contenido.actores[guion.actorPrincipal].esta=guion.escenarioActual.clave;
				guion.escenarioActual.iniciar();
				guion.mostrar_escena_actual();
				return null;
			}
		}

	},

	teletrasportar_protagonista:function(escenaDestino)
	{
		prota=contenido.actores[guion.actorPrincipal];
		escenaDeSalida=prota.esta;
		contenido.escenarios[escenaDeSalida].quitar_actor(prota);
		contenido.escenarios[escenaDestino].insertar_actor(prota);
		guion.escenarioActual=contenido.escenarios[escenaDestino];
		guion.escenarioActual.iniciar();
		guion.mostrar_escena_actual();
	}


}
//fuga citata
var master={
	idioma:"es",
	aventura:"",
	info:{
		titulo:"",
		autor:"",
		sinopsis:"",
		version:"",
		copyright:""
	},
	cuartos:{},
	cuartoActual:null,
	claveActual:"",
	objetos:{},
	objetosEncuarto:{},
	inventario:[],
	actores:{},
	actoresEnCuarto:{},
	protagonista:"",
	recursos:{},
	variables:{},
	urlJuego:"",
	baseUrlJuego:"",
	verbos:"",
	textos:{},
	frases:{},
	accionesDisponibles:[],
	objetivosActuales:{},
	reglas:function(cuartos,objetos){},
	actualizar:function(cuartos,objetos,personajes){},

	cambiar_cuarto:function(accion)
	{
		if (master.cuartoActual!=null)
		{
			if(accion in master.cuartoActual.conexiones)
			{

				if (eventos.ejecutar(master.cuartoActual.salir)!=true)
				//if (master.cuartoActual.salir()!=true)
				{
					master.cuartoActual.mostrar_informacion(master.claveActual);
					return;
				}

				else if (master.cuartoActual.conexiones[accion].bloqueada)
				{
					
					screenText.escribir({texto:master.textos["21"],tama:18,color:"green"});
					return;
				}
				


				kFinal=master.cuartoActual.conexiones[accion].enviarA;
				if (eventos.ejecutar(master.cuartos[kFinal].entrar)!=true)
				{
					master.cuartoActual.mostrar_informacion(master.claveActual);
					screenText.escribir({texto:master.textos["21"],tama:18,color:"green"});
					return;
				}
				master.claveActual=master.cuartoActual.conexiones[accion].enviarA;
				master.cuartoActual=master.cuartos[master.cuartoActual.conexiones[accion].enviarA];
				master.actores[master.protagonista].esta=master.claveActual;
				
				for (key in master.actoresEnCuarto)
				{

					if (master.actores[key].grupo==master.protagonista)
					{
						master.actores[key].esta=master.claveActual;
					}
				}

				master.objetosEncuarto={};
				master.generar_objetos_en_cuarto();
				master.actoresEnCuarto={};

				for (key in master.actores)
				{
					if (master.actores[key].esta == master.claveActual)
					{
						master.actoresEnCuarto[key]=master.actores[key];
					}
				}

				screenText.escribir({texto:"@borrar_todo"});
				master.cuartoActual.mostrar_informacion(kFinal);
				//master.cuartoActual.despues_de_contenido();
				eventos.ejecutar(master.cuartoActual.despues_de_contenido)
			}
		}	
	},

	eliminar_variable(clave)
	{
		if (clave in master.variables)
		{
			delete master.variables[clave];
		}
	},
	insertar_objetivo:function(key,obj)
	{
		master.objetivosActuales[key]=obj;
		auxiliar.mostrar_texto_retardar(master.textos["81"],conf.objetivos,0,false);

	},
	eliminar_objetivo:function(obj)
	{
		objl={};
		for (key in master.objetivosActuales)
		{
			if (key != obj)
			{
				objl[key]=master.objetivosActuales[key];
			}
		}
		master.objetivosActuales=objl;
	},
	coger_objeto:function(objCoger)
	{
		var borrarDe="";
		//console.log("visible"+objCoger.nombre)
		
		if (objCoger.esta!=master.claveActual)
		{
			for (key in master.objetos)
			{
				if (objCoger.esta==key)
				{
					borrarDe=key;
				}
			}
		}
		objCoger.esta=master.protagonista;
		//master.inventario.push(objCoger.nombre)
		
		
		if (borrarDe!="")
		{
			var obj=master.objetos[borrarDe];
			var lst=[];
			for (key in master.objetos)
			{
				if (master.objetos[key].esta==borrarDe)
				{
					//console.log("Coloco: "+)
					lst.push(master.objetos[key].clave)
				}
			}
			obj.contiene=lst;
		}
		master.generar_objetos_en_cuarto();
		master.generar_inventario();
		
	},

	dejar_objeto:function(obj)
	{
		master.objetos[obj].esta=master.claveActual;
        master.generar_objetos_en_cuarto();
        master.generar_inventario();
	},

	dejar_objeto_en:function(obj,donde,esObj)
	{
		if (esObj)
		{
			master.objetos[obj].esta=master.objetos[donde].clave;
			master.objetos[donde].contiene.push(obj);
		}
		else
		{
			master.objetos[obj].esta=maste.cuartos[donde].clave;
		}
		master.generar_objetos_en_cuarto();
        master.generar_inventario();
	},

	iniciar:function(url,baseUrlJuego)
	{
		funcionesInternas.iniciar_juego(url,baseUrlJuego);
	},

	generar_objetos_en_cuarto:function()
	{
		master.objetosEncuarto={};
		for (key in master.objetos)
		{
			if (master.objetos[key].esta == master.claveActual)
			{

				master.objetosEncuarto[key]=master.objetos[key];
			}
		}
	},
	generar_inventario:function()
	{
		master.inventario=[];
		for (key in master.objetos)
		{
			if (master.objetos[key].esta==master.protagonista)
			{
				master.inventario.push(key);
			}
		}
	},
	generar_objetos_en_objeto:function()
	{
		
		for (key in master.objetos)
		{
			master.objetos[key].contiene=[];
		}
		for (key in master.objetos)
		{
			if(master.objetos[key].esta in master.objetos)
			{
				master.objetos[master.objetos[key].esta].contiene.push(master.objetos[key].clave);
			}
		}
		

	},

	mostrar_info:function()
	{
		info=master.info;
		screenText.escribir({texto:info.titulo,fuente:conf.tituJuego.fuente,tama:conf.tituJuego.tama,color:conf.tituJuego.color,estilo:conf.tituJuego.estilo,alinear:conf.tituJuego.alinear});
		screenText.escribir({
					texto:"Autor/es"+": "+info.autor,
					alinear:"center"
				});
		screenText.escribir({texto:"Versión: "+info.version,fuente:conf.creditos.fuente,tama:conf.creditos.tama,color:conf.creditos.color,estilo:conf.creditos.estilo,alinear:conf.creditos.alinear});
		screenText.escribir({texto:info.copyright,fuente:conf.creditos.fuente,tama:conf.creditos.tama,color:conf.creditos.color,estilo:conf.creditos.estilo,alinear:conf.creditos.alinear});
		
		screenText.escribir({texto:info.sinopsis,fuente:conf.creditos.fuente,tama:conf.creditos.tama,color:conf.creditos.color,estilo:conf.creditos.estilo,alinear:conf.creditos.alinear});
	},

	actualizar:function(cuartos,objetos,actores){}
}
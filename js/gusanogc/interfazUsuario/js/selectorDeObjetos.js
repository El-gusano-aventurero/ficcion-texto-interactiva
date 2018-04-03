var selectorDeObjetos=
{
	autocompletado:[],
	autocompletadoClaves:[],
	accion:[],
	objetos:0,
	verbo:"",
	lanzar_accion_intercambiar_cuarto:function(conexion)
	{
		selectorDeObjetos.accion=[];
		entrada.cadenaTexto=conexion;
	},
	comprobar_accion_activa:function(verbo)
	{
		cadena=entradaUsuario.cuadroDeTexto.value
		if (cadena.length==0)
		{
			selectorDeObjetos.accion=[];
			selectorDeObjetos.accion.push(new Tolken(verbo,"verbo"))
			return verbo;
		}
		selectorDeObjetos.accion=[];
		salida.escribir({tipo:"entrada",cadena:cadena+" "+verbo});
		salida.escribir({tipo:"descripcion_escenario",cadena:"No sé como interpretar esta acción"});
		return "";
	},
	retornar_texto_mostrar:function(objetoAMirar,valor)
	{
		var plb=null;
		plb="de "+detectorDePalabras.comprobar_si_es_pre_de(objetoAMirar,valor);
		if (plb==bull)
		{
			plb=detectorDePalabras.buscar_si_es_adjetivo(objetoAMirar,valor);
		}
		return plb;
	},

	reconocer_e_insertar_objeto_en_accion:function(cadenaExt,clave,valor,mostrarInfo)
	{
		datoObjeto=clave.split("_");
		var mostrar=contenido.objetos[datoObjeto[0]];
		if (mostrar==null)
		{
			
			mostrar=contenido.actores[datoObjeto[0]];
			if((mostrar.claveBestia!=null)&&(cadenaExt==""))
			{
				bestiario.modo_combate(mostrar,true);
				return "";
			}
		}
		if (cadenaExt.length==0)
		{
			selectorDeObjetos.accion=[];

			selectorDeObjetos.accion.push(new Tolken(mostrar,"objeto"))
			if (mostrarInfo)
			{
				return mostrar.mostrar_informacion();
			}
			return mostrar.obtener_articulo()+" "+mostrar.nombre;
		}
		else if(cadenaExt.split(" ").length>0)
		{
			if (selectorDeObjetos.accion.length==1)
			{
				if (selectorDeObjetos.accion[0].identificador=="objeto")
				{
					selectorDeObjetos.accion=[];
					salida.escribir({tipo:"entrada",cadena:cadenaExt+" y "+mostrar.obtener_articulo()+" "+mostrar.nombre});
					salida.escribir({tipo:"descripcion_escenario",cadena:"No sé que hacer con esos dos objetos"});
					return "";
				}
				else if (selectorDeObjetos.accion[0].identificador=="verbo")
				{
					selectorDeObjetos.accion.push(new Tolken(mostrar,"objeto"))
					if (mostrarInfo)
					{
						if (mostrar.psi)
						{
							if (mostrar.conocido)
								return cadenaExt+" a "+mostrar.nombre;
							else
								return cadenaExt+" "+mostrar.mostrar_informacion();
						}
						return cadenaExt+" "+mostrar.mostrar_informacion();
					}
					
					return cadenaExt+" "+mostrar.obtener_articulo()+" "+mostrar.nombre;
				}
			}
			else if(selectorDeObjetos.accion.length==2)
			{
				if (selectorDeObjetos.accion[0].identificador=="verbo")
				{
					if (selectorDeObjetos.accion[1].identificador=="objeto")
					{
						selectorDeObjetos.accion.push(new Tolken(mostrar,"objeto"))
						
						if (selectorDeObjetos.accion[0].valor in mostrar.seUneCon)
						{
							union=mostrar.seUneCon[selectorDeObjetos.accion[0].valor]
							if (mostrarInfo)
							{
								return cadenaExt+" "+union+" "+mostrar.mostrar_informacion();
							}
							return cadenaExt+" "+union+" "+mostrar.obtener_articulo()+" "+mostrar.nombre;
						}
						selectorDeObjetos.accion=[];
						salida.escribir({tipo:"entrada",cadena:cadenaExt+" y "+mostrar.obtener_articulo()+" "+mostrar.nombre});
						salida.escribir({tipo:"descripcion_escenario",cadena:"¡uf! Con esos objetos, creo que no"});
						return "";
					}
				}
				
			}
			else
			{
				selectorDeObjetos.accion=[];
				salida.escribir({tipo:"entrada",cadena:cadenaExt+" y "+mostrar.obtener_articulo()+" "+mostrar.nombre});
				salida.escribir({tipo:"descripcion_escenario",cadena:"Demasiados objetos para esa acción"});
				return "";
			}
		}
	}
}
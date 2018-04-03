var detectorDePalabras=
{
	//Comprueba si la palabra recibida es un objeto 
	//de la lista de objetos recibida	
	buscar_objeto_por_nombre:function(palabra,objetos,lista)
	{
		for (key in objetos)
		{
			var ObjAct=objetos[key];
			var nombre=ObjAct.nombre.toLowerCase();
			nombre=funcionesDeCadena.quitar_acentos(nombre);
			
			
			if ((nombre.startsWith(palabra))&&(palabra.length>=3))
			{
				
				lista.push(ObjAct);
			}
			else
			{
				sinonimos=ObjAct.sinonimos;
				if (sinonimos!=null)
				
				for (var c=0;c<sinonimos.length;c++)
				{
					sinAux=sinonimos[c].toLowerCase();
					sinAux=funcionesDeCadena.quitar_acentos(sinAux);
					if((sinAux.startsWith(palabra))&&(palabra.length>=3))
					{
						lista.push(ObjAct);
					}
				}
			}
			
			(ObjAct.contenedor)
			{
					
				lista=detectorDePalabras.buscar_dentro_de_un_objeto_contenedor(ObjAct,palabra,lista);
			}
		} 
		return lista;
	},

	//Busca dentro del bolsillo de un actor
	buscar_dentro_del_bolsillo_de_un_actor:function(pl,lista)
	{
		if (guion.ordenarA in contenido.actores)
		{
			actor=contenido.actores[guion.ordenarA];
			contenidoBolsillo=actor.bolsillo.contenido;
			for (item in contenidoBolsillo)
			{
				
				nombre=contenido.objetos[contenidoBolsillo[item]].nombre.toLowerCase();
				nombre=funcionesDeCadena.quitar_acentos(nombre);
				if ((nombre.startsWith(pl))&&(pl.length>3))
				{
					lista.push(contenido.objetos[contenidoBolsillo[item]])
				}
				else
				{
					sinonimos=contenido.objetos[contenidoBolsillo[item]].sinonimos;
					if (sinonimos!=null)
					{
						for (var ci=0;ci<sinonimos.length;ci++)
						{
							sinAux=sinonimos[ci].toLowerCase();
							sinAux=funcionesDeCadena.quitar_acentos(sinAux);
							if(sinAux.startsWith(pl))
							{
								lista.push(contenido.objetos[contenidoBolsillo[item]]);
							}
						}
					}
				}
				/*if (contenido.objetos[item].contenedor)
				{
					lista=detectorDePalabras.buscar_dentro_de_un_objeto_contenedor(contenido.objetos[item],pl,lista);
				}*/

			}
		}
		return lista;
		
	},

	//Busca un objeto dentro de un objeto contenedor
	buscar_dentro_de_un_objeto_contenedor:function(obj,pl,lista)
	{
		var contiene=obj.bolsillo.contenido;
		for (var c=0;c<contiene.length;c++)
		{
			encontrado=false;
			obAux=contenido.objetos[contiene[c]];
			nombreAux=obAux.nombre.toLowerCase();
			nombreAux=funcionesDeCadena.quitar_acentos(nombreAux);
			sinonimos=obAux.sinonimos;
			if ((nombreAux.startsWith(pl))&&(pl.length>=3))
			{
				lista.push(obAux);
			}
			
			else if (sinonimos!=null)
			{	
				for (var sc=0;sc<sinonimos.length;sc++)
				{
					sinAux=sinonimos[sc].toLowerCase();
					sinAux=funcionesDeCadena.quitar_acentos(sinAux);
					if((sinAux.startsWith(pl))&&(pl.length>=3))
					{
						lista.push(obAux);
					}
				}
			}
			if (obAux.contenedor)
			{
				lista=detectorDePalabras.buscar_dentro_de_un_objeto_contenedor(obAux,pl,lista);
			}
		}
		return lista;
	},

	//Recibe una lista de objetos aparentemente iguales y descubre
	//cual es realmente el buscado por su información adicional
	evaluar_objeto_buscado_en_lista:function(accion,ind,lista)
	{
		var nLista=[];
		claves=[];
		for (var el=0;el<lista.length;el++)
		{
			de=true;
			preDe="";
			ob=lista[el];
			mirarDeQue=false;
			adjetivos=true;
			//console.log("entro con el objeto: "+ob.nombre);
			for(var c=ind+1;c<accion.length;c++)
			{
				var ac=accion[c];
				//console.log("evaluo la accion: "+ac)
				if (detectorDePalabras.comprobar_si_es_articulo(ac)!=null)
					break;
				else if (detectorDePalabras.comprobar_si_es_preposicion(ac)!=null)
				{
					break;
				}
				else if(detectorDePalabras.comprobar_si_cadena_de_accion(ac)!=null)
				{
					break;
				}
				else if (detectorDePalabras.buscar_objeto_por_nombre(ac,contenido.objetos,[]).length>=1)
				{
					adjetivos=true;
				}
				else
				{
					//console.log("Es un posible adjetivo o pre de")
					adjetiv=ob.adjetivos;
					listaAd=[];
					for (var ad=0;ad<adjetiv.length;ad++)
					{
						posAd=adjetiv[ad].toLowerCase();
						posAd=funcionesDeCadena.quitar_acentos(posAd);
						listaAd.push(posAd);
					}
					
					if ((ob.preDe.length>0)&&(mirarDeQue==false))
					{
						for (pre in ob.preDe)
						{

							preDeObjeto=ob.preDe[pre].toLowerCase();
							preDeObjeto=funcionesDeCadena.quitar_acentos(preDeObjeto);
							if(preDeObjeto.startsWith(ac))
							{
								mirarDeQue=true;
								adjetivos=true;
								break;
							}
						}
						if (mirarDeQue)
						{
							continue;
						}
					}
					//console.log("la lista de adjetivos a mirar es")
					//console.log(listaAd)
					if (listaAd.indexOf(ac)==-1)
					{
						//console.log("conseguido el adjetivo es falso entre "+ob.nombre+" "+ac)
						adjetivos=false;
					}
				}
				if (adjetivos)
				{
					if (claves.indexOf(ob.clave)==-1)
					{
						//console.log("entra en lista el objeto: "+ob.nombre)
						//console.log("por la accion: "+ac)
						nLista.push(ob);
						claves.push(ob.clave);
					}	
				}
			}
			
		}

		return nLista;
	},

	//Evalua si la palabra recibida hace referencia a 
	//una salida del escenario actual
	buscar_conexiones_en_escenario:function(pl)
	{
		for (con in guion.conexiones)
		{
			if (guion.conexiones[con].startsWith(pl))
			{
				return guion.conexiones[con];
			}
		}

		for (key in guion.escenarioActual.conexiones)
		{
			sal=key.toLowerCase();
			sal=funcionesDeCadena.quitar_acentos(sal);
			if ((sal.startsWith(pl))&&(pl.length>=1))
				return sal;
		}
		
		return null;
	},

	//Evalua si la palabra recibida es una acción o verbo
	// activo en el juego
	buscar_accion_activa:function(pl)
	{
		for (key in guion.verbos)
		{
			verbos=guion.verbos[key].tambien;
			for (var v=0;v<verbos.length;v++)
			{
				if (verbos[v].startsWith(pl)&&(pl.length>=3))
				{
					return verbos[v];
				}
			}
		}
		return null;
	},

	//Evalua si la palabra recibida es un artículo
	comprobar_si_es_articulo:function(pl)
	{
		if (guion.articulos.indexOf(pl)!=-1)
		{
			id="";
			if (pl=="al")
				id="articulo_singular_masculino";
			else if (pl.endsWith("a"))
				id="articulo_singular_femenino";
			else if (pl.endsWith("as"))
				id="articulo_plural_femenino";
			else if ((pl.endsWith("l"))||(pl.endsWith("n")))
				id="articulo_singular_masculino";
			else if (pl.endsWith("os"))
				id="articulo_plural_masculino";
			return id;
					
		}
		else
			return null;
	},

	//Evalua si la palabra recibida es una preposición valida
	comprobar_si_es_preposicion:function(pl)
	{
		if (guion.preposiciones.indexOf(pl)!=-1)
		{
			return pl;
		}
		else
			return null;
	},

	comprobar_si_es_pre_de:function(ultimoEncontrado,pl)
	{
		if((ultimoEncontrado!=null) && ("objeto,item,actor".indexOf(ultimoEncontrado.identificador)!=-1))
		{	
			for (pr in ultimoEncontrado.preDe)
			{
				preDeObjeto=ultimoEncontrado.preDe[pr].toLowerCase();
				preDeObjeto=funcionesDeCadena.quitar_acentos(preDeObjeto);
				if (preDeObjeto.startsWith(pl))
				{
					return pl;
				}
			}		
		}
		return null;
	},

	//Comprueba si la palabra o frase es una cadena que viene del verbo decir
	comprobar_si_cadena_de_accion:function(pl)
	{
		if ((pl.startsWith('"')) && (pl.endsWith('"')))
		{
			return pl;
		}
		return null;
	},
	//Comprueba si la palabara recibida es un adjetivo 
	//válido para el objeto encontrado
	buscar_si_es_adjetivo:function(pl,objeto)
	{
		if ((objeto!=null) && ("objeto,item,actor".indexOf(objeto.identificador)!=-1))
		{
			adjetiv=objeto.adjetivos;
			listaAd=[];
			for (var ad=0;ad<adjetiv.length;ad++)
			{
				posAd=adjetiv[ad].toLowerCase();
				posAd=funcionesDeCadena.quitar_acentos(posAd);
				if (posAd.startsWith(pl))
				{
					return pl;
				}	
			}	
		}
		return null;
	}
}
var detectorDeTolken=
{

	detectar_objetos_actores_items:function(listaDeTolken,indice,listaObjetosEncontrados)
	{
		objetos=contenido.objetos;

		listaObjetosEncontrados=detectorDeTolken.buscar_objetos_en_la_lista(listaDeTolken,indice,objetos,listaObjetosEncontrados);

		listaObjetosEncontrados=detectorDeTolken.buscar_objetos_en_bolsillo_de_actor(listaDeTolken,indice,listaObjetosEncontrados,false);

		actores=contenido.actores;
		listaObjetosEncontrados=detectorDeTolken.buscar_actores_en_la_lista(listaDeTolken,indice,actores,listaObjetosEncontrados);

		
		listaObjetosEncontrados=detectorDeTolken.evaluar_objetos_en_lista(listaObjetosEncontrados,listaDeTolken,indice);
		
		return listaObjetosEncontrados;
	},
	buscar_objetos_en_la_lista:function(listaDeTolken,indice,objetosAMirar,listaObjetosEncontrados)
	{
		for (key in objetosAMirar)
		{
			if (listaDeTolken[indice].clave!="")
			{
				if (listaDeTolken[indice].clave==objetosAMirar[key].clave)
				{
					escenaContenedoraDelObjeto=detectorDeTolken.encontrar_objeto_contenedor(objetosAMirar[key])
					if (guion.escenarioActual.clave==escenaContenedoraDelObjeto)
					{
						listaObjetosEncontrados.push(objetosAMirar[key]);
					}
				}	
			}
			else
			{
				var objAMirar=objetosAMirar[key].nombre.toLowerCase();
				objAMirar=funcionesDeCadena.quitar_acentos(objAMirar);

				var objqBusco=listaDeTolken[indice].valor.toLowerCase();
				objqBusco=funcionesDeCadena.quitar_acentos(objqBusco);

				if (objqBusco==objAMirar)
				{
					escenaContenedoraDelObjeto=detectorDeTolken.encontrar_objeto_contenedor(objetosAMirar[key])
					
					if (guion.escenarioActual.clave==escenaContenedoraDelObjeto)
					{
						listaObjetosEncontrados.push(objetosAMirar[key]);
					}
				}			
			}
			
		}

		for (key in objetosAMirar)
		{
			var o=objetosAMirar[key];
			if (o.contenedor)
			{
				if  ((o.abiertoOcerrado=="abierto")||(o.transparente))
				{
					listaObjetosEncontrados=detectorDeTolken.buscar_objetos_a_nivel_de(o,listaDeTolken,indice,listaObjetosEncontrados);
				}
			}
		
		}
		return listaObjetosEncontrados;
	},

	//busca dentro del objeto hasta dar con el escenario donde se encuentra el objeto contenedor
	encontrar_objeto_contenedor:function(objetoAMirar)
	{
		var ElObjetoContenedor=null;
		if (contenido.escenarios[objetoAMirar.esta]==null)
		{
			contenerorDelObjeto=contenido.objetos[objetoAMirar.esta];
			if (contenerorDelObjeto==null)
			{
				contenerorDelObjeto=contenido.actores[objetoAMirar.esta];
			}

			if (contenerorDelObjeto!=null)
			{
				return detectorDeTolken.encontrar_objeto_contenedor(contenerorDelObjeto)
			}

		}
		return objetoAMirar.esta;
	},
	buscar_actores_en_la_lista:function(listaTolken,indice,listaActores,listaARellenar)
	{
		if (listaTolken[indice].clave!="")
		{
			if (listaTolken[indice].clave in listaActores)
			{
				listaARellenar.push(listaActores[listaTolken[indice].clave]);
			}	
		}
		else
		{
			for (key in listaActores)
			{
				if (listaTolken[indice].valor==listaActores[key].nombre)
				{
					listaARellenar.push(listaActores[key]);
				}			
			}
		}
		return listaARellenar;
	},
	buscar_objetos_en_bolsillo_de_actor:function(listaDeTolken,indice,listaObjetosEncontrados,buscarSoloDentro)
	{
		if (buscarSoloDentro!=true)
		{
			if (listaDeTolken[indice].clave!="")
			{
				obj=contenido.objetos[listaDeTolken[indice].clave];
				if ((obj!=null)&&(obj.esta==guion.ordenarA))
				{
					listaObjetosEncontrados.push(obj);
				}
			}
			else
			{
				for (key in contenido.objetos)
				{
					if(listaDeTolken[indice].valor==contenido.objetos[key].nombre)
					{
						if(contenido.objetos[key].esta==guion.ordenarA)
						{
							listaObjetosEncontrados.push(contenido.objetos[key]);
						}
					}
				}
			}

		}
		contenidoActor=contenido.actores[guion.ordenarA].bolsillo.contenido;
		for (var c=0;c<contenidoActor.length;c++)
		{
			o=contenido.objetos[contenidoActor[c]];
			if (o.contenedor)
			{
				if  ((o.abiertoOcerrado=="abierto")||(o.transparente))
				{
					listaObjetosEncontrados=this.buscar_objetos_a_nivel_de(o,listaDeTolken,indice,listaObjetosEncontrados);
				}
			}
		}
	
		return listaObjetosEncontrados;
	},

	buscar_objetos_a_nivel_de:function(objetoAExplorar,tokenABuscar,indice,listaObjetosABuscar)
	{
		contenidoObjeto=objetoAExplorar.bolsillo.contenido;

		for (var c=0;c<contenidoObjeto.length;c++)
		{
			if (tokenABuscar[indice].clave!="")
			{
				if (tokenABuscar[indice].clave==contenidoObjeto[c])
				{
					
					listaObjetosABuscar.push(contenido.objetos[tokenABuscar[indice].clave]);
				}
			}

			else if (tokenABuscar[indice].valor==contenido.objetos[contenidoObjeto[c]].nombre)
			{
				escenaContenedoraDelObjeto=detectorDeTolken.encontrar_objeto_contenedor(contenido.objetos[contenidoObjeto[c]])
					
				if (guion.escenarioActual.clave==escenaContenedoraDelObjeto)
				{
					
					var intro=true;
					for (obj in listaObjetosABuscar)
					{
						if (contenido.objetos[contenidoObjeto[c]].clave==listaObjetosABuscar[obj].clave)
						{
							intro=false;
						}
					}
					if (intro)
					{
						listaObjetosABuscar.push(contenido.objetos[contenidoObjeto[c]]);
					}
				}
			}
			else
			{
				posCont=contenido.objetos[contenidoObjeto[c]];
				if (posCont.contenedor)
				{
					if ((posCont.abiertoOcerrado=="abierto")||(posCont.transparente))
					{
						listaObjetosABuscar=detectorDeTolken.buscar_objetos_a_nivel_de(posCont,tokenABuscar,indice,listaObjetosABuscar);				
					}
				}
			}
		}
		return listaObjetosABuscar;
	},
	evaluar_objetos_en_lista:function(lstObj,listaTolk,ind)
	{

		var lista=[];
		var claves=[];
		var adje=true;
		var de=false;
		//console.log(lstObj)
		for (var il=0;il<lstObj.length;il++)
		{
			de=false;
			adje=true;
			//console.log(listaTolk[ind])
			if (listaTolk[ind].preDe!="")
			{
				pDAux=lstObj[il].preDe.toLowerCase();
				pDAux=funcionesDeCadena.quitar_acentos(pDAux);

				if (listaTolk[ind].preDe!=pDAux)
				{
					adje=false;
					continue;
				}
			}
			adjetivos=lstObj[il].adjetivos;
			//console.log(listaTolk[ind].adjetivos);
			//console.log(adjetivos);
			if(listaTolk[ind].adjetivos.length>0)
			{
				adjeTolk=listaTolk[ind].adjetivos;
				
				for (var ia=0;ia<adjeTolk.length;ia++)
				{
					newAdje=[];
					for (var adO=0;adO<adjetivos.length;adO++)
					{
						adAux=adjetivos[adO].toLowerCase();
						adAux=funcionesDeCadena.quitar_acentos(adAux);
						newAdje.push(adAux);
					}
					
					if (newAdje.indexOf(adjeTolk[ia])==-1)
					{
						adje=false
					}
				}	
			}
		
			if ((adje))
			{
				if (claves.indexOf(lstObj[il].clave)==-1)
				{
					lista.push(lstObj[il]);
					claves.push(lstObj[il].clave);
				}
				
			}
		}
		return lista;
	},
}
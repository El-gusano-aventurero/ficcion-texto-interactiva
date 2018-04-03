function Coger()
{
	Generico.call(this);
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion,textoSin,textoCon)
	{
		if(objetosO.length>0)
		{
			objetosO=objetosO[0];
		}

		if ("con".indexOf(preposicion)!=-1)
		{
			if ("coger" in objetosP[0])
			{
				if (((objetosP[0].visible!=true)||(objetosP[0].visto!=true))&&(objetosP[0].atrezo!=true))
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosP[0].nombre+" "+guion.frasesInternas["27"];
				}
				else if((objetosP[0].esta!=guion.escenarioActual.clave)&&(objetosP[0].esta!=guion.ordenarA))
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosP[0].nombre+" "+guion.frasesInternas["28"];
				}
				else if (objetosP[0].coger in eventos.event)
				{
					gestionPartidas.guardarEnTurno=true;
					func=eventos.event[objetosP[0].coger];
					return func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosP[0].coger);
				}
			}			
		}
		for (objeto in objetosO)
		{
			if ("coger" in objetosO[objeto])
			{
				
				if (objetosO[objeto].coger in eventos.event)
				{
					gestionPartidas.guardarEnTurno=true;
					func=eventos.event[objetosO[objeto].coger];
					return func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosO[objeto].coger)
				}
			}
			else
			{
				if ("con".indexOf(preposicion)!=-1)
				{
					if (objetosO[objeto].esta==objetosP[0].clave)
					{
						
						textoNoSePuede=this.no_se_puede_interactuar_pre(objetosO[objeto]);
						if (textoNoSePuede!=null)
						{
							return textoNoSePuede;
						}
						else if (contenido.actores[guion.ordenarA].bolsillo.insertar_objeto(objetosO[objeto]))
						{
							objetosP[0].bolsillo.quitar_objeto(objetosO[objeto]);
							return guion.frasesInternas["41"]+" "+objetosO[objeto].mostrar_informacion();	 
						}
						else
						{
							return this.no_se_puede_interactuar_post(objetosO[objeto]);
						}
					}
				}
				else
				{
					textoNoSePuede=this.no_se_puede_interactuar_pre(objetosO[objeto]);
					if (textoNoSePuede!=null)
					{
						return textoNoSePuede;
					}
					if (objetosO[objeto].esta == guion.escenarioActual.clave)
					{
						guion.escenarioActual.quitar_objeto(objetosO[objeto]);
					}
					else
					{
						contenedor=contenido.objetos[objetosO[objeto].esta];
						if (contenedor!=null)
							contenedor.bolsillo.quitar_objeto(objetosO[objeto])
					}
					if (contenido.actores[guion.ordenarA].bolsillo.insertar_objeto(objetosO[objeto]))
					{
						return guion.frasesInternas["41"]+" "+objetosO[objeto].mostrar_informacion();
					}
						
					else
					{
						return this.no_se_puede_interactuar_post(objetosO[objeto]);
					}
				}
			}		
		}
	}
	this.no_se_puede_interactuar_pre=function(objeto)
	{
		art=objeto.obtener_articulo_personal();
		if ((objeto.psi)&&(objeto.visible))
		{
			aQuien="";
			if (objeto.conocido)
			{
				aQuien=guion.frasesInternas["23"];
				return guion.frasesInternas[38]+" "+aQuien+" "+objeto.nombre;
			}
			else
			{
				aQuien=guion.frasesInternas["89"];
				return guion.frasesInternas[38]+" "+aQuien+" "+objeto.sinonimos[0];
			}				
		}
		else if (((objeto.visto!=true)||(objeto.visible!=true))&&(objeto.atrezo!=true))
		{
			if (objeto.psi)
			{
				aQuien="";
				if (objeto.conocido)
				{
					aQuien=guion.frasesInternas["23"];
					return guion.frasesInternas["27"]+" "+aQuien+" "+objeto.nombre+" "+guion.frasesInternas["28"];
				}
				else
				{
					aQuien=guion.frasesInternas["89"];
					return guion.frasesInternas["27"]+" "+aQuien+" "+objeto.sinonimos[0]+" "+guion.frasesInternas["28"];
				}				
			}
			return guion.frasesInternas["27"]+" "+art+" "+objeto.nombre+" "+guion.frasesInternas["28"];
		}
		else if(objeto.scoger!=true)
		{
			return guion.frasesInternas["42"]+" "+art+" "+objeto.nombre
		}
		else if (objeto.esta==guion.ordenarA)
		{
			return guion.frasesInternas["37"]+" "+art+" "+objeto.nombre;
		}
		else if(this.encontrar_objeto_madre(objeto)!=true)
		{
			return art+" "+objeto.nombre+" no está por aquí"
		}

		return null;
	}
	
	this.no_se_puede_interactuar_post=function(objeto)
	{
		art=objeto.obtener_articulo_personal();
		if(objeto.peso>contenido.objetos[guion.ordenarA].resistencia)
		{
			return art+" "+objeto.nombre+guion.frasesInternas["73"];
		}
		else
		{
			return guion.frasesInternas["42"]+" "+art+" "+objeto.nombre;
		}
	}
}

Coger.prototype = Object.create(Generico.prototype);
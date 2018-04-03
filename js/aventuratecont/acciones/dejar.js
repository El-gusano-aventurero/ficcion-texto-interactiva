function Dejar()
{
	Generico.call(this);
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion)
	{
		if(objetosO.length>0)
		{
			objetosO=objetosO[0];
		}
		if (preposicion=="en")
		{
			if ("dejar" in objetosP[0])
			{
				if ((objetosP[0].visto!=true)&&(objetosP[0].visible!=true))
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosP[0].nombre+" "+guion.frasesInternas["27"];
				}
				else if((objetosP[0].esta!=guion.escenarioActual.clave)&&(objetosP[0].esta!=guion.ordenarA))
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosP[0].nombre+" "+guion.frasesInternas["28"];
				}
				else if (objetosP[0].dejar in eventos.event)
				{
					func=eventos.event[objetosP[0].dejar];
					func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosP[0].dejar);
				}
			}			
		}
		for (objeto in objetosO)
		{
			if (objetosO[objeto].esta!=guion.ordenarA)
			{
				return "No tengo "+objetosO[objeto].obtener_articulo_personal()+" "+objetosO[objeto].nombre;
			}
			if ("dejar" in objetosO[objeto])
			{
				
				if (objetosO[objeto].dejar in eventos.event)
				{
					func=eventos.event[objetosO[objeto].dejar];
					func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosO[objeto].dejar)
				}
			}
			else
			{
				artO=objetosO[objeto].obtener_articulo_personal();
				if ("en".indexOf(preposicion)!=-1)
				{
					if (objetosO[objeto].esta==guion.ordenarA)
					{
						if((objetosO[objeto].visible)&&(objetosO[objeto].visto))
						{
							artP=objetosP[0].obtener_articulo_personal();
							fallo=this.evaluar_pre(objetosP[0],objetosO[objeto])
							if (fallo!=null)
							{
								return fallo;
							}
							if (contenido.actores[guion.ordenarA].bolsillo.quitar_objeto(objetosO[objeto]))
							{	
								if (objetosP[0].bolsillo.insertar_objeto(objetosO[objeto]))
								{
									return "He dejado "+art+" "+objetosO[objeto].nombre+" en "+artP+" "+objetosP[0].nombre;
								}
								else
								{
									contenido.actores[guion.ordenarA].bolsillo.insertar_objeto(objetosO[objeto])
									return artO+" pesa demasiado para dejarlo en "+artP+objetosP[0].nombre;
								}
							}
							else
							{
								return "No puedo dejar "+artO+" "+objetos[objeto].nombre;
							}
						}
					}
				}
				else
				{
					if (objetosP.length>0)
					{
						return "No entiendo bien la orden. Usa 'en' vez de '"+preposicion+"'";
					}
					else
					{
						if (contenido.actores[guion.ordenarA].bolsillo.quitar_objeto(objetosO[objeto]))
						{
							if (guion.escenarioActual.insertar_objeto(objetosO[objeto]))
							{
								return "He dejado "+artO+" "+objetosO[objeto].nombre;
							}
						}
						else
						{
							return "No puedo dejar "+artO+" "+objetos[objeto].nombre;
						}
					}
				}
			}

		}
		return null
	}
	this.evaluar_pre=function(receptor,objeto)
	{
		rArt=receptor.obtener_articulo_personal();
		oArt=objeto.obtener_articulo_personal();
		if (receptor.psi)
		{
			
			if (receptor.conocido!=true)
			{
				return rArt+" "+receptor.sinonimos[0]+" no quiere "+oArt+" "+objeto.nombre;
			}
			else
			{
				return receptor.nombre+" no quiere "+oArt+" "+objeto.nombre;
			}
		}
		else if(receptor.contenedor!=true)
		{
			return rArt+" "+receptor.nombre+" no puedo dejar ningún objeto";
		}
		else if(receptor.abiertoOcerrado=="cerrado")
		{
			return rArt+" "+receptor.nombre+" está cerrado. Prueba a abrirlo primero";
		}
		return null;
	}
}
Dejar.prototype = Object.create(Generico.prototype);
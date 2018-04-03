function Abrir()
{
	Generico.call(this);
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion,textoSin,textoCon)
	{
		if(objetosO.length>0)
		{
			objetosO=objetosO[0];
		}
		if (preposicion=="con")
		{
			if (objetosP.length>0)
			{
				if (((objetosP[0].visible!=true)||(objetosP[0].visto!=true))&&(objetosP[0].atrezo!=true))
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosP[0].nombre+" "+guion.frasesInternas["28"];
				}
				else if((objetosP[0].esta!=guion.escenarioActual.clave)&&(objetosP[0].esta!=guion.ordenarA))
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosP[0].nombre+" "+guion.frasesInternas["28"];
				}
				if ("abrir" in objetosP[0])
				{
					if (objetosP[0].abrir in eventos.event)
					{
						gestionPartidas.guardarEnTurno=true;
						func=eventos.event[objetosP[0].abrir];
						return func(verbo,objetosO,objetosP,preposicion);
					}
					else
					{
						return funcionesDeSalida.obtener_texto(objetosP[0].abrir)
					}
				}
				else
				{
					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["59"]+" "+art+" "+objetosP[0].nombre;
				}
			}
		}
		
		for (objeto in objetosO)
		{
			art=objetosO[objeto].obtener_articulo_personal();
			if ("abrir" in objetosO[objeto])
			{
				if (objetosO[objeto].abrir in eventos.event)
				{
					gestionPartidas.guardarEnTurno=true;
					func=eventos.event[objetosO[objeto].abrir];
					return func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosO[objeto].abrir);
				}
			}
			else if (((objetosO[objeto].visible!=true)||(objetosO[objeto].visto!=true))&&(objetosO[objeto].atrezo!=true))
			{
				return guion.frasesInternas["27"]+" "+art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["28"];
			}
			/*else if((objetosO[objeto].esta!=guion.escenarioActual.clave)&&(objetosO[objeto].esta!=guion.ordenarA))
			{
					art=objetosO[objeto].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["28"];
			}*/
			else if (objetosO[objeto].psi)
			{
				return guion.frasesInternas["60"]
			}
			else if ((objetosO[objeto].abrirOcerrar[0])&&(objetosO[objeto].abiertoOcerrado=="cerrado"))
			{
				objetosO[objeto].abiertoOcerrado="abierto";
				return guion.frasesInternas["61"]+" "+art+" "+objetosO[objeto].nombre
			}
			else if (objetosO[objeto].abrirOcerrar[0]!=true)
			{
				return art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["62"];
			}
			else if (objetosO[objeto].abiertoOcerrado=="abierto")
			{
				return art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["63"];
			}
		}

		return null;
	}
}
Abrir.prototype = Object.create(Generico.prototype);
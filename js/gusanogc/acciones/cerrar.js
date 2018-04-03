function Cerrar()
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
				if ("cerrar" in objetosP[0])
				{
					if (objetoP[0].abrir in eventos.event)
					{
						gestionPartidas.guardarEnTurno=true;
						func=eventos.event[objetoP[0].abrir];
						return func(verbo,objetosO,objetosP,preposicion);
					}
					else
					{
						return funcionesDeSalida.obtener_texto(objetoP[0].cerrar)
					}
				}
				else
				{

					art=objetosP[0].obtener_articulo_personal();
					return guion.frasesInternas["66"]+" "+art+" "+objetosP[0].nombre;
				}
			}
		}
	
		for (objeto in objetosO)
		{
			art=objetosO[objeto].obtener_articulo_personal();
			
			if ("cerrar" in objetosO[objeto])
			{
				//screenText.escribir({texto:"Entro en abrir"});
				
				if (objetosO[objeto].cerrar in eventos.event)
				{
					gestionPartidas.guardarEnTurno=true;
					func=eventos.event[objetosO[objeto].cerrar];
					return func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosO[objeto].cerrar);
				}
			}
			else if (((objetosO[objeto].visible!=true)||(objetosO[objeto].visto!=true))&&(objetosO[objeto].atrezo!=true))
			{
				art=objetosO[objeto].obtener_articulo_personal();
				return guion.frasesInternas["27"]+" "+art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["28"];
			}
			/*else if((objetosO[objeto].esta!=guion.escenarioActual.clave)&&(objetosO[objeto].esta!=guion.ordenarA))
			{
					art=objetosO[objeto].obtener_articulo_personal();
					return guion.frasesInternas["27"]+" "+art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["28"];
			}*/
			else if (objetosO[objeto].psi)
			{
				return guion.frasesInternas["67"]
			}
			else if ((objetosO[objeto].abrirOcerrar[1])&&(objetosO[objeto].abiertoOcerrado=="abierto"))
			{
				objetosO[objeto].abiertoOcerrado="cerrado";
				return guion.frasesInternas["68"]+" "+art+" "+objetosO[objeto].nombre
			}
			else if (objetosO[objeto].abrirOcerrar[1]!=true)
			{
				return art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["69"];
			}
			else if (objetosO[objeto].abiertoOcerrado=="cerrado")
			{
				return art+" "+objetosO[objeto].nombre+" "+guion.frasesInternas["70"];
			}
		}

	}
	return null;
}
Cerrar.prototype = Object.create(Generico.prototype);
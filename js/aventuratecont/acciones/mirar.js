function Mirar()
{
	Generico.call(this);
	this.desbloquear_contenido=function(obj)
	{
		cont=obj.bolsillo.contenido;
		for (var c=0;c<cont.length;c++)
		{		
			contenido.objetos[cont[c]].visto=true;
		}
	}	
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion)
	{

		if(objetosO.length>0)
		{
			objetosO=objetosO[0];
		}
		else
		{
			if (verbo.valor=="examinar")
			{
				for (o in guion.escenarioActual.objetos)
				{
					guion.escenarioActual.objetos[o].visto=true;
				}
			}
			guion.mostrar_escena_actual();
			return "@no_cadena";
		}

		for (objeto in objetosO)
		{
			if (this.encontrar_objeto_madre(objetosO[objeto]))
			if ("mirar" in objetosO[objeto])
			{
				if (objetosO[objeto].mirar in eventos.event)
				{
					func=eventos.event[objetosO[objeto].mirar];
					func(verbo,objetosO,objetosP,preposicion);
				}
				else
				{
					return funcionesDeSalida.obtener_texto(objetosO[objeto].mirar)
				}
				return null;
			}
			else if(("en,por".indexOf(preposicion)!=-1)||(verbo.valor=="examinar"))
			{
				if (objetosO[objeto].psi!=true)
				{

					if (objetosO[objeto].contenedor)
					{
						if(((objetosO[objeto].visible)&&(objetosO[objeto].visto))||(objetosO[objeto].atrezo))
							if ((objetosO[objeto].abiertoOcerrado=="abierto")||(objetosO[objeto].transparente==true))
							{
								this.desbloquear_contenido(objetosO[objeto]);
								var texto=objetosO[objeto].mostrar_bolsillo()
								if (texto=="")
								{
									texto=objetosO[objeto].mostrar_informacion()
								}
								return texto	
							}
							else
							{
								art=objetosO[objeto].obtener_articulo_personal();
								if (art=="el")
								{
									art="del";
								}
								return guion.frasesInternas["80"]+" "+art+" "+objetosO[objeto].nombre;
							}		
					}
					else
					{

						if(((objetosO[objeto].visible)&&(objetosO[objeto].visto))||(objetosO[objeto].atrezo))
						{
							return funcionesDeSalida.obtener_texto(objetosO[objeto].descripcion)
						}
					}
				}
				else
				{
					if(objetosO[objeto].visible)
					{
						return funcionesDeSalida.obtener_texto(objetosO[objeto].descripcion)
					}
				}
			}
			else if (objetosO[objeto].psi!=true)
			{
				if ((objetosO[objeto].visto)||(objetosO[objeto].atrezo))
					if(objetosO[objeto].visible)
						if (objetosO[objeto].contenedor)
						{
							return funcionesDeSalida.obtener_texto(objetosO[objeto].descripcion);
						}
						else
						{
							return objetosO[objeto].mostrar_informacion();
						}
			}
			else
			{
				if(objetosO[objeto].visible)
					return funcionesDeSalida.obtener_texto(objetosO[objeto].qHace)
			}
		}
		return null;
	}
}
Mirar.prototype = Object.create(Generico.prototype);
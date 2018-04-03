function Decir()
{
	Generico.call(this);
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion)
	{
		if(objetosO.length>0)
		{
			objetosO=objetosO[0];
		}

		if (objetosO.length>0)
		{
			if (objetosO[0].psi)
			{
				if (objetosO[0].visible)
				{
					if (objetosO[0].esta==guion.escenarioActual.clave)
					{
						if ("decir" in objetosO[0])
						{
							if (objetosO[0].abrir in eventos.event)
							{
								func=eventos.event[objetosO[0].decir];
								return func(verbo,objetosO,objetosO,preposicion);
							}
							else
							{
								return funcionesDeSalida.obtener_texto(objetosO[0].decir)
							}
						}
						guion.ordenarA=objetosO[0].clave;
						ordenAux=funcionesDeCadena.sustituir_caracter_por(ejecutor.ordenAuxiliar,'"',"");
						ejecutor.ordenAuxiliar="";
						ordenAux=entrada.normalizar_cadena(ordenAux);
						interprete.interpretar_orden(ordenAux);
						return "@no_cadena";
					}
					else
					{
						art=""
						nombre=objetosO[0].nombre
						if (objetosO[0].conocido!=true)
						{
							nombre=objetosO[0].sinonimos[0];
							art=objetosO[0].obtener_articulo_personal()+" ";
						}
						return "Aquí no está "+art+nombre;
					}	
				}
				else
				{
					nombre=objetosO[0].nombre
					if (objetosO[0].conocido!=true)
					{
						nombre=objetosO[0].sinonimos[0];
					}
					return nombre+" no está por aquí"
				}
			}
			else
			{
				art=objetosO[0].obtener_articulo_personal();
				return "No puedo hablar con "+art+" "+objetosO[0].nombre;
			}
		}
		else
		{
			ordenAux=funcionesDeCadena.sustituir_caracter_por(ejecutor.ordenAuxiliar,'"',"");
			ejecutor.ordenAuxiliar="";
			return "No se con quien hablar";
		}
		if(ejecutor.ordenAuxiliar=="")
		{
			return "No tengo nada de decir";
		}
		
		return null;
	}
}
Decir.prototype = Object.create(Generico.prototype);
function Otras()
{
	Generico.call(this);

	this.ejecutar=function(verbo,objetosO,objetosP,preposicion,textoSin,textoCon)
	{
		gestionPartidas.guardarEnTurno=true;
		if (objetosO.length>0)
		{
			objetosO=objetosO[0];
		}

		if (objetosP.length>0)
		{
			estaEnEscenaOProta=detectorDeTolken.encontrar_objeto_contenedor(objetosP[0]);
			
			if (estaEnEscenaOProta==guion.escenarioActual.clave)
			{
				if(objetosP[0].visible)
				{

					func=eventos.event[objetosP[0][verbo.valor]];
					
					if (func!=null)
					{
						return func(verbo,objetosO,objetosP,preposicion);
					}
					else if(objetosO[0][verbo.valor]!=null)
					{
						return funcionesDeSalida.obtener_lista(objetosO[0][verbo.valor]);
					} 
				}
			}
			
		}
		if (objetosO.length>0)
		{
			
			estaEnEscenaOProta=detectorDeTolken.encontrar_objeto_contenedor(objetosO[0]);
			if (estaEnEscenaOProta==guion.escenarioActual.clave)
			{
				if(objetosO[0].visible)
				{
					func=eventos.event[objetosO[0][verbo.valor]];
					if (func!=null)
					{
						return func(verbo,objetosO,objetosP,preposicion);
					}
					else if(objetosO[0][verbo.valor]!=null)
					{
						return funcionesDeSalida.obtener_lista(objetosO[0][verbo.valor]);
					}
				}
			}

		}
		func=eventos.event[verbo.valor];
		if (func!=null)
		{
			return func(verbo,objetosO,objetosP,preposicion);
		}

		if (objetosP.length>0)
		{
			if (textoCon!=null)
			{
				return textoCon;
			}
			else
			{
				art=objetosP[0].obtener_articulo_personal();
				return guion.frasesInternas["90"]+" "+verbo.valor+" "+art+" "+objetosP[0].nombre;
			}
		}
		else if(objetosO.length>0)
		{
			art=objetosO[0].obtener_articulo_personal();
			if (objetosO[0].psi)
			{
				return guion.frasesInternas["90"]+" "+verbo.valor+" "+"a"+" "+objetosO[0].nombre;
			}
			else
			{
				return guion.frasesInternas["90"]+" "+verbo.valor+" "+art+" "+objetosO[0].nombre;
			}
			
		}
		else if (textoSin!=null)
		{
			return textoSin;
		}

		return guion.frasesInternas["47"]+" "+verbo.valor;
	}
	
}
Otras.prototype = Object.create(Generico.prototype);
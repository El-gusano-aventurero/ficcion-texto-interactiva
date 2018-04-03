function Generico()
{
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion,textoSin,textoCon){return true};
	this.encontrar_objeto_madre=function(objeto)
	{

		if (contenido.escenarios[objeto.esta]==null)
		{
			objetoAuxiliar=contenido.actores[objeto.esta];
			if (objetoAuxiliar==null)
			{
				objetoAuxiliar=contenido.objetos[objeto.esta]
			}
			return this.encontrar_objeto_madre(objetoAuxiliar)
		}
		else
		{
			if (objeto.esta==guion.escenarioActual.clave)
				return true;
			else
				return false;
		}
	}
}
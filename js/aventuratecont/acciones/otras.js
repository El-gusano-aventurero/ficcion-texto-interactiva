function Otras()
{
	Generico.call(this);
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion)
	{
		if (objetosO.length>0)
		{
			objetosO=objetosO[0];
		}
		if (objetosP.length>0)
		{
			func=eventos.event[objetosP[0][verbo.valor]];
			if (func!=null)
			{
				return func(verbo,objetosO,objetosP,preposicion);
			}
		}
		if (objetosO.length>0)
		{
			func=eventos.event[objetosO[0][verbo.valor]];
			if (func!=null)
			{
				return func(verbo,objetosO,objetosP,preposicion);
			}
		}

		console.log("ejecuto: "+verbo.valor)
		func=eventos.event[verbo.valor];
		
		if (func!=null)
		{
			return func(verbo,objetosO,objetosP,preposicion);
		}

	}
}
Otras.prototype = Object.create(Generico.prototype);
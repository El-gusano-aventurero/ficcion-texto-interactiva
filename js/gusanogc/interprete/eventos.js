var eventos={
	
	event:{},
	actualizaciones:{},
	intervalos:{},

	crear_intervalo:function(nombre,funcion,tiempo,unaVez)
	{
		if (unaVez)
		{
			setTimeout(funcion,tiempo);
		}
		else
		{
			var id=setInterval(funcion,tiempo);
			eventos.intervalos[nombre]=id;
		}
	},
	eliminar_intervalo:function(clave)
	{
		if (clave in eventos.intervalos)
		{
			clav=eventos.intervalos[clave];
			delete eventos.intervalos[clave];
			clearInterval(clav);
		}
	},
	ejecutar:function(evento)
	{
		if (evento in eventos.event)
		{
			acc=eventos.event[evento];
			if (acc!=null)
			{
				return acc();
			}
		}
		return true;
	},

	actualizar:function()
	{
		for(key in eventos.actualizaciones)
		{
			act=eventos.actualizaciones[key];
			if (act!=null)
			{
				act();
			}
		}
	},

	eliminar_evento:function(clave)
	{
		if (clave in eventos.event)
		{
			delete eventos.event[clave];
		}
	},

	eliminar_actualizacion:function(clave)
	{
		if (clave in eventos.actualizaciones)
		{
			delete eventos.actualizaciones[clave];
		}
	}

}


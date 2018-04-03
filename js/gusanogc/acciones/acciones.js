function Acciones()
{
	Generico.call(this);
	
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion,textoSin,textoCon)
	{
		if(objetosO.length>0)
		{
			return "Esta acción no funciona con otros objetos o personajes";
		}
		else
		{
			var acciones=buclePrincipal.ideUsuario.comandosUsables;
			var cadenaAcciones="";
			for (acc in acciones)
			{
				if (acc>=acciones.length-1)
				{
					cadenaAcciones+=acciones[acc];
				}
				else
				{
					cadenaAcciones+=acciones[acc]+" , ";
				}	
			}
			salida.escribir({tipo:"contenidoObjeto",cadena:"Actualmente conoces: "+cadenaAcciones})
			return "@no_cadena";
		}
	}
}
Acciones.prototype = Object.create(Generico.prototype);
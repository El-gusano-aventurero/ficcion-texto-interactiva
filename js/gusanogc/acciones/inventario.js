function Inventario()
{
	Generico.call(this);
	
	this.ejecutar=function(verbo,objetosO,objetosP,preposicion,textoSin,textoCon)
	{
		if(objetosO.length>0)
		{
			return "Esta acción no funciona así";
		}
		else
		{
			if (contenido.actores[guion.actorPrincipal].bolsillo.contenido.length<=0)
			{
				salida.escribir({tipo:"contenidoObjeto",cadena:"Tu inventario está vacío"});
				return "@no_cadena";
			}
			var bolsillo=contenido.actores[guion.actorPrincipal].mostrar_bolsillo();
			salida.escribir({tipo:"contenidoObjeto",cadena:bolsillo});
			return "@no_cadena";
		}
	}
}
Inventario.prototype = Object.create(Generico.prototype);
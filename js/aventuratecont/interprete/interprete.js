var interprete=
{
	interpretar_orden:function(accion)
	{
		tolken=generador.tolkenizar(accion);
		tolken=organizador.comprobar_y_eliminar_tolken_no_necesarios(tolken);
		tolken=organizador.organizar_tolken_validos(tolken);
		elementos=ejecutor.preparar_accion(tolken);
		if (tolken[0].identificador=="salida")
		{
			cadena=guion.intercambiar_escenario(tolken[0].valor);
			if (cadena!=null)
			{
				ejecutor.mostrar_cadena(cadena);
			}
		}
		else
		{
			ejecutor.ejecutar_accion(elementos);
		}
	}
}
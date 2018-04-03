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
			
			if ((elementos!=null)&&(elementos.listaO.length>=1)&&(elementos.listaO[0].length>1))
			{
				//console.log(tolken)
				var sonIguales=true;
				posiblesElementosIguales=elementos.listaO[0];
				elementoIgualNombre=posiblesElementosIguales[0].nombre;
				for (comprobador in posiblesElementosIguales)
				{
					if(posiblesElementosIguales[comprobador].nombre!=elementoIgualNombre)
					{
						sonIguales=false;
					}
				}
				if (sonIguales)
				{
					ejecutor.mostrar_cadena("No se que "+elementoIgualNombre+" "+tolken[0].valor);
					
					return;
				}
			}
			ejecutor.ejecutar_accion(elementos);
		}
	}
}
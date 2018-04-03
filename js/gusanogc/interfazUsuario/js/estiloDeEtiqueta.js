var estiloDeEtiqueta=
{
	generar_estilos:function(etiqueta,estilos)
	{
		//.style.property="value"
		if("ancho" in estilos)
		{
			etiqueta.style.width=estilos.ancho;
		}
		if ("alto" in estilos)
		{
			etiqueta.style.height=estilos.alto;
		}
		if ("alinear" in estilos)
		{
			etiqueta.style.textAlign=estilos.alinear;
		}
		if ("colorFondo" in estilos)
		{
			etiqueta.style.backgroundColor=estilos.colorFondo;
		}
		if ("color" in estilos)
		{
			etiqueta.style.color=estilos.color;
		}
		if ("tamaFuente" in estilos)
		{
			etiqueta.style.fontSize=estilos.tamaFuente;
		}
		if ("fuente" in estilos)
		{
			etiqueta.style.fontFamily=estilos.fuente;
		}
		if ("espesor" in estilos)
		{
			etiqueta.style.fontWeight=estilos.espesor;
		}
		if ("clases" in estilos)
		{
			etiqueta.className+=" "+estilos.clases;
		}
		return etiqueta;
	}
}
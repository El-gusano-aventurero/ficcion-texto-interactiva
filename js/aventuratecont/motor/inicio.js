


var inicio={
	iniciar:function(url,baseUrlJuego)
	{
		dimensiones.iniciar();
		
		cargador.iniciar_aventura(url,baseUrlJuego);
		buclePrincipal.iniciar();
		buclePrincipal.iterar();
	}
};

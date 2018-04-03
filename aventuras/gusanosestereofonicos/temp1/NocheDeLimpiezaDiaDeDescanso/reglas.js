guion.comenzar=function()
{
	guion.insertar_secuencia(new SecuenciaMenu());
	guion.insertar_secuencia(new SecuenciaAlTrabajoEnBicicleta());
	guion.insertar_secuencia(new SecuenciaSubiendoPorLaCarretera());
	guion.insertar_secuencia(new SecuenciaLimpiandoEnElCerdito());
	guion.insertar_secuencia(new CruzandoElBosqueColorado());
}

entradaUsuario.post_generar_entrada_usuario=function()
{
	entradaUsuario.cuadroDeTexto.setAttribute("disabled","disabled");
}
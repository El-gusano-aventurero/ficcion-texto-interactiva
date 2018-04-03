function Capitulo(titulo,clave,inicial)
{
	this.clave=clave;
	console.log(titulo)
	this.titulo=titulo;
	this.capituloInicial=inicial;
	this.datos={};
	this.terminarCapitulo=false;
	
	this.iniciar=function(){};
	this.presentacion=function(){};
	this.actualizar_a_tiempo_real=function(tiempo){};
	this.actualizar_turno=function(){};
	this.finalizar=function(){};
}
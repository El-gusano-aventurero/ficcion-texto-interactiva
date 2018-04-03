function Imagen(recurso)
{
	this.url=recurso;
	this.imagen=new Image();
	this.listo=false;

}

Imagen.prototype.imagen_lista=function()
{
	screenText.escribir({texto:"Recurso listo.",fuente:conf.contenido.fuente,tama:conf.contenido.tama,color:conf.contenido.color,estilo:conf.contenido.estilo});
		
	this.listo=true;
}
Imagen.prototype.cargar_imagen=function()
{
	this.imagen.onload=this.imagen_lista();
	this.imagen.src=this.url;
}
Imagen.prototype.actualizar=function()
{

}
Imagen.prototype.dibujar=function(g)
{
	
}
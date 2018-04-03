function Imagen(recurso)
{
	this.url=recurso;
	this.imagen=new Image();
	this.listo=false;

}

Imagen.prototype.imagen_lista=function()
{
	console.log("listo")	
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
	g.drawImage(this.imagen, 0, 0);
	return;
}
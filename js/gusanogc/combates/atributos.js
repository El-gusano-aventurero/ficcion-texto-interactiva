function Atributos()
{
	this.estado={"nivel":0,"vida":100,"magia":100,"ataque":5,"defensa":8};
	this.equipo={"arma":"","defensa":"","ropa":""};
}
Atributos.prototype.crear_estado_inicial=function(nivel,vida,magia,ataque,defensa)
{
	this.estado={"nivel":nivel,"vida":vida,"magia":magia,"ataque":ataque,"defensa":defensa};
}
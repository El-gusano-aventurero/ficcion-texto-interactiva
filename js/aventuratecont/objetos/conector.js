function Conector(dat,key)
{
	this.direccion=key;
	this.descripcion="";
	this.textoBloqueada="";
	this.descripcion=dat.descripcion;
	this.enviarA=dat.cuarto;
	this.visible=true;
	if ("visible" in dat)
	{
		this.visible=dat.visible;
	}

	this.bloqueada=false;
	if ("bloqueada" in dat)
	{
		this.bloqueada=dat.bloqueada;
	}

}
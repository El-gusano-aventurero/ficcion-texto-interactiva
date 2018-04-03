function Conector(dat,key)
{
	this.direccion=key;
	this.descripcion="";
	
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

	this.escenarioInicial=null;
	if ("escenarioInicial" in dat)
	{
		this.escenarioInicial=dat.escenarioInicial;
	}

	this.secuenciaAsociada="";
	if ("secuencia")
	{
		this.secuenciaAsociada=dat.secuencia;
	}

	this.textoBloqueada="";
	if ("textoBloqueada" in dat)
	{
		this.textoBloqueada=dat.textoBloqueada;
	}
}
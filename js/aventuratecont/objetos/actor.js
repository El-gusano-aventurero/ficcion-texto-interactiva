
function Actor(dat,key)
{
	ObjetoGenerico.call(this,dat,key);

	this.psi=true;
	//Recive la clave de otro actor 
	//si es así este actor seguirá en todo momento
	//al actor de la clave que contiene
	this.grupo="";
	if("grupo" in dat)
		this.grupo=dat.grupo;

	//indica si es el protagonista actual de la historia
	this.protagonista=false;
	if("protagonista" in dat)
		this.protagonista=dat.protagonista;

	//Indica si este actor es conocido 
	//por el actor principal
	this.conocido=false;
	if("conocido" in dat)
		this.conocido=dat.conocido;

	this.singular=true;
	
	//Es una descripción de lo que el actor esta haciendo
	this.qHace="";
	if("qHace" in dat)
		this.qHace=dat.qHace;

	this.mostrar_informacion=function()
	{
		var nombre="";
		var pron="";
		var cadena="";
		var adjetivos="";
		var finalAdjetivo=guion.frasesInternas["10"];
		var qHace="";
		
		if (this.conocido)
			cadena=funcionesDeSalida.obtener_texto(this.nombre);
		else
		{
			art=this.obtener_articulo(this);
			//funcionesDeSalida.obtener_texto(this.nombre);
			if (this.sinonimos.length>0)
			{
				cadena=art+" "+this.sinonimos[0];
			}
		}
		
		return cadena+" ";	
	};
}
Actor.prototype = Object.create(ObjetoGenerico.prototype);
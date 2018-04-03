/*
	Objeto genérico es la base de todos los objetos item y actor

*/
function ObjetoGenerico(dat,key)
{
	//Indica si el objeto generado es un actor
	this.psi=false;
	//La clave es el nombre interno que lleva el ObjetoGenerico
	//La clave a de ser siempre diferente
	this.clave=key;
	//Indica en que cuarto se encuentra este Objeto o actor
	//Un inventario también es un lugar
	this.esta="";
	if("esta" in dat)
		this.esta=dat.esta;

	//Nombre es el nombre que usará el juego
	//para mostrar a este Objeto o actor al jugador
	//esta propiedad si se puede repetir
	this.nombre="";
	if("nombre" in dat)
		this.nombre=dat.nombre;

	//Indica con que preposicion se une este objeto
	//con otro
	this.seUneCon={}
	if("seUneCon" in dat)
	{
		for (unir in dat.seUneCon)
		{
			this.seUneCon[unir]=dat.seUneCon[unir];
		}
		//this.seUneCon=dat.seUneCon;
	}

	//Indica si el objeto o actor está visible 
	//sobre el cuarto donde se encuentra
	this.visible=true;
	if("visible" in dat)
		this.visible=dat.visible;

	//Indica si el objeto ya a sido visto sobre el escenario
	this.visto=false;
	if("visto" in dat)
		this.visto=dat.visto;
	
	//Indica si el objeto o actor es femenino o masculino
	this.genero="masculino";
	if("genero" in dat)
		this.genero=dat.genero;

	//Los adjetivos de un objeto sirven para que
	//tanto el jugador como el juego puedan identificar
	//a dos objetos diferentes pero que tienen el mismo nombre
	this.adjetivos=[];
	if("adjetivos" in dat)
		this.adjetivos=dat.adjetivos;

	//Descripción que se le muestra al jugador cuando
	//mira o examina el objeto o actor
	this.descripcion="";
	if("descripcion" in dat)
		this.descripcion=dat.descripcion;

	//Indica si el objeto es singular (plural) o plural (false)
	this.singular=true;
	if("singular" in dat)
		this.singular=dat.singular;
	
	//Indica diferentes nombre que el jugador 
	//podrá usar para hacer referencia a un
	//objeto o actor además de su nombre principal
	this.sinonimos=[];
	if("sinonimos" in dat)
		this.sinonimos=dat.sinonimos

	//En un actor funciona como un inventario
	//Si está en un objeto o item será tratado
	//como un objeto contenedor.
	this.bolsillo=new Bolsillo(this.clave,[]);
	if("bolsillo" in dat)
	{
		this.bolsillo=new Bolsillo(this.clave,dat.bolsillo);
	}

	//El peso del objeto o actor
	//es usado para limitar que objetos
	//pueden ser dejados en que sitios 
	this.peso=10;
	if("peso" in dat)
		this.peso=dat.peso;

	//La resistencia sirve para 
	//saber que peso pueden soportar
	//los objetos y actores
	this.resistencia=11;
	if("resistencia" in dat)
		this.resistencia=dat.resistencia;

	//Añaden información adicional al objeto o actor
	this.preDe="";
	if("preDe" in dat)
		this.preDe=dat.preDe;

	//Sirve para mostrar informacion sobre un objeto o actor
	this.mostrar_informacion=function(){}
	//Sirve para mostrar el contenido de un objeto o actor si este 
	//tiene asociado un bolsillo
	this.mostrar_bolsillo=function(){}

	this.obtener_articulo=function()
	{
		var antes="";
		if (this.genero=="masculino" && this.singular==true)
		{
			antes=guion.frasesInternas["0"];
		}
		else if (this.genero=="femenino" && this.singular==true)
		{
			antes=guion.frasesInternas["1"];
		}
		else if (this.genero=="masculino" && this.singular==false)
		{
			antes=guion.frasesInternas["2"];
		}
		else if (this.genero=="femenino" && this.singular==false)
		{
			antes=guion.frasesInternas["3"];
		}
		return antes;
	},

	this.obtener_articulo_personal=function()
	{
		var antes="";
		if (this.genero=="masculino" && this.singular==true)
		{
			antes=guion.frasesInternas["4"];
		}
		else if (this.genero=="femenino" && this.singular==true)
		{
			antes=guion.frasesInternas["5"];
		}
		else if (this.genero=="masculino" && this.singular==false)
		{
			antes=guion.frasesInternas["6"];
		}
		else if (this.genero=="femenino" && this.singular==false)
		{
			antes=guion.frasesInternas["7"];
		}
		return antes;
	}

}
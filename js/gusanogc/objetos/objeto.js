
//Representa a cualquier objeto inerte del un juego
//Objeto tambíen puede representar a un item de inventario
function Objeto(dat,key)
{
	ObjetoGenerico.call(this,dat,key);
	
	//Esta indica que el objeto es tan solo un decorado que poder mirar
	this.atrezo=false;
	if("atrezo" in dat)
		this.atrezo=dat.atrezo;

	//Indica si el objeto se puede coger
	this.scoger=true;
	if("scoger" in dat)
		this.scoger=dat.scoger;

	
	this.contenedor=false;
	if("contenedor" in dat)
		this.contenedor=dat.contenedor;

	//Indica si se puede ver a traves 
	//del objeto en cuestion 
	this.transparente=false;
	if("transparente" in dat)
		this.transparente=dat.transparente;

	//Indica si el objeto se puede abrir o cerrar
	this.abrirOcerrar=[false,false];
	if("abrirOcerrar" in dat)
		this.abrirOcerrar=dat.abrirOcerrar;

	//Indica si el objeto esta abierto o cerrado
	this.abiertoOcerrado="cerrado";
	if("abiertoOcerrado" in dat)
		this.abiertoOcerrado=dat.abiertoOcerrado;


	this.mostrar_informacion=function()
	{
		var cadena="";
		var adjetivos=" ";
		var preDe="";
		var finalAdjetivo=", ";
		var antes=this.obtener_articulo(this);
		if(this.preDe!="")
		{
			preDe=guion.frasesInternas["13"]+this.preDe;
		}

		if (this.adjetivos.length>0)
		{
			for (var a=0;a<this.adjetivos.length;a++)
			{
				if(a==this.adjetivos.length-2)
					finalAdjetivo=" "+guion.frasesInternas["9"];
				if(a==this.adjetivos.length-1)
					finalAdjetivo="";
				adjetivos+=this.adjetivos[a]+finalAdjetivo;
			}
		}
		else
		{
			adjetivos="";
		}

		if (preDe!="")
		{
			cadena=antes+" "+this.nombre+preDe+adjetivos;//+" "+contiene;
		}
		else
		{
			cadena=antes+" "+this.nombre+adjetivos;//+" "+contiene;
		}
		
		return cadena;
	};
	
	this.mostrar_bolsillo=function()
	{
		var contiene="";
		var final=" , ";
		if (this.contenedor)
		{
			if ((this.transparente)||(this.abiertoOcerrado=="abierto"))
			{
				contenidoBolsillo=[];
				if (this.bolsillo.contenido.length>0)
				{
					for (var o=0;o<this.bolsillo.contenido.length;o++)
					{
						objeto=contenido.objetos[this.bolsillo.contenido[o]];
						if ((objeto.visible)&&(objeto.visto))
						{
							contenidoBolsillo.push(objeto);
						}
					}

				}
				if (contenidoBolsillo.length>0)
				{
					for (var o=0;o<contenidoBolsillo.length;o++)
					{

						objeto=contenidoBolsillo[o];
						if (o==contenidoBolsillo.length-2)
						{
							final=" "+guion.frasesInternas["9"];
						}
						if (o==contenidoBolsillo.length-1)
						{
							final="";
						}
						contiene+=objeto.mostrar_informacion()+final;
					}

					if (contiene!="")
					{
						var art=this.obtener_articulo_personal(this);
						contiene=guion.frasesInternas["15"]+art+" "+this.nombre+guion.frasesInternas["14"]+contiene;
					}
				}
				else
				{
					contiene="";
				}
			}
		}
		return contiene;
	};
}
Objeto.prototype = Object.create(ObjetoGenerico.prototype);
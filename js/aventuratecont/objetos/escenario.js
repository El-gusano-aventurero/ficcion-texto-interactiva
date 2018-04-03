function Escenario(dat,key)
{

	this.clave=key;
	this.primeroEnMostrar=false;
	this.actores={};
	this.objetos={};
	if("primero" in dat)
	{
		this.primeroEnMostrar=dat.primero;
	}
	this.mostrarSalidasEn="horizontal";
	if ("mostrarSalidasEn" in dat)
	{
		this.mostrarSalidasEn=dat.mostrarSalidasEn;
	}
	this.nombre=dat.nombre;

	this.descripcion=dat.descripcion;


	this.conexiones={};
	if("conexiones" in dat)
	{
		for (key in dat.conexiones)
		{
			sal=new Conector(dat.conexiones[key],key);
			this.conexiones[key]=sal;
		}
	}
	this.imaCargada=false;
	this.imagen="";
	if("imagen" in dat)
	{
		this.imagen=dat.imagen;
	}
	

	this.entrar="";
	this.salir="";
	this.actualizar="";
	this.despues_de_contenido="";
}

Escenario.prototype.iniciar=function()
{
	this.actores={};
	this.objetos={};
	//buscamos y guardamos los actores que se encuentran dentro del escenario
	for (key in contenido.actores)
	{

		if (contenido.actores[key].esta==this.clave)
		{

			this.actores[contenido.actores[key].clave]=contenido.actores[key];
		}
	}

	//buscamos y guardamos los objetos que se encuentran dentro del escenario
	for (key in contenido.objetos)
	{
		if (contenido.objetos[key].esta==this.clave)
		{
			this.objetos[contenido.objetos[key].clave]=contenido.objetos[key];
		}
	}
	
}

Escenario.prototype.quitar_objeto=function(objeto)
{
	clave=objeto.clave;
	if (clave in this.objetos)
	{
		delete this.objetos[clave];
		return true;
	}
	return false;
}

Escenario.prototype.quitar_actor=function(actor)
{
	var clave=actor.clave;
	if (clave in this.actores)
	{

		delete this.actores[clave];
		return true;
	}
	return false;
}

Escenario.prototype.insertar_objeto=function(objeto)
{
	clave=objeto.clave;
	if (clave in this.objetos)
	{
		return false;
	}
	this.objetos[clave]=objeto;
	objeto.esta=this.clave;
	return true;	
}

Escenario.prototype.insertar_actor=function(actor)
{
	clave=actor.clave;
	if (clave in this.actores)
	{
		return false;
	}
	this.actores[clave]=actor;
	actor.esta=this.clave;
	return true;	
}

Escenario.prototype.mostrar_informacion=function(cadenaDeSalida)
{

	texto=funcionesDeSalida.obtener_texto(this.nombre);
	cadenaDeSalida.push({tipo:"titulo_escenario",cadena:texto});
	
	guion.despues_de_titulo(cadenaDeSalida);
	if (this.imagen!="")
	{
		cadenaDeSalida.push({tipo:"imagen",cadena:this.imagen});
	}
	

	texto=funcionesDeSalida.obtener_texto(this.descripcion);
	cadenaDeSalida.push({tipo:"descripcion_escenario",cadena:texto});
	return cadenaDeSalida;
}

Escenario.prototype.mostrar_actores=function(cadenaDeSalida)
{
	listaAct=[];
	listaGrp=[];
	for(key in this.actores)
	{
		if (this.actores[key].visible)
		{
			if (this.actores[key].protagonista!=true)
			{
				//console.log(this.actores[key].nombre+" "+guion.actorPrincipal)
				if(this.actores[key].grupo==guion.actorPrincipal)
				{
					listaGrp.push(this.actores[key]);
				}
				else
				{
					listaAct.push(this.actores[key]);
				}
			}
		}
	}
	actoresEnEscena=this.mostrar_por_grupo(listaAct," también está aquí"," también están aquí");
	actoresEnGrupo=this.mostrar_por_grupo(listaGrp," va contigo"," van contigo");

	if (actoresEnEscena!=null)
		cadenaDeSalida.push({tipo:"actores",cadena:actoresEnEscena});
	if (actoresEnGrupo!=null)
		cadenaDeSalida.push({tipo:"actores",cadena:actoresEnGrupo});
	return cadenaDeSalida;
}

Escenario.prototype.mostrar_por_grupo=function(listaAct,cadenaAux,cadenaAuxB)
{
	if (listaAct.length>0)
	{
		final=guion.frasesInternas["10"];
		
		cadenaActores="";
		for (var i=0;i<listaAct.length;i++)
		{
			if (i==listaAct.length-2)
			{
				final=guion.frasesInternas["9"];
			}
			if (i==listaAct.length-1)
			{
				final="";
			}
			act=listaAct[i];
			cadenaActores+=act.mostrar_informacion()+final;
		}
		var cadena="";
		if (listaAct.length>1)
		{
			cadena=cadenaAuxB;
		}
		else
		{
			cadena=cadenaAux;
		}

		return cadenaActores+cadena;
	}

}

Escenario.prototype.mostrar_objetos=function(cadenaDeSalida)
{
	listaObj=[];
	listaCont=[];
	for (key in this.objetos)
	{
		if (this.objetos[key].visible)
		{
			if (this.objetos[key].contenedor)
			{
				if ((this.objetos[key].transparente)||(this.objetos[key].abiertoOcerrado=="abierto"))
				{
					if ((this.objetos[key].visto)||(this.objetos[key].atrezo))
					{
						listaCont.push(this.objetos[key]);
					}
				}
			}
			if (this.objetos[key].atrezo!=true)
				if (this.objetos[key].visto)
					listaObj.push(this.objetos[key]);

		}
	}
		
		
	if (listaObj.length>0)
	{
		final=guion.frasesInternas["10"];
		tambien=guion.frasesInternas["12"];
		cadenaObjetos="";
		for (var i=0;i<listaObj.length;i++)
		{
			if (i==listaObj.length-2)
			{
				final=" "+guion.frasesInternas["9"];
			}
			if (i==listaObj.length-1)
			{
				final=guion.frasesInternas["11"];
			}
			o=listaObj[i];
			cadenaObjetos+=o.mostrar_informacion()+final;
		}
		cadenaDeSalida.push({tipo:"objetos",cadena:tambien+cadenaObjetos});

	}
	return cadenaDeSalida
}
Escenario.prototype.mostrar_contenido_objetos=function(cadenaDeSalida)
{
	for (key in this.objetos)
	{
		cadena=this.objetos[key].mostrar_bolsillo();
		if (cadena!="")
		{
			cadenaDeSalida.push({tipo:"contenidoObjeto",cadena:cadena});
		}
	}
	return cadenaDeSalida;
}
Escenario.prototype.mostrar_salidas=function(cadenaDeSalida)
{
	if (this.mostrarSalidasEn=="horizontal")
		return this.mostrar_salidas_horizontal(cadenaDeSalida);
	else if(this.mostrarSalidasEn=="vertical")
		return this.mostrar_salidas_vertical(cadenaDeSalida);
}

Escenario.prototype.mostrar_salidas_vertical=function(cadenaDeSalida)
{
	keys =Object.keys(this.conexiones);
	for (var a=0;a<keys.length;a++)
	{
		if(this.conexiones[keys[a]].visible)
		{
			sali=funcionesDeSalida.obtener_texto(this.conexiones[keys[a]].descripcion);
			cadenaDeSalida.push({tipo:"salidas",cadena:sali});				
		}
	}
	return cadenaDeSalida;
}

Escenario.prototype.mostrar_salidas_horizontal=function(cadenaDeSalida)
{
	final=guion.frasesInternas["10"];
	conexiones="";
	keys =Object.keys(this.conexiones);
	for (var a=0;a<keys.length;a++)
	{
		if(this.conexiones[keys[a]].visible)
		{
			if(a==keys.length-2)
				final=" "+guion.frasesInternas["9"];
			if(a==keys.length-1)
				final=""//guion.frasesInternas["11"];
			conexiones+=funcionesDeSalida.obtener_texto(this.conexiones[keys[a]].descripcion)+final;				
		}
	}
	cadenaDeSalida.push({tipo:"salidas",cadena:conexiones});
	return cadenaDeSalida;	
}
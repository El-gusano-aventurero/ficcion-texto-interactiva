function Tolken(v,i)
{
	this.valor=v;
	this.identificador=i;
	this.adjetivos=[];
	this.preDe=[];
	this.clave="";
	this.decir="";
}
var generador=
{
	tolkenizar:function(accion)
	{
		var listaTolken=[];
		var ultimoEncontrado=null;
		for (var c=0;c<accion.length;c++)
		{
			pl=accion[c];
			valor=null;
			queEs=null;
			valor=detectorDePalabras.buscar_conexiones_en_escenario(pl);
			if (valor!=null)
			{
				listaTolken.push(generador.crear_tolken(valor,"salida"));
				continue;
			}
			valor=detectorDePalabras.buscar_accion_activa(pl);
			if (valor!=null)
			{
				ultimoEncontrado=generador.crear_tolken(valor,"verbo");
				listaTolken.push(ultimoEncontrado);
				continue;
			}

			valor=detectorDePalabras.comprobar_si_cadena_de_accion(pl);
			if (valor!=null)
			{
				listaTolken.push(generador.crear_tolken(valor,"cadena"));
				continue;	
			}
			queEs=detectorDePalabras.comprobar_si_es_articulo(pl);
			if (queEs!=null)
			{
				listaTolken.push(generador.crear_tolken(pl,queEs));
				continue;
			}
			valor=detectorDePalabras.comprobar_si_es_preposicion(pl);
			if (valor!=null)
			{
				listaTolken.push(generador.crear_tolken(valor,"preposicion"));
				continue;
			}
			valor=detectorDePalabras.comprobar_si_es_pre_de(ultimoEncontrado,pl);
			if (valor!=null)
			{
				listaTolken.push(generador.crear_tolken(valor,"preDe"));
				continue;
			}
			valor=detectorDePalabras.buscar_si_es_adjetivo(pl,ultimoEncontrado);
			if (valor!=null)
			{
				listaTolken.push(generador.crear_tolken(valor,"adjetivo"));
				continue;
			}
			//BUSCAMOS ENTRE LOS OBJETOS Y LOS ACTORES DEL AREA ACTUAL
			tolken=generador.buscar_en_objetos_actores_e_inventario(pl,accion,c,ultimoEncontrado);
			ultimoEncontrado=tolken;
			listaTolken.push(tolken);
		}
		for (var c=0;c<listaTolken.length;c++)
		{
			listaTolken[c].adjetivos=[];
			listaTolken[c].preDe=[];
		}
		//console.log("Se ha transformado la acción el tolken. El resultado:")
		//console.log(listaTolken)
		return listaTolken;
	},
	//Realiza una busqueda dentro del inventario y entre todos 
	//los objetos y actores del escenario actual
	buscar_en_objetos_actores_e_inventario(pl,accion,indice,ultimoEncontrado)
	{		
		var tolken=new Tolken(pl,"objeto");
		objetos=contenido.objetos;
		actores=contenido.actores;
		lista=detectorDePalabras.buscar_objeto_por_nombre(pl,objetos,[]);
		lista=detectorDePalabras.buscar_objeto_por_nombre(pl,actores,lista);
		lista=detectorDePalabras.buscar_dentro_del_bolsillo_de_un_actor(pl,lista);

		if (lista.length>1)
			lista=detectorDePalabras.evaluar_objeto_buscado_en_lista(accion,indice,lista);
		//console.log("la lista de objetos final es")
		//console.log(lista)

		if (lista.length>1)
			tolken=new Tolken(pl,"objeto");
		else if (lista.length==1)
		{
			iden="objeto";
			if (lista[0].psi)
				iden="actor"
			else if (lista[0].esta==guion.ordenarA)
				iden="item";
			tolken=new Tolken(lista[0].nombre,iden);
			tolken.clave=lista[0].clave;
		}

		if (lista.length>=1)
		{
			for (l in lista)
			{
				for (s in lista[l].adjetivos)
				{
					tolken.adjetivos.push(lista[l].adjetivos[s]);
				}
				tolken.preDe.push(lista[l].preDe);	
			}
		}
		return tolken;
	},
	//Crea y retorna un nuevo tolken con la información recibida
	crear_tolken:function(valor,queEs)
	{
		return new Tolken(valor,queEs);
	}
}

/*
			//COMPROBAMOS QUE EL PRIMER ELEMENTO DE LA ORDEN SEA VERBO O SEA SALIDA
			if (((c==0)&&ultimoEncontrado!=null)&&((ultimoEncontrado.identificador=="salida")||(ultimoEncontrado.identificador=="verbo")))
			{
				
			}
*/
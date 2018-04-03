var auxiliar={



	retornar_articulo_al_vuelo(plb)
	{
		if (plb.endsWith("a"))
		{
			return master.textos["5"];
		}
		else if (plb.endsWith("as"))
		{
			return master.textos["7"];
		}
		else if (plb.endsWith("o"))
		{
			return master.textos["4"];
		}
		else if (plb.endsWith("on"))
		{
			return master.textos["4"];
		}
		else if (plb.endsWith("os"))
		{
			return master.textos["6"];
		}
		else
		{
			return master.textos["4"];
		}

	},



	mostrar_texto_retardar:function(key,confi,retardo,pausar)
	{
		texto=auxiliar.obtener_texto(key);
		
		if (pausar)
		{
            texto+="....>pulsa"
		}
		screenText.escribir({texto:texto,fuente:confi.fuente,tama:confi.tama,color:confi.color,estilo:confi.estilo,tiempo:retardo});
		if (pausar)
		{
            screenText.escribir({texto:"@esperar_tecla"});
		}
	},
	
	mostrar_secuencia_de_texto(texto,tmp)
	{
		for (var c=0;c<texto.length;c++)
		{
			screenText.escribir({texto:texto[c],tama:18,color:"yellow",tiempo:tmp});
		}
	},

	obtener_articulo:function(o)
	{
		var antes="";
		if (o.genero=="masculino" && o.singular==true)
		{
			antes=master.textos["0"];
		}
		else if (o.genero=="femenino" && o.singular==true)
		{
			antes=master.textos["1"];
		}
		else if (o.genero=="masculino" && o.singular==false)
		{
			antes=master.textos["2"];
		}
		else if (o.genero=="femenino" && o.singular==false)
		{
			antes=master.textos["3"];
		}
		return antes;
	},

	obtener_articulo_b:function(o)
	{
		var antes="";
		if (o.genero=="masculino" && o.singular==true)
		{
			antes=master.textos["4"];
		}
		else if (o.genero=="femenino" && o.singular==true)
		{
			antes=master.textos["5"];
		}
		else if (o.genero=="masculino" && o.singular==false)
		{
			antes=master.textos["6"];
		}
		else if (o.genero=="femenino" && o.singular==false)
		{
			antes=master.textos["7"];
		}
		return antes;
	},

	mostrar_objetos_del_cuarto:function(c,k)
	{

		listaObj=[];
		listaCont=[];
		for (key in master.objetosEncuarto)
		{
			if (master.objetosEncuarto[key].esta==k)
			{
				if (master.objetosEncuarto[key].visible)
				{
					if (master.objetosEncuarto[key].contenedor)
					{
						
						if ((master.objetosEncuarto[key].transparente)||(master.objetosEncuarto[key].abiertoOcerrado=="abierto"))
						{

							if ((master.objetosEncuarto[key].visto)||(master.objetosEncuarto[key].atrezo))
							{
								listaCont.push(master.objetosEncuarto[key]);
							}
						}
					}
					if (master.objetosEncuarto[key].atrezo!=true)
						if (master.objetosEncuarto[key].visto)
							listaObj.push(master.objetosEncuarto[key]);

				}
			}
		}
		
		if (listaObj.length>0)
		{
			final=master.textos["10"];
			tambien=master.textos["12"];
			cadenaObjetos="";
			for (var i=0;i<listaObj.length;i++)
			{
				if (i==listaObj.length-2)
				{
					final=master.textos["9"];
				}
				if (i==listaObj.length-1)
				{
					final=master.textos["11"];
				}
				o=listaObj[i];
				cadenaObjetos+=o.mostrar_objeto()+final;
			}
			screenText.escribir({texto:tambien+cadenaObjetos,fuente:conf.objetos.fuente,tama:conf.objetos.tama,color:conf.objetos.color,estilo:conf.objetos.estilo});
		}
		auxiliar.mostrar_contenido_objeto(listaCont);
	},

	mostrar_inventario_en_pantalla:function()
	{
		screenText.escribir({texto:master.textos[40],fuente:conf.narrador.fuente,tama:conf.narrador.tama,color:conf.narrador.color,estilo:conf.narrador.estilo});

		for (var c=0;c<master.inventario.length;c++)
		{
			o=master.objetos[master.inventario[c]];
			
			if (o.visible)
			{
				
				obT=o.mostrar_objeto();
				screenText.escribir({texto:obT,fuente:conf.inven.fuente,tama:conf.inven.tama,color:conf.inven.color,estilo:conf.inven.estilo});
			}
		}
	},

	mostrar_contenido_objeto:function(listaCont)
	{
		for (var i=0;i<listaCont.length;i++)
		{
			cadena=listaCont[i].mostrar_bolsillo();
			if (cadena!="")
				screenText.escribir({texto:cadena,fuente:conf.contenido.fuente,tama:conf.contenido.tama,color:conf.contenido.color,estilo:conf.contenido.estilo});
			var lista=[];
			if (listaCont[i].contenedor)
			{
				contiene=listaCont[i].contiene;
				for (var c=0;c<contiene.length;c++)
				{
					var obj=master.objetos[contiene[c]];
					if (obj.visto)
						if(obj.visible)
							lista.push(obj)
				}
				auxiliar.mostrar_contenido_objeto(lista);
			}
		}	
	},

	mostrar_actores_del_cuarto:function(c,k)
	{
		listaAct=[];
		listaGrp=[];
		for (key in master.actoresEnCuarto)
		{
			if (master.actoresEnCuarto[key].esta==k)
			{
				if (master.actoresEnCuarto[key].visible)
				{
					if (master.actoresEnCuarto[key].protagonista!=true)
					{
						if(master.actoresEnCuarto[key].grupo==master.protagonista)
						{
							listaGrp.push(master.actoresEnCuarto[key]);
						}
						else
						{
							listaAct.push(master.actoresEnCuarto[key]);
						}
					}
				}
			}
		}
		auxiliar.mostrar_por_grupo(listaAct," también está aquí"," también están aquí");
		auxiliar.mostrar_por_grupo(listaGrp," va contigo"," van contigo");
	},

	

	mostrar_salidas:function(c,k)
	{
		final=master.textos["10"];
		conexiones="";
		keys =Object.keys(c.conexiones);
		for (var a=0;a<keys.length;a++)
		{
			if(c.conexiones[keys[a]].visible)
			{
				if(a==keys.length-2)
					final=" "+master.textos["9"];
				if(a==keys.length-1)
					final=master.textos["11"];
				conexiones+=auxiliar.obtener_texto(c.conexiones[keys[a]].descripcion)+final;				
			}
		}
		screenText.escribir({texto:conexiones,fuente:conf.salidas.fuente,tama:conf.salidas.tama,color:conf.salidas.color,estilo:conf.salidas.estilo});
	},

buscar_objetos_a_nivel_de_inventario:function(lst,ind,objCoger,buscarSoloDentro)
{
	if (buscarSoloDentro!=true)
	{
		if (lst[ind].clave!="")
		{
			obj=master.objetos[lst[ind].clave];
			if ((obj!=null)&&(obj.esta==master.protagonista))
			{
				objCoger.push(obj);
			}
		}
		else
		{
			for (key in master.objetos)
			{
				if(lst[ind].valor==master.objetos[key].nombre)
				{
					if(master.objetos[key].esta==master.protagonista)
					{
						objCoger.push(master.objetos[key]);
					}
				}
			}
		}

	}
	
	

	for (var c=0;c<master.inventario.length;c++)
	{
		o=master.objetos[master.inventario[c]];
		if (o.contenedor)
		{
			if  ((o.abiertoOcerrado=="abierto")||(o.transparente))
			{
				objCoger=this.buscar_objetos_a_nivel_de(o,lst,ind,objCoger);
			}
		}
	}
	
	return objCoger;

},
buscar_actores_a_nivel_de_cuarto:function(lst,ind,actoresAMirar)
{
	if (lst[ind].clave!="")
	{
		if (lst[ind].clave in master.actoresEnCuarto)
		{
			actoresAMirar.push(master.actoresEnCuarto[lst[ind].clave]);
		}	
	}
	else
	{
		for (key in master.actoresEnCuarto)
		{
			if (lst[ind].valor==master.actoresEnCuarto[key].nombre)
			{
				actoresAMirar.push(master.actoresEnCuarto[key]);
			}			
		}
	}
	
	return actoresAMirar;
},
buscar_objeto_a_nivel_de_cuarto:function(lst,ind,objCoger)
{
	for (key in master.objetosEncuarto)
	{
		if (lst[ind].clave!="")
		{
			if (lst[ind].clave==master.objetosEncuarto[key].clave)
			{
				objCoger.push(master.objetosEncuarto[key]);
			}	
		}
		else
		{
			if (lst[ind].valor==master.objetosEncuarto[key].nombre)
			{
				objCoger.push(master.objetosEncuarto[key]);
			}			
		}
		
	}

	for (key in master.objetosEncuarto)
	{
		var o=master.objetosEncuarto[key];
		if (o.contenedor)
		{
			if  ((o.abiertoOcerrado=="abierto")||(o.transparente))
			{
				objCoger=auxiliar.buscar_objetos_a_nivel_de(o,lst,ind,objCoger);
			}
		}
		
	}
	return objCoger;
},
buscar_objetos_a_nivel_de:function(o,lst,ind,objCoger)
{
	
	contenido=o.contiene

	for (var c=0;c<contenido.length;c++)
	{
		if (lst[ind].clave!="")
		{
			if (lst[ind].clave==contenido[c])
			{
				objCoger.push(master.objetos[lst[ind].clave]);
			}
		}

		else if (lst[ind].valor==master.objetos[contenido[c]].nombre)
		{
			objCoger.push(master.objetos[contenido[c]]);
		}
		else
		{
			posCont=master.objetos[contenido[c]];
			if (posCont.contenedor)
			{
				if ((posCont.abiertoOcerrado=="abierto")||(posCont.transparente))
				{
					objCoger= auxiliar.buscar_objetos_a_nivel_de(posCont,lst,ind,objCoger);				
				}
			}
		}
	}
	return objCoger;
},
evaluar_objetos_en_lista:function(lstObj,listaTolk,ind)
{
	var lista=[];
	var claves=[];
	var adje=true;
	var de=false;
	for (var il=0;il<lstObj.length;il++)
	{
		de=false;
		adje=true;

		if (listaTolk[ind].deQue!="")
		{
			if (listaTolk[ind].deQue!=lstObj[il].deQue)
			{
				adje=false;
			}
		}
		adjetivos=lstObj[il].adjetivos;
		
		if(listaTolk[ind].adjetivos.length>0)
		{
			adjeTolk=listaTolk[ind].adjetivos;
			
			for (var ia=0;ia<adjeTolk.length;ia++)
			{
				newAdje=[];
				for (var adO=0;adO<adjetivos.length;adO++)
				{
					adAux=adjetivos[adO].toLowerCase();
					adAux=auxiliar.quitar_acentos(adAux);
					newAdje.push(adAux);
				}

				if (newAdje.indexOf(adjeTolk[ia])==-1)
				{
					adje=false
				}
			}
		}
		
		if ((adje))
		{
			if (claves.indexOf(lstObj[il].clave)!=-1)
			{
				lista.push(lstObj[il]);
				claves.push(lstObj[il].clave);
			}
			
		}
	}
	return lista;
},

evaluar_objetos_por_visibilidad:function(lista)
{
	nLista=[];
	for(c=0;c<lista.length;c++)
	{
		if (lista[c].visible)
		{
			if ((lista[c].visto)||(lista[c].atrezo)||(lista[c].psi))
			{
				nLista.push(lista[c]);
			}
		}
	}
	return nLista;
},

es_dispositivo_movil:function()
{
	//Obtenemos el UserAgent
	var useragent = navigator.userAgent||navigator.vendor||window.opera;
	//Creamos una variable para detectar los móviles
	var ismobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|zh-cn|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(useragent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(useragent.substr(0,4));
	//También podemos detectar si es móvil u ordenador usando else
	if(ismobile){return true;} else {return false;}
}

}
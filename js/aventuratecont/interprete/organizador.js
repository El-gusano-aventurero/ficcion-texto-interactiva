var organizador={

	comprobar_y_eliminar_tolken_no_necesarios:function(lst)
	{
		nuevaLst=[];
		var coinciden=true;
		var objEncontrado=null;
		
		for (var c=0;c<lst.length;c++)
		{
			coinciden=true;
			art=lst[c].identificador.split("_");
			if ("objeto,item,actor".indexOf(lst[c].identificador)!=-1)
			{
				objEncontrado=c;
				coinciden=false;
			}
			else if (art.length>0)
			{
				if (art[0]=="articulo")
				{
					if (c+1<lst.length)
					{
						if ("objeto,item,actor".indexOf(lst[c+1].identificador)!=-1)
						{
							var o=null;
							if ("objeto,item".indexOf(lst[c+1].identificador)!=-1)
								o=contenido.objetos[lst[c+1].valor];
							else
								o=contenido.actores[lst[c+1].valor];
							if (o!=null)
							{
								if (o.genero==art[2])
								{
									if ((art[1]=="singular")&&(o.singular==false))
									{
										coinciden=false;
										
										lst[c].identificador="error";
									}
									else if ((art[1]=="plural")&&(o.singular))
									{
										coinciden=false;
										
										lst[c].identificador="error";
									}
								}
								else
								{
									coinciden=false;
									
									lst[c].identificador="error";
								}
							}
						}
					}
					
				}
				else
				{
					//console.log(lst[c].identificador);
					if (art[0]=="adjetivo")
					{
						coinciden=true;
						if (objEncontrado!=null)
						{
							lst[objEncontrado].adjetivos.push(lst[c].valor);
						}
					}
					else if ((art[0]=="preposicion")&&(lst[c].valor=="de"))
					{
						coinciden=false;
						if ((c+1<lst.length)&&(lst[c+1].identificador=="preDe"))
						{
							
							coinciden=true;
						}
					}
					else if (art[0]=="preDe")
					{
						coinciden=true;
						if (objEncontrado!=null)
						{
							lst[objEncontrado].preDe=lst[c].valor;
						}
					}
					else if(lst[c].identificador=="cadena")
					{
						if (objEncontrado!=null)
						{
							lst[objEncontrado].decir=lst[c].valor;
							ejecutor.ordenAuxiliar=lst[c].valor;
						}
					}	
					else
					{
						coinciden=false;
					}
					
				}
			}

			if (coinciden==false)
			{
				nuevaLst.push(lst[c]);
			}
		}
		//console.log(nuevaLst);
		return nuevaLst;
	},

	organizar_tolken_validos:function(lst)
	{
		listaAbierta=[];
		listaCerrada=[];
		antesDePre=false;
		for (var c=0;c<lst.length;c++)
		{
			//indice.push(valor[lst[c].identificador]);
			if (lst[c].identificador=="verbo")
			{
				listaCerrada.push(lst[c]);
			}
			else if(lst[c].identificador=="preposicion")
			{
				listaCerrada.push(lst[c]);
				antesDePre=true;
			}
			else if ("cadena,item,actor,objeto,adjetivo".indexOf(lst[c].identificador))
			{
				if (antesDePre!=true)
				{
					listaAbierta.push(lst[c]);
				}
				else
				{
					listaCerrada.push(lst[c]);
				}
			}
		}
		for (var c=0;c<listaAbierta.length;c++)
		{
			listaCerrada.push(listaAbierta[c]);
		}		

		return listaCerrada;
	}
}
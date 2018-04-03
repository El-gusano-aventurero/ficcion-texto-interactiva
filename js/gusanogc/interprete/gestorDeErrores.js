var gestorDeErrores={

	insultos:"petarda,tonto,tonta,idiota,invecil,imbecil,puta,gilipollas,cabron,marrana,cerda,cerdo,cavron,zorra".split(","),
	emitir_errores_de_articulos:function(lst)
	{
		for (var c=0;c<lst.length;c++)
		{
			if (lst[c].identificador=="error")
			{
				return master.textos["32"]+"-"+lst[c].valor+"-"+master.textos["33"];
			}
		}
		return false;
	},
	emitir_errores_de_tolken:function(lst)
	{
		//master.textos["9"]
		var errorEnInd=0;
		for (var c=0;c<lst.length;c++)
		{
			
			if (lst[c].identificador=="error")
				if (gestorDeErrores.insultos.indexOf(lst[c].valor)!=-1)
					return master.textos["31"];
		}
		for (var c=0;c<lst.length;c++)
		{
			if (lst[c].identificador=="error")
			{
				if (c==0)
					return master.textos["25"]+" "+lst[c].valor;
				else if(c+1>=lst.length)
				{
					
					if ("objeto,item,actor".indexOf(lst[c-1].identificador)!=-1)
					{
						obj=null;
						if (lst[c-1].identificador=="actor")
							obj=master.actores[lst[c-1].valor];
						else
							obj=master.objetos[lst[c-1].valor];
						
						if (obj!=null)
						{
							art=auxiliar.obtener_pronombre(obj);
							return master.textos["27"]+" "+art+" "+obj.nombre+" "+lst[c].valor+" "+master.textos["28"];		
						}
						
					}
					else
					{
						art=auxiliar.retornar_articulo_al_vuelo(lst[c].valor)
						return master.textos["27"]+" "+art+" "+lst[c].valor;
					}
					
				}
				else
				{
					
					if ("objeto,item,actor".indexOf(lst[c-1].identificador)!=-1)
					{	
						
						obj=master.objetos[lst[c-1].valor];
						art=auxiliar.obtener_pronombre(obj);
						return master.textos["27"]+" "+art+" "+obj.nombre+" "+lst[c].valor+" "+master.textos["28"];
					}
					detrar=lst[c-1];
					delante=lst[c+1];
					if ((detrar!=null)&&(delante!=null))
					{	
						if ((detrar.identificador=="preposicion")&&("objeto,item,actor".indexOf(delante.identificador)!=-1))
						{
							return master.textos["29"]+" "+lst[c].valor+" "+master.textos["30"];
						}
						else if ((detrar.identificador=="verbo")&&("objeto,item,actor".indexOf(delante.identificador)!=-1))
						{
							return master.textos["29"]+" "+lst[c].valor+" "+master.textos["30"];
						}
					}
				}
			}
		}
		return false;
		//console.log(lst);
	}
}
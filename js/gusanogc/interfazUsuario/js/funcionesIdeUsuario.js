var funcionesIdeUsuario=
{
	extraer_datos_del_objeto:function(objeto,lista,claves)
	{
		lista.push(funcionesDeSalida.obtener_texto(objeto.nombre));
		claves.push(objeto.clave);
		preDe=funcionesDeSalida.obtener_texto(objeto.preDe);
		if (preDe!="")
		{
			lista.push(funcionesDeSalida.obtener_texto(preDe));
			claves.push(objeto.clave);
		}
		for(c=0;c<objeto.sinonimos.length;c++)
		{
			lista.push(funcionesDeSalida.obtener_texto(objeto.sinonimos[c]));
			claves.push(objeto.clave);
		}
		for(c=0;c<objeto.adjetivos.length;c++)
		{
			lista.push(funcionesDeSalida.obtener_texto(objeto.adjetivos[c]));
			claves.push(objeto.clave);
		}
		funcionesIdeUsuario.buscar_en_bolsillo(objeto,lista,claves)
		
	},

	buscar_en_bolsillo:function(objeto,lista,claves)
	{
		var cont=objeto.bolsillo.contenido;
		
		for (ind in cont)
		{
			o=contenido.objetos[cont[ind]];
			if (o!=null)
			{
				if (o.psi)
				{
					if (o.visible)
					{
						funcionesIdeUsuario.extraer_datos_del_objeto(o,lista,claves);
					}
				}
				else if ((o.visto)||(o.atrezo))
				{
					if (o.visible)
					{
						funcionesIdeUsuario.extraer_datos_del_objeto(o,lista,claves);
					}
				}
				
				
			}
		}
	},

	extraer_salidas_del_escenario:function(escenario,lista,claves)
	{
		keys =Object.keys(escenario.conexiones);
		for (var a=0;a<keys.length;a++)
		{
			lista.push(funcionesDeSalida.obtener_texto(keys[a]));
			claves.push(keys[a]);
		}
	
	},

	obtener_comandos_actuales:function(lista,claves)
	{
		comandos=buclePrincipal.ideUsuario.comandosUsables;
		//console.log(comandos)
		for (var a=0;a<comandos.length;a++)
		{
			lista.push(comandos[a].toLowerCase());
			claves.push(comandos[a].toLowerCase());
		}
	},
	crear_etiqueta_mas:function(etiqueta,modo)
	{
		var mas=document.createElement("a");
		mas.setAttribute("class", "enlaceMas");

		mas.innerHTML="<-Más->";
		etiqueta.appendChild(mas);	
		if (modo)
		{
			mas.addEventListener("click",function(e)	
			{
				buclePrincipal.ideUsuario.salidaTexto.innerHTML="";
				buclePrincipal.ideUsuario.esperarPulsarMas=false;
			});
		}
		else
		{
			mas.addEventListener("click",function(e)	
			{
				buclePrincipal.ideUsuario.esperarPulsarMas=false;
				parentA=this.parentNode;
				parentB=parentA.parentNode;
				parentA.removeChild(this);
				parentB.removeChild(parentA);
			});
		}
		
		return etiqueta;	
	}

}
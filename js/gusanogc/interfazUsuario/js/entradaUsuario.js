var entradaUsuario=
{
	dataList:null,
	accion:"",
	accionSalvada:"",
	cuadroDeEntrada:null,
	cuadroDeTexto:null,
	botonOk:null,
	botonFavoritos:null,
	
	favoritos:["acciones","inventario","mirar","examinar","coger","usar"],
	post_generar_entrada_usuario:function(){},
	generar_entrada_usuario:function()
	{
		/*Genera un nuevo cuadro de entrada para las acciones a ejecutar por el usuario*/
		var salidaTexto=document.getElementById("texto");

		var promt=document.createElement("span");
		promt.className="promt"
		promt.innerHTML="::>";

		entradaUsuario.cuadroDeEntrada=document.createElement("div");
		entradaUsuario.cuadroDeEntrada.className="contenedorEntradaUsuario fundido_entrada";

		entradaUsuario.dataList=document.createElement("form");
		entradaUsuario.dataList.setAttribute("id","contenedorDataList");

		entradaUsuario.cuadroDeTexto=document.createElement("input");
		entradaUsuario.cuadroDeTexto.className="entradaUsuario";
		entradaUsuario.cuadroDeTexto.value=entradaUsuario.accionSalvada;


		entradaUsuario.botonOk=document.createElement("a");
		entradaUsuario.botonOk.className="botonOk";
		entradaUsuario.botonOk.innerHTML="Ok";

		
		imagen=document.createElement("img");
		imagen.className="estrellaFavoritos";
		imagen.setAttribute("src",cargador.datos.urlMotor+"interfazUsuario/interfazSimple/imagenes/botonFavoritos.png");

		entradaUsuario.botonFavoritos=document.createElement("a");
		entradaUsuario.botonFavoritos.className="botonFavoritos";
		entradaUsuario.botonFavoritos.appendChild(imagen);



		entradaUsuario.cuadroDeEntrada.appendChild(entradaUsuario.dataList);
		entradaUsuario.cuadroDeEntrada.appendChild(promt);
		entradaUsuario.cuadroDeEntrada.appendChild(entradaUsuario.cuadroDeTexto);
		entradaUsuario.cuadroDeEntrada.appendChild(entradaUsuario.botonOk);
		entradaUsuario.cuadroDeEntrada.appendChild(entradaUsuario.botonFavoritos);
		entradaUsuario.post_generar_entrada_usuario();
		if(buclePrincipal.ideUsuario.vinculosEnEscena)
		{
			if (buclePrincipal.ideUsuario.modo=="normal")
				entradaUsuario.generar_barra_de_favotitos();
		}
		salidaTexto.appendChild(entradaUsuario.cuadroDeEntrada);
		entradaUsuario.cuadroDeTexto.focus();
		buclePrincipal.ideUsuario.mover_scroll_texto();

		//Controlamos cuando el usuario quiere realizar una acción aceptandola con la tecla intro
		entradaUsuario.cuadroDeTexto.addEventListener("keypress",function(e)	
		{
			if (!e) var e = window.event
	        if (e.keyCode) code = e.keyCode;
	    	else if (e.which) code = e.which;


			if(code==13)
			{
				entradaUsuario.eliminar_data_list();
				if(entradaUsuario.cuadroDeTexto.value!="")
				{
					entradaUsuario.accion=entradaUsuario.cuadroDeTexto.value;
					entradaUsuario.cuadroDeTexto.value="";
					entradaUsuario.ejecutar_accion();	
				}
			}
			
			else if (code==8)
			{
				entradaUsuario.eliminar_data_list();
			}
			else
			{
				entradaUsuario.autocompletar_entrada(this.autocompletado);
			}
		});

		entradaUsuario.cuadroDeTexto.addEventListener("keyup",function(e)	
		{

			accionAnterior="";
			if (!e) var e = window.event
	        if (e.keyCode) code = e.keyCode;
	    	else if (e.which) code = e.which;
			if (e.keyCode==38)
			{
				accionAnterior=listaDeEntradas.subir_accion();
			}
			else if (e.keyCode==40)
			{
				accionAnterior=listaDeEntradas.bajar_accion();
			}

			if ((accionAnterior!=null)&&(accionAnterior!=""))
			{
				entradaUsuario.cuadroDeTexto.value=accionAnterior;
			}
		});

		//Si el usuario pulsa sobre el botón Ok
		entradaUsuario.botonOk.addEventListener("click",function(e)	
		{
			entradaUsuario.eliminar_data_list();
			if(entradaUsuario.cuadroDeTexto.value!="")
			{
				entradaUsuario.accion=entradaUsuario.cuadroDeTexto.value;
				entradaUsuario.cuadroDeTexto.value="";
				entradaUsuario.ejecutar_accion();
				
			}
		});

		//Controla las accines que son añadidas y eliminadas de la barra de favoritos
		entradaUsuario.botonFavoritos.addEventListener("click",function(e)	
		{
			entradaUsuario.eliminar_data_list();
			//funcionesIdeUsuario.eliminar_data_list();
			accion=entradaUsuario.cuadroDeTexto.value;
			entradaUsuario.cuadroDeTexto.value="";
			if (accion!="")
			{
				if (detectorDePalabras.buscar_accion_activa(accion))
				{
					if (entradaUsuario.favoritos.indexOf(accion)!=-1)
					{
						if ((accion == "acciones")||(accion == "inventario"))
						{
							salida.escribir({tipo:"descripcion_escenario",cadena:accion+" no se puede eliminar de favoritos"});
						}
						else
						{
							entradaUsuario.favoritos.splice(entradaUsuario.favoritos.indexOf(accion),1);
							salida.escribir({tipo:"descripcion_escenario",cadena:accion+" se eliminó de favoritos"});
							salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
						}
							
					}
					else
					{
						entradaUsuario.favoritos.push(accion);
						salida.escribir({tipo:"descripcion_escenario",cadena:accion+" se guardo en favoritos"});
						salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
					}
				}
				else
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:accion+" no puede guardarse en favoritos"});
				}
			}
		});
	},

	eliminar_entrada_usuario:function()
	{
		/*Elimina el cuadro de entrada para las acciones*/
		if (entradaUsuario.cuadroDeEntrada!=null)
		{
			if (entradaUsuario.cuadroDeEntrada.parentNode!=null)
			{
				entradaUsuario.accionSalvada=entradaUsuario.cuadroDeTexto.value;
				entradaUsuario.cuadroDeEntrada.parentNode.removeChild(entradaUsuario.cuadroDeEntrada);
			}
		}
	},

	ejecutar_accion:function()
	{
		/*Introduce una nueva acción a interpretar y borra entrada usuario*/
		entradaUsuario.cuadroDeEntrada.setAttribute("class","desvanecer");
		setTimeout(function()
		{
			entradaUsuario.eliminar_entrada_usuario();
			accion=entradaUsuario.accion;
			if (buclePrincipal.ideUsuario.modo=="normal")
			{
				entrada.cadenaTexto=accion;
				listaDeEntradas.introducir_accion(accion);
				guion.ordenarA=guion.actorPrincipal;
			}
			else if(buclePrincipal.ideUsuario.modo=="combate")
			{
				combate.actualizar_entrada_usuario(accion);
			}
		},300);
	},
	generar_barra_de_favotitos:function()
	{
		/*Genera una lista de enlaces con todas las acciones guardadas en favoritos*/
		favoritos=entradaUsuario.favoritos
		lista=document.createElement("ul");
		lista.className="listaDeFavoritos";
		if (favoritos==null)
			return;
		for (var c=0;c<favoritos.length;c++)
		{
			item=document.createElement("li");
			item.className="itemDeFavoritos";

			enlace=document.createElement("a");
			enlace.className="enlaceDeFavoritos";
			enlace.className+=" separar_caracteres";
			enlace.innerHTML=favoritos[c];

			item.appendChild(enlace);
			lista.appendChild(item);
			if(detectorDePalabras.buscar_accion_activa(favoritos[c])!=null)
			{
				
				enlace.addEventListener("click",function(e)
				{
					verbo=detectorDePalabras.buscar_accion_activa(this.innerHTML);
					entradaExt=selectorDeObjetos.comprobar_accion_activa(verbo);
					entradaUsuario.cuadroDeTexto.value=entradaExt;
				});	
			}
			
			entradaUsuario.cuadroDeEntrada.appendChild(lista);
		}

	},
	autocompletar_entrada:function(autocompletado)
	{
		/*Controla la acción que va escribiendo el usuario y si entiende lo que quiere
		le ayuda mostrando un cuadro de autocompletar con las posibles acciones que el usuario
		quiere ejecutar*/
		accionUsuario=entradaUsuario.cuadroDeTexto.value;
		if (accionUsuario!="")
		{
			cuentaCaracteres=0;
			lst=accionUsuario.split(" ");
			posicionCaracter=entradaUsuario.doGetCaretPosition(entradaUsuario.cuadroDeTexto);

			for (c=0;c<lst.length;c++)
			{
			
				cuentaCaracteres+=lst[c].length;
			
				if (cuentaCaracteres>=posicionCaracter)
				{
					
					autoCpl=selectorDeObjetos.autocompletado;
					posiblesAutocompletar=entradaUsuario.comprobar_lista_autocompletar(autoCpl,lst[c]);
					if (posiblesAutocompletar.length>0)
					{
						entradaUsuario.eliminar_data_list();
						autocompletado=document.createElement("DATALIST");
						autocompletado.setAttribute("id", "autocompletado");

						entradaUsuario.dataList.appendChild(autocompletado);
						entradaUsuario.cuadroDeTexto.setAttribute("list", "autocompletado");

						for (il=0;il<posiblesAutocompletar.length;il++)
						{
							nAccion=entradaUsuario.recostruir_con_posible_autocompletar(posiblesAutocompletar[il],lst,c);
							opcion=document.createElement("OPTION");
							
							opcion.setAttribute("value",nAccion);
							opcion.setAttribute("label",posiblesAutocompletar[il]);
							autocompletado.appendChild(opcion);
						}	
					}
					break;
				}
				cuentaCaracteres+=1;
			}
		}

	},

	recostruir_con_posible_autocompletar:function(posibleAutocompletar,lst,ind)
	{
		accion="";
		for(re=0;re<lst.length;re++)
		{
			if (re==ind)
			{
				accion+=posibleAutocompletar+" ";
			}
			else
			{
				accion+=lst[re]+" ";
			}
			
		}
		//accion+=posibleAutocompletar;
		return accion;
	},

	comprobar_lista_autocompletar:function(autolst,plb)
	{
		resultado=[];
		for(co=0;co<autolst.length;co++)
		{
			if (autolst[co].startsWith(plb))
			{
				resultado.push(autolst[co]);
			}
		}
		return resultado;
	},
	eliminar_data_list:function()
	{
		eliminar=document.getElementById("autocompletado");
		if (eliminar!=null)
		{
			padre = eliminar.parentNode;
			padre.removeChild(eliminar);
		}
	},
	doGetCaretPosition:function(oField) 
	{

 		// Initialize
  		var iCaretPos = 0;

  		// IE Support
  		if (document.selection) {

    		// Set focus on the element
    		oField.focus();

    		// To get cursor position, get empty selection range
    		var oSel = document.selection.createRange();

    		// Move selection start to 0 position
    		oSel.moveStart('character', -oField.value.length);

   			 // The caret position is selection length
    		iCaretPos = oSel.text.length;
  		}	

  		// Firefox support
  		else if (oField.selectionStart || oField.selectionStart == '0')
    		iCaretPos = oField.selectionStart;

  		// Return results
  		return iCaretPos;
	}
}

var listaDeEntradas={
	lista:[],
	indice:0,
	maximoElementos:10,
	introducir_accion:function(accion)
	{
		if (listaDeEntradas.lista.length+1>=listaDeEntradas.maximoElementos)
		{
			listaDeEntradas.lista.pop()
		}
		listaDeEntradas.lista.unshift(accion);
		indice=0;
	},
	subir_accion:function()
	{
		if (listaDeEntradas.indice+1<=listaDeEntradas.lista.length-1)
		{
			listaDeEntradas.indice+=1;
			return listaDeEntradas.lista[listaDeEntradas.indice];
		}
		return null;
	},
	bajar_accion:function()
	{
		if (listaDeEntradas.indice-1>=0)
		{
			if (listaDeEntradas.lista.length>0)
			{
				listaDeEntradas.indice-=1;
				return listaDeEntradas.lista[listaDeEntradas.indice];
			}
		}
		return null;
	}
}
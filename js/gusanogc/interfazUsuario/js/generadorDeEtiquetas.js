var generadorDeEtiquetas=
{
	actorDice:"",
	generar_etiqueta:function(texto)
	{
		var etiqueta=document.createElement("p");
		if (texto.tipo=="entrada")
		{
			etiqueta.className="AccionDelUsuario";
			generadorDeEtiquetas.actorDice="";
		}
		else if (texto.tipo=="actores")
		{
			etiqueta.className="actorEnEscena";
		}
		else if (texto.tipo=="descripcion_escenario")
		{
			etiqueta.className="descripcionEscenario";
			generadorDeEtiquetas.actorDice="";
		}
		else if (texto.tipo=="objetos")
		{
			etiqueta.className="objetoEnEscena";
		}
		else if (texto.tipo=="contenidoObjeto")
		{
			etiqueta.className="contenidoObjeto";
		}
		else if (texto.tipo=="salidas")
		{
			etiqueta.className="salidasDeLaEscena";
		}
		
		else if (texto.tipo=="salidas_opcion")
		{
			etiqueta.className="salidasEnOpcion";
		}
		else if (texto.tipo=="despues_contenido")
		{
			generadorDeEtiquetas.actorDice="";
			etiqueta.className="despuesContenido";
		}
		else if (texto.tipo=="acciones_favoritas")
		{
			etiqueta.className="favoritosAcciones";
		}
		else if (texto.tipo=="control_turnos")
		{
			etiqueta.className="controlTurnos";
		}
		else if(texto.tipo=="titulo_escenario")
		{
			generadorDeEtiquetas.actorDice="";
			etiqueta=document.createElement("h2");
			etiqueta.className="tituloEscenario";
		}
		else if(texto.tipo=="seleccion_combate")
		{
			etiqueta.className="seleccionDeCombate";
			var resaltar=document.createElement("a");
			resaltar.innerHTML=texto.cadena;
			resaltar.setAttribute("id","selec_"+texto.seleccion);
			resaltar.setAttribute("class", "puntoInteres");
				

			resaltar.addEventListener("click",function(e)
			{
				combate.indiceSeleccion=this.getAttribute("id").split("_")[1];
			});
			
			etiqueta.appendChild(resaltar);
			return etiqueta;
		}
		else if (texto.tipo=="seleccion")
		{
			etiqueta.className="enlaceSeleccion fundido_entrada";
			var resaltar=document.createElement("a");
			resaltar.innerHTML=texto.cadena;
			resaltar.className="puntoInteres seleccion";

			resaltar.setAttribute("id",texto.evento)
			
			resaltar.addEventListener("click",function(e)
			{
				var evento=this.getAttribute("id")
				
				if (evento in eventos.event)
				{
					func=eventos.event[evento];
					if (func!=null)
					{
						func();
					}
				}
				var selecciones=document.getElementsByClassName("enlaceSeleccion");
				while (selecciones[0])
				{	
					buclePrincipal.ideUsuario.salidaTexto.removeChild(selecciones[0]);
				}
				buclePrincipal.ideUsuario.esperarPulsarMas=false;
			});
			
			etiqueta.appendChild(resaltar);
			return etiqueta;
		}
		else if (texto.tipo=="opciones")
		{
			dialogos.generar_opciones(texto.opciones)
		}
		else 
		{
			etiqueta.className=texto.tipo;
		}
		
		if (buclePrincipal.ideUsuario.vinculosEnEscena!=true)
		{
			etiqueta.innerHTML=texto.cadena;
		}
		else
		{

			etiqueta=generadorDeEtiquetas.crear_etiqueta_a_elemento(texto,etiqueta);
		}
		return etiqueta;
	},
	crear_etiqueta_a_elemento:function(texto,etiqueta)
	{
		lista=texto.cadena.split(" ");
		

		puntosDeInteres=selectorDeObjetos.autocompletado;
		claves=selectorDeObjetos.autocompletadoClaves;
		for (l=0;l<lista.length;l++)
		{
			elemento=lista[l].slice();
			auxiliarElemento=new String(elemento.slice());
			if ((elemento.indexOf(".")!=-1)||(elemento.indexOf(",")!=-1))
			{
				newElemento="";
				for (ele in elemento)
				{
					if (", .".indexOf(elemento[ele]))
					{
						break;
					}
					newElemento+=elemento[ele];
				}
				indice=puntosDeInteres.indexOf(newElemento)
				
			}
			else
			{
				indice=puntosDeInteres.indexOf(elemento);
			}
			
			
			if (indice!=-1)
			{
				var resaltar=document.createElement("a");
				resaltar.innerHTML=elemento;
				resaltar.setAttribute("id", claves[indice]+"_"+indice);
				
				resaltar.className="puntoInteres"
				
				if (detectorDePalabras.buscar_conexiones_en_escenario(elemento)!=null)
				{
					resaltar.addEventListener("click",function(e)
					{
						selectorDeObjetos.lanzar_accion_intercambiar_cuarto(this.innerHTML);
					});
				}
				else if(detectorDePalabras.buscar_accion_activa(elemento)!=null)
				{
					resaltar.addEventListener("click",function(e)
					{
						verbo=detectorDePalabras.buscar_accion_activa(this.innerHTML);
						entradaExt=selectorDeObjetos.comprobar_accion_activa(verbo);
						entradaUsuario.cuadroDeTexto.value=entradaExt;
					});
					
				}
				else if(detectorDePalabras.buscar_objeto_por_nombre(elemento,contenido.objetos,[]).length>0)
				{
					resaltar.addEventListener("click",function(e)	
					{
						entradaExt=selectorDeObjetos.reconocer_e_insertar_objeto_en_accion(entradaUsuario.cuadroDeTexto.value,this.getAttribute("id"),this.innerHTML,true)
						entradaUsuario.cuadroDeTexto.value=entradaExt;
					});	
				}
				else
				{
					resaltar.addEventListener("click",function(e)	
					{
						entradaExt=selectorDeObjetos.reconocer_e_insertar_objeto_en_accion(entradaUsuario.cuadroDeTexto.value,this.getAttribute("id"),this.innerHTML,true)
						entradaUsuario.cuadroDeTexto.value=entradaExt;
					});
				}

				
				etiqueta.appendChild(resaltar);
				var span=document.createElement("span");
				span.innerHTML=" ";
				etiqueta.appendChild(span);
			}
			else
			{
				if(detectorDePalabras.buscar_accion_activa(elemento)!=null)
				{
					if (buclePrincipal.ideUsuario.comandosUsables.indexOf(elemento)==-1)
					{
						buclePrincipal.ideUsuario.comandosUsables.push(elemento);
						selectorDeObjetos.autocompletado.push(elemento);
						selectorDeObjetos.autocompletadoClaves.push(elemento);
						
						if (gestionPartidas.permitirGuardar)
							salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
					}
				}
				var span=document.createElement("span");
				span.innerHTML=elemento+" ";
				etiqueta.appendChild(span);
			}

		}
		return etiqueta;

	}
}
InterfaceSimple=function()
{
	IdeUsuario.call(this);

	this.salidaTexto=null;
	this.cuadroDeTexto=null;

	this.textoEnPantalla="";
	this.esperarTiempoEnPantalla=false;
	this.esperarPulsarMas=false;
	this.modoDeLecturaEnPausar=false;
	this.mostrarCuadroDeEntrada=false;
	this.vinculosEnEscena=true
	this.moverTextoScroll=false;
	this.estiloImagen=null;
	this.nuevaImagen="";
	this.modo="normal";
	this.comandosUsables="acciones,inventario,mirar,examinar,coger,dejar,empujar,tirar,hablar,dar,usar,abrir,cerrar,encender,apagar".split(",");
	this.mover_scroll_texto=function()
	{
		alto=0;
		if(this.salidaTexto.offsetHeight){alto=this.salidaTexto.offsetHeight;}
		else if(this.salidaTexto.style.pixelHeight){alto=this.salidaTexto.style.pixelHeight;}
		

		altoSalida=0;

		if(this.cuadroDeTexto.offsetHeight){altoSalida=this.cuadroDeTexto.offsetHeight;}
		else if(this.cuadroDeTexto.style.pixelHeight){altoSalida=this.cuadroDeTexto.style.pixelHeight;}

		if (alto>altoSalida)
		{
			moverA=alto-altoSalida;
			this.cuadroDeTexto.scrollTop=moverA;
		}
	};
}
InterfaceSimple.prototype=Object.create(IdeUsuario.prototype);


	IdeUsuario.prototype.iniciar=function()
	{
		bestiario.iniciar();
		this.salidaTexto=document.getElementById("texto");
		this.cuadroDeTexto=document.getElementById("salidaTexto");
	}

	IdeUsuario.prototype.actualizar=function(registroTemporal)
	{
		if (this.modo=="dialogo")
		{
			dialogos.actualizar()
		}
		if (this.modo=="combate")
		{
			combate.actualizar();
		}
		if (this.esperarPulsarMas!=true)
		{
			if (this.textoEnPantalla.length<=0)
			{
				this.textoEnPantalla=salida.obtener();
				generadorDeEtiquetas.actorDice="";
				if (this.mostrarCuadroDeEntrada)
				{
					this.mostrarCuadroDeEntrada=false;
					var mostrarEntrada=false;
					if (guion.escenarioActual!=null)
					{
						mostrarEntrada=guion.escenarioActual.mostrarEntradaUsuario;
					}
					
					if (mostrarEntrada)
					{
						entradaUsuario.generar_entrada_usuario();
					}
				}
			}
			else if ((this.textoEnPantalla.length>0)&&(this.esperarTiempoEnPantalla!=true))
			{
				if (this.mostrarCuadroDeEntrada!=true)
				{
					entradaUsuario.eliminar_entrada_usuario();
					this.mostrarCuadroDeEntrada=true;
				}

				parrafo=this.textoEnPantalla.splice(0,1)[0];
				if(parrafo.tipo=="orden_interna")
				{
					controlDeOrdenesInternas.controlar(parrafo);
				}
				else if(parrafo.tipo=="imagen")
				{
					this.estiloImagen=parrafo;
					this.nuevaImagen=parrafo.cadena;
				}
				else
				{
					etiqueta=generadorDeEtiquetas.generar_etiqueta(parrafo);
					etiqueta=estiloDeEtiqueta.generar_estilos(etiqueta,parrafo);
					if ("tiempo" in parrafo)
					{
						this.esperarTiempoEnPantalla=true;
						setTimeout(function()
						{
								
							buclePrincipal.ideUsuario.esperarTiempoEnPantalla=false;
						},parrafo["tiempo"]);
					}
					this.salidaTexto.appendChild(etiqueta);
					if (this.modoDeLecturaEnPausar)
					{
						if (this.salidaTexto.offsetHeight>=this.cuadroDeTexto.offsetHeight)
						{
							etiqueta=funcionesIdeUsuario.crear_etiqueta_mas(etiqueta,true);
							this.esperarPulsarMas=true;
						}
					}
					this.moverTextoScroll=true;
				}
			}
			bestiario.actualizar(registroTemporal);
		}
	}

	IdeUsuario.prototype.dibujar=function()
	{

		if(this.moverTextoScroll)
		{
			this.mover_scroll_texto();
			this.moverTextoScroll=false;
		}
		if (this.nuevaImagen!="")
		{
			var imagen=guion.recursos[this.nuevaImagen];
			var div=document.createElement("div");
			div.style.width="100%";
			if ("alinear" in this.estiloImagen)
			{
				div.style.textAlign=this.estiloImagen.alinear;
			}
			if ("baseColor" in this.estiloImagen)
			{
				div.style.backgroundColor=this.estiloImagen.baseColor;
			}
			div.appendChild(imagen.imagen)
			estiloDeEtiqueta.generar_estilos(imagen.imagen,this.estiloImagen);
			this.salidaTexto.appendChild(div);
			this.nuevaImagen="";
		}
	}

	IdeUsuario.prototype.entra_nueva_escena=function()
	{
		actores=guion.escenarioActual.actores;
		lista=[];
		claves=[];
		for (key in actores)
		{
			if (actores[key].visible)
			{
				funcionesIdeUsuario.extraer_datos_del_objeto(actores[key],lista,claves);
			}
		}
		objetos=guion.escenarioActual.objetos;

		for (key in objetos)
		{
			if ((objetos[key].visible)&&((objetos[key].visto)||(objetos[key].atrezo)))
			{
				funcionesIdeUsuario.extraer_datos_del_objeto(objetos[key],lista,claves);
			}
		}
		funcionesIdeUsuario.extraer_salidas_del_escenario(guion.escenarioActual,lista,claves);
		funcionesIdeUsuario.obtener_comandos_actuales(lista,claves)
		selectorDeObjetos.autocompletado=lista;
		selectorDeObjetos.autocompletadoClaves=claves;
	}
	IdeUsuario.prototype.descargando_juego=function(SalidaCargando)
	{
		salida.escribir(SalidaCargando);
	}
	IdeUsuario.prototype.iniciar_dialogo=function(dialogo)
	{
		this.modo="dialogo";
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"})
	}
	IdeUsuario.prototype.finalizar_dialogo=function(dialogo)
	{
		this.modo="normal";
	}


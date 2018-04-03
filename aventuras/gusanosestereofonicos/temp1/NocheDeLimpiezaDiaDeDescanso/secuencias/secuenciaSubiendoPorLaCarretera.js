SecuenciaSubiendoPorLaCarretera=function()
{
	this.baseContador=null;
	this.baseContadorTiempo=null;
	this.etiquetaContadorTiempo=null;
	this.numerosContadorTiempo=null;
	this.etiquetaContadorMetros=null;
	this.numerosContadorMetros=null;
	this.etiquetaMetrosSegundo=null;
	this.numerosMetrosSegundo=null;
	this.metrosParaChocar=null;
	Secuencia.call(this,"Acto Segundo","Subiendo por la carreterra",null,"SubiendoPorLaCarretera",false);
	this.presentacion=function()
	{
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		salida.escribir({tipo:"titulo_escenario",clases:"fundido_entrada",alinear:"center",cadena:funcionesDeSalida.obtener_lista("presentacion-secuencia-subiendo-por-la-carretera-titulo")});
		var textoInicial=funcionesDeSalida.obtener_lista("presentacion-secuencia-subiendo-por-la-carretera");
		salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:textoInicial});
		
		salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
		salida.escribir({tipo:"orden_interna",cadena:"ejecutar_evento",evento:"crear_contador"});
		guion.datos["mostrarOpciones"]=true;
		
		
	}

	this.generar_obstaculo=function()
	{
		listaObsaculos=["un conejo en","una rama en","una roca en","una ardilla en","un bache en"];
		textoObstaculoDeLista=listaObsaculos[funcionesDeSalida.aleatorio(0,4)]
		var contenedorAventura=document.getElementById("contenedorDeLaAventura");
		this.etiquetaObstaculo=document.createElement("a");
		this.etiquetaObstaculo.setAttribute("id","cuadroObstaculo");
		textoEncuentras=document.createElement("p");
		textoEncuentras.className="textoObstaculos";
		textoEncuentras.innerHTML="Encuentras";
		textoObstaculo=document.createElement("p");
		textoObstaculo.className="textoObstaculos";
		textoObstaculo.innerHTML=textoObstaculoDeLista;
		this.metrosParaChocar=document.createElement("p");
		this.metrosParaChocar.className="textoObstaculos";
		this.metrosParaChocar.innerHTML="30m";
		pulsa=document.createElement("p");
		pulsa.className="textoObstaculos";
		pulsa.innerHTML="Pulsa";

		this.etiquetaObstaculo.appendChild(textoEncuentras);
		this.etiquetaObstaculo.appendChild(textoObstaculo);
		this.etiquetaObstaculo.appendChild(this.metrosParaChocar);
		this.etiquetaObstaculo.appendChild(pulsa);

		contenedorAventura.appendChild(this.etiquetaObstaculo);
		this.etiquetaObstaculo.addEventListener("click",function(e)
		{
			if(guion.datos["impactoObstaculoEn"]>0)
			{
				guion.secuenciaActual.etiquetaObstaculo.style.backgroundColor="#383c00ff";
				guion.secuenciaActual.etiquetaObstaculo.setAttribute("class","desvanecerDe800");
				eventos.eliminar_intervalo("tiempoImpactoObstaculo");
				guion.secuenciaActual.metrosParaChocar.innerHTML="¡OK!";
				setTimeout(function()
				{
					guion.datos["impactoObstaculoEn"]=30;
					if (guion.secuenciaActual.etiquetaObstaculo.parentNode!=null)
						guion.secuenciaActual.etiquetaObstaculo.parentNode.removeChild(guion.secuenciaActual.etiquetaObstaculo);
					guion.datos["tengoImpacto"]=false;
				},800);
			}
		});
		xC=contenedorAventura.getBoundingClientRect().left;
		wC=contenedorAventura.getBoundingClientRect().width;
		yC=contenedorAventura.getBoundingClientRect().top;
		hC=contenedorAventura.getBoundingClientRect().height;
		topeW=this.etiquetaObstaculo.getBoundingClientRect().width;
		topeH=this.etiquetaObstaculo.getBoundingClientRect().height;
		x=funcionesDeSalida.aleatorio(xC+topeW,(xC+wC)-topeW);
		y=funcionesDeSalida.aleatorio(yC+topeH,(hC/2));

		this.etiquetaObstaculo.style.left=x+"px";
		this.etiquetaObstaculo.style.top=y+"px";
		

		guion.datos["tengoImpacto"]=true;
		guion.datos["obstaculo"]=0;
		if (guion.datos["metros"]>2500)
		{
			guion.datos["obstaculoEn"]=funcionesDeSalida.aleatorio(60,130);
		}
		else if (guion.datos["metros"]>1500)
		{
			guion.datos["obstaculoEn"]=funcionesDeSalida.aleatorio(50,60);
		}
		else if (guion.datos["metros"]>800)
		{
			guion.datos["obstaculoEn"]=funcionesDeSalida.aleatorio(30,40);
		}
		else
		{
			guion.datos["obstaculoEn"]=funcionesDeSalida.aleatorio(10,20);
		}
		eventos.crear_intervalo("tiempoImpactoObstaculo",function()
		{
			guion.datos["impactoObstaculoEn"]-=guion.datos["metrosSegundosActual"];
			if (guion.secuenciaActual.metrosParaChocar==null)
			{
				return;
			}
			guion.secuenciaActual.metrosParaChocar.innerHTML=guion.datos["impactoObstaculoEn"]+"m";
			if (guion.datos["impactoObstaculoEn"]<=20)
			{
				guion.secuenciaActual.etiquetaObstaculo.style.backgroundColor="#d4aa00ff";	
			}
			if (guion.datos["impactoObstaculoEn"]<=10)
			{
				guion.secuenciaActual.etiquetaObstaculo.style.backgroundColor="#550000ff";	
			}
			if (guion.datos["impactoObstaculoEn"]<=0)
			{
				
				guion.secuenciaActual.etiquetaObstaculo.setAttribute("class","desvanecerDe800");
				guion.secuenciaActual.metrosParaChocar.innerHTML="¡MAL!";
				eventos.eliminar_intervalo("tiempoImpactoObstaculo");

				setTimeout(function()
				{
					guion.secuenciaActual.metrosParaChocar.innerHTML="0m";
					guion.datos["impactoObstaculoEn"]=30;
					if (guion.secuenciaActual.etiquetaObstaculo.parentNode!=null)
						guion.secuenciaActual.etiquetaObstaculo.parentNode.removeChild(guion.secuenciaActual.etiquetaObstaculo);
					guion.datos["tengoImpacto"]=false;
					guion.datos["restarImpacto"]=true;
					guion.secuenciaActual.numerosContadorMetros.style.color="#550000ff";
				},800);
			}

		},250,false);	
	}
	this.iniciar=function()
	{
		
		guion.datos["esperaTexto"]=1000;
		guion.datos["modo"]={
					posicion:"sentado",
					ritmo:"lento",
					marcha:"blanda"
		};
		guion.datos["ascenso"]={
			pendiente:2
		};
		guion.datos["cambiarPendienteEn"]=1000;
		guion.datos["faltaParaCambio"]=0;
		guion.datos["iniciarAscenso"]=false;
		guion.datos["mostrarOpciones"]=false;
		guion.datos["mostrarRecuerdos"]=false;
		guion.datos["recordando"]=false;

		guion.datos["recuerdosGusano"]=false;
		guion.datos["BustyALaBateria"]=true;
		guion.datos["bitsALosTeclados"]=true;
		guion.datos["bobElBajisa"]=true;
		guion.datos["sobreCambrill"]=false;
		guion.datos["sobreElMonoLoco"]=false;
		guion.datos["sobreLorna"]=true;
		guion.datos["porQueSeFueLorna"]=true;
		guion.datos["sobrePeet"]=true;
		guion.datos["radioPirata"]=true;
		guion.datos["bosqueColorado"]=true;
		guion.datos["bosqueColoradoB"]=true;
		guion.datos["bosqueColoradoC"]=true;
		guion.datos["rioLlanto"]=true;
		guion.datos["rioLlantoB"]=true;


		guion.datos["minutos"]=10;
		guion.datos["segundos"]=0;
		guion.datos["metros"]=2280;
		guion.datos["metrosSegundo"]=4;
		guion.datos["metrosSegundosActual"]=4;
		guion.datos["llegasATiempo"]=false;

		guion.datos["obstaculoEn"]=300;
		guion.datos["obstaculo"]=0;
		guion.datos["impactoObstaculoEn"]=30;
		guion.datos["tengoImpacto"]=false;
		guion.datos["restarImpacto"]=false;
		
		eventos.event.crear_contador=function()
		{
			/*Evento que genera el conometro que maneja el tiempo de juego*/
			document.getElementById("ideUsuario").style.height="90%";

			var contenedorAventura=document.getElementById("contenedorDeLaAventura");
			guion.secuenciaActual.baseContador=document.createElement("div");
			guion.secuenciaActual.baseContador.setAttribute("id","baseContador");

			/*contador de tiempo*/
			var baseContadorTiempo=document.createElement("div");
			baseContadorTiempo.className="cuadroDeContador";
			guion.secuenciaActual.etiquetaContadorTiempo=document.createElement("h2");
			guion.secuenciaActual.etiquetaContadorTiempo.className="etiquetaInformacion";
			guion.secuenciaActual.etiquetaContadorTiempo.innerHTML="Tiempo restante";
			guion.secuenciaActual.numerosContadorTiempo=document.createElement("h2");
			guion.secuenciaActual.numerosContadorTiempo.className="numerosInformacion";
			guion.secuenciaActual.numerosContadorTiempo.innerHTML="10:00";
			baseContadorTiempo.appendChild(guion.secuenciaActual.etiquetaContadorTiempo);
			baseContadorTiempo.appendChild(guion.secuenciaActual.numerosContadorTiempo);
			/***************************************************************/
			/*contador de metros*/
			var baseContadorMetros=document.createElement("div");
			baseContadorMetros.className="cuadroDeContador";
			guion.secuenciaActual.etiquetaContadorMetros=document.createElement("h2");
			guion.secuenciaActual.etiquetaContadorMetros.className="etiquetaInformacion";
			guion.secuenciaActual.etiquetaContadorMetros.innerHTML="Metros restante";
			guion.secuenciaActual.numerosContadorMetros=document.createElement("h2");
			guion.secuenciaActual.numerosContadorMetros.className="numerosInformacion";
			guion.secuenciaActual.numerosContadorMetros.innerHTML=guion.datos["metros"];
			baseContadorMetros.appendChild(guion.secuenciaActual.etiquetaContadorMetros);
			baseContadorMetros.appendChild(guion.secuenciaActual.numerosContadorMetros);
			/***************************************************************/

			/*Metros por segundo*/
			var baseMetrosSegundo=document.createElement("div");
			baseMetrosSegundo.className="cuadroDeContador";
			guion.secuenciaActual.etiquetaMetrosSegundo=document.createElement("h2");
			guion.secuenciaActual.etiquetaMetrosSegundo.className="etiquetaInformacion";
			guion.secuenciaActual.etiquetaMetrosSegundo.innerHTML="Metros/Segundo";
			guion.secuenciaActual.numerosMetrosSegundo=document.createElement("h2");
			guion.secuenciaActual.numerosMetrosSegundo.className="numerosInformacion";
			guion.secuenciaActual.numerosMetrosSegundo.innerHTML=guion.datos["metrosSegundo"];
			baseMetrosSegundo.appendChild(guion.secuenciaActual.etiquetaMetrosSegundo);
			baseMetrosSegundo.appendChild(guion.secuenciaActual.numerosMetrosSegundo);
			/***************************************************************/

			guion.secuenciaActual.baseContador.appendChild(baseContadorTiempo);
			guion.secuenciaActual.baseContador.appendChild(baseContadorMetros);
			guion.secuenciaActual.baseContador.appendChild(baseMetrosSegundo);
			contenedorAventura.appendChild(guion.secuenciaActual.baseContador);

		}

		eventos.crear_intervalo("ascenso",function()
		{
			if(guion.datos["iniciarAscenso"])
			{
				/*Zona para calcular los contadores*/
				guion.datos["segundos"]-=4;

				//Paramos el contador cuando llega a 00:00
				if((guion.datos["minutos"]<=0)&&(guion.datos["segundos"]<=0))
				{
					eventos.eliminar_intervalo("ascenso");
					guion.secuenciaActual.numerosContadorTiempo.innerHTML="00:00";
					guion.datos["llegasATiempo"]=false;
					guion.secuenciaActual.terminarSecuencia=true;
					return;
				}

				if (guion.datos["segundos"]<=0)
				{
					guion.datos["segundos"]=60
					guion.datos["minutos"]-=1;
				}
				if(guion.datos["minutos"]>=10)
				{
					datM=guion.datos["minutos"];
				}
				else
				{
					datM="0"+guion.datos["minutos"];
				}

				if(guion.datos["segundos"]>=10)
				{
					datS=guion.datos["segundos"];
				}
				else
				{
					datS="0"+guion.datos["segundos"];
				}
				guion.datos["metros"]-=guion.datos["metrosSegundosActual"]*4;
				/*CONTROLAMOS SI LOS METROS LLEGAN A CERO PARA FINALIZAR EL CONÓMETRO*/
				if (guion.datos["metros"]<=0)
				{
					eventos.eliminar_intervalo("ascenso");
					guion.datos["metros"]=0;
					guion.datos["llegasATiempo"]=true;
					guion.secuenciaActual.terminarSecuencia=true;
				}
				if(guion.datos["restarImpacto"])
				{
					guion.datos["restarImpacto"]=false;
					guion.datos["metros"]+=guion.datos["metrosSegundosActual"]*4;
				}
				else
				{
					guion.secuenciaActual.numerosContadorMetros.style.color="white";
				}
				guion.secuenciaActual.numerosContadorTiempo.innerHTML=datM+":"+datS;
				guion.secuenciaActual.numerosContadorMetros.innerHTML=guion.datos["metros"];
				guion.secuenciaActual.numerosMetrosSegundo.innerHTML=guion.datos["metrosSegundosActual"];
				/*****************************************************************************/
				

				/*CONTROL PARA GENERAR UN NUEVO IMPACTO*/
				if (guion.datos["tengoImpacto"]!=true)
				{
					guion.datos["obstaculo"]+=guion.datos["metrosSegundosActual"]*4;
				}
				if (guion.datos["obstaculo"]>=guion.datos["obstaculoEn"])
				{
					guion.secuenciaActual.generar_obstaculo();
				}
				/***************************************************************************/

				guion.datos["faltaParaCambio"]+=guion.datos["metrosSegundosActual"]*4;
				if (guion.datos["faltaParaCambio"]>=guion.datos["cambiarPendienteEn"])
				{
					guion.datos["iniciarAscenso"]=false;
					guion.datos["mostrarOpciones"]=true;
					guion.datos["mostrarRecuerdos"]=false;
				}
			}

		},1000,false);


		eventos.event.elegir_posicion=function()
		{
			funcionesDeSalida.obtener_lista("texto-sentado")
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("texto-sentado"),"evento":"elegir_posicion_sentado"});
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("texto-elevado"),"evento":"elegir_posicion_elevado"});
		};

		eventos.event.elegir_posicion_sentado=function()
		{
			guion.datos["modo"].posicion="sentado";
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("pedalear-a-ritmo"),"evento":"elegir_ritmo"});
		};
		eventos.event.elegir_posicion_elevado=function()
		{
			guion.datos["modo"].posicion="elevado";
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("pedalear-a-ritmo"),"evento":"elegir_ritmo"});
		};
		eventos.event.elegir_ritmo=function()
		{
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("texto-rapido"),"evento":"elegir_ritmo_rapido"});
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("texto-lento"),"evento":"elegir_ritmo_lento"});
		};
		eventos.event.elegir_ritmo_rapido=function()
		{
			funcionesDeSalida.obtener_lista("texto-lento")
			guion.datos["modo"].ritmo="rapido";
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("seleccionas-marcha"),"evento":"elegir_marcha"});
		};
		eventos.event.elegir_ritmo_lento=function()
		{
			guion.datos["modo"].ritmo="lento";
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("seleccionas-marcha"),"evento":"elegir_marcha"});
		};
		eventos.event.elegir_marcha=function()
		{
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("texto-dura"),"evento":"elegir_marcha_dura"});
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("texto-blanda"),"evento":"elegir_marcha_blanda"});
		}
		eventos.event.elegir_marcha_dura=function()
		{
			guion.datos["modo"].marcha="dura";
			guion.secuenciaActual.iniciar_ascenso();
		};
		eventos.event.elegir_marcha_blanda=function()
		{
			guion.datos["modo"].marcha="blanda";
			guion.secuenciaActual.iniciar_ascenso();
		};

		/*RECUERDOS RELACIONADOS CON GUSANOS ESTEREOFÓNICOS*/
		eventos.event.recordar_gusano=function()
		{
			guion.secuenciaActual.recordar("recuerdos-gusanos",["BustyALaBateria","bitsALosTeclados","bobElBajisa"],["recuerdosGusano"]);
		};
		eventos.event.recordar_busty=function()
		{
			guion.secuenciaActual.recordar("recuerdos-busty-bateria",[],["BustyALaBateria"]);
		};
		eventos.event.recordar_bits=function()
		{
			guion.secuenciaActual.recordar("recuerdos-bits-teclados",[],["bitsALosTeclados"]);
		};
		eventos.event.recordar_bob=function()
		{
			guion.secuenciaActual.recordar("recuerdos-bob-bajista",["radioPirata"],["bobElBajisa"]);
		};
		
		eventos.event.recordar_radio_pirata=function()
		{
			guion.secuenciaActual.recordar("recuerdos-radio-pirata",[],["radioPirata"]);
		};
		/******************************************************/

		/*RECUERDOS RELACIONADOS CON CAMBRILL*/
		eventos.event.recordar_cambrill=function()
		{
			guion.secuenciaActual.recordar("recuerdos-cambrill",["bosqueColorado","rioLlanto"],["sobreCambrill"]);
		};

		eventos.event.recordar_bosque_a=function()
		{
			guion.secuenciaActual.recordar("recuerdos-bosque-colorado",["bosqueColoradoB"],["bosqueColorado"]);
		};

		eventos.event.recordar_bosque_b=function()
		{
			guion.secuenciaActual.recordar("recuerdos-bosque-colorado-b",["bosqueColoradoC"],["bosqueColoradoB"]);
		};

		eventos.event.recordar_bosque_c=function()
		{
			guion.secuenciaActual.recordar("recuerdos-bosque-colorado-c",[],["bosqueColoradoC"]);
		};

		eventos.event.recordar_rio_llanto=function()
		{
			guion.secuenciaActual.recordar("recuerdos-rio-llanto",["rioLlantoB"],["rioLlanto"]);
		};

		eventos.event.recordar_rio_llanto_b=function()
		{
			guion.secuenciaActual.recordar("recuerdos-rio-llanto-b",[],["rioLlantoB"]);
		};
		/******************************************************/
		/*RECUERDOS RELACIONADOS MONO LOCO*/
		eventos.event.recordar_mono_loco=function()
		{
			guion.secuenciaActual.recordar("recuerdos-mono-loco",["sobreLorna"],["sobreElMonoLoco"]);
		};
		/******************************************************/

		/*RECUERDOS RELACIONADOS CON LORNA*/
		eventos.event.recordar_lorna=function()
		{
			guion.secuenciaActual.recordar("recuerdos-amada-lorna",["porQueSeFueLorna"],["sobreLorna"]);
		};
		eventos.event.recordar_lorna_se_fue=function()
		{
			guion.secuenciaActual.recordar("por-que-se-fue-lorna",["sobrePeet"],["porQueSeFueLorna"]);
		};
		eventos.event.recordar_peet=function()
		{
			guion.secuenciaActual.recordar("peet-el-macarra",["sobreElMonoLoco"],["sobrePeet"]);
		};
		/******************************************************/

		eventos.event.terminar_recuerdo=function()
		{
			if (guion.datos["mostrarOpciones"]!=true)
			{
				guion.datos["mostrarRecuerdos"]=true;
			}
			guion.datos["recordando"]=false;
		}
		
		

	};

	this.iniciar_ascenso=function()
	{
		guion.datos["cambiarPendienteEn"]=funcionesDeSalida.aleatorio(700,800);
		guion.datos["obstaculo"]=funcionesDeSalida.aleatorio(300,500);
		guion.datos["faltaParaCambio"]=0;
		guion.datos["iniciarAscenso"]=true;
		guion.datos["mostrarRecuerdos"]=true;
		guion.datos["metrosSegundosActual"]=guion.datos["metrosSegundo"];
		if (guion.datos["ascenso"].pendiente==1)
		{
			if(guion.datos["modo"].posicion=="elevado")
			{
				guion.datos["metrosSegundosActual"]-=1;
			}
			if (guion.datos["modo"].marcha=="dura")
			{
				guion.datos["metrosSegundosActual"]-=1;
			}
			if (guion.datos["modo"].ritmo=="lento")
			{
				guion.datos["metrosSegundosActual"]-=1;
			}
		}
		if (guion.datos["ascenso"].pendiente==2)
		{
			if(guion.datos["modo"].posicion=="sentado")
			{
				guion.datos["metrosSegundosActual"]-=1;
			}
			if (guion.datos["modo"].marcha=="blanda")
			{
				guion.datos["metrosSegundosActual"]-=1;
			}
			if (guion.datos["modo"].ritmo=="rapido")
			{
				guion.datos["metrosSegundosActual"]-=1;
			}
		}
	}

	this.actualizar_a_tiempo_real=function(tiempo)
	{
		if ((guion.datos["mostrarOpciones"])&&(guion.datos["recordando"]!=true))
		{	
			
			salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
			salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista("piensas"),tiempo:guion.datos["esperaTexto"]});
				
			if (guion.datos["ascenso"].pendiente==1)
			{
				textoPendiente="";
				if (funcionesDeSalida.aleatorio(1,2)==1)
				{
					textoPendiente="pendiente-muy-pronunciada";
				}
				else
				{
					textoPendiente="pendiente-demasiado-empinada";
				}
				salida.escribir({tipo:"bradyAct",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista(textoPendiente),tiempo:guion.datos["esperaTexto"]});
				guion.datos["ascenso"].pendiente=2;
			}
			else
			{
				textoPendiente="";
				if (funcionesDeSalida.aleatorio(1,2)==1)
				{
					textoPendiente="pendiente-poco-pronunciada";
				}
				else
				{
					textoPendiente="pendiente-no-se-percibe";
				}
				salida.escribir({tipo:"bradyAct",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista(textoPendiente),tiempo:guion.datos["esperaTexto"]});
				guion.datos["ascenso"].pendiente=1;
			}	
			salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista("revisar-estilo"),tiempo:guion.datos["esperaTexto"]});
			salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("sobre-sillin"),"evento":"elegir_posicion"});
			guion.datos["mostrarOpciones"]=false;
		}
		else if ((guion.datos["mostrarRecuerdos"])&&(guion.datos["iniciarAscenso"]))
		{
			guion.datos["recordando"]=true;
			salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
			salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista("comienzas-a-recordar"),tiempo:guion.datos["esperaTexto"]});
			salida.escribir({tipo:"titulo_escenario",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista("recuerdos-titulo"),tiempo:guion.datos["esperaTexto"],alinear:"center"});

			/*RECUERDOS RELACIONADOS CON GUSANOS ESTEREOFÓNICOS*/
			if (guion.datos["recuerdosGusano"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-gusano-titulo"),"evento":"recordar_gusano"});
			}
			if (guion.datos["BustyALaBateria"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-busty-bateria-titulo"),"evento":"recordar_busty"});
			}
			if (guion.datos["bitsALosTeclados"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-bits-teclados-titulo"),"evento":"recordar_bits"});
			}
			if (guion.datos["bobElBajisa"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-bob-bajista-titulo"),"evento":"recordar_bob"});
			}
			if (guion.datos["radioPirata"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-radio-pirata-titulo"),"evento":"recordar_radio_pirata"});
			}
			/******************************************************/

			/*RECUERDOS RELACIONADOS CON CAMBRILL*/
			if (guion.datos["sobreCambrill"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-cambrill-titulo"),"evento":"recordar_cambrill"});
			}

			if (guion.datos["bosqueColorado"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-bosque-colorado-titulo"),"evento":"recordar_bosque_a"});
			}

			if (guion.datos["bosqueColoradoB"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-bosque-colorado-b-titulo"),"evento":"recordar_bosque_b"});
			}

			if (guion.datos["bosqueColoradoC"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-bosque-colorado-c-titulo"),"evento":"recordar_bosque_c"});
			}

			if (guion.datos["rioLlanto"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-rio-llanto-titulo"),"evento":"recordar_rio_llanto"});
			}
			if (guion.datos["rioLlantoB"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-rio-llanto-b-titulo"),"evento":"recordar_rio_llanto_b"});
			}
			/******************************************************/

			/*RECUERDOS RELACIONADOS CON MONO LOCO*/
			if (guion.datos["sobreElMonoLoco"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-mono-loco-titulo"),"evento":"recordar_mono_loco"});
			}
			/******************************************************/

			/*RECUERDOS RELACIONADOS CON LORNA*/
			if (guion.datos["sobreLorna"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("recuerdos-amada-lorna-titulo"),"evento":"recordar_lorna"});
			}
			if (guion.datos["porQueSeFueLorna"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("por-que-se-fue-lorna-titulo"),"evento":"recordar_lorna_se_fue"});
			}
			if (guion.datos["sobrePeet"]!=true)
			{
				salida.escribir({tipo:"seleccion",cadena:funcionesDeSalida.obtener_lista("peet-el-macarra-titulo"),"evento":"recordar_peet"});
			}			
			/******************************************************/
			salida.escribir({tipo:"orden_interna",cadena:"esperar_seleccion"});
			guion.datos["mostrarRecuerdos"]=false;
		}
	};



	this.recordar=function(recuerdo,encender,apagar)
	{
		
		salida.escribir_en_lote(funcionesDeSalida.obtener_lista(recuerdo));
		salida.escribir({tipo:"seleccion",cadena:"terminar recuerdo",evento:"terminar_recuerdo"});
		salida.escribir({tipo:"orden_interna",cadena:"esperar_seleccion"});
		salida.escribir({tipo:"orden_interna",cadena:["borrar_textos"]});
		for (recu in encender)
		{
			console.log(encender[recu])
			guion.datos[encender[recu]]=false;
		}
		for (recu in apagar)
		{
			guion.datos[apagar[recu]]=true;
		}
	}



	this.finalizar=function()
	{
		eventos.event={};
		eventos.eliminar_intervalo("tiempoImpactoObstaculo");
		eventos.intervalos={};
		aTiempo=guion.datos["llegasATiempo"];
		guion.datos={};
		if (guion.secuenciaActual.etiquetaObstaculo.parentNode!=null)
		{
			guion.secuenciaActual.etiquetaObstaculo.parentNode.removeChild(guion.secuenciaActual.etiquetaObstaculo);
		}
		eventos.eliminar_intervalo("tiempoImpactoObstaculo");

		guion.secuenciaActual.baseContador.parentNode.removeChild(guion.secuenciaActual.baseContador);
		document.getElementById("ideUsuario").style.height="100%";
		buclePrincipal.ideUsuario.esperarPulsarMas=false;
		if (aTiempo)
		{
			salida.escribir_en_lote(funcionesDeSalida.obtener_lista("llegas-a-tiempo"));
			guion.datos["llegasTarde"]=true;
		}
		else
		{
			salida.escribir_en_lote(funcionesDeSalida.obtener_lista("llegas-tarde"));
			guion.datos["llegasTarde"]=false;
		}
		contenido.cargar_archivo_de_texto("textosLimpiandoEnElCerdito",false,function()
		{
			contenido.actores[guion.actorPrincipal].esta="elCerditoLineaDeCajas";
			contenido.objetos["bicicletaGarajeObj"].esta="elCerditoFrenteALaEntradaCrt";
			guion.secuencias["LimpiandoEnElCerdito"].secuenciaInicial=true;
			contenido.cargar_nuevo_mapa("elCerdito.json",true,null);
		});
	};
}
SecuenciaAlTrabajoEnBicicleta.prototype = Object.create(Secuencia.prototype);
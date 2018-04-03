SecuenciaAlTrabajoEnBicicleta=function()
{
	Secuencia.call(this,"Acto Primero","Al trabajo en bicicleta","","AlTrabajoEnBicicleta",false);
	
	this.presentacion=function()
	{
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		var presentacionA=funcionesDeSalida.obtener_lista("Introduccion-secuencia-otra-vez-tarde-a");
		var presentacionB=funcionesDeSalida.obtener_lista("Introduccion-secuencia-otra-vez-tarde-b");
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:presentacionA});
		salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
		salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:presentacionB});
		salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
		salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
	}

	this.iniciar=function()
	{
		this.datos["indiceCanal"]=1;
		this.datos["teleEncendida"]=true;
		this.datos["descripcionTeleEncendida"]="Mapa-casa-brady-salon-inferior-descripcion";
		this.datos["tienePilas"]=false;
		this.datos["portonAbierto"]=false;
		this.datos["cablesUnidos"]=false;
		this.datos["segundosParaExplosion"]=0;

		this.datos["fogonSueltaGas"]=false;
		this.datos["fogonEstaPrendido"]=false;
		this.datos["petardoEncendido"]=false;

		contenido.objetos["bateriaGarajeObj"].usar="casa-brady-usa-bateria";
		contenido.objetos["bajoGarajeObj"].usar="casa-brady-usa-bajo";
		contenido.objetos["guitarraGarajeObj"].usar="casa-brady-usa-guitarra";
		contenido.objetos["tecladosGarajeObj"].usar="casa-brady-usa-teclado";
		contenido.objetos["tecladosGarajeObj"].encender="casa-brady-encender-teclado";
		contenido.objetos["tecladosGarajeObj"].apagar="casa-brady-apagar-teclado";

		contenido.objetos["bajoGarajeObj"].coger="casa-brady-coger-bajo";
		contenido.objetos["guitarraGarajeObj"].coger="casa-brady-coger-guitarra";
		contenido.objetos["tecladosGarajeObj"].coger="casa-brady-coger-teclado";

		contenido.objetos["ventiladorDeManoSalonInferiorObj"].encender="casa-brady-encender-usar-ventilador";
		contenido.objetos["ventiladorDeManoSalonInferiorObj"].apagar="casa-brady-apagar-ventilador";
		contenido.objetos["ventiladorDeManoSalonInferiorObj"].usar="casa-brady-encender-usar-ventilador";
		contenido.objetos["mesaMarmolSalonInferiorObj"].usar="casa-brady-usar-mesa-marmol";
		contenido.objetos["sofaSalonInferiorObj"].usar="casa-brady-usar-sofa";
		contenido.objetos["ventanasSalonInferiorObj"].abrir="casa-brady-abrir-ventanas";
		contenido.objetos["ventanasSalonInferiorObj"].cerrar="casa-brady-cerrar-ventanas";
		contenido.objetos["muebleEntradaSalonInferiorObj"].abrir="casa-brady-abrir-mueble";

		contenido.objetos["lataDeCervezaVaciaSalonInferiorObj"].usar="casa-brady-usar-lata";
		contenido.objetos["lataDeCervezaVaciaSalonInferiorObj"].coger="casa-brady-coger-lata";
		contenido.objetos["restosDePizzaSalonInferiorObj"].usar="casa-brady-usar-pizza";
		contenido.objetos["restosDePizzaSalonInferiorObj"].coger="casa-brady-usar-pizza";
		contenido.objetos["controlRemotoTelevisorSalonInferiorObj"].coger="casa-brady-coger-mando";
		contenido.objetos["controlRemotoTelevisorSalonInferiorObj"].abrir="casa-brady-abrir-control-tele";
		contenido.objetos["controlRemotoTelevisorSalonInferiorObj"].cerrar="casa-brady-el-control-esta-cerrado";

		contenido.objetos["movilBradyObj"].usar="casa-brady-usar-movil";
		contenido.objetos["movilBradyObj"].dejar="casa-brady-dejar-movil";
		contenido.objetos["llavesBradyObj"].usar="casa-brady-usar-llaves";
		contenido.objetos["llavesBradyObj"].abrir="casa-brady-usar-llaves";
		contenido.objetos["llavesBradyObj"].cerrar ="casa-brady-usar-llaves";
		contenido.objetos["llavesBradyObj"].dejar="casa-brady-dejar-llaves";
		contenido.objetos["pilasBradyObj"].dejar="casa-brady-dejar-pilas";
		contenido.objetos["mandoGarajeSalonInferiorObj"].abrir="abres-mando-no-tiene-pilas";
		contenido.objetos["mandoGarajeSalonInferiorObj"].cerrar="casa-brady-el-mando-esta-cerrado";
		contenido.objetos["ventiladorDeManoSalonInferiorObj"].cerrar="casa-brady-el-control-esta-cerrado";
		contenido.objetos["calaveraSalonSuperiorObj"].coger="casa-brady-no-romper-calavera";
		contenido.objetos["calaveraSalonSuperiorObj"].usar="casa-brady-usar-calavera";
		contenido.objetos["frigorificoCocinaObj"].abrir="casa-brady-abrir-frigorifico";
		contenido.objetos["frigorificoCocinaObj"].cerrar="casa-brady-el-control-esta-cerrado";
		contenido.objetos["microondasCocinaObj"].abrir="casa-brady-abrir-microondas";
		contenido.objetos["microondasCocinaObj"].cerrar="casa-brady-el-control-esta-cerrado";

		contenido.objetos["televisionSalonInferiorObj"].encender="encender_apagar_televisor";
		contenido.objetos["televisionSalonInferiorObj"].apagar="encender_apagar_televisor";
		contenido.objetos["televisionSalonInferiorObj"].usar="casa-brady-usar-television";
		contenido.objetos["controlRemotoTelevisorSalonInferiorObj"].usar="usar_el_mando_de_la_tele";
		contenido.objetos["ventiladorDeManoSalonInferiorObj"].abrir="encontrar_pilas";
		contenido.objetos["mandoGarajeSalonInferiorObj"].usar="usar_mando_garaje";
		contenido.objetos["llavesBradyObj"].coger="coger_llaves_desbloquear_entrada";
		contenido.objetos["CajonSalonInferiorObj"].usar="abrir_cajon_de_mueble_salon";
		contenido.objetos["cablesJardinObj"].usar="usar_cinta_con_cables";
		contenido.objetos["panelJardinObj"].usar="usar_panel_apertura_porton";

		contenido.objetos["sofaSalonInferiorObj"].mirar="encontrar_petardo";
		contenido.objetos["fogonesCocinaObj"].usar="usar_fogon";
		contenido.objetos["fogonesCocinaObj"].encender="fogon_suelta_gas";
		contenido.objetos["fogonesCocinaObj"].apagar="apagar_fogon";
		contenido.objetos["petardoBradyObj"].dejar="dejar_petardo";
		
		contenido.objetos["bicicletaGarajeObj"].usar="usar_bicicleta";

		contenido.escenarios["CasaBradyJardinEsc"].despues_de_contenido="evento_abrir_porton";

		/*EVENTOS DE LA SECUENCIA*/

		eventos.event.evento_abrir_porton=function()
		{
			if (guion.secuenciaActual.datos["eventoAbrirPorton"])
			{
				guion.secuenciaActual.datos["portonAbierto"]=true;
				guion.escenarioActual.conexiones["entrar"].bloqueada=false;
				salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-el-petardo-rebienta-porton")});
				guion.secuenciaActual.datos["eventoAbrirPorton"]=false;
			}
		}

		eventos.event.dejar_petardo=function(verbo,objetosO,objetosP,preposicion)
		{
			if (contenido.objetos["petardoBradyObj"].esta=="bradyAct")
			{
				contenido.actores["bradyAct"].bolsillo.quitar_objeto(contenido.objetos["petardoBradyObj"]);
				guion.escenarioActual.insertar_objeto(contenido.objetos["petardoBradyObj"]);

				if (guion.escenarioActual.clave=="CasaBradyJardinEsc")
				{
					if ((guion.secuenciaActual.datos["petardoEncendido"])&&(guion.secuenciaActual.datos["portonAbierto"]!=true))
					{
						return funcionesDeSalida.obtener_lista("casa-brady-dejas-el-petardo-en-el-jardín");	
					}
					
				}

				return funcionesDeSalida.obtener_lista("casa-brady-dejas-el-petardo-en")+" "+funcionesDeSalida.obtener_lista(guion.escenarioActual.nombre);
				
			}
		}
		eventos.event.usar_fogon=function(verbo,objetosO,objetosP,preposicion)
		{
			if(objetosO[0].clave=="fogonesCocinaObj")
			{
				return funcionesDeSalida.obtener_lista("casa-brady-salon-no-quiero-manipular-el-fogon");
			}
			if(objetosO[0].clave=="encendedorCocinaObj")
			{
				if (objetosO[0].esta=="bradyAct")
				{
					if (guion.secuenciaActual.datos["fogonEstaPrendido"])
					{
						return funcionesDeSalida.obtener_lista("casa-brady-fogon-esta-prendido");
					}
					else if (guion.secuenciaActual.datos["fogonSueltaGas"]!=true)
					{
						return funcionesDeSalida.obtener_lista("casa-brady-el-fogon-esta-apagado");
					}
					guion.secuenciaActual.datos["fogonEstaPrendido"]=true;
					return funcionesDeSalida.obtener_lista("casa-brady-prendes-el-fogon");
				}
				else
				{

					return funcionesDeSalida.obtener_lista("casa-brady-no-tienes-encendedor");
				}
			}
			if(objetosO[0].clave=="petardoBradyObj")
			{
				if (objetosO[0].esta=="bradyAct")
				{
					if (guion.secuenciaActual.datos["fogonEstaPrendido"])
					{
						guion.secuenciaActual.datos["petardoEncendido"]=true;
						
						eventos.crear_intervalo("mechaSeConsume",function()
						{
							guion.secuenciaActual.datos["segundosParaExplosion"]+=1;
							if (guion.secuenciaActual.datos["segundosParaExplosion"]>=20)
							{
								eventos.eliminar_intervalo("mechaSeConsume");
								contenido.objetos["petardoBradyObj"].visible=false;
								if (contenido.objetos["petardoBradyObj"].esta=="bradyAct")
								{
									if ((guion.escenarioActual.clave=="CasaBradyJardinEsc")&&(guion.secuenciaActual.datos["portonAbierto"]!=true))
									{
										salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-lanzas-petardo-contra-porton"),tiempo:1000});
									}
									else
									{
										dejasEn=funcionesDeSalida.obtener_lista("casa-brady-dejas-el-petardo-en")+" "+funcionesDeSalida.obtener_lista(guion.escenarioActual.nombre)+" "+funcionesDeSalida.obtener_lista("casa-brady-antes-de-que-estalle")
										salida.escribir({tipo:"descripcion_escenario",cadena:dejasEn,tiempo:1000});
									}

								}
								salida.escribir({tipo:"descripcion_escenario",cadena:"¡BOOOM!",tamaFuente:"2rem",alinear:"center",tiempo:"2000"});
								if ((guion.escenarioActual.clave=="CasaBradyJardinEsc")&&(guion.secuenciaActual.datos["portonAbierto"]!=true))	
								{
									
									guion.secuenciaActual.datos["portonAbierto"]=true;
									guion.escenarioActual.conexiones["entrar"].bloqueada=false;
									salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-el-petardo-rebienta-porton")});
									return;	
								}
								else if((contenido.objetos["petardoBradyObj"].esta=="CasaBradyJardinEsc")&&(guion.secuenciaActual.datos["portonAbierto"]!=true))
								{
									guion.secuenciaActual.datos["eventoAbrirPorton"]=true;
								}

								cuarto=contenido.escenarios[contenido.objetos["petardoBradyObj"].esta];
								var pertadoEsta="";
								if (cuarto==null)
								{
									petardoEsta=funcionesDeSalida.obtener_lista(guion.escenarioActual.nombre);
								}
								else
								{
									petardoEsta=funcionesDeSalida.obtener_lista(cuarto.nombre);
								}

								explotaEn=funcionesDeSalida.obtener_lista("casa-brady-explota-en")+" "+petardoEsta;
								salida.escribir({tipo:"descripcion_escenario",cadena:explotaEn,tiempo:1000});;
							}
						},1000,false);
						return funcionesDeSalida.obtener_lista("casa-brady-prender-petardo");
					}
					return funcionesDeSalida.obtener_lista("casa-brady-fogon-no-tiene-llama");
					
				}
				else
				{
					return funcionesDeSalida.obtener_lista("casa-brady-no-tienes-el-petardo");
				}
			}
			
			artB=objetosO[0].obtener_articulo_personal();
			return funcionesDeSalida.obtener_lista("casa-brady-no-quieres-quemar")+" "+artB+" "+objetosO[0].nombre;
		}

		eventos.event.apagar_fogon=function(verbo,objetosO,objetosP,preposicion)
		{
			if ((guion.secuenciaActual.datos["fogonEstaPrendido"])||(guion.secuenciaActual.datos["fogonSueltaGas"]))
			{
				guion.secuenciaActual.datos["fogonSueltaGas"]=false;
				guion.secuenciaActual.datos["fogonEstaPrendido"]=false;
				guion.escenarioActual.conexiones["salir"].bloqueada=false;
				return funcionesDeSalida.obtener_lista("casa-brady-apagas-fogon");
			}
			else
			{
				return funcionesDeSalida.obtener_lista("casa-brady-el-fogon-esta-apagado");
			}
		}

		eventos.event.fogon_suelta_gas=function(verbo,objetosO,objetosP,preposicion)
		{
			
			//this.datos["fogonEstaPrendido"]=false;
			//this.datos["petardoEncendido"]=false;
			if (guion.secuenciaActual.datos["fogonEstaPrendido"])
			{
				return funcionesDeSalida.obtener_lista("casa-brady-fogon-esta-prendido");
			}
			if (guion.secuenciaActual.datos["fogonSueltaGas"])
			{
				return funcionesDeSalida.obtener_lista("casa-brady-fogon-suelta-gas");
			}
			else
			{
				guion.secuenciaActual.datos["fogonSueltaGas"]=true;
				guion.escenarioActual.conexiones["salir"].bloqueada=true;
				return funcionesDeSalida.obtener_lista("casa-brady-giras-ruleta");
			}
		}

		eventos.event.encontrar_petardo=function(verbo,objetosO,objetosP,preposicion)
		{

			if (verbo.valor=="mirar")
			{
				return funcionesDeSalida.obtener_lista(contenido.objetos["sofaSalonInferiorObj"].descripcion);
			}
			contenido.objetos["petardoBradyObj"].visto=true;
			contenido.objetos["sofaSalonInferiorObj"].mirar=null;
			return funcionesDeSalida.obtener_lista("casa-brady-rebuscas-entre-los-cojines");
		}

		/*EVENTOS DE LA SECUENCIA*/
		eventos.event.encontrar_pilas=function(verbo,objetosO,objetosP,preposicion)
		{
			if (contenido.objetos["ventiladorDeManoSalonInferiorObj"].esta=="bradyAct")
			{
				contenido.objetos["pilasBradyObj"].visible=true;
				eventos.eliminar_evento("encontrar_pilas");
				contenido.objetos["ventiladorDeManoSalonInferiorObj"].abrir="casa-brady-ventilador-abrir-sin-pilas";	
				contenido.objetos["ventiladorDeManoSalonInferiorObj"].encender="casa-brady-ventilador-encender-sin-pilas";
				contenido.objetos["ventiladorDeManoSalonInferiorObj"].usar="casa-brady-ventilador-encender-sin-pilas";

				return funcionesDeSalida.obtener_lista("casa-brady-ventilador-abrir");
			}
			else
			{
				return funcionesDeSalida.obtener_lista("casa-brady-ventilador-abrir-sin-tener");
			}
		}


		eventos.event.abrir_cajon_de_mueble_salon=function(verbo,objetosO,objetosP,preposicion)
		{
			if(objetosO[0].clave=="CajonSalonInferiorObj")
			{
				return funcionesDeSalida.obtener_lista("casa-brady-salon-inferior-que-quieres-hacer-con-cajon");
			}
			if(objetosO[0].clave=="llavesBradyObj")
			{
				if (objetosO[0].esta=="bradyAct")
				{
					if (contenido.objetos["CajonSalonInferiorObj"].abrirOcerrar[0]==true)
					{
						return "casa-brady-salon-inferior-cerrojo-abierto";
					}
					contenido.objetos["CajonSalonInferiorObj"].abrirOcerrar=[true,true];

					return funcionesDeSalida.obtener_lista("casa-brady-salon-inferior-una-de-las-llaves");
				}
				else
				{
					return funcionesDeSalida.obtener_lista("casa-brady-salon-inferior-no-tienes-llaves-de-cajon");
				}
				
			}
			art=objetosP[0].obtener_articulo_personal();
			artB=objetosO[0].obtener_articulo_personal();
			return art+" "+objetosP[0].nombre+" "+funcionesDeSalida.obtener_lista("casa-brady-salon-inferior-cajon-no-se-abre-con")+" "+artB+" "+objetosO[0].nombre;	
		}

		eventos.event.usar_cinta_con_cables=function(verbo,objetosO,objetosP,preposicion)
		{
			if(objetosO[0].clave=="cablesJardinObj")
			{
				return funcionesDeSalida.obtener_lista("casa-brady-jardin-usar-cables-sin-mas");
			}
			if (contenido.objetos["panelJardinObj"].abiertoOcerrado=="cerrado")
			{
				return funcionesDeSalida.obtener_lista("casa-brady-jardin-cierra-el-panel-esta-cerrado");
			}
			if(objetosO[0].clave=="cintaAislanteBradyObj")
			{
				if (objetosO[0].esta=="bradyAct")
				{
					if (guion.secuenciaActual.datos["cablesUnidos"])
					{
						return funcionesDeSalida.obtener_lista("casa-brady-jardin-el-porton-abierto");
					}
					objetosO[0].visible=false;
					guion.secuenciaActual.datos["cablesUnidos"]=true;
					contenido.objetos["cablesJardinObj"].descripcion="casa-brady-los-cables-estan-perfectos";
					contenido.objetos["cablesJardinObj"].adjetivos=[];
					return funcionesDeSalida.obtener_lista("casa-brady-jardin-unes-los-cables");
				}
				else
				{
					return funcionesDeSalida.obtener_lista("casa-brady-jardin-usar-cinta-sin-cinta");
				}
			}
			art=objetosP[0].obtener_articulo_personal();
			artB=objetosO[0].obtener_articulo_personal();
			return art+" "+objetosP[0].nombre+" "+funcionesDeSalida.obtener_lista("casa-brady-jardin-los-cables-no-se-unen-con")+" "+artB+" "+objetosO[0].nombre;
			
		}

		eventos.event.usar_panel_apertura_porton=function(verbo,objetosO,objetosP,preposicion)
		{
			if (guion.secuenciaActual.datos["portonAbierto"])
			{
				return funcionesDeSalida.obtener_lista("casa-brady-jardin-el-porton-abierto");
			}
			else if (contenido.objetos["panelJardinObj"].abiertoOcerrado=="abierto")
			{
				return funcionesDeSalida.obtener_lista("casa-brady-jardin-cierra-el-panel-antes-de-usar");
			}
			else if (guion.secuenciaActual.datos["cablesUnidos"])
			{
				guion.escenarioActual.conexiones["entrar"].bloqueada=false;
				guion.secuenciaActual.datos["portonAbierto"]=true;
				return funcionesDeSalida.obtener_lista("casa-brady-jardin-abres-porton-con-panel");
			}
			else
			{
				return funcionesDeSalida.obtener_lista("casa-brady-jardin-pulsa-boton-pero-nada");
			}

		}
		
		eventos.event.usar_mando_garaje=function(verbo,objetosO,objetosP,preposicion)
		{

			if (objetosO[0].clave=="mandoGarajeSalonInferiorObj")
			{
				if (objetosO[0].esta!="bradyAct")
				{
					return funcionesDeSalida.obtener_lista("casa-brady-el-mando-no-lo-tienes");
				}
				if (guion.secuenciaActual.datos["portonAbierto"])
				{
					return funcionesDeSalida.obtener_lista("casa-brady-jardin-el-porton-abierto");
				}
				if (guion.secuenciaActual.datos["tienePilas"])
				{
					var prota=contenido.actores[guion.actorPrincipal];
					if (prota.esta=="CasaBradyJardinEsc")
					{
						guion.escenarioActual.conexiones["entrar"].bloqueada=false;
						guion.secuenciaActual.datos["portonAbierto"]=true;
						eventos.eliminar_evento("usar_mando_garaje");
						contenido.objetos["mandoGarajeSalonInferiorObj"].usar="casa-brady-el-mando-no-usar-mas";
						return funcionesDeSalida.obtener_lista("casa-brady-el-mando-abre-garaje");
					}
					else
					{
						return funcionesDeSalida.obtener_lista("casa-brady-el-mando-no-pasa-nada");
					}
				}
				else
				{
					return funcionesDeSalida.obtener_lista("casa-brady-el-mando-no-tiene-pilas");
				}
			}
			if (objetosP[0].clave=="mandoGarajeSalonInferiorObj")
			{
				if (objetosP[0].esta!="bradyAct")
				{
					return funcionesDeSalida.obtener_lista("casa-brady-el-mando-no-lo-tienes");
				}
			}
			if (objetosO[0].esta=="bradyAct")
			{
				if(objetosO[0].clave=="pilasBradyObj")
				{
					if (objetosP[0].clave=="mandoGarajeSalonInferiorObj")
					{
						if (objetosP[0].esta!="bradyAct")
						{
							return funcionesDeSalida.obtener_lista("casa-brady-el-mando-no-lo-tienes");
						}
						objetosO[0].visible=false;
						guion.secuenciaActual.datos["tienePilas"]=true;
						objetosP[0].abrir="casa-brady-el-mando-tiene-pilas";
						return funcionesDeSalida.obtener_lista("casa-brady-el-mando-poner-pilas-en-mando");
					}
					else
					{
						return funcionesDeSalida.obtener_lista("casa-brady-el-mando-malgastar-pilas");
					}
				}
				else
				{
					art=objetosP[0].obtener_articulo_personal();
					artB=objetosO[0].obtener_articulo_personal();
					return art+" "+objetosP[0].nombre+" "+funcionesDeSalida.obtener_lista("mensaje-no-necesita")+" "+artB+" "+objetosO[0].nombre;
				}
			}
			else
			{
				art=objetosO[0].obtener_articulo_personal();
				return funcionesDeSalida.obtener_lista("mensaje-no-tengo")+art+" "+objetosO[0].nombre;
			}
			return "@no_cadena";
		}

		eventos.event.coger_llaves_desbloquear_entrada=function(verbo,objetosO,objetosP,preposicion)
		{
			contenido.objetos["muebleEntradaSalonInferiorObj"].bolsillo.quitar_objeto(contenido.objetos["llavesBradyObj"]);
			contenido.actores["bradyAct"].bolsillo.insertar_objeto(contenido.objetos["llavesBradyObj"]);
			guion.escenarioActual.conexiones["Sur"].bloqueada=false;
			eventos.eliminar_evento("coger_llaves_desbloquear_entrada");
			contenido.objetos["llavesBradyObj"].coger="casa-brady-ya-tienes-llaves";
			return funcionesDeSalida.obtener_lista("casa-brady-coger-llaves");
		}

		eventos.event.usar_bicicleta=function(verbo,objetosO,objetosP,preposicion)
		{
			gestionPartidas.guardar_partida();
			salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
			salida.escribir({tipo:"descripcion_escenario",clases:"fundido_entrada",cadena:funcionesDeSalida.obtener_lista("casa-brady-usar-bicicleta")});
			salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
			salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
			eventos.eliminar_evento("usar_bicicleta");
			guion.secuenciaActual.terminarSecuencia=true;
			gestionPartidas.guardarEnTurno=false;
			return "@no_cadena";

		}


		eventos.event.encender_apagar_televisor=function(verbo,objetosO,objetosP,preposicion)
		{
			if ((guion.secuenciaActual.datos["teleEncendida"])&&(verbo.valor=="apagar"))
			{
				guion.secuenciaActual.datos["teleEncendida"]=false;
				guion.secuenciaActual.datos["descripcionTeleEncendida"]=contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion;
				contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion-sin-tele";
				return funcionesDeSalida.obtener_lista("casa-brady-apagar-television");
			}
			else if ((guion.secuenciaActual.datos["teleEncendida"])&&(verbo.valor=="encender"))
			{
				return funcionesDeSalida.obtener_lista("casa-brady-encender-television-si-encendida");
			}
			else if ((guion.secuenciaActual.datos["teleEncendida"]!=true)&&(verbo.valor=="encender"))
			{
				guion.secuenciaActual.datos["teleEncendida"]=true;
				contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion=guion.secuenciaActual.datos["descripcionTeleEncendida"];
				return funcionesDeSalida.obtener_lista("casa-brady-encender-television");
			}
			else if ((guion.secuenciaActual.datos["teleEncendida"]!=true)&&(verbo.valor=="apagar"))
			{
				return funcionesDeSalida.obtener_lista("casa-brady-apagar-television-si-apagada");
			}

		}

		eventos.event.encender_apagar_tele_desde_mando=function()
		{
			if((guion.secuenciaActual.datos["teleEncendida"]))
			{
				guion.secuenciaActual.datos["teleEncendida"]=false;
				guion.secuenciaActual.datos["descripcionTeleEncendida"]=contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion;
				contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion-sin-tele";
				salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-apagar-television")});
			}
			else
			{
				guion.secuenciaActual.datos["teleEncendida"]=true;
				contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion=guion.secuenciaActual.datos["descripcionTeleEncendida"];
				salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-encender-television")});
			}
		}

		eventos.event.cambiar_de_canal=function()
		{

			if (guion.secuenciaActual.datos["teleEncendida"])
			{
				guion.secuenciaActual.datos["indiceCanal"]+=1;
				if (guion.secuenciaActual.datos["indiceCanal"]>5)
				{
					guion.secuenciaActual.datos["indiceCanal"]=1;
				}

				if (guion.secuenciaActual.datos["indiceCanal"]==1)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-cambiar-canal-tele-a-canal-tienda")});
					contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion";
				}
				else if (guion.secuenciaActual.datos["indiceCanal"]==2)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-cambiar-canal-tele-a-canal-local")});
					contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion-canal-local";
				}
				else if (guion.secuenciaActual.datos["indiceCanal"]==3)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-cambiar-canal-tele-a-canal-musica")});
					contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion-canal-musica";
				}
				else if (guion.secuenciaActual.datos["indiceCanal"]==4)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-cambiar-canal-tele-a-canal-series")});
					contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion-canal-series";
				}
				else if (guion.secuenciaActual.datos["indiceCanal"]==5)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-cambiar-canal-tele-a-canal-peliculas")});
					contenido.escenarios["CasaBradySalonZonaInferiorEsc"].descripcion="Mapa-casa-brady-salon-inferior-descripcion-canal-peliculas";
				}
			}
			else
			{
				salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("casa-brady-apagar-television-si-apagada")});
			}

		}

		eventos.event.usar_el_mando_de_la_tele=function(verbo,objetosO,objetosP,preposicion)
		{
			salida.escribir_en_lote(funcionesDeSalida.obtener_lista("casa-brady-usar-mando-television"));
			
			return "@no_cadena";
		}


	}
	this.finalizar=function()
	{
		eventos.eliminar_evento("encender_apagar_televisor");
		eventos.eliminar_evento("encender_apagar_tele_desde_mando");
		eventos.eliminar_evento("cambiar_de_canal");
		eventos.eliminar_evento("usar_el_mando_de_la_tele");
		guion.secuenciaActual.datos=null;
		contenido.cargar_archivo_de_texto("textosSubiendoPorLaCarretera",false,function()
		{
			contenido.actores[guion.actorPrincipal].esta="carreteraBordeBosqueCrt";
			guion.secuencias["SubiendoPorLaCarretera"].secuenciaInicial=true;
			contenido.cargar_nuevo_mapa("carreteraDelBosque.json",true,null);
			
		});
	}
}
SecuenciaAlTrabajoEnBicicleta.prototype = Object.create(Secuencia.prototype);
SecuenciaLimpiandoEnElCerdito=function()
{
	Secuencia.call(this,"Acto Tercero","Limpiando en El Cerdito",null,"LimpiandoEnElCerdito",false);
	this.presentacion=function()
	{
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		
		if (guion.datos["llegasTarde"])
		{
			salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"laReunionEnElCerdito"});
		}
		else
		{
			salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"alTrabajoLlegasTarde"});
		}
		salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
	}
	this.iniciar=function()
	{
		guion.datos["lanzarFinalDeSecuencia"]=false;
		guion.secuenciaActual.agregar_textos_a_elementos("elCerditoestatuaConmemorativaExterior","el-cerdito-estatua-no-esta-aqui");
		guion.secuenciaActual.agregar_textos_a_elementos("elCerditofundadoresExterior","el-cerdito-fundadores-estan-muertos");
		
		if (guion.datos["llegasTarde"])
		{
			/*LO QUE OCURRE CUANDO BRADY LLEGA PRONTO*/
			guion.datos["trabajoTerminado"]=false;
			/*Hacemos aparecer los objetos que interesan*/
			contenido.objetos["elCerditoCajaDeHerramientasAlmacen"].visible=true;
			contenido.objetos["elCerditoPalancaAlmacen"].visible=true;
			contenido.objetos["elCerditoGuantesAlmacen"].visible=true;
			contenido.objetos["elCerditoCartelesEnrolladosObj"].visible=true;

			guion.datos["listaDeImpedimentos"]=["el-cerdito-no-deberia-tira-la-roca-a",
												"el-cerdito-no-deberia-tira-la-roca-b",
												"el-cerdito-no-deberia-tira-la-roca-c",
												"el-cerdito-no-deberia-tira-la-roca-d"
												],
			guion.datos["indiceTirarPiedra"]=0;									
			guion.datos["vitrinaAbierta"]=false;
			guion.datos["vitrinaDespegada"]=false;
			guion.datos["vitrinaRota"]=false;
			guion.datos["tengoRoca"]=false;
			guion.datos["llevasGuantes"]=false;
			guion.datos["cartelesPuestos"]=0;
			guion.datos["dialogoConNicholas"]=false;
			guion.datos["niñosCorren"]=false;

			/*ZONA DE EVENTOS*/
			contenido.escenarios["elCerditoFrenteALaEntradaCrt"].despues_de_contenido="niños_salen_corriendo";
			eventos.event.niños_salen_corriendo=function()
			{
				if (guion.datos["niñosCorren"]!=true)
				{
					corren=funcionesDeSalida.obtener_lista("el-cerdito-ninos-corren");
					console.log(corren)
					guion.datos["niñosCorren"]=true;
					salida.escribir({tipo:"descripcion_escenario",cadena:corren});
				}
				return true;
			}

			/*CONTROLAMOS CUANTOS CARTELES SE HAN PUESTO*/
			eventos.crear_intervalo("controlCarteles",function()
			{
				if (guion.datos["cartelesPuestos"]>=2)
				{
					contenido.objetos["elCerditoPalancaAlmacen"].visible=false;
					contenido.objetos["elCerditoGuantesAlmacen"].visible=false;
					contenido.objetos["elCerditoLlaveDeVitrinaGerente"].visible=false;
					contenido.objetos["rocaObj"].visible=false;

					eventos.eliminar_intervalo("controlCarteles");
					guion.secuenciaActual.terminar_trabajo();
				}
			},500,false);

			/*BRADY COLOCA LA LISTA DE PRECIOS EN EL CABALLETE*/
			contenido.objetos["elCerditoCaballetePinoExterior"].usar="colocar_lista_en_caballete";
			eventos.event.colocar_lista_en_caballete=function(verbo,objetosO,objetosP,preposicion)
			{
				if (objetosP.length<=0)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-caballete-sin-mas");
				}
				obj=objetosO[0];
				/*usas la lista con el caballete*/
				if (obj.clave=="listaDePrecioslObj")
				{
					contenido.objetos["listaDePrecioslObj"].visible=false;
					contenido.objetos["elCerditoCaballetePinoExterior"].descripcion="el-cerdito-caballete-descripcion-con-cartel";
					guion.datos["cartelesPuestos"]+=1;
					return funcionesDeSalida.obtener_lista("el-cerdito-colocas-la-lista-de-precios-en-caballete");

				}

				var artObj=obj.obtener_articulo_personal();
				var vitArt=contenido.objetos["elCerditoCaballetePinoExterior"].obtener_articulo_personal();
				return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-objeto-con")+artObj+" "+obj.nombre+" "+preposicion+" "+vitArt+" "+contenido.objetos["elCerditoVitrinaCristalExterior"].nombre;
				
			}
			/*BRADY RECOGE LOS CARTELES*/
			contenido.objetos["elCerditoCartelesEnrolladosObj"].coger="coger_carteles";
			eventos.event.coger_carteles=function(verbo,objetosO,objetosP,preposicion)
			{
				contenido.objetos["elCerditoCartelesEnrolladosObj"].visible=false;
				contenido.objetos["cartelPromocionalObj"].visible=true;
				contenido.objetos["listaDePrecioslObj"].visible=true;
				return funcionesDeSalida.obtener_lista("recoges-carteles-promocionales");
			}
			/*BRADY INTENTA RECOGER UNA ROCA DEL SUELO*/
			contenido.objetos["elCerditoMontonDeRocasExterior"].coger="coger_una_roca_en_el_cerdito";
			eventos.event.coger_una_roca_en_el_cerdito=function(verbo,objetosO,objetosP,preposicion)
			{
				if (guion.datos["tengoRoca"]!=true)
				{
					guion.datos["tengoRoca"]=true;
					contenido.objetos["rocaObj"].visible=true;
					return funcionesDeSalida.obtener_lista("el-cerdito-cojo-roca");
				}
				else
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-ya-tengo-roca");
				}
				
			}

			/*BRADY INTENTA ABRIR LA VITRINA*/
			contenido.objetos["elCerditoVitrinaCristalExterior"].abrir="abrir_vitrina_en_el_cerdito";
			eventos.event.abrir_vitrina_en_el_cerdito=function(verbo,objetosO,objetosP,preposicion)
			{
				if (guion.datos["vitrinaAbierta"] && guion.datos["vitrinaDespegada"])
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-abierta");
				}
				else if (guion.datos["vitrinaRota"])
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-esta-rota");
				}
				else if (guion.datos["vitrinaAbierta"]!=true)
				{
					guion.datos["dialogoConNicholas"]=true;
					return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-cerrada-con-llave");
				}
				else if (guion.datos["vitrinaDespegada"]!=true)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-sellada-con-pegamento");
				}

			}
			/*BRADY INTENTA HABLA CON NICHOLAS*/
			contenido.actores["nicholasAct"].hablar="pedir_la_llave_de_la_oficina";
			eventos.event.pedir_la_llave_de_la_oficina=function(verbo,objetosO,objetosP,preposicion)
			{
				if (guion.datos["dialogoConNicholas"])
				{
					guion.datos["dialogoConNicholas"]=false;
					contenido.objetos["elCerditoLlaveDeVitrinaGerente"].visible=true;
					salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"nicholasPedirLlavesOficina"});
					return "@no_cadena";
				}
				else
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-hablar-con-nicholas");
				}
			}

			/*BRADY SE PONE LOS GUANTES*/
			contenido.objetos["elCerditoGuantesAlmacen"].usar="colocarse_los_guantes";
			eventos.event.colocarse_los_guantes=function(verbo,objetosO,objetosP,preposicion)
			{
				if (contenido.actores[guion.actorPrincipal].esta=="elCerditoFrenteALaEntradaCrt")
				{
					if (guion.datos["vitrinaRota"])
					{
						guion.datos["llevasGuantes"]=true;
						contenido.objetos["elCerditoGuantesAlmacen"].visible=false;
						return funcionesDeSalida.obtener_lista("el-cerdito-mejor-ponerse-guante");
					}
					else
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-por-que-ponerse-guante");
					}
				}
				else
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-aqui-no-ponerse-guante");
				}
			}
			

			/*BRADY INTENTA MANIPULAR LA VITRINA*/
			contenido.objetos["elCerditoVitrinaCristalExterior"].usar="manipular_vitrina";
			eventos.event.manipular_vitrina=function(verbo,objetosO,objetosP,preposicion)
			{
				if (objetosP.length<=0)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-vitrina-sin-mas");
				}
				obj=objetosO[0];
				/*usas la llave con la vitrina*/
				if (obj.clave=="elCerditoLlaveDeVitrinaGerente")
				{
					if (guion.datos["vitrinaRota"])
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-esta-rota");
					}
					else if (guion.datos["vitrinaAbierta"] && guion.datos["vitrinaDespegada"])
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-abierta");
					}
					else if (guion.datos["vitrinaAbierta"])
					{
						return funcionesDeSalida.obtener_lista("el-cerrojo-esta-quitado");
					}
					guion.datos["vitrinaAbierta"]=true;
					return funcionesDeSalida.obtener_lista("el-cerdito-quitas-el-cerrojo-vitrina");
				}
				/*usas la palanca con la vitrina*/
				if (obj.clave=="elCerditoPalancaAlmacen")
				{
					if (guion.datos["vitrinaRota"])
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-esta-rota");
					}
					else if (guion.datos["vitrinaAbierta"] && guion.datos["vitrinaDespegada"])
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-abierta");
					}
					else if (guion.datos["vitrinaAbierta"]!=true)
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-puedo-hacer-palanca-pero-cerrojo-echado");
					}
					guion.datos["vitrinaDespegada"]=true;

					return funcionesDeSalida.obtener_lista("el-cerdito-haces-palanca-sobre-la-vitrina");
				}
				/*Usas el cartel con la vitrina*/
				if (obj.clave=="cartelPromocionalObj")
				{
					if (guion.datos["vitrinaRota"])
					{
						if (guion.datos["llevasGuantes"])
						{
							contenido.objetos["cartelPromocionalObj"].visible=false;
							contenido.objetos["elCerditoVitrinaCristalExterior"].descripcion="el-cerdito-vitrina-con-cartel-descripcion";
							guion.datos["cartelesPuestos"]+=1;
							return funcionesDeSalida.obtener_lista("el-cerdito-colocas-cartel-con-guantes");
						}
						else
						{
							return funcionesDeSalida.obtener_lista("el-cerdito-sin-proteccion-no-pongo-cartel");
						}
					}
					if (guion.datos["vitrinaAbierta"] && guion.datos["vitrinaDespegada"])
					{
						contenido.objetos["cartelPromocionalObj"].visible=false;
						contenido.objetos["elCerditoVitrinaCristalExterior"].descripcion="el-cerdito-vitrina-con-cartel-descripcion";
						guion.datos["cartelesPuestos"]+=1;
						return funcionesDeSalida.obtener_lista("el-cerdito-colocas-cartel-cuidado");
					}
					return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-cerrada-al-colocar-cartel");
				}
				var artObj=obj.obtener_articulo_personal();
				var vitArt=contenido.objetos["elCerditoVitrinaCristalExterior"].obtener_articulo_personal();
				return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-objeto-con")+artObj+" "+obj.nombre+" "+preposicion+" "+vitArt+" "+contenido.objetos["elCerditoVitrinaCristalExterior"].nombre;
			}

			/*BRADY INTENTA ROMPER LA VITRINA CON UNA ROCA*/
			contenido.objetos["elCerditoVitrinaCristalExterior"].tirar="romper_vitrina_en_el_cerdito";
			eventos.event.romper_vitrina_en_el_cerdito=function(verbo,objetosO,objetosP,preposicion)
			{
				if (objetosP.length<=0)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-tirar-vitrina");
				}
				var obj=null;
				if (guion.datos["vitrinaAbierta"] && guion.datos["vitrinaDespegada"])
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-abierta");
				}
				if (objetosO.length>0)
				{
					obj=objetosO[0];
				}
				if (obj.clave!="rocaObj")
				{
					var artObj=obj.obtener_articulo_personal();
					var vitArt=contenido.objetos["elCerditoVitrinaCristalExterior"].obtener_articulo_personal();
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-tirar-objeto-contra")+artObj+" "+obj.nombre+" "+preposicion+" "+vitArt+" "+contenido.objetos["elCerditoVitrinaCristalExterior"].nombre;
				}
				else
				{
					if (guion.datos["indiceTirarPiedra"]<=3)
					{
						i=guion.datos["indiceTirarPiedra"];
						guion.datos["indiceTirarPiedra"]+=1;
						return funcionesDeSalida.obtener_lista(guion.datos["listaDeImpedimentos"][i]);
					}
					else
					{
						if (guion.datos["vitrinaRota"]!=true)
						{
							guion.datos["vitrinaRota"]=true;
							guion.datos["tengoRoca"]=false;
							contenido.objetos["rocaObj"].visible=false;
							salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
							salida.escribir({tipo:"bradyAct",
											clases:"fundido_entrada",
											tiempo:2000,
											cadena:funcionesDeSalida.obtener_lista("el-cerdito-vale-ya-tiro-la-roca")});

							salida.escribir({tipo:"descripcion_escenario",
											clases:"fundido_entrada",
											tiempo:2000,
											cadena:funcionesDeSalida.obtener_lista("el-cerdito-tiras-roca-a")});
							
							salida.escribir({tipo:"descripcion_escenario",
											clases:"fundido_entrada",
											tiempo:1000,
											alinear:"center",
											tamaFuente:"2rem",
											cadena:funcionesDeSalida.obtener_lista("el-cerdito-tiras-roca-b")});

							salida.escribir({tipo:"descripcion_escenario",
											clases:"fundido_entrada",
											tiempo:1000,
											cadena:funcionesDeSalida.obtener_lista("el-cerdito-tiras-roca-c")});
							salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
							salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"nicholasSeSorprendePorElRuido"});
						}	
						else
						{
							return funcionesDeSalida.obtener_lista("el-cerdito-vitrina-ya-esta-rota");
						}
						return "@no_cadena";
					}
				}
			}
		}
		else
		{
			/*LO QUE OCURRE CUANDO BRADY LLEGA TARDE*/
			contenido.objetos["elCerditoMangoPasilloAObj"].visible=true;
			contenido.objetos["elCerditoCajaPasilloDObj"].visible=true;
			contenido.objetos["elCerditoIslasMuebleRefrigeradoCongeladosObj"].visible=true;
			contenido.objetos["elCerditoQuesoCongeladosObj"].visible=true;
			contenido.objetos["elCerditoPuertaRetrete"].visible=true;
			contenido.objetos["elCerditoPalancaAlmacen"].visible=true;
			contenido.objetos["elCerditoRatoneraAlmacen"].visible=true;
			contenido.objetos["elCerditoExpositorDeCartonPasilloCObj"].visible=true;
			contenido.objetos["elCerditoRolloDeCuerdaPasilloCObj"].visible=true;
			contenido.objetos["elCerditoDesatascadorRetrete"].visible=true;
			contenido.objetos["elCerditoMontonDeRocasExterior"].visible=false;

			contenido.objetos["elCerditoCajaDeHerramientasAlmacen"].bolsillo.quitar_objeto(contenido.objetos["elCerditoPalancaAlmacen"]);
			contenido.objetos["elCerditoEstanteriasAlmacen"].bolsillo.insertar_objeto(contenido.objetos["elCerditoPalancaAlmacen"]);
			
			contenido.escenarios["elCerditoLineaDeCajasCrt"].conexiones["Sur"].bloqueada=true;
			contenido.escenarios["elCerditoLineaDeCajasCrt"].conexiones["Sur"].textoBloqueada="las-puertas-estan-cerradas";

			guion.datos["rataAtascada"]=false;
			guion.datos["tiempoParaComerQueso"]=0;
			guion.datos["paloEnTrampa"]=false;
			guion.datos["quesoEnTrampa"]=false;
			guion.datos["cuerdaEnTrampa"]=false;
			guion.datos["trampaLista"]=false;
			guion.datos["cogerCuerdaPalo"]=false;
			guion.datos["hablarABrenda"]=false;
			guion.datos["hablarAKevin"]=false;




			/*ZONA DE EVENTOS*/
			contenido.escenarios["elCerditoPasilloACrt"].despues_de_contenido="kevin_canta";
			eventos.event.kevin_canta=function()
			{
				if (guion.datos["cogerCuerdaPalo"]!=true)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("el-cerdito-kevin-canta-enamorado")});
					salida.escribir({tipo:"kevinAct",cadena:funcionesDeSalida.obtener_lista("el-cerdito-ooo-brenda-te-quiero")});
				}
			}
			contenido.escenarios["elCerditoPasilloBCrt"].despues_de_contenido="nicholas_se_queja";
			eventos.event.nicholas_se_queja=function()
			{
				if (guion.datos["cogerCuerdaPalo"]!=true)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("el-cerdito-nicholas-sequeja")});
					salida.escribir({tipo:"kevinAct",cadena:funcionesDeSalida.obtener_lista("el-cerdito-no-puedo-con-esos-dos")});
				}
				else
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("el-cerdito-nicholas-respira-tranquilo")});
					salida.escribir({tipo:"kevinAct",cadena:funcionesDeSalida.obtener_lista("el-cerdito-que-paz-dice-nicholas")});
				}
			}
			contenido.escenarios["elCerditoPasilloCCrt"].despues_de_contenido="brenda_llora";
			eventos.event.brenda_llora=function()
			{
				if (guion.datos["cogerCuerdaPalo"]!=true)
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("el-cerdito-brenda-llora")});
					salida.escribir({tipo:"kevinAct",cadena:funcionesDeSalida.obtener_lista("el-cerdito-seguro-que-me-engaña")});
				}
				else
				{
					salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("el-cerdito-brenda-kevin-acaramelados")});
				}
			}

			eventos.event.tengo_que_conseguir_cita=function()
			{
				guion.datos["hablarABrenda"]=true;
				salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
			}
			eventos.event.ya_tengo_casi_la_cita=function()
			{
				guion.datos["hablarAKevin"]=true;
				salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
			}
			/*BRADY HABLA CON KEVIN*/
			contenido.actores["kevinAct"].hablar="ya_tienes_tu_cita_kevin"
			eventos.event.ya_tienes_tu_cita_kevin=function(verbo,objetosO,objetosP,preposicion)
			{
				console.log("hablo a kevin")
				if ((guion.datos["hablarAKevin"]!=true)&&(guion.datos["hablarABrenda"]!=true))
				{
					console.log("no se")
					return funcionesDeSalida.obtener_lista("el-cerdito-no-se-que-decirle");
				}
				else if((guion.datos["hablarABrenda"])&&(guion.datos["hablarAKevin"]!=true))
				{
					console.log("hablar_brenda")
					return funcionesDeSalida.obtener_lista("el-cerdito-deberia-hablar-con-brenda");
				}
				guion.datos["cogerCuerdaPalo"]=true;
				contenido.escenarios["elCerditoPasilloACrt"].quitar_actor(contenido.actores["kevinAct"]);
				contenido.escenarios["elCerditoPasilloCCrt"].insertar_actor(contenido.actores["kevinAct"]);
				contenido.actores["kevinAct"].hablar="el-cerdito-no-quiero-entrometerme";
				contenido.actores["brendaAct"].hablar="el-cerdito-no-quiero-entrometerme";
				salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"hablarAKevin"});
				return "@no_cadena";
				
			}
			/*BRADY INTENTA HABLAR CON BRENDA*/
			contenido.actores["brendaAct"].hablar="quieres_cita_con_kevin";
			eventos.event.quieres_cita_con_kevin=function(verbo,objetosO,objetosP,preposicion)
			{
				if (guion.datos["hablarABrenda"])
				{
					if (guion.datos["hablarAKevin"]!=true)
					{
						salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"hablarABrenda"});
					}
					else
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-tengo-que-hablar-con-kevin");
					}
				}
				else
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-se-que-decirla");
				}
			}
			/*BRADY INTENTA COGER LA CUERDA*/
			contenido.objetos["elCerditoRolloDeCuerdaPasilloCObj"].coger="coger_cuerda_del_expositor"
			eventos.event.coger_cuerda_del_expositor=function(verbo,objetosO,objetosP,preposicion)
			{
				if (guion.datos["cogerCuerdaPalo"]!=true)
				{
					salida.escribir({tipo:"brendaAct",cadena:funcionesDeSalida.obtener_lista("el-cerdito-acaso-eres-ladron")});
					return funcionesDeSalida.obtener_lista("el-cerdito-brenda-no-deja-llevar-cuerda");
				}
				if (contenido.objetos["elCerditoRolloDeCuerdaPasilloCObj"].esta=="bradyAct")
				{
					return "el-cerdito-ya-tengo-cuerda";
				}
				contenido.objetos["elCerditoExpositorDeCartonPasilloCObj"].bolsillo.quitar_objeto(contenido.objetos["elCerditoRolloDeCuerdaPasilloCObj"]);
				contenido.actores["bradyAct"].bolsillo.insertar_objeto(contenido.objetos["elCerditoRolloDeCuerdaPasilloCObj"]);
				return funcionesDeSalida.obtener_lista("el-cerdito-apreovechas-para-coger-la-cuerda");
			}

			/*BRADY INTENTA COGER EL PALO DE ESCOBA*/
			contenido.objetos["elCerditoMangoPasilloAObj"].coger="coger_palo_de_escoba";
			eventos.event.coger_palo_de_escoba=function(verbo,objetosO,objetosP,preposicion)
			{
				if (guion.datos["cogerCuerdaPalo"]!=true)
				{
					if (guion.datos["hablarABrenda"]!=true)
					{
						salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"KevinNoDejaLlevarPalo"});
						return "@no_cadena";
					}
					return funcionesDeSalida.obtener_lista("conseguir-cita-a-kevin-primero");
					
				}
				contenido.objetos["elCerditoMangoPasilloAObj"].visible=false;
				contenido.objetos["elCerditoTrozoDeMangoObj"].visible=true;
				salida.escribir({tipo:"descripcion_escenario",cadena:funcionesDeSalida.obtener_lista("el-cerdito-aprovechas-para-llevarte-palo")});
				return funcionesDeSalida.obtener_lista("el-cerdito-coges-palo");
			}

			/*BRADY SALE DEL ALMACEN DEJANDO EL QUESO DENTRO*/
			contenido.escenarios["elCerditoAlmacenCrt"].salir="he_dejado_el_queso_en_el_almacen";
			eventos.event.he_dejado_el_queso_en_el_almacen=function()
			{
				falloEnTrampa=guion.datos["paloEnTrampa"]&&guion.datos["quesoEnTrampa"];
				if ((contenido.objetos["elCerditoQuesoCongeladosObj"].esta=="elCerditoAlmacenCrt")||(falloEnTrampa))
				{
					if (guion.datos["rataAtascada"]!=true)
					{
						eventos.crear_intervalo("rata_come_queso",function()
						{
							if (guion.datos["tiempoParaComerQueso"]>=3)
							{
								guion.datos["rataAtascada"]=true;
								guion.datos["quesoEnTrampa"]=false;

								contenido.escenarios["elCerditoAlmacenCrt"].quitar_objeto(contenido.objetos["elCerditoQuesoCongeladosObj"]);
								contenido.objetos["elCerditoQuesoCongeladosObj"].visible=false;
								contenido.objetos["elCerditoCasiTrampaObj"].descripcion="la-rata-se-ha-comido-queso-trampa";
								contenido.objetos["elCerditoRatoneraAlmacen"].descripcion="la-rata-atascada-dentro";
								eventos.eliminar_intervalo("rata_come_queso");
								eventos.crear_intervalo("rata_chilla",function()
								{
									return funcionesDeSalida.obtener_lista("el-cerdito-chilla-atrapada");
								},4000,false);
							}
							guion.datos["tiempoParaComerQueso"]+=1

						},1000,false)
					}	
				}
				return true;
				
			}

			/*BRADY ENTRA EN EL ALMACEN CON EL QUESO DENTRO*/
			contenido.escenarios["elCerditoAlmacenCrt"].entrar="rata_no_come_queso";
			eventos.event.rata_no_come_queso=function()
			{
				if (contenido.objetos["elCerditoQuesoCongeladosObj"].esta=="elCerditoAlmacenCrt")
				{
					if (guion.datos["rataAtascada"]!=true)
					{
						eventos.eliminar_intervalo("rata_come_queso");
						guion.datos["tiempoParaComerQueso"]=0;
					}
				}
				return true;
			}
			/*SUENAN LOS CHILLIDOS DE UNA RATA*/
			contenido.escenarios["elCerditoAlmacenCrt"].despues_de_contenido="rata_esta_atascada";
			eventos.event.rata_esta_atascada=function()
			{
				if (guion.datos["rataAtascada"])
				{
					atascada=funcionesDeSalida.obtener_lista("el-cerdito-la-rata-chilla");
					salida.escribir({tipo:"descripcion_escenario",cadena:atascada});
				}
				return true;
			}

			/*BRADY INTENTA DEJAR LA CAJA*/
			contenido.objetos["elCerditoCajaPasilloDObj"].dejar="dejar_la_caja_en_el_almacen";
			eventos.event.dejar_la_caja_en_el_almacen=function(verbo,objetosO,objetosP,preposicion)
			{
				if (contenido.actores["bradyAct"].esta=="elCerditoAlmacenCrt")
				{
					if (guion.datos["rataAtascada"])
					{
						return funcionesDeSalida.obtener_lista("ya-no-merece-dejar-la-caja");
					}
					contenido.objetos["elCerditoCajaPasilloDObj"].visible=false;
					contenido.objetos["elCerditoCasiTrampaObj"].visible=true;
					return funcionesDeSalida.obtener_lista("el-cerdito-dejo-caja-en-almacen");
				}
				console.log(funcionesDeSalida.obtener_lista("aqui-no-quiero-dejar-la-caja"))
				return funcionesDeSalida.obtener_lista("aqui-no-quiero-dejar-la-caja");
			}

			/*MANIPULAS LA TRAMPA PARA RATAS*/
			contenido.objetos["elCerditoCasiTrampaObj"].usar="manipular_la_casi_trampa";
			eventos.event.manipular_la_casi_trampa=function(verbo,objetosO,objetosP,preposicion)
			{
				if (objetosP.length<=0)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-la-trampa-sin-mas");
				}
				obj=objetosO[0];
				/*usas el queso con la trampa*/
				if (obj.clave=="elCerditoQuesoCongeladosObj")
				{
					contenido.objetos["elCerditoQuesoCongeladosObj"].visible=false;
					guion.datos["quesoEnTrampa"]=true;
					if (guion.secuenciaActual.controlar_trampa_de_ratas())
					{
						return "@no_cadena";
					}
					salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
					return funcionesDeSalida.obtener_lista("el-cerdito-colocas-el-queso-en-la-caja");
				}
				/*Usas el palo en la trampa*/
				if (obj.clave=="elCerditoTrozoDeMangoObj")
				{
					if (guion.datos["rataAtascada"])
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-no-merece-crear-trampa");
					}
					contenido.objetos["elCerditoTrozoDeMangoObj"].visible=false;
					guion.datos["paloEnTrampa"]=true;
					if (guion.secuenciaActual.controlar_trampa_de_ratas())
					{
						return "@no_cadena";
					}
					salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
					return funcionesDeSalida.obtener_lista("el-cerdito-colocas-el-palo-en-la-caja");
				}
				/*Usas la cuerda en la trampa*/
				if (obj.clave=="elCerditoRolloDeCuerdaPasilloCObj")
				{
					if (guion.datos["rataAtascada"])
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-no-merece-crear-trampa");
					}
					if (guion.datos["paloEnTrampa"]!=true)
					{
						return funcionesDeSalida.obtener_lista("el-cerdito-no-tengo-donde-atarla");
					}
					contenido.objetos["elCerditoRolloDeCuerdaPasilloCObj"].visible=false;
					guion.datos["cuerdaEnTrampa"]=true;
					if (guion.secuenciaActual.controlar_trampa_de_ratas())
					{
						return "@no_cadena";
					}
					salida.escribir({tipo:"orden_interna",cadena:"guardar_partida"});
					return funcionesDeSalida.obtener_lista("el-cerdito-colocas-la-cuerda-en-la-caja");
				}
				var artObj=obj.obtener_articulo_personal();
				var trArt=contenido.objetos["elCerditoCasiTrampaObj"].obtener_articulo_personal();
				return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-objeto-con")+artObj+" "+obj.nombre+" "+preposicion+" "+trArt+" "+contenido.objetos["elCerditoCasiTrampaObj"].nombre;
			}

			/*USAS LA PALANCA CON LA PUERTA*/
			contenido.objetos["elCerditoPuertaRetrete"].usar="abrir_puerta_del_retrete";
			eventos.event.abrir_puerta_del_retrete=function(verbo,objetosO,objetosP,preposicion)
			{
				if (objetosP.length<=0)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-puerta-sin-mas");
				}
				obj=objetosO[0];
				/*usas el queso con la trampa*/
				if (obj.clave=="elCerditoPalancaAlmacen")
				{
					contenido.objetos["elCerditoPuertaRetrete"].visible=false;
					contenido.objetos["elCerditoPalancaAlmacen"].visible=false;
					contenido.escenarios["elCerditoAlmacenCrt"].conexiones["entrar"].bloqueada=false;
					return funcionesDeSalida.obtener_lista("el-cerdito-colocas-abres-la-puerta");
				}
				var artObj=obj.obtener_articulo_personal();
				var trArt=contenido.objetos["elCerditoPuertaRetrete"].obtener_articulo_personal();
				return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-objeto-con")+artObj+" "+obj.nombre+" "+preposicion+" "+trArt+" "+contenido.objetos["elCerditoPuertaRetrete"].nombre;		
			}

			/*USAS EL DESATASCADOR CON LA RATONERA*/
			contenido.objetos["elCerditoRatoneraAlmacen"].usar="desatascar_rata";
			eventos.event.desatascar_rata=function(verbo,objetosO,objetosP,preposicion)
			{
				if (objetosP.length<=0)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-ratonera-sin-mas");
				}
				obj=objetosO[0];
				if (guion.datos["rataAtascada"]!=true)
				{
					return funcionesDeSalida.obtener_lista("el-cerdito-no-tiene-ningun-atasco");
				}
				/*usas el queso con la trampa*/
				if (obj.clave=="elCerditoDesatascadorRetrete")
				{
					salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"sacasLaRataDelAlmacen"});
					return "@no_cadena"
				}
				var artObj=obj.obtener_articulo_personal();
				var trArt=contenido.objetos["elCerditoRatoneraAlmacen"].obtener_articulo_personal();
				return funcionesDeSalida.obtener_lista("el-cerdito-no-quiero-usar-objeto-con")+artObj+" "+obj.nombre+" "+preposicion+" "+trArt+" "+contenido.objetos["elCerditoRatoneraAlmacen"].nombre;		
			}

			eventos.event.sacar_rata=function()
			{
				guion.datos["lanzarFinalDeSecuencia"]=true;
				guion.secuenciaActual.terminar_trabajo();
				guion.teletrasportar_protagonista("elCerditoFrenteALaEntradaCrt");
			}
			eventos.event.atrapar_a_la_rata=function()
			{
				guion.datos["rataAtascada"]=true;
				guion.datos["quesoEnTrampa"]=false;
				contenido.objetos["elCerditoCasiTrampaObj"].descripcion="la-rata-se-ha-comido-queso-trampa";
				contenido.objetos["elCerditoRatoneraAlmacen"].descripcion="la-rata-atascada-dentro";				
			}
			eventos.event.dialogo_coger_rata=function()
			{
				salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"sacasLaRataDelAlmacen"});
			}

		}

		eventos.event.terminar_secuencia=function()
		{
			salida.escribir_en_lote(funcionesDeSalida.obtener_lista("de-camino-al-bosque"));
			guion.secuenciaActual.terminarSecuencia=true;
		}
		contenido.objetos["bicicletaGarajeObj"].usar="conversacion_con_peet";
		eventos.event.conversacion_con_peet=function(verbo,objetosO,objetosP,preposicion)
		{
			if (guion.datos["lanzarFinalDeSecuencia"])
			{
				salida.escribir_en_lote(funcionesDeSalida.obtener_lista("evento-encuentro-con-peet"));
				salida.escribir({tipo:"seleccion",cadena:"Hablar.","evento":"dialogar_con_peet"});
				salida.escribir({tipo:"seleccion",cadena:"Huir.","evento":"huir_de_peet"});
				salida.escribir({tipo:"seleccion",cadena:"Defenderse.","evento":"defenderse_de_peet"});
				salida.escribir({tipo:"orden_interna",cadena:"esperar_seleccion"});
				salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
				return "@no_cadena";
			}
			else
			{
				return funcionesDeSalida.obtener_lista("no-marcharse-todavia");
			}
			
		}
		eventos.event.dialogar_con_peet=function()
		{
			salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"dialogoConPeet"});
		}
		eventos.event.huir_de_peet=function()
		{
			salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"salirPitando"});
		}
		eventos.event.defenderse_de_peet=function()
		{
			salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"defenderseDePeet"});
		}
	}

	this.terminar_trabajo=function()
	{
		
		salida.escribir_en_lote(funcionesDeSalida.obtener_lista("evento-se-acabo-el-trabajo"));
		salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"nicholasTeDejaMarchar"});
		contenido.escenarios["elCerditoFrenteALaEntradaCrt"].conexiones["Norte"].bloqueada=true;
		guion.datos["lanzarFinalDeSecuencia"]=true;
	}
	this.agregar_textos_a_elementos=function(objeto,cadena)
	{
		contenido.objetos[objeto].coger=cadena;
		contenido.objetos[objeto].dejar=cadena;
		contenido.objetos[objeto].abrir=cadena;
		contenido.objetos[objeto].cerrar=cadena;
		contenido.objetos[objeto].empujar=cadena;
		contenido.objetos[objeto].tirar=cadena;
		contenido.objetos[objeto].encender=cadena;
		contenido.objetos[objeto].apagar=cadena;
		contenido.objetos[objeto].dar=cadena;
		contenido.objetos[objeto].hablar=cadena;
		contenido.objetos[objeto].usar=cadena;
	}
	/*CONTROLAMOS SI LA TRAMPA ESTÁ MONTADA*/
	this.controlar_trampa_de_ratas=function()
	{
		if ((guion.datos["paloEnTrampa"])&&(guion.datos["quesoEnTrampa"])&&(guion.datos["cuerdaEnTrampa"]))
		{
			if (guion.datos["trampaLista"]!=true)
			{
				guion.datos["trampaLista"]=true;
				salida.escribir({tipo:"orden_interna",cadena:"lanzar_dialogo",dialogo:"tePreparasParaCazarALaRata"});
				return true;
			}
		}
		return false;
	}
	this.finalizar=function()
	{
		guion.datos={};
		eventos.event={};

		contenido.cargar_archivo_de_texto("textosCruzandoElBosqueColorado",false,function()
		{
			contenido.actores[guion.actorPrincipal].esta="entradaBosqueCrt";
			guion.secuencias["CruzandoElBosqueColorado"].secuenciaInicial=true;
			contenido.cargar_nuevo_mapa("bosqueColorado.json",true,null);
		});
	}

}
SecuenciaLimpiandoEnElCerdito.prototype = Object.create(Secuencia.prototype);
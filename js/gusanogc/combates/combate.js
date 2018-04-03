combate=
{
	ronda:0,
	aliados:[],
	enemigos:[],
	guerreros:[],
	controlTurnos:true,
	turnosPasados:0,
	enemigoInicial:null,
	inicioRonda:true,
	MaximoDeBestiasPorCombate:2,
	combateAutomatico:false,
	indiceGuerreroApuntado:0,
	menuActual:null,
	indiceSeleccion:0,
	esperaSeleccion:false,
	ataquesASeleccionar:[],
	enemigosASeleccionar:[],
	finalizar_combate:function(valor){},
	actualizar_entrada_usuario:function(accion)
	{
		combate.indiceSeleccion=accion;
	},
	mostrar_info_inicio_ronda:function(guerreros)
	{
		for (var  c=0;c<guerreros.length;c++)
		{
			var cadenaBest="";
			if (guerreros[c].pVida>0)
			{
				var cadenaBest=guerreros[c].articulo+" "+guerreros[c].nombre+" con "+guerreros[c].pVida+" de vida";
			}
			else
			{
				var cadenaBest=guerreros[c].articulo+" "+guerreros[c].nombre+" "+guerreros[c].fraseMuerte
			}
			salida.escribir({tipo:"descripcion_escenario",cadena:cadenaBest});
		}	
	},
	actualizar:function()
	{
		if (combate.ronda==0)
		{
			combate.iniciar();
		}
		else
		{

			if (combate.inicioRonda)
			{
				combate.guerreros=[];
				salida.escribir({tipo:"titulo_escenario",cadena:"Ronda "+combate.ronda});
				salida.escribir({tipo:"despues_contenido",cadena:"Luchas contra:"});
				
				combate.mostrar_info_inicio_ronda(combate.enemigos)
				salida.escribir({tipo:"despues_contenido",cadena:"Tus guerreros son:"});
				combate.mostrar_info_inicio_ronda(combate.aliados)
				combate.inicioRonda=false;
				salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
				salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
				combate.indiceGuerreroApuntado=0;
			}
			else if (combate.turnosPasados>=2)
			{
				salida.escribir({tipo:"orden_interna",cadena:"modo_lectura_con_pausa"});
				var tAliados=false;
				var tEnemigos=false;
				for (var c=0;c<combate.guerreros.length;c++)
				{
					if (tAliados!=true)
					{
						if (combate.guerreros[c].aliado)
						{
							salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
							salida.escribir({tipo:"control_turnos",cadena:"Turno de heroes:"});
							tAliados=true
						}

					}
					if (tEnemigos!=true)
					{
						if (combate.guerreros[c].aliado!=true)
						{
							salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
							salida.escribir({tipo:"control_turnos",cadena:"Turno de enemigos:"});
							tEnemigos=true
						}	
					}
					if (combate.guerreros[c].pVida<=0)
					{
						continue;
					}

					if (combate.guerreros[c].sueno)
					{
						combate.guerreros[c].actualizar_estados_alterados();
						salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
						continue;
					}
					if (combate.guerreros[c].estadoEnElTurno=="atacar")
					{
						if (combate.guerreros[c].aliado)
							combate.guerreros[c].ejecutar_ataque(combate.enemigos);
						else
							combate.guerreros[c].ejecutar_ataque(combate.aliados);
					}
					else if (combate.guerreros[c].estadoEnElTurno=="recuperar")
					{
						combate.guerreros[c].ejecutar_recuperacion();
						combate.guerreros[c].estadoEnElTurno="";
						
					}
					else
					{
						salida.escribir({tipo:"despues_contenido",cadena:combate.guerreros[c].nombre+" se aferra a su posición con fuerza adoptando una posición de defensa"});
						
					}
					combate.guerreros[c].actualizar_estados_alterados();
					salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
					
				}
				for (var c=0;c<combate.guerreros.length;c++)
				{
					if(combate.guerreros[c].estadoEnElTurno=="defender")
						combate.guerreros[c].estadoEnElTurno="";
				}

				combate.ronda+=1;
				combate.inicioRonda=true;
				combate.turnosPasados=0;
				salida.escribir({tipo:"orden_interna",cadena:"modo_lectura_sin_pausa"});
				salida.escribir({tipo:"control_turnos",cadena:"Turno terminado"});
				salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
				salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
			}
			else
			{
				if (combate.controlTurnos)
				{
					//turno de decisión para el grupo aliado
					if (combate.combateAutomatico)
					{
						for (var c=0;c<combate.aliados.length;c++)
						{
							if (combate.aliados[c].sueno!=true)
								combate.actualizar_guerrero_en_automatico(combate.aliados[c],combate.enemigos)
						}
						combate.controlTurnos=false;
						combate.turnosPasados+=1;
					}
					else
					{
						if (combate.aliados[combate.indiceGuerreroApuntado].enAutomatico)
						{
							if (combate.aliados[combate.indiceGuerreroApuntado].sueno!=true)
								combate.actualizar_guerrero_en_automatico(combate.aliados[combate.indiceGuerreroApuntado],combate.enemigos);
							combate.indiceGuerreroApuntado+=1;
						}
						else
						{
							if (combate.aliados[combate.indiceGuerreroApuntado].estadoEnElTurno=="")
							{
								if (combate.aliados[combate.indiceGuerreroApuntado].pVida>0)
								{
									if (combate.aliados[combate.indiceGuerreroApuntado].sueno!=true)
									{
										if (combate.aliados[combate.indiceGuerreroApuntado].locura!=true)
											combate.controlar_menus_de_combate();
										else
											combate.actualizar_guerrero_en_automatico(combate.aliados[combate.indiceGuerreroApuntado],combate.enemigos);
									}
								}
								else
									combate.indiceGuerreroApuntado+=1;
							}
							else
							{
								
								combate.guerreros.push(combate.aliados[combate.indiceGuerreroApuntado]);
								combate.indiceGuerreroApuntado+=1;
								
							}
						}
						if (combate.indiceGuerreroApuntado>combate.aliados.length-1)
						{
							
							combate.controlTurnos=false;
							combate.turnosPasados+=1;
						}
					}
					
				}
				else if (combate.controlTurnos!=true)
				{

					for (var c=0;c<combate.enemigos.length;c++)
					{
						if (combate.enemigos[c].sueno!=true)
							combate.actualizar_guerrero_en_automatico(combate.enemigos[c],combate.aliados)
						else
							combate.guerreros.push(combate.enemigos[c]);
					}
					combate.controlTurnos=true;
					combate.turnosPasados+=1;		
				}

			}
			equipoAliadosMuerto=combate.equipo_muerto(combate.aliados);
			equipoEnemigosMuerto=combate.equipo_muerto(combate.enemigos);

			if ((equipoAliadosMuerto)&&(equipoEnemigosMuerto))
			{
				salida.escribir({tipo:"descripcion_escenario",cadena:"Todos están muertos. El combate quedó en tablas"});
				//combate.finalizar_combate(0);
				combate.resultadoCombate=0;
				combate.terminar();

			}
			else if(equipoEnemigosMuerto)
			{
				salida.escribir({tipo:"descripcion_escenario",cadena:"Tu equipo gana el combate. Todos reciben 1 de vigor"});
				for (var c=0;c<combate.aliados.length;c++)
				{
					combate.aliados[c].pVigor+=1;
				}
				combate.resultadoCombate=1;
				//combate.finalizar_combate(1);
				combate.terminar();
			}
			else if(equipoAliadosMuerto)
			{
				salida.escribir({tipo:"descripcion_escenario",cadena:"Tu enemigos ganan el combate. Todos pierden 1 de vigor"});
				for (var c=0;c<combate.aliados.length;c++)
				{
					combate.aliados[c].pVigor-=1
				}
				combate.resultadoCombate=2;
				//combate.finalizar_combate(2);
				
				combate.terminar();
			}

		}
	},
	actualizar_guerrero_en_automatico:function(guerreroAActualizar,enemigos)
	{
		if (guerreroAActualizar.pVida>0)
		{
			if(guerreroAActualizar.locura)
			{
				guerreroAActualizar.contrincanteFijado=null
			}

			if ((guerreroAActualizar.contrincanteFijado==null)||(guerreroAActualizar.contrincanteFijado.pVida<=0))
			{
				if(guerreroAActualizar.locura)
				{
					if (funcionesDeSalida.aleatorio(0,1)==0)
						guerreroAActualizar.fijar_contrincante(combate.enemigos);
					else
						guerreroAActualizar.fijar_contrincante(combate.aliados);
				}
				else
				{
					guerreroAActualizar.fijar_contrincante(enemigos);
				}
				
			}
			guerreroAActualizar.actualizar_turno();
			combate.guerreros.push(guerreroAActualizar);
		}
	},
	equipo_muerto:function(guerreros)
	{
		
		for (var c=0;c<guerreros.length;c++)
		{
			if (guerreros[c].pVida>0)
			{
				return false;
			}
		}
		return true;
	},
	iniciar:function()
	{
		//combate.vidaEnemiga=5;
		//combate.vidaHeroe=5;

		combate.ronda=1;
		combate.inicioRonda=true;
		combate.turnosPasados=0;
		combate.enemigos=[];
		if (combate.enemigoInicial.guerrero!=null)
		{
			combate.enemigoInicial.guerrero.iniciar_combate();
			combate.enemigos.push(combate.enemigoInicial.guerrero);
		}
		for (ene=1;ene<=combate.enemigoInicial.numeroGuerreros;ene++)
		{
			//console.log(bestiario.guerreros[guion.tituloMapa][combate.enemigoInicial.claveBestia]);
			combate.enemigos.push(bestiario.guerreros[guion.tituloMapa][combate.enemigoInicial.claveBestia]())
			combate.enemigos[combate.enemigos.length-1].nombre=combate.enemigos[combate.enemigos.length-1].nombre+" "+ene;
		}
		combate.aliados=[];
		contenido.actores[guion.actorPrincipal].guerrero.iniciar_combate();
		combate.aliados.push(contenido.actores[guion.actorPrincipal].guerrero);
		for (act in contenido.actores)
		{
			if(contenido.actores[act].grupo==guion.actorPrincipal)
			{
				contenido.actores[act].guerrero.iniciar_combate();
				combate.aliados.push(contenido.actores[act].guerrero);
			}
		}
	},
	terminar:function()
	{
		guion.escenarioActual.quitar_actor(combate.enemigoInicial);
		contenido.eliminar_actor(combate.enemigoInicial.clave);
		bestiario.eliminar_bestia(combate.enemigoInicial);
		combate.aliados={};
		combate.enemigos={};
		combate.enemigoInicial=null;
		combate.ronda=0;
		
		buclePrincipal.ideUsuario.modo="normal";
		salida.escribir({tipo:"despues_contenido",cadena:"El combate a terminado"});

		salida.escribir({tipo:"orden_interna",cadena:"esperar_tecla"});
		salida.escribir({tipo:"orden_interna",cadena:"encender_bestiario"});
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		combate.finalizar_combate(combate.resultadoCombate);
		guion.mostrar_escena_actual();
		
	},
	controlar_menus_de_combate:function()
	{
		switch(combate.menuActual)
		{
			case null:

				combate.menuActual="estado";
				break
			case "estado":
				if (combate.esperaSeleccion==false)
				{
					salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
					nombre=combate.aliados[combate.indiceGuerreroApuntado].nombre;
					salida.escribir({tipo:"despues_contenido",cadena:"Turno para "+nombre+":"});
					salida.escribir({tipo:"descripcion_escenario",cadena:"Elige acción"});
					salida.escribir({tipo:"seleccion_combate",cadena:"1:> Atacar",seleccion:"1"});
					salida.escribir({tipo:"seleccion_combate",cadena:"2:> Defender",seleccion:"2"});
					salida.escribir({tipo:"seleccion_combate",cadena:"3:> Recuperar",seleccion:"3"});
					combate.esperaSeleccion=true;
				}
				else
				{
					if (combate.indiceSeleccion=="1"){combate.cambiar_modo("atacar")}
					else if (combate.indiceSeleccion=="2"){combate.cambiar_modo("defender")}
					else if (combate.indiceSeleccion=="3"){combate.cambiar_modo("recuperar")}
					else if(combate.indiceSeleccion!=0)
					{
						combate.indiceSeleccion=0;
						salida.escribir({tipo:"descripcion_escenario",cadena:"Elección no valida"});
					}
				}
				
				break;
			case "defender":
				combate.indiceSeleccion=0;
				combate.esperaSeleccion=false;
				combate.aliados[combate.indiceGuerreroApuntado].estadoEnElTurno="defender";
				combate.aliados[combate.indiceGuerreroApuntado].valorDelDado=funcionesDeSalida.aleatorio(1,6);
				salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
				combate.menuActual=null;
				break;
			case "atacar":
				if (combate.esperaSeleccion==false)
				{
					salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
					combate.ataquesASeleccionar=[];
					var ataques=combate.aliados[combate.indiceGuerreroApuntado].ataques;
					var indAta=1;
					salida.escribir({tipo:"descripcion_escenario",cadena:"Ataque disponibles"});
					for (var ata in ataques)
					{
						if (combate.aliados[combate.indiceGuerreroApuntado].pVigor>=ataques[ata].vigorMin)
						{
							combate.ataquesASeleccionar.push(ata);
							salida.escribir({tipo:"seleccion_combate",cadena:indAta+":> "+ataques[ata].nombre+" por +"+ataques[ata].ataque+" de ataque",seleccion:indAta});
							indAta+=1;
						}
						
					}
					salida.escribir({tipo:"seleccion_combate",cadena:indAta+":> Regresar",seleccion:indAta});
					combate.indiceSeleccion=-1;
					combate.esperaSeleccion=true;
				}
				else
				{
					if(parseInt(combate.indiceSeleccion-1)==combate.ataquesASeleccionar.length){combate.cambiar_modo("estado")}
					else if((parseInt(combate.indiceSeleccion-1)<combate.ataquesASeleccionar.length)&&(parseInt(combate.indiceSeleccion)>=0))
					{
						//combate.aliados[combate.indiceGuerreroApuntado].estadoEnElTurno="atacar";
						combate.aliados[combate.indiceGuerreroApuntado].ataqueActual=combate.ataquesASeleccionar[combate.indiceSeleccion-1];
						combate.cambiar_modo("enemigos");

					}
					else if(parseInt(combate.indiceSeleccion)>0)
					{
						salida.escribir({tipo:"descripcion_escenario",cadena:"Elección no valida"});
						combate.indiceSeleccion=-1;
					}

				}
				break;
			case "enemigos":
				if (combate.esperaSeleccion==false)
				{
					salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
					combate.enemigosASeleccionar=[];
					salida.escribir({tipo:"descripcion_escenario",cadena:"Escoge un enemigo"});
					var indAta=1;
					for (var c=0;c<combate.enemigos.length;c++)
					{
						enemigo=combate.enemigos[c];
						if (enemigo.pVida>0)
						{
							combate.enemigosASeleccionar.push(enemigo)
							salida.escribir({tipo:"seleccion_combate",cadena:indAta+":> "+enemigo.nombre+" con "+enemigo.pVida+" de vida",seleccion:indAta});
							indAta+=1;
						}
					}
					salida.escribir({tipo:"seleccion_combate",cadena:indAta+":> Regresar",seleccion:indAta});
					combate.indiceSeleccion=-1;
					combate.esperaSeleccion=true;

				}
				else
				{
					if(parseInt(combate.indiceSeleccion-1)==combate.enemigosASeleccionar.length){combate.cambiar_modo("atacar")}
					else if((parseInt(combate.indiceSeleccion-1)<combate.enemigosASeleccionar.length)&&(parseInt(combate.indiceSeleccion)>=0))
					{
						combate.aliados[combate.indiceGuerreroApuntado].contrincanteFijado=combate.enemigosASeleccionar[combate.indiceSeleccion-1];
						combate.indiceSeleccion=0;
						combate.esperaSeleccion=false;
						combate.aliados[combate.indiceGuerreroApuntado].estadoEnElTurno="atacar";
						combate.aliados[combate.indiceGuerreroApuntado].valorDelDado=funcionesDeSalida.aleatorio(1,6);
						salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
						combate.menuActual=null;				
					}
					else if(parseInt(combate.indiceSeleccion)>0)
					{
						salida.escribir({tipo:"descripcion_escenario",cadena:"Elección no valida"});
						combate.indiceSeleccion=-1;
					}
				}
				break;
			case "recuperar":
				if (combate.esperaSeleccion==false)
				{
					salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
					combate.enemigosASeleccionar=[];
					salida.escribir({tipo:"descripcion_escenario",cadena:"Escoge una poción"});
					combate.esperaSeleccion=true;
					pocionesSalud10=combate.aliados[combate.indiceGuerreroApuntado].objetos["salud10"];
					pocionesSalud20=combate.aliados[combate.indiceGuerreroApuntado].objetos["salud20"];
					salida.escribir({tipo:"seleccion_combate",cadena:"1:> Pociones de salud +10: "+pocionesSalud10.tienes,"seleccion":1});
					salida.escribir({tipo:"seleccion_combate",cadena:"2:> Pociones de salud +20: "+pocionesSalud20.tienes,"seleccion":2});
					salida.escribir({tipo:"seleccion_combate",cadena:"3:> Regresar","seleccion":3});
				}
				else
				{
					if(combate.indiceSeleccion=="3"){combate.cambiar_modo("estado")}
					else if(combate.indiceSeleccion=="1")
					{
						if (combate.aliados[combate.indiceGuerreroApuntado].objetos["salud10"].tienes>0)
						{
							combate.aliados[combate.indiceGuerreroApuntado].recuperarManual="pocion10";
							combate.indiceSeleccion=0;
							combate.esperaSeleccion=false;
							combate.aliados[combate.indiceGuerreroApuntado].estadoEnElTurno="recuperar";
							salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
							combate.menuActual=null;
						}
					}
					else if(combate.indiceSeleccion=="2")
					{
						if (combate.aliados[combate.indiceGuerreroApuntado].objetos["salud10"].tienes>0)
						{
							combate.aliados[combate.indiceGuerreroApuntado].recuperarManual="pocion20";
							combate.indiceSeleccion=0;
							combate.esperaSeleccion=false;
							combate.aliados[combate.indiceGuerreroApuntado].estadoEnElTurno="recuperar";
							salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
							combate.menuActual=null;
						}
					}
					else if(parseInt(combate.indiceSeleccion)>0)
					{
						salida.escribir({tipo:"descripcion_escenario",cadena:"Elección no valida"});
						combate.indiceSeleccion=0;
					}

				}
				break;
			default:
				break;
		}
		
	},
	cambiar_modo:function(menu)
	{
		combate.menuActual=menu;
		combate.indiceSeleccion=0;
		combate.esperaSeleccion=false;
	}
}
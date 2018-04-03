/*Objeto sobre el que escribe el jugador para enviar sus acciones al juego.
Por ahora es muy sencillo y sólo admite la escritura y el envio de acciones 
no pudiendo ni borrar ni editar el texto del cuadro*/
var inputText={
	esMovil:false,
	teclaUp:true,
	bloqueado:true,
	inicioY:0,
	iniciar:function(){
		inputText.esMovil=auxiliar.es_dispositivo_movil();

		
		input=document.getElementById("input");
		input.style.backgroundColor=conf.info.colorFondo;
		
		entradaUsuario=document.getElementById("entradaUsuario");
		entradaUsuario.style.backgroundColor=conf.info.colorFondo;

		//Si el juego arraca en un dispositivo movil usara estos eventos
		pantalla=document.getElementById("pantalla");
		pantalla.addEventListener('touchstart',function(e)
		{
			
			if (inputText.teclaUp)
			{
				screenText.esperar=false;
				inputText.teclaUp=false;
			}

		},false);
		

		pantalla.addEventListener("touchend",function(e){
			if(inputText.bloqueado)
			{
				input=document.getElementById("input");
				input.value="";
			}
			inputText.teclaUp=true;
			inputText.bloquear(false);
		},false);

		input.addEventListener("keyup",function(e){
			if(inputText.bloqueado)
			{
				input=document.getElementById("input");
				input.value="";
			}
			inputText.teclaUp=true;
			inputText.bloquear(false);
		},false);

		input.addEventListener("keypress",function(e)
		{
			if (inputText.teclaUp)
			{
				screenText.esperar=false;
				inputText.teclaUp=false;
				
			}
			if(e.keyCode==13)
			{
				if (inputText.bloqueado!=true)
				{
					input=document.getElementById("input");
					valor=input.value;
					input.value="";
					if (inputText.esMovil)
					{
						input=document.getElementById("input");
						
						if (inputText.esMovil)
						{
							input.setAttribute('readonly', 'readonly');
    						input.setAttribute('disabled', 'true');
    						setTimeout(function() {
        						input.blur();
        						input.removeAttribute('readonly');
        						input.removeAttribute('disabled');
    						}, 100);
						
							pantalla.focus();
						}

					}
					
					inputText.interpretar(valor);
					if (valor.length>0)
					{
						turno=parseInt(infoGame.info.turnos.valor);
						turno++;
						infoGame.info.turnos.valor=String(turno);
						infoGame.crear_info();	
						master.generar_inventario();
                		master.generar_objetos_en_cuarto();
                		master.generar_objetos_en_objeto();
						master.actualizar();
						eventos.actualizar();
						eventos.ejecutar(master.cuartoActual.actualizar);
					}
					
					

				}

			}
			
		},false);
		
	},

	interpretar:function(accion)
	{
		screenText.escribir({texto:accion,fuente:conf.prota.fuente,tama:conf.prota.tama,color:conf.prota.color,estilo:conf.prota.estilo});
		accion=accion.toLowerCase();
		accion=auxiliar.quitar_acentos(accion);
		accion=auxiliar.sustituir_caracter_por_espacio(accion,"y");
		accion=auxiliar.eliminar_espacios_no_necesarios(accion);
		paraTolk=accion.split(" ");
		listaTolken=tolkenizar.generar_tolken(paraTolk);

		result=gestorDeErrores.emitir_errores_de_tolken(listaTolken);

		if (result!=false)
		{
			screenText.escribir({texto:result,tama:conf.narrador.tama});
		}
		else
		{
			listaTolken=organizar.comprobar_y_eliminar_tolken_no_necesarios(listaTolken);
			
			result=gestorDeErrores.emitir_errores_de_articulos(listaTolken);
			
			
			if (result!=false)
				screenText.escribir({texto:result,fuente:conf.narrador.fuente,tama:conf.narrador.tama,color:conf.narrador.color,estilo:conf.narrador.estilo});
			else
			{
				
				listaTolken=organizar.organizar_tolken_validos(listaTolken);
				console.log("he tolkenizado: ");
				console.log(listaTolken);
				console.log("///////////////////");
				ejecutarTolken.ejecutar_accion(listaTolken)
			}
		}
	},
	
	bloquear:function(bloqueo)
	{
		inputText.bloqueado=bloqueo;
		if (bloqueo)
		{
			label=document.getElementById("alertaInput");
			label.innerText =master.textos["20"];
		}
		else
		{
			label=document.getElementById("alertaInput");
			label.innerText =master.textos["19"];
		}
		
	}
}


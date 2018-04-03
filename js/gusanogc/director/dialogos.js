var dialogos=
{
	dialogosCargados:{},
	dialogoActual:"",
	actualizarDialogo:false,
	temaActual:"inicio",
	temaAnterior:"inicio",
	indice:0,
	lanzar_dialogo:function(dialogo,borrar)
	{
		if ((dialogo in dialogos.dialogosCargados)!=true)
		{
			dialogos.cargar_dialogo(dialogo,borrar);
		}
		else
		{
			dialogos.dialogoActual=dialogo;
			dialogos.temaActual=dialogos.dialogosCargados[dialogos.dialogoActual].temaInicial;
			dialogos.temaAnterior=dialogos.temaActual;
			dialogos.actualizarDialogo=true;
			buclePrincipal.ideUsuario.iniciar_dialogo(dialogo);
		}
	},
	cargar_dialogo:function(archivo,borrar)
	{
		var textos=datos.baseUrl+"idiomas/"+datos.idioma+"/dialogos/"+archivo+".json";
		var respuesta=new XMLHttpRequest();
		respuesta.onreadystatechange = function() 
		{
    		if (respuesta.readyState == 4 ) 
    		{
        		var dialogo = JSON.parse( respuesta.responseText );
        		if (borrar)
        		{
        			dialogos.dialogosCargados={};
        			dialogos.dialogosCargados[archivo]=dialogo;
        		}
        		else
        		{
        			if ((archivo in dialogos.dialogosCargados)!=true)
        			{
        				dialogos.dialogosCargados[archivo]=dialogo
        			}
        		}
        		
        		dialogos.dialogoActual=archivo;
				dialogos.actualizarDialogo=true;
				dialogos.temaActual=dialogos.dialogosCargados[dialogos.dialogoActual].temaInicial;
				dialogos.temaAnterior=dialogos.temaActual;
				buclePrincipal.ideUsuario.iniciar_dialogo(dialogo);
				
        	}
        }
		respuesta.open( "POST", datos.urlMotor+"motor/"+"abrirJson.php", true );
		respuesta.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		respuesta.send("archivo="+textos);
	},

	actualizar:function()
	{
		if (dialogos.actualizarDialogo)
		{
			//console.log(dialogos.dialogosCargados[dialogos.dialogoActual][dialogos.temaActual])
			tema=dialogos.dialogosCargados[dialogos.dialogoActual][dialogos.temaActual];
			if ((tema!=null)&&(dialogos.indice<=tema.length))
			{
				
				if (tema[dialogos.indice]!=null)
				{
					if ("tipo" in tema[dialogos.indice])
					{
						salida.escribir(tema[dialogos.indice]);
					}
					else if ("temaDeEntrada" in tema[dialogos.indice])
					{
						dialogos.dialogosCargados[dialogos.dialogoActual].temaInicial=tema[dialogos.indice]["temaDeEntrada"];
					}
					else if ("nuevoTema" in tema[dialogos.indice])
					{
						dialogos.temaActual=tema[dialogos.indice]["nuevoTema"];
						dialogos.indice=0;
					}
					else if ("opciones" in tema[dialogos.indice])
					{
						dialogos.actualizarDialogo=false;
						salida.escribir({tipo:"opciones",opciones:tema[dialogos.indice]["opciones"],cadena:""})
					}
					else if("opcionVisible" in tema[dialogos.indice])
					{
						opcion=tema[dialogos.indice]["opcionVisible"];
						opciones=dialogos.dialogosCargados[dialogos.dialogoActual][opcion["tema"]][0].opciones;
						console.log(opcion);
						console.log(dialogos.dialogosCargados[dialogos.dialogoActual][opcion["tema"]])
						console.log(opciones)
						for (op in opciones)
						{
							console.log(opcion.opcionACambiar)
							if (opcion.opcionACambiar==opciones[op].clave)
							{
								console.log("enciendo opcion ")
								opciones[op].visible=opcion.visible;
							}
						}
					}
				}
				if((dialogos.temaAnterior==dialogos.temaActual))
				{
					dialogos.indice+=1;
				}
				else
				{
					dialogos.temaAnterior=dialogos.temaActual;
				}
			}
			else
			{
				dialogos.indice=0;
				dialogos.actualizarDialogo=false;
				buclePrincipal.ideUsuario.finalizar_dialogo(dialogos.dialogoActual);
				console.log("pongo a dormir")
			}
		}
	},

	generar_opciones:function(opciones)
	{

		for (opc in opciones)
		{
			if (opciones[opc].visible)
			{
				
				var etiqueta=document.createElement("p");
				etiqueta.className="enlaceSeleccion fundido_entrada";
				var resaltar=document.createElement("a");
				resaltar.innerHTML=opciones[opc].cadena;
				if ("cadenaLarga" in opciones[opc])
				{
					if (opciones[opc].cadenaLarga!="")
					{
						resaltar.innerHTML=opciones[opc].cadenaLarga;
					}
				}
				
				resaltar.className="puntoInteres seleccion";
				resaltar.setAttribute("id",opciones[opc].nuevoTema);
				
				resaltar.addEventListener("click",function(e)
				{
					nombre=contenido.actores[guion.actorPrincipal].nombre+": ";
					salida.escribir({tipo:guion.actorPrincipal,cadena:nombre+this.innerHTML});
					dialogos.temaActual=this.getAttribute("id");
					dialogos.temaAnterior=dialogos.temaActual
					dialogos.indice=0;
					var selecciones=document.getElementsByClassName("enlaceSeleccion");
					while (selecciones[0])
					{	
						buclePrincipal.ideUsuario.salidaTexto.removeChild(selecciones[0]);
					}
					buclePrincipal.ideUsuario.esperarPulsarMas=false;
					dialogos.actualizarDialogo=true;
				});
				etiqueta.appendChild(resaltar);
				buclePrincipal.ideUsuario.salidaTexto.appendChild(etiqueta);
			}
		}
		buclePrincipal.ideUsuario.esperarPulsarMas=true;
	}
}
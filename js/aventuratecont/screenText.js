var screenText={
	estilos:{
		colorFondo: "rgb(0,0,0)",
		ancho:0,
		alto:0,
		x:0,
		y:30,
	},
	estado:"relativo",
	textosAMostrar:[],
	texto:null,
	lineaActual:0, 
	caracterActual:0,
	sumaLineas:dimensiones.alto-60,
	borrarTodo:false,
	esperar:false,
	ordenes:["@esperar_tecla","@borrar_todo"],
	mostrar_por_pantalla:function(parrafo)
	{

		screenText.textosAMostrar.push(parrafo);
	},
	iniciar:function(){
	
	},
	actualizar:function(tiempo)
	{
		if (screenText.esperar)
		{
			return;
		}
		if (screenText.textosAMostrar.length>0)
		{

			if (screenText.texto==null)
			{

				if(screenText.textosAMostrar[0].texto[0]!="@")
				{

					screenText.texto=screenText.textosAMostrar[0];
					screenText.texto.preparar_texto();
					screenText.lineaActual=0;
					screenText.caracterActual=0;
				}
				else
				{
					if(screenText.textosAMostrar[0].texto=="@esperar_tecla")
					{
						screenText.esperar=true;
						inputText.bloquear(true);						
					}

					else if(screenText.textosAMostrar[0].texto=="@borrar_todo")
						screenText.borrar_todo();
					else if(screenText.textosAMostrar[0].texto=="@regresar_al_home_de_la_web")
						location.href=conf.global.urlHomeWeb;
				}
				
				lista=[];
				for (var i=0; i<screenText.textosAMostrar.length; i++)
				{
					if(i!=0)
					{
						lista.push(screenText.textosAMostrar[i]);
					}
			
				}
				screenText.textosAMostrar=lista;
			}
		}
	},
	dibujar:function(g)
	{
		if (screenText.esperar)
		{
			return;
		}
		if (screenText.borrarTodo)
		{
			e=screenText.estilos;
			g.fillStyle=conf.global.colorFondo;
			g.fillRect(e.x,e.y,e.ancho,e.alto);
			screenText.sumaLineas=dimensiones.alto-60;
			screenText.borrarTodo=false;
		}
		if(screenText.estado=="relativo")
		{
			screenText.escribir_en_relativo(g);
		}
		else if(screenText.estado=="absoluto")
		{
			screenText.escribir_en_absoluto(g);
		}
		
	},
	escribir_en_absoluto:function(g)
	{

		if (screenText.texto!=null)
		{
			if (screenText.texto.mostrarComo==screenText.texto.LINEA)
			{

				if(screenText.texto.listaLineas.length>0)
				{
					
					if (screenText.texto.contador>=screenText.texto.tiempo)
					{
						screenText.texto.contador=0;
						//console.log(screenText.texto.tipoBloque);
						if(screenText.texto.tipoBloque=="texto")
						{
							screenText.texto.escribir_absoluto(g);
						}
						else if (screenText.texto.tipoBloque=="imagen")
						{
							//console.log("dibujando en absoluto");
							screenText.texto.mostrar_imagen_absoluto(g);
						}
					}
					else
					{
						
						screenText.texto.contador+=buclePrincipal.aps;
					}	
				}
				
				else
				{
					screenText.texto=null;
					
				}
			}
		}
	},
	escribir_en_relativo:function(g)
	{

		if (screenText.texto!=null)
		{
			
			if (screenText.texto.mostrarComo==screenText.texto.LINEA)
			{
				if(screenText.texto.listaLineas.length>0)
				{
					if (screenText.texto.contador>screenText.texto.tiempo)
					{
						screenText.texto.contador=0;
						e=screenText.estilos;
						ancho=buclePrincipal.pantallaAncho;
						alto=buclePrincipal.pantallaAlto;
						if(screenText.texto.tipoBloque=="texto")
						{
							ptTexto=screenText.texto.tamaTexto+screenText.texto.espacioEntreLineas;//infoGame.alto;
						}
						else
						{
							ptTexto=screenText.texto.estilos.alto+screenText.texto.espacioEntreLineas;
						}
						pantalla=document.getElementById("pantalla");
						if(screenText.sumaLineas<ptTexto+10)
						{
							dd=0;
							g.drawImage(pantalla,0,0,ancho,e.alto,0,-ptTexto,ancho,e.alto);
							//g.drawImage(pantalla,0,ptTexto,ancho,540,0,0,ancho,alto-ptTexto);

							g.fillStyle=e.colorFondo;
							g.fillRect(0,e.alto-(ptTexto),e.ancho,e.alto);
						}
						
						if(screenText.texto.tipoBloque=="texto")
						{
							screenText.texto.escribir_relativo(g);
						}
						else if(screenText.texto.tipoBloque=="imagen")
						{

							screenText.texto.mostrar_imagen_relativo(g);
						}
					}
					else
					{
						screenText.texto.contador+=buclePrincipal.aps;
					}					
					
				}
				else
				{
					screenText.texto=null;
				}
			}
		}

	},

	escribir:function(texto)
	{
		
		if ("tipo" in texto)
		{
			if (texto.tipo=="texto")
			{
				screenText.escribir_texto(texto);
			}
			else if (texto.tipo=="imagen")
			{

				screenText.escribir_imagen(texto);
			}
			
		}
		else
		{
			screenText.escribir_texto(texto);
		}
	},
	escribir_imagen:function(texto)
	{
		bloq=new Bloque();
		bloq.tipoBloque="imagen";

		if("imagen" in texto)
		{
			bloq.urlImagen=texto.imagen;
		}
		if("alinear" in texto)
		{
			bloq.alinear=texto.alinear;
		}
		if("x" in texto)
		{
			bloq.estilos.x=texto.x;
		}
		if("y" in texto)
		{
			bloq.estilos.y=texto.y;
		}
		if("ancho" in texto)
		{
			bloq.estilos.ancho=texto.ancho;
		}
		if("alto" in texto)
		{
			bloq.estilos.alto=texto.alto;
		}
		//bloq.texto=texto.texto;
		screenText.mostrar_por_pantalla(bloq);

	},
	escribir_texto:function(texto)
	{
		bloq=new Bloque();
			if("fuente" in texto)
			{
				bloq.tipoLetra=texto.fuente;
			}
			if("tama" in texto)
			{
				bloq.tamaTexto=texto.tama;
			}
			if("estilo" in texto)
			{
				bloq.estiloLetra=texto.estilo;
			}
			if("color" in texto)
			{
				bloq.colorTexto=texto.color;
			}
			if("alinear" in texto)
			{
				bloq.alinear=texto.alinear;
			}
			if("x" in texto)
			{
				bloq.estilos.x=texto.x;
			}
			if("y" in texto)
			{
				bloq.estilos.y=texto.y;
			}
			if("tiempo" in texto)
			{
				bloq.tiempo=texto.tiempo;
			}
			bloq.texto=texto.texto;
			screenText.mostrar_por_pantalla(bloq);
	},

	borrar_todo:function()
	{
		screenText.borrarTodo=true;

	}

}

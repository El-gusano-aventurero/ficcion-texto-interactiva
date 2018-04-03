function Bloque()
{
	this.tipoBloque="texto";
	this.SECUENCIAL=0;
	this.LINEA=1;
	this.mostrarComo=this.LINEA;
	this.estilos=
	{
			x:0,
			y:0,
			ancho:0,
			alto:0,	
	};
	this.urlImagen="";
	this.imagen=new Image();
	this.texto="";
	this.colorTexto="white";
	this.colorFondo="rgb(92,89,89)";
	this.tipoLetra="comic sans MS";
	this.estiloLetra="normal";
	this.tamaTexto=18;
	
	this.alinear="left";
	this.estaListo=false;
	this.listaLineas=[];
	this.margenIzquierdo=5;
	this.espacioEntreLineas=3;
	this.espacioEntreLineasHaciaArriba=10;
	this.tiempo=100;
	
	this.contador=0;
}

Bloque.prototype.mostrar_imagen_absoluto=function(g)
{
	if(this.estaListo)
	{
		e=this.estilos;
		g.drawImage(master.recursos[this.urlImagen].imagen,e.x,e.y,e.ancho,e.alto);
		this.eliminar_linea();
	}
}
Bloque.prototype.mostrar_imagen_relativo=function(g)
{
	if(this.estaListo)
	{
		y=0;
		x=0;
		//h = getTextHeight(this.tipoLetra);
		if (screenText.sumaLineas<=this.estilos.alto)
		{
			//screenText.sumaLineas=0;
			//points = this.tamaTexto+this.espacioEntreLineas;
			y=screenText.estilos.alto-(this.estilos.alto+this.espacioEntreLineas);
			
		}
		else
		{
			y=(screenText.estilos.alto-screenText.sumaLineas)+this.espacioEntreLineas;
		}
		if(this.alinear=="left")
		{
			x=0;
		}
		else if(this.alinear=="center")
		{
			x=screenText.estilos.ancho/2-this.estilos.ancho/2;
		}
		else if(this.alinear=="right")
		{
			x=screenText.estilos.ancho-this.estilos.ancho;
		}
		//console.log(master.recursos[this.urlImagen].imagen.src);
		g.drawImage(master.recursos[this.urlImagen].imagen,x,y,this.estilos.ancho,this.estilos.alto);
		//g.fillRect(0,y,800,y)
		
		
		screenText.sumaLineas-=this.estilos.alto+this.espacioEntreLineas;
	
		this.eliminar_linea();

	}
}
Bloque.prototype.escribir_absoluto=function(g)
{
		if(this.estaListo)
		{
			t=this.listaLineas[0];
			g.textBaseline="top";
			if (this.alinear=="left")
			{
				g.textAlign="start";
			}
			else if(this.alinear=="center")
			{
				g.textAlign="center";
			}
			else if(this.alinear=="right")
			{
				g.textAlign="end";
			}

			g.fillStyle=this.colorTexto;
			g.font = this.estiloLetra+" "+this.tamaTexto+"px "+this.tipoLetra;
			g.fillText(t,this.estilos.x,this.estilos.y);
			this.eliminar_linea();			
		}

}

Bloque.prototype.escribir_relativo=function(g)
{

	centrado=0
	if(this.estaListo)
	{
		t=this.listaLineas[0];
		
		g.textBaseline="top";

		if (this.alinear=="left")
		{
			g.textAlign="start";
			centrado=0;
		}
		else if(this.alinear=="center")
		{
			g.textAlign="center";
			centrado=buclePrincipal.pantallaAncho/2;
		}
		else if(this.alinear=="right")
		{
			g.textAlign="end";
			centrado=buclePrincipal.pantallaAncho-10;
		}
		else if(this.alinear=="center_left")
		{
			g.textAlign="center";
			centrado=(buclePrincipal.pantallaAncho/2)/2;
		}
		else if(this.alinear=="center_right")
		{
			g.textAlign="center";
			centrado=(buclePrincipal.pantallaAncho/2)+((buclePrincipal.pantallaAncho/2)/2);
		}
		/*g.fillStyle=this.colorFondo;
		g.font = this.estiloLetra+" "+this.tamaTexto+"px "+this.tipoLetra;
		anchoFondo=g.measureText(t).width;
		g.fillRect(this.margenIzquierdo,(screenText.estilos.alto-screenText.sumaLineas),anchoFondo,this.tamaTexto);*/

		g.fillStyle=this.colorTexto;
		g.font = this.estiloLetra+" "+this.tamaTexto/16+"rem "+this.tipoLetra;
		y=0;
		
		//h = getTextHeight(this.tipoLetra);
		if (screenText.sumaLineas<=this.tamaTexto)
		{
			//screenText.sumaLineas=0;
			//points = this.tamaTexto+this.espacioEntreLineas;
			y=screenText.estilos.alto-(this.tamaTexto+this.espacioEntreLineasHaciaArriba);
			
		}
		else
		{
			y=(screenText.estilos.alto-screenText.sumaLineas)+this.espacioEntreLineas;
		}
		g.fillText(t,this.margenIzquierdo+centrado,y);
		//g.fillRect(0,y,800,y)
		
		
		screenText.sumaLineas-=(this.tamaTexto+this.espacioEntreLineas);
	
		this.eliminar_linea();
	}

}

Bloque.prototype.eliminar_linea=function()
{
	lista=[];
	
	for (var i=0; i<this.listaLineas.length; i++)
	{
		if(i!=0)
		{
			lista.push(this.listaLineas[i]);
		}
	}
	this.listaLineas=lista;
}

Bloque.prototype.imagen_lista=function()
{
	this.estaListo=true;
	this.listaLineas.push("");
}

Bloque.prototype.preparar_texto=function()
{
	//console.log(this.tipoBloque);
	if (this.tipoBloque=="imagen")
	{
		this.imagen_lista();
		return;
	}
	var g=document.getElementById("pantalla").getContext("2d");
	g.fillStyle=this.colorTexto;
	g.font = this.estiloLetra+" "+this.tamaTexto/16+"rem "+this.tipoLetra;
	anchoTotal=screenText.ancho;
	palabra="";
	linea="";
	listaLineas=[];
	cadena=" .,;:"
	this.texto=this.texto+"\n";
	for (var i=0; i<this.texto.length; i++)
	{
		ch=this.texto[i];
		if (cadena.indexOf(ch) != -1)
		{
			if(g.measureText(linea+palabra+ch).width+this.margenIzquierdo>=buclePrincipal.pantallaAncho)
			{
					listaLineas.push(linea);
					linea="";
					palabra+=ch;
					ch="";
			}
			else
			{
				linea+=palabra+ch;
				palabra="";
				ch="";
			}

		}
		else if (ch=="\n")
		{
			listaLineas.push(linea+palabra);
			linea="";
			palabra="";
		}
		else
		{
			palabra+=ch;
			ch="";
		}

	}
	if (ch!="")
	{
		palabra+=ch;	
	}
	
	if (palabra!="")
	{
		linea+=palabra;
	}
	if(linea!="")
	{
		listaLineas.push(linea);
	}
	this.listaLineas=listaLineas;
	this.estaListo=true;
}
function Secuencia(indice,titulo,imagen,clave,inicial)
{
	this.clave=clave;
	this.titulo=titulo;
	this.indice=indice;
	this.imagen=imagen;
	this.mostrarTitulo=true;
	this.secuenciaInicial=inicial;
	this.datos={};
	this.terminarSecuencia=false;
	this.mostrar_titulo=function()
	{
		if (this.mostrarTitulo!=true)
			return false;
		salida.escribir({tipo:"orden_interna",cadena:"borrar_textos"});
		salida.escribir({tipo:"titulo_escenario",
						clases:"fundido_entrada",
						cadena:this.indice,
						tamaFuente:"2.40rem",
						clases:"fundido_entrada",
						alinear:"center",
						tiempo:1000});
		if (this.imagen!=null)
		{
			salida.escribir({tipo:"imagen",
							cadena:this.imagen,
							clases:"fundido_entrada",
							alinear:"center",
							tiempo:1000})
		}
		salida.escribir({tipo:"descripcion_escenario",
						clases:"fundido_entrada",
						cadena:this.titulo,
						tamaFuente:"1.80rem",
						clases:"fundido_entrada",
						alinear:"center",
						tiempo:1000});
		
		salida.escribir({tipo:"seleccion",cadena:"Continuar","evento":"nada"});
			
		salida.escribir({tipo:"orden_interna",cadena:"esperar_seleccion"});
	}
	this.iniciar=function(){};
	this.presentacion=function(){};
	this.actualizar_a_tiempo_real=function(tiempo){};
	this.actualizar_turno=function(){};
	this.finalizar=function(){};
}
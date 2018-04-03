var infoGame={
	txtInfo:"",
	x:0,
	y:0,
	ancho:0,
	alto:30,
	anchoInfo:0,
	desfaseTop:22,
	espacioDerecha:20,
	info:{
		turnos:{
			nombre:master.textos["17"],
			valor:"0",
			activo:true
		},
	},
	estilo:{colorFondo: "rgb(50,20,155)",
		colorTexto:"rgb(255,255,255)",
		tamaTexo:20,
		tipoLetra:"sans-serif",
		estiloLetra:"bold",
	},
	crear_info:function()
	{
		infoGame.info.turnos.nombre=master.textos["17"];
		var g=document.getElementById("pantalla").getContext("2d");
		infoGame.txtInfo="";
		for (informacion in infoGame.info)
		{
			if (infoGame.info[informacion].activo)
			{
				infoGame.txtInfo+=infoGame.info[informacion].nombre+" : "+infoGame.info[informacion].valor+"  ";	
			}
		}
		infoGame.anchoInfo=g.measureText(infoGame.txtInfo).width;

	},
	dibujar:function(g)
	{
		anchoInfo=infoGame.anchoInfo;
		estilos=infoGame.estilo;
		g.fillStyle = conf.info.colorFondo;
		g.fillRect(infoGame.x,infoGame.y,infoGame.ancho,infoGame.alto);

		
		xInfo=infoGame.ancho-anchoInfo;
		g.textAlign="start";
		g.textBaseline="alphabetic";
		g.font = conf.info.estilo+" "+conf.info.tama+"px "+conf.info.fuente;
		g.fillStyle=conf.info.color;
		g.fillText(infoGame.txtInfo,xInfo-infoGame.espacioDerecha,infoGame.desfaseTop);
	}
}
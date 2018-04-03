var dimensiones={
	ancho:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	alto:window.innerHeght || document.documentElement.clientHeight || document.body.clientHeight,
	iniciar:function(){
		window.addEventListener("resize", function(evento){
			dimensiones.ancho=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			dimensiones.alto=window.innerHeght || document.documentElement.clientHeight || document.body.clientHeight;
		});

	},
	medidas:function(){
		var med={"ancho":dimensiones.ancho,"alto":dimensiones.alto};
		return med;
	},
	calcular_dimensiones:function()
	{
		var anchoInicial=800;
		if (dimensiones.ancho<=800)
		{
			anchoInicial=dimensiones.ancho;
		}
		buclePrincipal.pantallaAncho=anchoInicial;
		buclePrincipal.pantallaAlto=dimensiones.alto-30;

		pantalla=document.createElement("canvas");
		pantalla.setAttribute("id","pantalla");
		pantalla.setAttribute("width",anchoInicial);
		pantalla.setAttribute("height",dimensiones.alto-30);
		

		juego=document.getElementById("juego");

		juego.appendChild(pantalla);
		juego.style.width=anchoInicial+"px";

		///////////////////////////////////////////7
		entradaUsuario=document.getElementById("entradaUsuario");
		entradaUsuario.style.position="absolute";
		if (dimensiones.ancho>=800)
		{
			juego.style.position="absolute";
			juego.style.left=(dimensiones.ancho/2-anchoInicial/2)+"px";
		}

		entradaUsuario.style.top=pantalla.height+"px";
		entradaUsuario.style.width=anchoInicial+"px";
		entradaUsuario.style.height=dimensiones.alto-pantalla.height+"px";
		entradaUsuario.style.backgroundColor="blue";

		input=document.getElementById("input");
		

		input.style.height=dimensiones.alto-pantalla.height+"px";
		///////////////////////////////////////
		screenText.estilos.ancho=anchoInicial;
		screenText.estilos.alto=dimensiones.alto-30;
		screenText.sumaLineas=dimensiones.alto-60;
		//////////////////////////////////////
		infoGame.ancho=anchoInicial;
	}
}
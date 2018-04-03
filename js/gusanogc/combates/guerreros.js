function Estado(nombre,efecto,acierto,afectaEn)
{
	this.nombre=nombre;
	this.turnos=0;
	this.turnosAfecta=afectaEn;
	this.efecto=efecto;
	this.acierto=acierto;
	this.afectadoPor=false;
	this.actualizar_estados_alterados=function(guerrero)
	{
		if (this.afectadoPor==false)
		{
			return;
		}
		if (this.turnos>0)
		{
			switch(this.nombre)
			{
				case "veneno":
					guerrero.pVida-=this.efecto.pVida;
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" pierde "+this.efecto.pVida+" a causa del veneno"});
					break;
				case "sueno":
					guerrero.sueno=this.efecto.sueno;
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" está bajo los efectos del sueño"});
					
					break;
				case "locura":
					guerrero.locura=this.efecto.locura;
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" está bajo los efectos de la locura"});
					break;
				case "invisibilidad":
					guerrero.visible=this.efecto.invisibilidad
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" tiene el estado invisibilidad"});
					break;
			}
			this.turnos-=1;		
		}
		else
		{
			this.turnos=0;
			switch(this.nombre)
			{			
				case "veneno":
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" asimila el veneno y sale de su estado"});
					break;
				case "sueno":
					guerrero.sueno=false;
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" se despierta después de la siesta"});
					break;
				case "locura":
					guerrero.locura=false;
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" vuelve a la cordura"});
					break;
				case "invisibilidad":
					guerrero.visible=true;
					salida.escribir({tipo:"despues_contenido",cadena:guerrero.nombre+" vuelve a ser visible"});
					break;
			}
			this.afectadoPor=false;		
		}

	}
}


function Arma(data)
{
	this.nombre=data.nombre;
	this.ataque=0;

	if ("ataque" in data)
		this.ataque=data.ataque;
	this.danio=0;
	if ("danio" in data)
		this.danio=data.danio;
	this.rompeDefensa=0;
	if ("rompeDefensa" in data)
		this.rompeDefensa=data.rompeDefensa;
	this.rompeMagia=0;
	if ("rompeMagia" in data)
		this.rompeMagia=data.rompeMagia;
	this.rompeAtaque=0;
	if ("rompeAtaque" in data)
		this.rompeAtaque=data.rompeAtaque;

	this.drenaVida=0;
	if ("drenaVida" in data)
		this.drenaVida=data.drenaVida;
	this.drenaMagia=0;
	if ("drenaMagia" in data)
		this.drenaVida=data.drenaMagia;

	this.consumeMagia=0;
	if ("consumeMagia" in data)
		this.consumeMagia=data.consumeMagia;
	this.consumeVida=0;
	if ("consumeVida" in data)
		this.consumeVida=data.consumeVida;

	this.estados={};
	if ("estados" in data)
		this.estados=data.estados;
	this.vigorMin=0;
	if ("vigorMin" in data)
		this.vigorMin=data.vigorMin;
}

function Ataque(data)
{
	Arma.call(this,data);
	
	this.golpe=data.golpe;
	this.acierto=data.acierto;
	this.fallo=data.fallo;

	this.multiple=false;
	if ("multiple" in data)
		this.multiple=data.multiple;
	this.variosTurnos=0
	if ("variosTurnos" in data)
		this.variosTurnos=data.variosTurnos;	
	this.turnosParaEjecutar=0;
	if ("turnosParaEjecutar" in data)
		this.turnosParaEjecutar=data.turnosParaEjecutar;

	this.evaluar_ataque=function(dueno,enemigo)
	{	
		if (enemigo.visible!=true)
		{
			salida.escribir({tipo:"despues_contenido",cadena:dueno.nombre+" falla el ataque a causa de la invisibilidad de "+enemigo.nombre});
			return;
		}
		if (this.consumeMagia>0)
		{
			if(dueno.pMagia-this.consumeMagia<0)
			{
				salida.escribir({tipo:"despues_contenido",cadena:dueno.nombre+" no tiene los suficientes puntos de magia para realizar el hechizo"});
				return;
			}
		}
		if (this.consumeVida>0)
		{
			if(dueno.pVida-this.consumeVida<0)
			{
				salida.escribir({tipo:"despues_contenido",cadena:dueno.nombre+" no tiene los suficientes puntos de magia para realizar el hechizo"});
				return;
			}
		}
		var danio=0;
		var defensa=0;
		var magia=0;
		var ataque=0;
		var dVida=0;
		var dMagia=0;

		if (dueno.arma!=null)
		{
			danio=dueno.arma.danio
			defensa=dueno.arma.rompeDefensa;
			magia=dueno.arma.rompeMagia;
			ataque=dueno.arma.rompeAtaque;
			dVida=dueno.arma.drenaVida;
			dMagia=dueno.arma.drenaMagia;
		}

		enemigo.pVida-=(this.danio+danio);
		enemigo.pDefensa-=this.rompeDefensa+defensa;
		enemigo.pMagia-=this.rompeMagia+magia;
		enemigo.pAtaque-=this.rompeAtaque+ataque;

		enemigo.pVida-=this.drenaVida-dVida;
		enemigo.pMagia-=this.drenaMagia-dMagia;

		dueno.pVida+=this.drenaVida-dVida;
		dueno.pMagia+=this.drenaMagia-dMagia;

		dueno.pMagia-=this.consumeMagia;
		dueno.pVida-=this.consumeVida;

		if (dueno.pVida-this.consumeVida<=0)
		{
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" ha sacrificado su vida con ese último ataque"});
		}

		for (est=0;est<this.estados.length;est++)
		{
			enemigo.estados[this.estados[est]].turnos+=enemigo.estados[this.estados[est]].turnosAfecta;
			enemigo.estados[this.estados[est]].afectadoPor=true;
			var frase=funcionesDeSalida.aleatorio(0,enemigo.estados[this.estados[est]].acierto.length-1)
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" "+enemigo.estados[this.estados[est]].acierto[frase]});
		}
		if (dueno.arma!=null)
		{
			for (est=0;est<dueno.arma.estados.length;est++)
			{
				enemigo.estados[dueno.arma.estados[est]].turnos+=enemigo.estados[dueno.arma.estados[est]].turnosAfecta;
				enemigo.estados[this.estados[est]].afectadoPor=true;
				var frase=funcionesDeSalida.aleatorio(0,enemigo.estados[dueno.arma.estados[est]].acierto.length-1)
				salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" "+enemigo.estados[dueno.arma.estados[est]].acierto[frase]});
			}			
		}


		if (this.danio+danio>0)
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" pierde "+(this.danio+danio)+" de vida"});

		if (this.rompeDefensa+defensa>0)
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" pierde "+(this.rompeDefensa+defensa)+" de defensa"});

		if (this.rompeMagia+magia>0)
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" pierde "+(this.rompeMagia+magia)+" de magia"});

		if (this.rompeAtaque+ataque>0)
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" pierde "+(this.rompeAtaque+ataque)+" de ataque"});

		if (this.drenaVida-dVida>0)
		{
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" pierde "+(this.drenaVida-dVida)+" de vida que son absorvidos por"+dueno.nombre});		
		}

		if (this.drenaMagia-dMagia>0)
		{
			salida.escribir({tipo:"despues_contenido",cadena:enemigo.nombre+" pierde "+(this.drenaMagia-dMagia)+" de magia que son absorvidos por"+dueno.nombre});		
		}
	}
}
Ataque.prototype = Object.create(Arma.prototype);
function Guerrero()
{

	this.articulo="";
	this.aliado=false;
	this.estados=
	{
		veneno:new Estado("veneno",{pVida:2},["siente el veneno recorrer sus venas",
														"se retuerce de dolor a causa del veneno",
														"nota como el veneno entra en su cuerpo"],6),

		sueno:new Estado("sueno",{sueno:true},["cae al suelo presa del sueño",
														"duerme placidamente culpa del sueño",
														"cierra los ojos y comienza a roncar a causa del sueño"],5),

		invisibilidad:new Estado("invisibilidad",{visible:false},["se hace invisible",
																			"desaparece del escenario",
																			"queda oculto ante la vista de todos"],3),

		locura:new Estado("locura",{locura:true},["entra en locura dejando de distinguir entre amigos y enemigos",
															"ha entrado en locura y se ha vuelto altamente volatil",
															"pierde la cabeza y no sabe lo que hace a ciencia cierta"],4)
	}

	this.objetos=
	{
		"salud10":{nombre:"salud +10",pSalud:10,pMagia:0,tienes:0},
		"salud20":{nombre:"salud +20",pSalud:20,pMagia:0,tienes:0},
		"magia10":{nombre:"magia +10",pSalud:0,pMagia:10,tienes:0},
		"magia20":{nombre:"magia +20",pSalud:0,pMagia:20,tienes:0},
		"camaDePaja":{nombre:"cama de paja",pSalud:0,pMagia:20,tienes:0}
	}
	this.sueno=false;
	this.locura=false;
	this.visible=true;

	this.estadoEnElTurno="";
	this.nombre="";
	this.fraseMuerte="yace sobre la escena"
	
	this.pVigorMax=8;
	this.pVidaMax=0;
	this.pAtaqueMax=0;
	this.pDefensaMax=0;
	this.pMagiaMax=0;
	this.pVigor=0;
	this.pVida=0;
	this.pAtaque=0;
	this.pDefensa=0;
	this.pMagia=0;
	this.ataques={};
	this.arma=null;
	this.defensa=null;
	this.valorDelDado=0;
	this.contrincanteFijado=null;
	this.ataqueActual="";

	this.recuperarManual="";
	this.recuperarEn=10;
	this.enAutomatico=false;

	this.iniciar=function()
	{
		this.pVida=this.pVidaMax;
		this.pAtaque=this.pAtaqueMax;
		this.pDefensa=this.pDefensaMax;
		this.pMagia=this.pMagiaMax;
		this.pVigos=this.pVigoMax;	
	}
	this.iniciar_combate=function()
	{
		this.pAtaque=this.pAtaqueMax;
		this.pDefensa=this.pDefensaMax;
		this.pMagia=this.pMagiaMax;	
		for (ata in this.ataques)
		{
			this.ataques[ata].turnosParaEjecutar=0;
		}
		for (est in this.estados)
		{
			this.estados[est].turnos=0;
		}
	}

	this.actualizar_turno=function()
	{
		
		if (this.estadoEnElTurno=="")
		{
			if (this.pVida<=this.recuperarEn)
			{
				if ((this.objetos["salud10"].tienes>0)||(this.objetos["salud20"].tienes>0))
				{
					this.estadoEnElTurno="recuperar";
				}
				else
				{
					this.defender_o_atacar();
				}
			}
			else
			{
				this.estadoEnElTurno="atacar";
				this.elegir_ataque_al_vuelo();
			}
		}
	};
	this.actualizar_estados_alterados=function()
	{
		for (est in this.estados)
		{
			this.estados[est].actualizar_estados_alterados(this);
		}
	}
	this.ejecutar_ataque=function(enemigosLista)
	{
		this.valorDelDado=funcionesDeSalida.aleatorio(1,6);
		ataque=this.ataques[this.ataqueActual]
		
		if (ataque!=null)
		{

			if (ataque.turnosParaEjecutar>=ataque.variosTurnos-1)
			{
				if (ataque.variosTurnos==0)
				{
					frase=funcionesDeSalida.aleatorio(0,ataque.golpe.length-1)
					if (ataque.multiple!=true)
						salida.escribir({tipo:"despues_contenido",cadena:this.articulo+" "+this.nombre+" "+ataque.golpe[frase]+" "+this.contrincanteFijado.nombre});
					else
						salida.escribir({tipo:"despues_contenido",cadena:this.articulo+" "+this.nombre+" "+ataque.golpe[frase]});
				}
				else
				{
					if (ataque.multiple!=true)
						salida.escribir({tipo:"despues_contenido",cadena:this.articulo+" "+this.nombre+" "+ataque.golpe[ataque.golpe.length-1]+" "+this.contrincanteFijado.nombre});
					else
						salida.escribir({tipo:"despues_contenido",cadena:this.articulo+" "+this.nombre+" "+ataque.golpe[ataque.golpe.length-1]});
				}
				ataque.turnosParaEjecutar=0;
				var defensaP=this.contrincanteFijado.evaluar_defensa();
				var ataqueP=this.evaluar_ataque();
				if (ataque.multiple!=true)
				{
					
					if (defensaP>=ataqueP)
					{
						var frase=funcionesDeSalida.aleatorio(0,ataque.fallo.length-1)
						salida.escribir({tipo:"despues_contenido",cadena:ataque.fallo[frase]});
					}
					else
					{
						
						var frase=funcionesDeSalida.aleatorio(0,ataque.acierto.length-1)
						salida.escribir({tipo:"despues_contenido",cadena:ataque.acierto[frase]+" "+this.contrincanteFijado.nombre});
						ataque.evaluar_ataque(this,this.contrincanteFijado);


					}
					this.estadoEnElTurno="";
				}
				else
				{
					if (defensaP>=ataqueP)
					{
						var frase=funcionesDeSalida.aleatorio(0,ataque.fallo.length-1)
						salida.escribir({tipo:"despues_contenido",cadena:ataque.fallo[frase]});
					}
					else
					{
						puntos=ataqueP-defensaP;
						var frase=funcionesDeSalida.aleatorio(0,ataque.acierto.length-1)
						salida.escribir({tipo:"despues_contenido",cadena:ataque.acierto[frase]});
						ene=enemigosLista;
						for (var c=0;c<ene.length;c++)
						{
							ataque.evaluar_ataque(this,ene[c])
						}

					}
					this.estadoEnElTurno="";

				}
			}
			else
			{
				salida.escribir({tipo:"despues_contenido",cadena:this.articulo+" "+this.nombre+" "+ataque.golpe[ataque.turnosParaEjecutar]});
				ataque.turnosParaEjecutar+=1;
			}
		}
	};

	this.ejecutar_recuperacion=function()
	{
		var recuperarEn=0;
		var recuperarFinal=0;
		if (this.recuperarManual=="pocion10")
		{
			if (this.objetos["salud10"].tienes>0)
			{
				recuperarEn=10;
				this.objetos["salud10"].tienes-=1;
			}	
		}
		else if (this.recuperarManual=="pocion20")
		{
			if (this.objetos["salud20"].tienes>0)
			{
				recuperarEn=20;
				this.objetos["salud20"].tienes-=1;
			}	
		}
		else if (this.objetos["salud10"].tienes>0)
		{
			recuperarEn=10;
			this.objetos["salud10"].tienes-=1;
		}
		else if(this.objetos["salud20"].tienes>0)
		{
			recuperarEn=20;
			this.objetos["salud20"].tienes-=1;
		}
		if (this.pVida+recuperarEn<=this.pVidaMax)
		{
			recuperarFinal=recuperarEn;
		}
		else
		{
			recuperarFinal=this.pVidaMax-this.pVida;
		}
		salida.escribir({tipo:"despues_contenido",cadena:this.nombre+" toma una poción de salud y recupera "+recuperarFinal+" de vida"});
		this.pVida+=recuperarFinal;
		this.estadoEnElTurno="";
		this.recuperarManual="";
	};

	this.incrementar_valores_en=function(incrementoVida,incrementoDefensa,incrementoAtaque,incrementoMagia)
	{
		this.pVidaMax+=incrementoVida;
		this.pDefensaMax+=incrementoDefensa;
		this.pAtaqueMax+=incrementoAtaque;
		this.pMagiaMax+=incrementoMagia;
	}
}
Guerrero.prototype.fijar_contrincante=function(lista)
{
	this.contrincanteFijado=lista[funcionesDeSalida.aleatorio(0,lista.length-1)]
	while ((this.contrincanteFijado==null)||(this.contrincanteFijado.pVida<=0))
	{
		this.contrincanteFijado=lista[funcionesDeSalida.aleatorio(0,lista.length-1)]
	}
}
Guerrero.prototype.evaluar_ataque=function()
{
	var valor=this.valorDelDado+this.pAtaque;
	var ataqueAct=this.ataques[this.ataqueActual];
	valor+=ataqueAct.ataque;
	if (this.arma!=null)
	{
		valor+=this.arma.ataque;
	}
	return valor;
}
Guerrero.prototype.evaluar_defensa=function()
{
	var valor=this.valorDelDado+this.pDefensa;
	if (this.defensa!=null)
	{
		valor+=this.defensa.defensa;
	}
	if (this.estadoEnElTurno=="defender")
	{
		valor+=this.pDefensa;
	}
	return valor;
}
Guerrero.prototype.defender_o_atacar=function()
{
	resultado=funcionesDeSalida.aleatorio(1,2)
	if (resultado==1)
	{
		this.estadoEnElTurno="defender";
	}
	else
	{
		this.estadoEnElTurno="atacar";
	}
}
Guerrero.prototype.elegir_ataque_al_vuelo=function()
	{
		if (this.estadoEnElTurno=="atacar")
		{
			keys=Object.keys(this.ataques)
			indice=funcionesDeSalida.aleatorio(0,keys.length-1)
			this.ataqueActual=keys[indice];
			//console.log(this.ataqueActual)
		}
	};
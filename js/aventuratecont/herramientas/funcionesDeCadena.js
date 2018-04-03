var funcionesDeCadena={
	quitar_acentos:function(accion)
	{

		for (var c=0;c<accion.length;c++)
		{
			if(accion.charAt(c)=="á")
				accion=accion.replace("á","a");
			else if(accion.charAt(c)=="é")
				accion=accion.replace("é","e");
			else if(accion.charAt(c)=="í")
				accion=accion.replace("í","i");
			else if(accion.charAt(c)=="ó")
				accion=accion.replace("ó","o");
			else if(accion.charAt(c)=="ú")
				accion=accion.replace("ú","u");
		}
		
		return accion;
	},
	sustituir_caracter_por:function(accion,ch,nch)
	{
		accionAux=accion.slice();
		for (var c=0;c<accionAux.length;c++)
		{
			
			
			if(accionAux.charAt(c)==ch)
			{	
				
				if (ch=="y")
				{
					
					if((c-1>0)&&(accionAux.charAt(c-1)==" "))
						if((c+1<accionAux.length)&&(accionAux.charAt(c+1)==" "))
							accionAux=accionAux.replace(ch,"");

					//else if((c+1<accion.length)&&(accion.charAt(c+1)==" "))
						//accion=accion.replace(ch,"");					
				}

				else if((c+1<accionAux.length)&&(accionAux.charAt(c+1)==" "))
					accionAux=accionAux.replace(ch,"");
				else if((c-1>=0)&&(accionAux.charAt(c-1)==" "))
					accionAux=accionAux.replace(ch,"");
				else
					accionAux=accionAux.replace(ch,nch);
			}
		}
		return accionAux;
	},
	eliminar_espacios_no_necesarios:function(accion)
	{
		aux=accion.split(" ");
		cadena="";
		esp=" ";
		
		for (var c=0;c<aux.length;c++)
		{
			if (c==aux.length-1)
				esp="";
			if ((aux[c]!="")||(aux[c]!=" "))
				cadena+=aux[c].trim()+esp;
		}
		console.log(cadena.indexOf(" "))
		return cadena;
	},
}
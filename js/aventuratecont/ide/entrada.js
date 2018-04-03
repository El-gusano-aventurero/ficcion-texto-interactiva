var entrada={
	cadenaTexto:"",
	//Recibe una cadena de texto, la normaliza y la transforma en una lista generada por los espacios
	normalizar_cadena:function(cadena)
	{
		cadena=cadena.toLowerCase();
		cadena=funcionesDeCadena.quitar_acentos(cadena);
		cadena=funcionesDeCadena.sustituir_caracter_por(cadena,"y"," ");
		cadena=funcionesDeCadena.eliminar_espacios_no_necesarios(cadena);
		cadena=cadena.split(" ");
		cadenaFinal=[];
		cadenaSub="";
		esCadenaTexto=false;
		for (indice=0;indice<cadena.length;indice++)
		{
			if (cadena[indice].startsWith('"'))
			{
				esCadenaTexto=true;

			}
			if (cadena[indice].endsWith('"'))
			{
				esCadenaTexto=false;
				cadenaSub+=cadena[indice];
				cadenaFinal.push(cadenaSub);
				continue

			}

			if(esCadenaTexto)
			{
				cadenaSub+=cadena[indice]+" ";
			}
			else
			{
				cadenaFinal.push(cadena[indice]);
			}
		}
		return cadenaFinal;
	}	
}
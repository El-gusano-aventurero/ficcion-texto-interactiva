var salida={
	cadenasDeSalida:[],
	preCadenaDeSalida:[],
	escribir:function(cadena)
	{
		if (cadena.cadena instanceof Array)
		{
			cadena.cadena=cadena.cadena.join(" ");
		}
		salida.preCadenaDeSalida.push(cadena)
	},
	escribir_en_lista:function(cadenas,tip)
	{
		for (c in cadenas)
		{
			salida.preCadenaDeSalida.push({tipo:tip,cadena:cadenas[c]});
		}
		//salida.cadenasDeSalida=cadenas;
	},
	escribir_en_lote:function(cadenas)
	{
		for (c in cadenas)
		{
			if (cadenas[c].cadena instanceof Array)
			{
				cadenas[c].cadena=cadenas[c].cadena.join(" ");
			}
			salida.preCadenaDeSalida.push(cadenas[c]);
		}
	},
	preparar:function(cadenas)
	{
		for (c in cadenas)
		{
			salida.preCadenaDeSalida.push(cadenas[c])
		}
		//salida.cadenasDeSalida=cadenas;
	},

	obtener:function()
	{
		pre=salida.cadenasDeSalida;
		salida.cadenasDeSalida=[];
		return pre;
	},

	actualizar:function()
	{
		if (salida.preCadenaDeSalida.length>0)
		{
			if(salida.cadenasDeSalida.length<=0)
			{
				pre=salida.preCadenaDeSalida;
				salida.preCadenaDeSalida=[];
				salida.cadenasDeSalida=pre;
			}
		}
	}
}
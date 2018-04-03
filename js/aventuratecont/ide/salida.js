var salida={
	cadenasDeSalida:[],
	preCadenaDeSalida:[],

	insertar_cadenas_de_salida:function(cadenas,tip)
	{
		for (c in cadenas)
		{
			salida.preCadenaDeSalida.push({tipo:tip,cadena:cadenas[c]});
		}
		//salida.cadenasDeSalida=cadenas;
	},

	preparar_cadenas_de_salida:function(cadenas)
	{
		for (c in cadenas)
		{
			salida.preCadenaDeSalida.push(cadenas[c])
		}
		//salida.cadenasDeSalida=cadenas;
	},

	insertar_cadena:function(cadena)
	{
		salida.preCadenaDeSalida.push(cadena)
	},

	devolver_cadenas_de_salida:function()
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
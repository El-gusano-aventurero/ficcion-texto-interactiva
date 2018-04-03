var funcionesDeSalida={

	obtener_texto:function(key)
	{
		if (key in guion.frases)
		{
			var texto="";
			for (var c=0;c<guion.frases[key].length;c++)
			{
				
				texto+=guion.frases[key][c];
			}
			return texto;
		}
		return key;
	},

	obtener_lista:function(key)
	{
		if (key in guion.frases)
		{
			return guion.frases[key];
		}		
	},
	aleatorio:function(inferior,superior){ 
       var resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
      return resAleatorio;
	} 
}
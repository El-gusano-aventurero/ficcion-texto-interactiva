function Bolsillo(clavePropietario,claveAObjetos)
{
	this.propietario=clavePropietario;
	this.maximoObjetos=-1;
	this.contenido=claveAObjetos;

	this.se_puede_insertar_el_objeto=function(elemento)
	{
		var insertar=true;
		aQue=contenido.actores[this.propietario];
		if (aQue==null)
		{
			aQue=contenido.objetos[this.propietario];
		}
		if (elemento.peso<aQue.resistencia)
		{
			if (this.maximoObjetos>-1)
			{
				if (this.contenido.length+1>=this.maximoObjetos)
				{
					insertar=false;
				}
			}
		}
		else
			insertar=false;
		return insertar;
	};
}

Bolsillo.prototype.insertar_objeto=function(elemento)
{
	if (this.se_puede_insertar_el_objeto(elemento))
	{
		elemento.esta=this.propietario;
		this.contenido.push(elemento.clave)
		buclePrincipal.ideUsuario.actualizar_inventario();

		return true;
	}
	return false;
	
}

Bolsillo.prototype.quitar_objeto=function(elemento)
{
	indice=this.contenido.indexOf(elemento.clave);

	if (indice!=-1)
	{
		this.contenido.splice(indice,1);
		buclePrincipal.ideUsuario.actualizar_inventario();
		return true;
	}
	return false;
}

Bolsillo.prototype.obtener_objeto=function(clave)
{
	indice=this.contenido.indexOf(clave);
	if (indice!=-1)
	{
		return this.contenido.objetos[clave];
	}
	return null;
}

Bolsillo.prototype.esta_el_objeto=function(objeto)
{
	if (this.contenido.indexOf(objeto.clave))
	{
		return true;
	}
	return false;
}

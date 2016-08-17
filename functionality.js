	
var cont = 1
contVolteo = 0;
var puntos = 0;
var ArrPar = [0,1];
var aciertos;
var ArrPuntos = new Array();
var ArrNombres = new Array();
var cronometro;
var turnos = 0;
var dificultad;
var jugador;



function creaMemorama()
{
	var DivArray = new Array();
	
	num = dificultad;
	limpiaJuego();
	iniciaCronometro();
	aciertos = num;
	divContenedor = document.getElementById('ContenedorMemorama');
	document.getElementById('VentanaReintento').style.visibility = "hidden";
	
	for(i = 1, cont2 = 0; i<num + 1;i++)
	{		
		
		div = document.createElement('div');
		div.className = "carta";
		div.onclick = cambiaCarta;	
		div.id = 'img' + i + 0;
		DivArray[cont2++] = div;
		
		
		div = document.createElement('div');
		div.className = "carta";
		div.onclick = cambiaCarta;	
		div.id = 'img' + i + 1;
		DivArray[cont2++] = div;
		
		cont++;
	}
	
   for(i=0; i<num*2;)
	{
		r = Math.floor((Math.random()*(num * 2))); 
		if(DivArray[r] != -1)
		{
			divContenedor.appendChild(DivArray[r]);			
			DivArray[r] = -1;
			i++;
		}			
	}
}

function cambiaCarta()
{
	if(this.id.substring(0,3) == 'img')
	{
		if(this.id != ArrPar[0])
		{
			if(contVolteo < 2)
			{
				id = this.id;
				this.style.backgroundImage = "url('" + id.substring(0,4) + ".png')";
				ArrPar[contVolteo++] = id ;
			}
			
			if(contVolteo == 2)
			{
				contVolteo = 3;
				aumentaTurno();
				validaCartas();
			}
		}
	}
	
}

function aumentaTurno()
{
	document.getElementById('turnos').innerHTML = ++turnos;
	puntos--;
	
}

function validaCartas()
{
	if(ArrPar[0].substring(0,4) == ArrPar[1].substring(0,4))
	{
		puntos = puntos+100;
		document.getElementById('marcador').innerHTML = puntos;	
		document.getElementById(ArrPar[0]).id = '0';
		document.getElementById(ArrPar[1]).id = '0';
		aciertos--;
		ArrPar[0] = 0;
		contVolteo = 0;
		if(aciertos == 0)
		{
			detenCron();
			v = document.getElementById('VentanaReintento').style.visibility = "visible";
			document.getElementById('mensaje').innerHTML = "¡Bien hecho! Puntos: " + puntos + " Turnos: " + turnos + " ¿Quieres mejorar tu puntuación?";
			actualizaRecords();
			
		}
	}
	else
	{
		setTimeout(function(){escondeCartas()}, 2000);
	}
	

}

function escondeCartas()
{
	document.getElementById(ArrPar[0]).style.backgroundImage = "url('img0.png')";
	document.getElementById(ArrPar[1]).style.backgroundImage = "url('img0.png')";
	ArrPar[0] = 0;
	contVolteo = 0;
}
/*
function iniciaRecords()
{
	divPadre = document.getElementById('record');
	
	for(i=0;i<10;i++)
	{
		ArrPuntos[i] = 100;
		ArrNombres[i] = 'jugador ' + i;
		
		p = document.createElement('p');
		p.className = "nombre"
		p.innerHTML = ArrNombres[i];
		p.id = 'nombre' + i;
		divPadre.appendChild(p);
		
		p2 = document.createElement('p');
		p2.className = "puntos";
		p2.innerHTML = ArrPuntos[i];
		p2.id = 'puntos' + i;
		divPadre.appendChild(p2);
	}

}

function actualizaRecords()
{
	for(i=0;i<10 && puntos < ArrPuntos[i];i++);
	
	if(i < 10)
	{	
		for(j=9;j > i;j--)
		{
			ArrPuntos[j] = ArrPuntos[j-1];			
			ArrNombres[j] = ArrNombres[j-1];
			document.getElementById('puntos' + j).innerHTML = ArrPuntos[j]; 
			document.getElementById('nombre' + j).innerHTML = ArrNombres[j]; 
		
		}		
	
		ArrPuntos[i] = puntos;
		ArrNombres[i] = jugador;
		document.getElementById('puntos' + i).innerHTML = puntos; 
		document.getElementById('nombre' + i).innerHTML = jugador; 
	}
	


}
*/
function limpiaJuego()
{
	var a=document.getElementById('ContenedorMemorama');
		while(a.hasChildNodes())
		a.removeChild(a.firstChild);	
		
	document.getElementById('marcador').innerHTML = 0;
	document.getElementById('turnos').innerHTML = 0;
	document.getElementById('minutos').innerHTML = 0;
	document.getElementById('segundos').innerHTML = 0;
	turnos = 0;
	puntos = 0;
}

function iniciaCronometro()
{
	contador_s = 0;
	contador_m = 0;
	s = document.getElementById("segundos");
	m = document.getElementById("minutos");
 
   cronometro = setInterval(
      function(){
          if(contador_s==60)
          {
              contador_s=0;
              contador_m++;
              m.innerHTML = contador_m;
 
              if(contador_m==60)
              {
                  contador_m=0;
              }
          }
 
          s.innerHTML = contador_s;
          contador_s++;
 			 puntos--;
      }
      ,1000);
 
}

function detenCron()
{
	clearInterval(cronometro);
}

function muestraVentanaJugador(dif)
{
	
	document.getElementById('Ventana').style.visibility = "visible";	
	document.getElementById("textUsuario").value = "";	
	dificultad = dif;
}

function cerrarVentanaJugador()
{
	
	document.getElementById('Ventana').style.visibility = "hidden";	
}

function cerrarVentanaReintento()
{
	
	document.getElementById('VentanaReintento').style.visibility = "hidden";	
}

function revisaNombre()
{
	
	if((document.getElementById("textUsuario").value != ""))		
	{
		jugador = document.getElementById("textUsuario").value;
		document.getElementById('nombre').innerHTML = document.getElementById("textUsuario").value;
		document.getElementById('Ventana').style.visibility = "hidden";
		creaMemorama()
	}
	else
	{
		alert("Nombre de jugador no válido");
	}


}
function mostrarRecords()
	{
		
		if(window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();		
		}
		else
		{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE6 IE5	
		}
		
	
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			document.getElementById("Puntajes").innerHTML = xmlhttp.responseText;		
		}			
		
	}
	
	xmlhttp.open("GET", "getRecords.php", true);
	xmlhttp.send();
}

function actualizaRecords()
{
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();	
	}
	else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE6 IE5	
	}
		
	xmlhttp.open("GET", "agregaRecord.php?nom="+jugador+"&rec="+puntos, true);
	xmlhttp.send();

}


	

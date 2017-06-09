// look if x is in tab
function is_in(x, tab)
{
	for (var i = 0; i < tab.length; i++)
	{
		if (x == tab[i])
			return true;
	}
	return false;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//take in parameter type of object 1,2 and cable
//0 = torsadé droit
//1 = torsadé croisée
//2 = cable coaxial
//3 = ligne télécom
function good_cable(type_1,type_2, type_cable) {
  //If menu_selected = 5 (Ethernet)
  /*alert(type_1);
  alert(type_2);
  alert(type_cable);
  */
  
  if (type_cable == 1 && type_1 == type_2)
  {
    return true;
  }
  else if( type_cable == 2 && type_1 == type_2 && type_1 == "post")
  {
    return true;
  }
  else if( type_cable == 0 && (type_1 == "post" || type_2 == "post") && type_1 != type_2 )
  {
    return true;
  }
  else if( type_cable == 1 && ((type_1 =="hub" && type_2 == "switch")|| (type_2 =="hub" && type_1 == "switch")))
  {
    return true;
  }
  return false;

}
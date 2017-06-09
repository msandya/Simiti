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
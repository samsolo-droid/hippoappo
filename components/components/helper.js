export function nbr_caracter(valeur_string){
    var resultat  ;
    if (valeur_string.length>2) {
       resultat = valeur_string.substring(0,2).toUpperCase() ;
    }
    else{
       resultat = valeur_string  ;
    }
    return resultat;
  }


  export function nbr_caracter_2(valeur_string){
   var resultat  ;
   if (valeur_string.length>25) {
      resultat = valeur_string.substring(0,25)+"..." ;
   }
   else{
      resultat = valeur_string  ;
   }
   return resultat;
 }
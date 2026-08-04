/*
GIORKI ENERGY QUICK CHECK v2.3

Lettura parametri da Google Apps Script API

+ Google Analytics 4 Event Tracking

*/


let scenari = {};

let parametriCaricati = false;



const API_URL = 
"https://script.google.com/macros/s/AKfycbxCdk79IKgTzyGAAr0bWvJE6ApowCSp7KTDA3_nC0yB06TKTW8wKFZBngysA6M-bNiv9Q/exec";




// CARICAMENTO PARAMETRI

fetch(API_URL)

.then(response => response.json())

.then(data => {

    scenari = data;

    parametriCaricati = true;

    console.log(
      "Parametri caricati:",
      scenari
    );

    console.log(
      "Pulsante trovato:",
      document.getElementById("btnAnalizza")
    );

    const pulsante =
    document.getElementById("btnAnalizza");

    if(pulsante){

      pulsante.disabled = false;

      pulsante.innerHTML = "ANALIZZA";

    }

})

.catch(error => {

    console.error(
      "Errore caricamento API:",
      error
    );

});






function cambiaScenario(){

let energia =
document.getElementById("energia").value;

console.log(
"Scenario:",
energia
);

}






function trovaCluster(energia, consumo){


let gruppi =
scenari[energia];



for(let cluster in gruppi){


    let c =
    gruppi[cluster];



    if(
      consumo >= c.consumoMin &&
      consumo <= c.consumoMax
    ){

      return c;

    }

}



return null;


}






function analizza(){



/****************************************************
 * CONTROLLO CARICAMENTO PARAMETRI
 ****************************************************/


if(!parametriCaricati){


alert(
"Attendere il caricamento dei parametri e riprovare"
);


return;


}






let energia =
document.getElementById("energia").value;





let consumo =
Number(
document.getElementById("consumo").value
);





let prezzoAttuale =
Number(
document.getElementById("prezzoAttuale").value
);





let quotaAttuale =
Number(
document.getElementById("quotaAttuale").value
);







if(!consumo || !prezzoAttuale || !quotaAttuale){


alert(
"Inserisci tutti i dati"
);


return;


}





/****************************************************
 * EVENTO GA4 - ANALISI AVVIATA
 ****************************************************/


if(window.gtag){


console.log(
"GA4 EVENT QUICK CHECK AVVIATO"
);


console.log(
"GTAG:",
window.gtag
);


console.log(
"DATALAYER:",
window.dataLayer
);



gtag(
"event",
"quick_check_avviato",
{

energia: energia,

consumo_annuo: consumo,

prezzo_attuale: prezzoAttuale,

quota_fissa: quotaAttuale

}

);


}
else {


console.log(
"GA4 NON DISPONIBILE"
);


}








let parametro = 

trovaCluster(
energia,
consumo
);







if(!parametro){


alert(
"Nessun parametro disponibile"
);


return;


}







let costoAttuale =


(consumo * prezzoAttuale)

+

(quotaAttuale * 12);







let costoGiokri =


(consumo * parametro.prezzo)

+

(parametro.quota * 12);







let differenza =


costoAttuale - costoGiokri;







let valutazione;





let giudizio;





if(differenza > 20){


giudizio =
"Convenienza possibile";


valutazione =

"<span class='ok'>🟢 Convenienza possibile</span>";


}

else {


giudizio =
"Convenienza limitata";


valutazione =

"<span class='warn'>🟡 Convenienza limitata</span>";


}








document.getElementById("risultato").innerHTML =



"<h3>Analisi GiOKri</h3>" +


"Tipo energia: <b>"+energia+"</b><br>" +


"Cluster: <b>"+parametro.logica+"</b><br><br>" +





"Costo attuale stimato:<br>" +


"<b>€ "+

costoAttuale.toFixed(2)

+"</b><br><br>" +





"Scenario riferimento GiOKri:<br>" +


"<b>€ "+

costoGiokri.toFixed(2)

+"</b><br><br>" +




"Risparmio stimato:<br>" +

"<b>€ "+
differenza.toFixed(2)
+"</b><br><br>" +

valutazione +

"<br><br>" +

"<div class='messaggio-commerciale'>" +

"<b>Hai individuato un possibile risparmio annuo di € " +

differenza.toFixed(2) +

"</b><br><br>" +

"Un consulente GiOKri può verificare gratuitamente " +

"la tua bolletta reale e valutare se il risparmio è concreto."

+

"</div>";





/****************************************************
 * EVENTO GA4 - RISULTATO GENERATO
 ****************************************************/

if(window.gtag){


console.log(
"GA4 EVENT QUICK CHECK RISULTATO"
);



gtag(
"event",
"quick_check_risultato",
{

energia: energia,

cluster: parametro.logica,

risparmio_stimato:
Number(differenza.toFixed(2)),

giudizio: giudizio

}

);


}
else {


console.log(
"GA4 RISULTATO NON DISPONIBILE"
);


}


}


/****************************************************
 * GA4 - CLICK WHATSAPP QUICK CHECK
 ****************************************************/


document.addEventListener(
"click",
function(e){


let link = e.target.closest("a");


if(
link &&
link.href.includes("wa.me")
){


console.log(
"GA4 EVENT QUICK CHECK CONTATTO"
);



if(window.gtag){


gtag(
"event",
"quick_check_contatto",
{

origine:
"quick_check_whatsapp"

}

);


}


}


});

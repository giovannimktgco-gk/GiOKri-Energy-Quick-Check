/*
GIORKI ENERGY QUICK CHECK v1.0

Scenario riferimento modificabile

*/


const scenari = {

LUCE: {

prezzo:0.1489,
quota:8.25,
unita:"kWh"

},


GAS: {

prezzo:0.5636,
quota:8.25,
unita:"Smc"

}

};



function cambiaScenario(){

let energia =
document.getElementById("energia").value;

console.log(
"Scenario:",
energia
);

}




function analizza(){


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



let scenario =
scenari[energia];



let costoAttuale =

(consumo * prezzoAttuale)
+
(quotaAttuale * 12);



let costoGiokri =

(consumo * scenario.prezzo)
+
(scenario.quota * 12);



let differenza =

costoAttuale - costoGiokri;



let valutazione;



if(differenza > 20){

valutazione =
"<span class='ok'>🟢 Convenienza possibile</span>";

}

else {

valutazione =
"<span class='warn'>🟡 Nessuna convenienza evidente</span>";

}



document.getElementById("risultato").innerHTML =


"<h3>Analisi rapida</h3>" +

"Tipo energia: <b>"+energia+"</b><br><br>" +

"Costo attuale stimato:<br>" +

"<b>€ "+
costoAttuale.toFixed(2)
+"</b><br><br>" +

"Scenario GiOKri:<br>" +

"<b>€ "+
costoGiokri.toFixed(2)
+"</b><br><br>" +

"Differenza annua:<br>" +

"<b>€ "+
differenza.toFixed(2)
+"</b><br><br>" +

valutazione;


}
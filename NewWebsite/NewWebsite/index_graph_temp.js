const firebaseConfig = {
    apiKey: "AIzaSyDY7wGtFEKln8NJ3LFDqO26V5dzsEu_Dhs",
    authDomain: "i-det-hetaste-laget-bg4.firebaseapp.com",
    databaseURL: "https://i-det-hetaste-laget-bg4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "i-det-hetaste-laget-bg4",
    storageBucket: "i-det-hetaste-laget-bg4.appspot.com",
    messagingSenderId: "364821865365",
    appId: "1:364821865365:web:29a23ec2b7b918d8be8c9c"
};
// Initialize Firebase & variables
firebase.initializeApp(firebaseConfig);



let TheValue1;
let TheValue2;
let TheValue3;
let TheValue4;
let TheValue5;

const d = new Date();

let Minute = d.getMinutes();
let hourSimon = d.getHours();
let hourHallon = d.getHours();
let hourTerraria = d.getHours();
let hourKlassrum = d.getHours();
let hourLars = d.getHours();

let hour = d.getHours();

hourSimon = hourSimon+1
hourHallon = hourHallon+1
hourTerraria = hourTerraria+1
hourKlassrum = hourKlassrum+1
hourLars = hourLars+1


let dagSimon = 0
let dagHallon = 0
let dagTerraria = 0
let dagKlassrum = 0
let dagLars = 0

let p = 0
let dat
let tim

let TempListSimon = [];
let TempListHallon = [];
let TempListTerraria = [];
let TempListKlassrum = [];
let TempListLars = [];
let HourList = [];

const db = firebase.database();

// Checkar om det är en ny dag och om timmen ska ändras
function otherDayCheck(tim){
    if (tim == -1) {
        let tim = 23;
        return tim;
    }
    else {
        return tim;
    }
}
function otherDayChange(tim,dat) {
    if (tim == -1) {
        return dat - 1;
    }
    else {
        return dat;
    }
}


for(let i=0; i<24;i++){
    HourList.push(hour);
    hour = hour-1;
    hour = otherDayCheck(hour);
}
//Bygger en array för temp
for(let i=0; i<24;i++){
    var TemperatureRef1 = db.ref("SimonsPlats/Dagar-" + dagSimon + "/Hour-" + hourSimon + "/Minute-0/Temperature");
    TemperatureRef1.on("value", (temp) => {
        let TheValue1 = temp.val();
        TempListSimon.push(TheValue1)
        //console.log(TempListSimon)
    });

    hourSimon = hourSimon-1;
    dagSimon = otherDayChange(hourSimon,dagSimon);
    hourSimon = otherDayCheck(hourSimon);

}
for(let i=0; i<24;i++){
    var TemperatureRef2 = db.ref("Hallonrummet/Dagar-" + dagHallon + "/Hour-" + hourHallon + "/Minute-0/Temperature");
    TemperatureRef2.on("value", (temp) => {
        let TheValue2 = temp.val();
        TempListHallon.push(TheValue2)
        //console.log(TempListHallon)
    });

    hourHallon = hourHallon-1;
    dagHallon = otherDayChange(hourHallon,dagHallon);
    hourHallon = otherDayCheck(hourHallon);

}

for(let i=0; i<24;i++){
    var TemperatureRef3 = db.ref("Terrariet/Dagar-" + dagTerraria + "/Hour-" + hourTerraria + "/Minute-0/Temperature");
    TemperatureRef3.on("value", (temp) => {
        let TheValue3 = temp.val();
        TempListTerraria.push(TheValue3)
        console.log(TempListTerraria)
    });

    hourTerraria = hourTerraria-1;
    dagTerraria = otherDayChange(hourTerraria,dagTerraria);
    hourTerraria = otherDayCheck(hourTerraria);

}

for(let i=0; i<24;i++){
    var TemperatureRef4 = db.ref("Klassrum/Dagar-" + dagKlassrum + "/Hour-" + hourKlassrum + "/Minute-0/Temperature");
    TemperatureRef4.on("value", (temp) => {
        let TheValue4 = temp.val();
        TempListKlassrum.push(TheValue4)
        console.log(TempListKlassrum)
    });

    hourKlassrum = hourKlassrum-1;
    dagKlassrum = otherDayChange(hourKlassrum,dagKlassrum);
    hourKlassrum = otherDayCheck(hourKlassrum);

}

for(let i=0; i<24;i++){
    var TemperatureRef5 = db.ref("Lars/Dagar-" + dagLars + "/Hour-" + hourLars + "/Minute-0/Temperature");
    TemperatureRef5.on("value", (temp) => {
        let TheValue5 = temp.val();
        TempListLars.push(TheValue3)
        console.log(TempListLars)
    });

    hourLars = hourLars-1;
    dagLars = otherDayChange(hourLars,dagLars);
    hourLars = otherDayCheck(hourLars);

}

//Grafen
function tempsimPlats(){
TemperatureRef1.once("value").then((snapshot) => {
anychart.onDocumentReady(function () {
    let simonsPlatsTemp = anychart.data.set(getTempData1());

    let thermometerData1 = simonsPlatsTemp.mapAs({ x: 0, value: 1 });

    let chart = anychart.line();

    chart.title('Temperatur: Simons plats');

    chart.yAxis().title('Temperatur ℃');

    chart.xAxis().title('Timmar')

    chart.line(thermometerData1);

    chart.container('simPlats');
    // $('#container').replaceWith('<canvas id="container"></canvas>');
    // var ctxChart = document.getElementById("container").getContext("2d");
    // window.myChart = new Chart(ctxChart).Line(newdata, options);
    chart.draw();
    });

});
}

function tempHallon(){
    TemperatureRef2.once("value").then((snapshot) => {
    anychart.onDocumentReady(function () {
        let HallonTemp = anychart.data.set(getTempData2());
    
        let thermometerData2 = HallonTemp.mapAs({ x: 0, value: 1 });
    
        let chart = anychart.line();
    
        chart.title('Temperatur: Hallonrummet');
    
        chart.yAxis().title('Temperatur ℃');
    
        chart.xAxis().title('Timmar')
    
        chart.line(thermometerData2);
    
        chart.container('hallon');
        // $('#container').replaceWith('<canvas id="container"></canvas>');
        // var ctxChart = document.getElementById("container").getContext("2d");
        // window.myChart = new Chart(ctxChart).Line(newdata, options);
        chart.draw();
        });
    
    });
    }

    function tempTerraria(){
        TemperatureRef3.once("value").then((snapshot) => {
        anychart.onDocumentReady(function () {
            let TerrariaTemp = anychart.data.set(getTempData3());
        
            let thermometerData3 = TerrariaTemp.mapAs({ x: 0, value: 1 });
        
            let chart = anychart.line();
        
            chart.title('Temperatur: Terrariet');
        
            chart.yAxis().title('Temperatur ℃');
        
            chart.xAxis().title('Timmar')
        
            chart.line(thermometerData3);
        
            chart.container('terra');
            // $('#container').replaceWith('<canvas id="container"></canvas>');
            // var ctxChart = document.getElementById("container").getContext("2d");
            // window.myChart = new Chart(ctxChart).Line(newdata, options);
            chart.draw();
            });
        
        });
        }


        function tempKlassrum(){
            TemperatureRef4.once("value").then((snapshot) => {
            anychart.onDocumentReady(function () {
                let KlassrumTemp = anychart.data.set(getTempData4());
            
                let thermometerData4 = KlassrumTemp.mapAs({ x: 0, value: 1 });
            
                let chart = anychart.line();
            
                chart.title('Temperatur: Klassrummet');
            
                chart.yAxis().title('Temperatur ℃');
            
                chart.xAxis().title('Timmar')
            
                chart.line(thermometerData4);
            
                chart.container('klassRum');
                // $('#container').replaceWith('<canvas id="container"></canvas>');
                // var ctxChart = document.getElementById("container").getContext("2d");
                // window.myChart = new Chart(ctxChart).Line(newdata, options);
                chart.draw();
                });
            
            });
            }

            function tempLars(){
                TemperatureRef5.once("value").then((snapshot) => {
                anychart.onDocumentReady(function () {
                    let LarsTemp = anychart.data.set(getTempData5());
                
                    let thermometerData5 = LarsTemp.mapAs({ x: 0, value: 1 });
                
                    let chart = anychart.line();
                
                    chart.title('Temperatur: Lars arbets plats');
                
                    chart.yAxis().title('Temperatur ℃');
                
                    chart.xAxis().title('Timmar')
                
                    chart.line(thermometerData5);
                
                    chart.container('Lars');
                    // $('#container').replaceWith('<canvas id="container"></canvas>');
                    // var ctxChart = document.getElementById("container").getContext("2d");
                    // window.myChart = new Chart(ctxChart).Line(newdata, options);
                    chart.draw();
                    });
                
                });
                }
function getTempData1(){
    return[
    [HourList[23],TempListSimon[23]],
    [HourList[22],TempListSimon[22]],
    [HourList[21],TempListSimon[21]],
    [HourList[20],TempListSimon[20]],
    [HourList[19],TempListSimon[19]],
    [HourList[18],TempListSimon[18]], 
    [HourList[17],TempListSimon[17]],
    [HourList[16],TempListSimon[16]],
    [HourList[15],TempListSimon[15]],
    [HourList[14],TempListSimon[14]],
    [HourList[13],TempListSimon[13]],
    [HourList[12],TempListSimon[12]],
    [HourList[11],TempListSimon[11]],
    [HourList[10],TempListSimon[10]],
    [HourList[9],TempListSimon[9]],
    [HourList[8],TempListSimon[8]],
    [HourList[7],TempListSimon[7]],
    [HourList[6],TempListSimon[6]],
    [HourList[5],TempListSimon[5]],
    [HourList[4],TempListSimon[4]],
    [HourList[3],TempListSimon[3]],
    [HourList[2],TempListSimon[2]], 
    [HourList[1],TempListSimon[1]],
    [HourList[0],TempListSimon[0]],
    ];
}

function getTempData2(){
    return[
        [HourList[23],TempListHallon[23]],
        [HourList[22],TempListHallon[22]],
        [HourList[21],TempListHallon[21]],
        [HourList[20],TempListHallon[20]],
        [HourList[19],TempListHallon[19]],
        [HourList[18],TempListHallon[18]], 
        [HourList[17],TempListHallon[17]],
        [HourList[16],TempListHallon[16]],
        [HourList[15],TempListHallon[15]],
        [HourList[14],TempListHallon[14]],
        [HourList[13],TempListHallon[13]],
        [HourList[12],TempListHallon[12]],
        [HourList[11],TempListHallon[11]],
        [HourList[10],TempListHallon[10]],
        [HourList[9],TempListHallon[9]],
        [HourList[8],TempListHallon[8]],
        [HourList[7],TempListHallon[7]],
        [HourList[6],TempListHallon[6]],
        [HourList[5],TempListHallon[5]],
        [HourList[4],TempListHallon[4]],
        [HourList[3],TempListHallon[3]],
        [HourList[2],TempListHallon[2]], 
        [HourList[1],TempListHallon[1]],
        [HourList[0],TempListHallon[0]],
        ];
    }

function getTempData3(){
    return[
        [HourList[23],TempListTerraria[23]],
        [HourList[22],TempListTerraria[22]],
        [HourList[21],TempListTerraria[21]],
        [HourList[20],TempListTerraria[20]],
        [HourList[19],TempListTerraria[19]],
        [HourList[18],TempListTerraria[18]], 
        [HourList[17],TempListTerraria[17]],
        [HourList[16],TempListTerraria[16]],
        [HourList[15],TempListTerraria[15]],
        [HourList[14],TempListTerraria[14]],
        [HourList[13],TempListTerraria[13]],
        [HourList[12],TempListTerraria[12]],
        [HourList[11],TempListTerraria[11]],
        [HourList[10],TempListTerraria[10]],
        [HourList[9],TempListTerraria[9]],
        [HourList[8],TempListTerraria[8]],
        [HourList[7],TempListTerraria[7]],
        [HourList[6],TempListTerraria[6]],
        [HourList[5],TempListTerraria[5]],
        [HourList[4],TempListTerraria[4]],
        [HourList[3],TempListTerraria[3]],
        [HourList[2],TempListTerraria[2]], 
        [HourList[1],TempListTerraria[1]],
        [HourList[0],TempListTerraria[0]],
        ];
    }

function getTempData4(){
    return[
        [HourList[23],TempListKlassrum[23]],
        [HourList[22],TempListKlassrum[22]],
        [HourList[21],TempListKlassrum[21]],
        [HourList[20],TempListKlassrum[20]],
        [HourList[19],TempListKlassrum[19]],
        [HourList[18],TempListKlassrum[18]], 
        [HourList[17],TempListKlassrum[17]],
        [HourList[16],TempListKlassrum[16]],
        [HourList[15],TempListKlassrum[15]],
        [HourList[14],TempListKlassrum[14]],
        [HourList[13],TempListKlassrum[13]],
        [HourList[12],TempListKlassrum[12]],
        [HourList[11],TempListKlassrum[11]],
        [HourList[10],TempListKlassrum[10]],
        [HourList[9],TempListKlassrum[9]],
        [HourList[8],TempListKlassrum[8]],
        [HourList[7],TempListKlassrum[7]],
        [HourList[6],TempListKlassrum[6]],
        [HourList[5],TempListKlassrum[5]],
        [HourList[4],TempListKlassrum[4]],
        [HourList[3],TempListKlassrum[3]],
        [HourList[2],TempListKlassrum[2]], 
        [HourList[1],TempListKlassrum[1]],
        [HourList[0],TempListKlassrum[0]],
        ];
    }

function getTempData5(){
    return[
        [HourList[23],TempListLars[23]],
        [HourList[22],TempListLars[22]],
        [HourList[21],TempListLars[21]],
        [HourList[20],TempListLars[20]],
        [HourList[19],TempListLars[19]],
        [HourList[18],TempListLars[18]], 
        [HourList[17],TempListLars[17]],
        [HourList[16],TempListLars[16]],
        [HourList[15],TempListLars[15]],
        [HourList[14],TempListLars[14]],
        [HourList[13],TempListLars[13]],
        [HourList[12],TempListLars[12]],
        [HourList[11],TempListLars[11]],
        [HourList[10],TempListLars[10]],
        [HourList[9],TempListLars[9]],
        [HourList[8],TempListLars[8]],
        [HourList[7],TempListLars[7]],
        [HourList[6],TempListLars[6]],
        [HourList[5],TempListLars[5]],
        [HourList[4],TempListLars[4]],
        [HourList[3],TempListLars[3]],
        [HourList[2],TempListLars[2]], 
        [HourList[1],TempListLars[1]],
        [HourList[0],TempListLars[0]],
        ];
    }
tempsimPlats();
tempHallon();
tempTerraria();
tempKlassrum();
tempLars();
































//Refreshing feature, button

// function refresh(){
//     let temporhum = document.getElementById("temp_hum").value;
//     if(temporhum=="humor"){

//     }else if(temporhum=="tempor"){
        
//         hourT = d.getHours();
//         hourT = hourT + 1;
//         dagT = 0;
//         for(let i=0; i<24;i++){
//             TempList.pop();
//             console.log(TempList)
//         }
//         for(let i=0; i<24;i++){
//             var TemperatureRef1 = db.ref("SimonsPlats/Dagar-" + dagT + "/Hour-" + hourT + "/Minute-0/Temperature");
//             TemperatureRef1.on("value", (temp) => {
//                 let TheValue = temp.val();
//                 TempList.push(TheValue)
//                 console.log(TempList)
//             });
            
//             hourT = hourT-1;
//             dagT = otherDayChange(hourT,dagT);
//             hourT = otherDayCheck(hourT);

                
//         }
//         for(let i = 0; i<TempList;i++){
//             TempList = TempList[i];
//         }

//         getTempData1()
//         tempsimPlats();


//     }else{
//         alert("Kalle kula säger error");
//     }
//     let roomval = document.getElementById("room").value;
//     alert("Graph updated, active graph: " + roomval + " & " + temporhum);
    
// }

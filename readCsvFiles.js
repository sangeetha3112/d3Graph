 // Node packages for file system
 var fs = require('fs');
file="input/India2011.csv";
appendFile="input/IndiaSC2011.csv";
appendAnotherFile="input/IndiaST2011.csv";



//merge csv files function
function readAppend(file,appendFile,callback)
{
  var data = fs.readFileSync(appendFile);
//  data.shift();

  console.log("file read");
  fs.appendFileSync(file, data);
  console.log("file appended");
  //});
  callback();
}

//call merge files
readAppend(file,appendFile,function(){
  readAppend(file,appendAnotherFile,function(){
  /*readCSVFileAsync(function(){
    console.log("called in order");
  });*/
    readCSVFileAsync(function(){
    console.log("called in order");
  });
});
});


function readCSVFileAsync(callback){
  const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
const rl = readline.createInterface({
 input: fs.createReadStream('input/India2011.csv')
});

rl.on('line', (line) => {
var lineRecords= line.trim().split(',');;
for(var i=0;i<lineRecords.length;i++){
     if(isHeader){
         header[i]=lineRecords[i];
     }else{

         tempData[header[i]]=lineRecords[i];

        }
}
 jsonData.push(tempData);
tempData={};
isHeader=false;
  //  fs.writeFileSync("data.json",JSON.stringify(jsonData),encoding="utf8");

});
rl.on('close', function() {
console.log("jsonData length="+jsonData.length);
createAgeWiseLiteratePopulationJSON(jsonData);
createEducationCategoryWiseJSON(jsonData);

});


  callback();
}

//filtering age wise literate population
   function createAgeWiseLiteratePopulationJSON( jsonArr ) {
     var ageWiseLiteratePopulation = [];
     var noOfRows = jsonArr.length;
     //console.log();
     console.log("printing number of rows in jsonArr="+noOfRows);

        for (var i = 1; i < noOfRows;i++) {
         if(jsonArr[i]["Age-group"] != 'All ages' && jsonArr[i]["Age-group"] != 'Age not stated' &&  jsonArr[i]["Age-group"] != 'Age-group')
          {
           ageWiseLiteratePopulation[i] = {
             ageGroup : jsonArr[i]['Age-group'],
             population : parseInt(jsonArr[i]['Literate - Persons'])
           };
         }
     }
       console.log("ageWiseLiteratePopulation.length=>"+ageWiseLiteratePopulation.length);
  //  console.log("ageWiseLiteratePopulation.length=>"+ageWiseLiteratePopulation.length);
      var newArray = [];
      for (var i = 0; i < ageWiseLiteratePopulation.length; i++) {
        if (ageWiseLiteratePopulation[i] !== undefined && ageWiseLiteratePopulation[i] !== null && ageWiseLiteratePopulation[i] !== "") {
          newArray.push(ageWiseLiteratePopulation[i]);
        }
       }
      console.log("removing null values="+newArray.length); // == 3

      var temp = {};
      var obj = null;
      for(var i=0; i < newArray.length; i++) {
         obj=newArray[i];

         if(!temp[obj.ageGroup]) {
             temp[obj.ageGroup] = obj;
         } else {
             temp[obj.ageGroup].population += obj.population;
         }
      }
      var result = [];
      for (var prop in temp)
          result.push(temp[prop]);
          console.log("result=>"+JSON.stringify(result));
//console.log("ageWiseLiteratePopulation="+JSON.stringify(ageWiseLiteratePopulation));
     fs.writeFile("output/ageWiseLiteratePopulation.json", JSON.stringify(result,undefined, 2), function (err) {
       if (err) throw err;
       console.log('ageWiseLiteratePopulation JSON file has been successfully created');
     });
   }
   //filtering education category wise json
      function createEducationCategoryWiseJSON( jsonArr ) {
        var educationCategoryWiseJSON = [];
         var noOfRows = jsonArr.length;
        console.log("printing number of rows in json="+noOfRows);
          var count=0;
           for (var i = 1; i < noOfRows; i++) {

                educationCategoryWiseJSON[count] = {
                eduCat:"Literate without educational level",
                catPopulation : parseInt(jsonArr[i]["Educational level - Literate without educational level - Persons"])
              };
                count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Below Primary",
              catPopulation : parseInt(jsonArr[i]["Educational level - Below Primary - Persons"])
            };
            count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Primary",
              catPopulation : parseInt(jsonArr[i]["Educational level - Primary - Persons"])
            };
              count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Middle level",
              catPopulation : parseInt(jsonArr[i]["Educational level - Middle - Persons"])
            };
              count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Matric/Secondary",
              catPopulation : parseInt(jsonArr[i]["Educational level - Matric/Secondary - Persons"])
            };
            count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Higher secondary/Intermediate/Pre-University/Senior secondary",
              catPopulation : parseInt(jsonArr[i]["Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons"])
            };
            count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Non-technical diploma or certificate not equal to degree",
              catPopulation : parseInt(jsonArr[i]["Educational level - Non-technical diploma or certificate not equal to degree - Persons"])
            };
            count++;
              educationCategoryWiseJSON[count] = {
              eduCat:"Technical diploma or certificate not equal to degree",
              catPopulation : parseInt(jsonArr[i]["Educational level - Technical diploma or certificate not equal to degree - Persons"])
            };
            count++;
            educationCategoryWiseJSON[count] = {
            eduCat:"Graduate & above",
            catPopulation : parseInt(jsonArr[i]["Educational level - Graduate & above - Persons"])
            };
            count++;
            educationCategoryWiseJSON[count] = {
            eduCat:"Unclassified",
            catPopulation : parseInt(jsonArr[i]["Educational level - Unclassified - Persons"])
            };
            count++;
        }
        console.log("educationCategoryWiseJSON.length==>"+educationCategoryWiseJSON.length);


        var newArray = [];
        for (var i = 0; i < educationCategoryWiseJSON.length; i++) {
          if (educationCategoryWiseJSON[i] !== undefined && educationCategoryWiseJSON[i] !== null && educationCategoryWiseJSON[i] !== "") {
            if ( !isNaN(educationCategoryWiseJSON[i]['catPopulation'])  && educationCategoryWiseJSON[i]['catPopulation'] !== undefined && educationCategoryWiseJSON[i]['catPopulation'] !== 'null' && educationCategoryWiseJSON[i]['catPopulation'] !== "") {
            newArray.push(educationCategoryWiseJSON[i]);
            }
          }


         }
        console.log("removing NaN values="+newArray.length); // == 3


        var temp = {};
        var obj = null;
        for(var i=0; i < newArray.length; i++) {
           obj=newArray[i];

           if(!temp[obj.eduCat] ) {
               temp[obj.eduCat] = obj;
           } else {

               temp[obj.eduCat].catPopulation += obj.catPopulation;
           }
        }
        var result = [];
        for (var prop in temp)
            result.push(temp[prop]);
            console.log("result=>"+JSON.stringify(result));

        fs.writeFile("output/educationCategoryWiseJSON.json", JSON.stringify(result,undefined, 2), function (err) {
          if (err) throw err;
          console.log('educationCategoryWiseJSON JSON file has been successfully created');
        });
      }

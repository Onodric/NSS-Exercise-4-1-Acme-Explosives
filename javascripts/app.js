"use strict";
var Rokketzorz = (function (oldRocket){
  let categories = [];
  let types = [];
  let products = {};

  oldRocket.getMyData = function(fileUrl){
    return new Promise( (resolve, reject) => {
      $.ajax({
        url: fileUrl
      }).done( (data) => {
        resolve(data);
      }).fail( (error) => {
        reject(error);
      });
    });
  };

  oldRocket.popData = function(stuff){
    categories = stuff[0].categories;
    types = stuff[1].types;
    products = stuff[2].products;
  };

  oldRocket.getCat = () => {
    return categories;
  };

  oldRocket.getType = () => {
    return types;
  };
  oldRocket.getProd = () => {
    return products;
  };

  oldRocket.popSelect = () => {
    let temp = Rokketzorz.getCat();
    for (let i = 0; i < temp.length; i++){
      let $opt = $("<option>", {
        id: temp[i].id
      });
      $opt.html(temp[i].name);
      $('#catsGoHere').append($opt);
    }
  };

  oldRocket.displayProduct = (category) => {
    let $tempCat = $(Rokketzorz.getCat());
    let catID = null;
    $.each($tempCat, (index, val) => {
      if (val.name === category) {
        catID = val.id;
      }
    });
    let $tempType = $(Rokketzorz.getType());
    let $typeID = [];
    $.each($tempType, (index, val) => {
      if (val.categoryId === catID){
        $typeID.push(val);
      }
    });
    let $prod = $(Rokketzorz.getProd()[0]);
    let $disProd = {};
    $.each($typeID, (typeIndex, typeVal) => {
      $.each($prod[0], (prodIndex, prodVal) => {
        if (typeVal.id === prodVal.typeId) {
          $disProd[prodIndex] = prodVal;
        }
      });
    });
    let newRow = $("<div>", {class: $tempCat.name, id: "insertRow" });
    console.log("tempCat: ", $tempCat);
    newRow.addClass('row');
    newRow.html("<h2>" + category + "</h2");
    newRow.appendTo('#insertHere');
    $.each($disProd, (index, val) => {
      Rokketzorz.buildCard(index, val);
    });
  };

  oldRocket.buildCard = (name, obj) => {
    let newCard1 = $("<div>", {class: "col-xs-4"});
    let newCard2 = $("<div>", {class: "col-xs-12 prodCard"});
    let newTitle = $("<h3>");
    newTitle.text(obj.name);
    let newDesc = $("<p>");
    newDesc.text(obj.description);
    newTitle.appendTo(newCard2);
    newDesc.appendTo(newCard2);
    newCard2.appendTo(newCard1);
    newCard1.appendTo('#insertRow');
  };

  return oldRocket;

})(Rokketzorz || {});

function logData(data) {
}

Promise.all([Rokketzorz.getMyData('data/categories.json'), Rokketzorz.getMyData('data/types.json'), Rokketzorz.getMyData('data/products.json')])
.then( (allTheStuff) => {
  Rokketzorz.popData(allTheStuff);
})
.then( () => {
  Rokketzorz.popSelect();
})
.then( () => {
  $("#catsGoHere").change( (event) => {
    $("#insertHere").html('');
    Rokketzorz.displayProduct($('#catsGoHere').val());
  });
});


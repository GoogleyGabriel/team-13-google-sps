//Calls the showInfo method after the whole document loads.
window.onload = init;

//Shows the word that was checked and a brief intro.
function wordFoundAndIntro(word) {
  //Shows the word that was clicked by the user
  const wordFound = document.getElementById("wordFound");
  //Adds the word of the id to the wordFound element
  wordFound.innerText =
    "Word to be checked: " + word;
  //gets the introduction element
  const intro = document.getElementById("wordTitle");
  //Adds the word of the id to the wordTitle element
  intro.innerText =
    "See the latest information about " + word;
}

//Finds the picture of the word on the dictionary.
function addPicture(imageURL) {

      var img = document.createElement("img");
      img.src = imageURL;
      var src = document.getElementById("imageAdded");
      src.appendChild(img);
  
}

// Add information aboout word to info.html
function createDescription(description) {
  // TODO(@SamRod33 or @SofiaPSU): Add to the description by using description.innerText
      document.getElementById("description").innerText += description;
  
}

// Add sources, such as link or references, to the information used for the
// description of the word.
function addSources(sourceURL) {
  // TODO(@SamRod33 or @SofiaPSU): Add to the sources by using source.innerText

      var a = document.createElement('a');
      a.setAttribute('href',sourceURL);
      // a.innerHTML = "Source: "+topics[i].source.sourceName;
      a.innerHTML = "Source: "+ sourceURL;
      document.getElementById('sources').appendChild(a);

}
  function loadJSON(callback) {
    var xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', 'data.json', true);
    // 1. replace './data.json' with the local path of your file
    xObj.onreadystatechange = function() {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
  }
  
  function init() {
    loadJSON(function(response) {
      // 3. parse JSON string into JSON Object
      console.log('response =', response);
      var word = String(localStorage.getItem("rdoIdVarKey"));
      var json = JSON.parse(response);
      wordFoundAndIntro(word);
      addPicture(json[word].image);
      createDescription(json[word].description);
      addSources(json[word].URL);
    
      // var json = JSON.parse(response);
      // console.log('json response=', json);
      //console.log('your local JSON =', JSON.stringify(json, null, 4));
      // 4. render to your page
      // const app = document.querySelector('#app');
      // app.innerHTML = '<pre>' + json[word].description +'<br>' +json[word].image +'<br>'+ json[word].URL + '</pre>';
    });
  }








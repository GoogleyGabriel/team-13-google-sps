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
    "See the latest information about " + word + ".";
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
      document.getElementById("description").innerText += description;
}

function addSourceTags(sourceURL) {
  for(var i = 0; i < sourceURL.length; i++) {
    var idName = "source" + i;
    var p = document.createElement('p');
    p.setAttribute('class', 'source');  
    p.setAttribute('id', idName);
    if(!(i+1 == sourceURL.length)){
    p.innerText = "Sources: ";
    }
    document.getElementById("sources").appendChild(p);
  }
}
// Add sources, such as link or references, to the information used for the
// description of the word.
function addSources(sourceURL) {
  for(var i = 0; i < sourceURL.length; i++) {
    var idName = "source" + i;
    var a = document.createElement('a');
    a.setAttribute('href',sourceURL[i].link);
    a.innerHTML = sourceURL[i].source;
    if(!(i+1 == sourceURL.length)){
      a.innerHTML+=",";
    }
    document.getElementById(idName).appendChild(a);
  }

}
  function loadJSON(callback) {
    var xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', 'words.json', true);
    xObj.onreadystatechange = function() {
        if (xObj.readyState === 4 && xObj.status === 200) {
            //call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
  }
  
  function init() {
    loadJSON(function(response) {
      var word = String(localStorage.getItem("rdoIdVarKey"));
      var json = JSON.parse(response);
      wordFoundAndIntro(word);
      addPicture(json[word].image);
      createDescription(json[word].description);
      addSourceTags(json[word].URL);
      addSources(json[word].URL);
    });
  }








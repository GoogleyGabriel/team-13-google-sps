//Calls the showInfo method after the whole document loads.
window.onload = showInfo;

const topics = [
  {
    name: "Example",
    img:
      "https://www.pngkey.com/png/detail/137-1377101_example-stamp-png-graphic-black-and-white-stock.png",
    introduction:
      "This is an example description. A full and real description will be provided later on",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    source: {sourceName: "The Example organization", sourceUrl: "www.google.com"}
  }, 
];

//Shows the information about the word that was choosen.
async function showInfo() {
  wordFoundAndIntro();
  addPicture();
  createDescription();
  addSources();
}

//Shows the word that was checked and a brief intro.
function wordFoundAndIntro() {
  //Shows the word that was clicked by the user
  const wordFound = document.getElementById("wordFound");
  //Adds the word of the id to the wordFound element
  wordFound.innerText =
    "Word to be checked: " + localStorage.getItem("rdoIdVarKey");
  //gets the introduction element
  const intro = document.getElementById("wordTitle");
  //Adds the word of the id to the wordTitle element
  intro.innerText =
    "See the latest information about " + localStorage.getItem("rdoIdVarKey");
}

//Finds the picture of the word on the dictionary.
function addPicture() {
  for (var i in topics) {
    if (topics[i].name == localStorage.getItem("rdoIdVarKey")) {
      var img = document.createElement("img");
      img.src = topics[i].img;
      var src = document.getElementById("imageAdded");
      src.appendChild(img);
    }
  }
}

// Add information aboout word to info.html
function createDescription() {
  // TODO(@SamRod33 or @SofiaPSU): Add to the description by using description.innerText

    for (var i in topics) {
    if (topics[i].name == localStorage.getItem("rdoIdVarKey"))
      document.getElementById("description").innerText += topics[i].description;
  }
}

// Add sources, such as link or references, to the information used for the
// description of the word.
function addSources() {
  // TODO(@SamRod33 or @SofiaPSU): Add to the sources by using source.innerText

  for (var i in topics) {
    if (topics[i].name == localStorage.getItem("rdoIdVarKey")){
      var a = document.createElement('a');
      a.setAttribute('href',topics[i].source.sourceUrl);
      a.innerHTML = "Source: "+topics[i].source.sourceName;
      document.getElementById('sources').appendChild(a);
    }
  }

}

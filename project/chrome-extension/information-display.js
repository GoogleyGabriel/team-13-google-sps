//Calls the showInfo method after the whole document loads.
window.onload = showInfo;

//Shows the information about the word that was choosen.
async function showInfo(){

  wordFoundAndIntro();
  createDescription();
  addSources();
}

//Shows the word that was checked and a brief intro.
function wordFoundAndIntro(){
   //Shows the word that was clicked by the user
   const wordFound = document.getElementById("wordFound");
   //Adds the word of the id to the wordFound element
   wordFound.innerText = "Word to be checked: " + localStorage.getItem("rdoIdVarKey");
   //gets the introduction element
   const intro = document.getElementById("wordTitle");
    //Adds the word of the id to the wordTitle element
   intro.innerText = "See the latest information about " + localStorage.getItem("rdoIdVarKey");
}

// Add information aboout word to info.html
function createDescription(){
  const description = document.getElementbyId("description");
  // TODO(@SamRod33 or @SofiaPSU): Add to the description by using description.innerText
}

// Add sources, such as link or references, to the information used for the
// description of the word.
function addSources(){
  const source = document.getElementById("sources");
  // TODO(@SamRod33 or @SofiaPSU): Add to the sources by using source.innerText
}

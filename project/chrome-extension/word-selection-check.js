//Checks if the "Check" button is clicked. Then, runs the checkIfChecked function
document.getElementById("btnCheck").addEventListener('click', checkIfChecked);

//Checks which radio button was check, then sends the id as a parameter for the readWord function.
function checkIfChecked(){

  if(document.getElementById("COVID-19").checked == true){
    readWord("COVID-19");
  }
  else if(document.getElementById("Vaccines").checked == true){
    readWord("Vaccines");
  }
  else if(document.getElementById("Elections").checked == true){
    readWord("Elections");
  }
  else if(document.getElementById("ClimateChange").checked == true){
    readWord("Climate Change");
  }
  else
    return null;

}
//Reads the id of the element (button) that has been clicked.
function readWord(button){
  //To see if the value is the one we wanted.
  console.log(button);
  //Adds the parameter to the local storage. To be used later.
  localStorage.setItem("rdoIdVarKey", button);
  //Opens the info.html file
  location.replace("./info.html");
}
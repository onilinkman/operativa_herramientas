
var simplex=new Simplex()

function startInputMatrix(){
    addTextTitle("content-matrix","Ingrese los datos")
    let variables=document.getElementById("nro_var")
    if(variables.value){
        simplex.addInputVariables("content-matrix",variables.value)
    }else{
        alert("Ingrese valor de variable")
    }
}

/**
 * 
 * @param {Text} nameContent es
 * @param {Text} text 
 */
function addTextTitle(nameContent,text){
    let title=document.createElement("h2");
    title.id="title-text";
    title.appendChild(document.createTextNode(text))
    let content=document.getElementById(nameContent)
    content.appendChild(title)
}

/**
 * add a set of variables
 */
function addVariable(){
    Simplex.addVariable()
}
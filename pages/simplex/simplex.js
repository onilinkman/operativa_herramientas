
var simplex=new Simplex()

function startInputMatrix(){
    addTextTitle("content-matrix","Ingrese los datos")
    let variables=document.getElementById("nro_var").value;
    let constraint=document.getElementById("nro_constraint").value;
    if(variables && constraint){
        simplex.addInputVariables("content-matrix",variables)
        simplex.addInputRestrictionMatrix("content-matrix",variables,constraint)
        simplex.addButtonGetData("content-matrix")
    }else{
        alert("Ingrese valor de variables y restricciones")
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

function closeThisWindow(){
    window.close()
}
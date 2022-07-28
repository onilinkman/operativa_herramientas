
class Simplex{

    //variables=0
    //restrictions=0
    arrayVariables=[]
    matrixRestriction=[]

    constructor(){
        //this.variables=variables;
        //this.restrictions=restrictions
    }

    /**
     * 
     * @param {Text} nameConteiner 
     * @param {Number} variables 
     */
    addInputVariables(nameConteiner,variables){
        this.deleteInputVariables("variables-conteiner")
        this.arrayVariables=[]
        let conteiner=document.getElementById(nameConteiner)
        let newDiv=document.createElement("div")
        newDiv.id="variables-conteiner"
        newDiv.className="variables-conteiner"
        for(let i=1;i<=variables;i++){
            var input=document.createElement("input")
            input.className="input-variables"
            this.arrayVariables.push(input)
            let textNode=this.generateTextX(i)
            newDiv.appendChild(input)
            newDiv.appendChild(textNode)
        }
        conteiner.appendChild(newDiv)
    }

    generateTextX(i){
        let textNode=document.createElement("p")
        textNode.appendChild(document.createTextNode("X"))
        let subtext=document.createElement("sub")
        subtext.appendChild(document.createTextNode(i))
        textNode.appendChild(subtext)
        //textNode.appendChild(document.createTextNode("="))
        textNode.style="color:white"
        return textNode
    }

    deleteInputVariables(elementName){
        let Div=document.getElementById(elementName)
        if(Div){
            Div.remove();
        }
    }

    addInputRestrictionMatrix(nameCointeiner,variables,restrictions){
        this.deleteInputVariables("resctriction-conteiner")
        this.matrixRestriction=[]
        let conteiner=document.getElementById(nameCointeiner);
        let newDiv=document.createElement("div")
        variables=parseInt(variables)
        newDiv.id="resctriction-conteiner"
        newDiv.className="resctriction-conteiner"
        let rowDiv=document.createElement("div")
        rowDiv.className="row-restrictions"
        
        for(let i=0;i<restrictions;i++){
            let columnDiv=document.createElement("div")
            columnDiv.className="column-restrictions"
            let row=[]
            let lowEquals=document.createElement("p");
            lowEquals.appendChild(document.createTextNode("≤"))
            for(let j=1;j<=variables+1;j++){
                let textNode=j<=variables?this.generateTextX(j):lowEquals;
                let input=document.createElement("input")
                input.className="input-variables"
                row.push(input)
                columnDiv.appendChild(j<=variables?input:textNode)
                columnDiv.appendChild(j<=variables?textNode:input);
            }
            this.matrixRestriction.push(row)
            rowDiv.appendChild(columnDiv)
        }
        newDiv.appendChild(rowDiv)
        conteiner.appendChild(newDiv)
    }

    addButtonGetData(nameCointeiner){
        this.deleteInputVariables("start-procedure")
        let conteiner=document.getElementById(nameCointeiner)
        let newDiv=document.createElement("div")
        newDiv.id="start-procedure"
        newDiv.className="conteiner-btn"
        let newButton=document.createElement("button")
        newButton.className="startProcedure"
        newButton.appendChild(document.createTextNode("Iniciar procedimiento"))
        newButton.onclick=()=>{
            this.getDataMatrix()
        }
        newDiv.appendChild(newButton)
        conteiner.appendChild(newDiv)
    }

    getDataMatrix(){
        let row=""
        for(let i=0;i<this.matrixRestriction.length;i++){
            console.log(this.matrixRestriction)
        }
    }
}

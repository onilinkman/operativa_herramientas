
class Simplex{

    //variables=0
    //restrictions=0
    arrayVariables=[]

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
        this.deleteInputVariables()
        let conteiner=document.getElementById(nameConteiner)
        let newDiv=document.createElement("div")
        newDiv.id="variables-conteiner"
        newDiv.className="variables-conteiner"
        for(let i=0;i<variables;i++){
            var input=document.createElement("input")
            input.className="input-variables"
            this.arrayVariables.push(input)
            let textNode=document.createElement("p")
            textNode.appendChild(document.createTextNode("X"))
            let subtext=document.createElement("sub")
            subtext.appendChild(document.createTextNode(i+1))
            textNode.appendChild(subtext)
            textNode.appendChild(document.createTextNode("="))
            textNode.style="color:white"
            newDiv.appendChild(textNode)
            newDiv.appendChild(input)
        }
        conteiner.appendChild(newDiv)
        
    }

    deleteInputVariables(){
        let Div=document.getElementById("variables-conteiner")
        if(Div){
            Div.remove();
        }
    }
}

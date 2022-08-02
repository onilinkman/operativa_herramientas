class Simplex {
	//variables=0
	//restrictions=0
	arrayVariables = [];
	matrixRestriction = [];

	standarMatrix = [];

	/**
	 * Se guardan los pasos de las iterraciones
	 */
	stepsArray = [];

	constructor() {
		//this.variables=variables;
		//this.restrictions=restrictions
	}

	/**
	 *
	 * @param {Text} nameConteiner
	 * @param {Number} variables
	 */
	addInputVariables(nameConteiner, variables) {
		this.deleteInputVariables("variables-conteiner");
		this.arrayVariables = [];
		let conteiner = document.getElementById(nameConteiner);
		let newDiv = document.createElement("div");
		newDiv.id = "variables-conteiner";
		newDiv.className = "variables-conteiner";
		for (let i = 1; i <= variables; i++) {
			var input = document.createElement("input");
			input.className = "input-variables";
			this.arrayVariables.push(input);
			let textNode = this.generateTextX(i);
			newDiv.appendChild(input);
			newDiv.appendChild(textNode);
		}
		conteiner.appendChild(newDiv);
	}

	generateTextX(i) {
		let textNode = document.createElement("p");
		textNode.appendChild(document.createTextNode("X"));
		let subtext = document.createElement("sub");
		subtext.appendChild(document.createTextNode(i));
		textNode.appendChild(subtext);
		//textNode.appendChild(document.createTextNode("="))
		textNode.style = "color:white";
		return textNode;
	}

	deleteInputVariables(elementName) {
		let Div = document.getElementById(elementName);
		if (Div) {
			Div.remove();
		}
	}

	addInputRestrictionMatrix(nameCointeiner, variables, restrictions) {
		this.deleteInputVariables("resctriction-conteiner");
		this.matrixRestriction = [];
		let conteiner = document.getElementById(nameCointeiner);
		let newDiv = document.createElement("div");
		variables = parseInt(variables);
		newDiv.id = "resctriction-conteiner";
		newDiv.className = "resctriction-conteiner";
		let rowDiv = document.createElement("div");
		rowDiv.className = "row-restrictions";

		for (let i = 0; i < restrictions; i++) {
			let columnDiv = document.createElement("div");
			columnDiv.className = "column-restrictions";
			let row = [];
			let lowEquals = document.createElement("p");
			lowEquals.appendChild(document.createTextNode("≤"));
			for (let j = 1; j <= variables + 1; j++) {
				let textNode =
					j <= variables ? this.generateTextX(j) : lowEquals;
				let input = document.createElement("input");
				input.className = "input-variables";
				row.push(input);
				columnDiv.appendChild(j <= variables ? input : textNode);
				columnDiv.appendChild(j <= variables ? textNode : input);
			}
			this.matrixRestriction.push(row);
			rowDiv.appendChild(columnDiv);
		}
		newDiv.appendChild(rowDiv);
		conteiner.appendChild(newDiv);
	}

	addButtonGetData(nameCointeiner) {
		this.deleteInputVariables("start-procedure");
		let conteiner = document.getElementById(nameCointeiner);
		let newDiv = document.createElement("div");
		newDiv.id = "start-procedure";
		newDiv.className = "conteiner-btn";
		let newButton = document.createElement("button");
		newButton.className = "startProcedure";
		newButton.appendChild(document.createTextNode("Iniciar procedimiento"));
		newButton.onclick = () => {
			if (!this.getDataMatrix()) {
				alert("llene todos los datos");
			}
		};
		newDiv.appendChild(newButton);
		conteiner.appendChild(newDiv);
	}

	getDataMatrix() {
		let row = "";
		this.standarMatrix = [];
		let c = [1];
		let nro_variables = this.arrayVariables.length;
		let nro_procedure = this.matrixRestriction.length;
		for (let i = 0; i < nro_variables + nro_procedure; i++) {
			if (i < nro_variables && !this.arrayVariables[i].value) {
				return false;
			}
			c.push(
				i < nro_variables
					? -1 * parseFloat(this.arrayVariables[i].value)
					: 0
			);
		}
		c.push(0);
		this.standarMatrix.push(c);
		for (let i = 0; i < nro_procedure; i++) {
			let row = [0];
			let r = this.matrixRestriction[i];
			for (let j = 0; j < nro_procedure + r.length - 1; j++) {
				if (j < nro_variables && !r[j].value) {
					return false;
				}
				row.push(
					j < nro_variables
						? parseFloat(r[j].value)
						: j - (r.length - 1) == i
						? 1
						: 0
				);
			}
			row.push(parseFloat(r[r.length - 1].value));
			this.standarMatrix.push(row);
		}
		console.log(this.standarMatrix);
		return true;
	}

	isConditionComplete() {
		console.log(this.solveStepToStep(this.standarMatrix.slice()));
	}

	solveStepToStep(m) {
		if (this.isArrayPositive(m[0])) return "todo es positivo";
		if (!this.existsMatrixIdentity(m)) return "error";
		var { pointer, pivotFlag, pivot } = this.searchPivot(m);
		//var m = this.standarMatrix.slice();
		console.log("searchPivot", pointer, pivotFlag, pivot);

		this.splitPivot(m, pivotFlag, pivot);
		this.solveMatrix(m, pivotFlag, pointer);
		this.stepsArray.push(m);
		console.log(this.solveStepToStep(m.slice()));
	}

	isArrayPositive(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] < 0) {
				return false;
			}
		}
		return true;
	}

	existsMatrixIdentity(matrix) {
		let arrAux = [];

		for (let j = 1; j < matrix[0].length - 1; j++) {
			let content = matrix[0];
			if (content[j] == 0) {
				let sum = 0;
				for (let k = 1; k < matrix.length; k++) {
					if (matrix[k][j] == 1 && sum == 0) {
						arrAux.push(k);
					}
					sum += matrix[k][j];
				}
				if (sum > 1) {
					arrAux.pop();
				}
			}
		}

		for (let i = 0; i < arrAux.length; i++) {
			if (!arrAux[arrAux[i] - 1]) {
				return false;
			}
			if (arrAux[arrAux[i] - 1] > 0) {
				arrAux[arrAux[i] - 1] *= -1;
			} else {
				return false;
			}
		}
		console.log(matrix.length - 1, arrAux.length);
		return matrix.length - 1 === arrAux.length;
	}

	searchPivot(m) {
		let pointer = this.moreNegative(m[0]);
		let pivotFlag = this.returnPivotFlag(m, pointer);

		let pivot = m[pivotFlag][pointer];
		return { pointer: pointer, pivotFlag: pivotFlag, pivot: pivot };
	}

	moreNegative(arr) {
		let n = 0;
		let pointer = 0;
		for (let i = 1; i < arr.length - 1; i++) {
			if (arr[i] < n) {
				n = arr[i];
				pointer = i;
			}
		}
		console.log("pointer", pointer);
		return pointer;
	}

	returnPivotFlag(m, pointer) {
		let n = m[1][m[1].length - 1] / m[1][pointer];
		let pivotFlag = 1;
		for (let i = 1; i < m.length; i++) {
			if (m[i][pointer] <= 0) {
				continue;
			}
			let aux = m[i][m[i].length - 1] / m[i][pointer];
			console.log("aux", aux);
			if (aux < n) {
				pivotFlag = i;
				n = aux;
			}
		}
		console.log("pivotFlag", pivotFlag);
		return pivotFlag;
	}

	splitPivot(m, pivotFlag, pivot) {
		console.log(m, m[pivotFlag]);
		let arr = m[pivotFlag];
		console.log(arr);
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i] / pivot;
		}
		console.log("split", arr);
	}

	solveMatrix(m, pivotFlag, pointer) {
		for (let i = 0; i < m.length; i++) {
			if (i === pivotFlag) continue;
			let aux = -1 * m[i][pointer];
			for (let j = 0; j < m[i].length; j++) {
				m[i][j] += aux * m[pivotFlag][j];
			}
		}
		console.log("solveMatrix", m);
	}
}

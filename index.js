const listTools = [
	{
		name: 'Metodo Simplex',
		description: 'Modulo para resolver por el metodo Simplex',
	},
];

var wind;

const CreateCard = () => {
	let newDiv = document.createElement('div');
	let newA = document.createElement('a');
};

function abrirVentana() {
    
    if(!wind){
        wind=window.open(
            './pages/simplex/simplex.html',
            '_blank',
            `frame=false,nodeIntegration=no,`
        );
    }else{
        if(!wind.closed){
            alert("ya tiene abierto esta ventana")
        }else{
            wind=window.open(
                './pages/simplex/simplex.html',
                '_blank',
                `frame=false,nodeIntegration=no,`
            );
        }
    }

}

function closeVentana(){
    wind.close();
}
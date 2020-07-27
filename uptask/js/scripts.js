eventListeners();
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    //boton para crear proyecto
    var btnCrear = document.querySelector('.crear-proyecto a');
    btnCrear.addEventListener('click', nuevoProyecto);
    btnCrear.disabled = true;

    //boton para una nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

}

function nuevoProyecto(e){
    e.preventDefault();

    //creacion de input para nuevo proyecto
    var newProyect = document.createElement('li');
    newProyect.className += "cont-proyect";
      
    newProyect.innerHTML = 
    `
        <input type="text" id="nuevo-proyecto">

        <div class="cont-btn">
            <a id="add"class="btn"><i class="fas fa-plus-square"></i></a>
            <a id="delete" class="btn"><i class="fas fa-minus-square"></i></a>
        </div>
    `; 

    listaProyectos.appendChild(newProyect);

    var inputNewProyect = document.querySelector('input#nuevo-proyecto');
    var botonAgregar = document.querySelector('#add');
    var botonEliminar = document.querySelector('#delete');

    //al presionar boton agregar
    botonAgregar.addEventListener('click', () => {
        guardarProyectoDB(inputNewProyect.value);
        listaProyectos.removeChild(newProyect);
    });
    //al presionar boton eliminar
    botonEliminar.addEventListener('click', () => {
        listaProyectos.removeChild(newProyect);
    });
    //al presionar enter se creara el proyecto
    inputNewProyect.addEventListener('keypress', (e) => {
        
        var tecla = e.key;

        if(tecla === 'Enter'){
            guardarProyectoDB(inputNewProyect.value);
            listaProyectos.removeChild(newProyect);
        }
    });
}


function guardarProyectoDB(nombreProyecto){

    var xhr = new XMLHttpRequest();

    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    xhr.open('post', 'includes/modelos/modelo-proyecto.php', true);

    xhr.onload = function() {

        if(this.status === 200){
            var respuesta = JSON.parse(xhr.responseText);

            var proyecto = respuesta.proyecto,
                id_proyecto = respuesta.id,
                tipo = respuesta.accion,
                resultado = respuesta.res;

            if(resultado === 'correcto'){
                if(tipo === 'crear'){

                    var nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}">
                            ${proyecto}
                        </a>                                         
                    `;

                    listaProyectos.appendChild(nuevoProyecto);

                    swal ( "Perfecto!" , 
                    "el proyecto '" + proyecto + "' se añadio correctamente",
                    "success" )
                
                    //REDIRECCIONAR A LA NUEVA URL
                    .then(resultado => {
                        if(resultado.value === true){
                            window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                        }
                    })

                }               
            }

            else{
                swal ( "Oops!" , 
               "Hubo un error",
               "error" );
            }

        }
    }

    xhr.send(datos);
}


function agregarTarea(e){
    e.preventDefault();

    var nombreTarea = document.querySelector('.nombre-tarea').value;
    var idProyecto = document.querySelector('#id_proyecto').value;

    if(nombreTarea === ''){
        swal ( "Oops!" , 
        "Una tarea no puede ir vacia",
        "error" );
    }
    else{
        //si la tarea tiene algo, insertar en PHP mediante AJAX

        //datos que se envian al servidor
        var datos =  new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('id', idProyecto);
        datos.append('accion', 'crear');
        
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);

        xhr.onload = function(){
            if(this.status === 200){
                var respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);

                //si es una nueva tarea
                if(respuesta.accion === 'crear') {
                    swal ( "Tarea creada correctamente", 
                        "",
                        "success" );
                }
            }
            
        }

        xhr.send(datos);

    }
}

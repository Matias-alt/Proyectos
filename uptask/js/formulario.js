function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value;
    var password = document.querySelector('#password').value;
    var tipo = document.querySelector('#tipo').value;

    if(usuario === '' && password === ''){
        swal ( "Oops!" , 
               "Los campos son obligatorios",
               "error" );
    }

    else if(usuario === ''){
        swal ( "Oops!" , 
               "El campo usuario es obligatorio",
               "error" );
    }

    else if(password === ''){
        swal ( "Oops!" , 
               "El campo password es obligatorio",
               "error" );
    }

    else{

        //datos que se envian al servidor
        var datos =  new FormData();
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);

        //llamado AJAX

        var xhr = new XMLHttpRequest();

        //abrir la conexion
        xhr.open('POST', 'includes/modelos/modelo-admin.php', true);

        //retorno de datos
        xhr.onload = function() {
            
            if(this.status === 200) {
                var respuesta = JSON.parse(xhr.responseText);

                //Si la respuesta es correcta
                if(respuesta.res === 'correcto') {
                    
                    //Si es un nuevo usuario
                    if(respuesta.tipo === 'crear') {
                        swal ( "Te has registrado con exito" , 
                            "",
                            "success" );
                    }

                    //Si es un usuario logueado
                    else if(respuesta.tipo === 'login') {
                        swal ( "Bienvenido " + respuesta.nombre , 
                            "Presiona OK para abrir el dashboard",
                            "success" )
                        .then(resultado => {
                            if(resultado.value === true){
                                window.location.href = 'index.php';
                            }
                        })
                    }                    
                }
                else {
                    swal ( "Usuario o Password incorrecto" , 
                            "Intente nuevamente",
                            "error" );
                }
            }
            else {
                console.log('algo salio mal');
            }
        }

        //Enviar la peticion
        xhr.send(datos);
    }

}

eventListeners();
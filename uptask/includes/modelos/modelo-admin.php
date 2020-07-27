<?php

//die(json_encode($_POST));   forma recomendada para verificar si los datos del formulario.js
                            //se estan enviando correctamente al archivo php (modelo-admin.php)

$accion = $_POST['accion'];
$usuario = $_POST['usuario'];
$password = $_POST['password'];

if($accion === 'crear'){
    //codigo para crear los usuarios

    // hashear passwords
    $opciones = array(
        'cost' => 12
    );

    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

    
    include '../funciones/conexion.php';

    try {
    //usar prepare statement previene la inyeccion sql

        $stmt = $conn->prepare("INSERT INTO usuarios (user_name, user_pass) VALUES (?, ?) ");
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();

        if($stmt->affected_rows === 1) {
            $respuesta = array(
                'res' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
            );
        }

        else{
            $respuesta = array(
                'res' => 'error'
            );
        }

        $stmt->close();
        $conn->close();


    } catch(Exception $e){
        $respuesta = array(
            'pass' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}


if($accion === 'login'){
    //codigo que loguee a los usuarios

    include '../funciones/conexion.php';

    try {
        //Seleccionar el administrador de la bd
        
        $stmt = $conn->prepare("SELECT user_id, user_name, user_pass FROM usuarios WHERE user_name = ?");
        $stmt->bind_param('s', $usuario);
        $stmt->execute();

        //Loguear el usuario
        $stmt->bind_result($user_id, $user_name, $user_pass);
        $stmt->fetch();
        
        if($user_name){ //si existe esta variable
            if(password_verify($password, $user_pass)){
                //Iniciar sesion
                session_start();
                $_SESSION['nombre'] = $user_name;
                $_SESSION['id'] = $user_id;
                $_SESSION['login'] = true;
                
                //login correcto
                $respuesta = array(
                    'tipo' => $accion,
                    'res' => 'correcto',
                    'id' => $user_id,
                    'nombre' => $user_name,
                    'pass' => $user_pass
                ); 
            }
            else{
                //login incorrecto, enviar error
                $respuesta = array(
                    'res' => 'login incorrecto'
                );
            }           
        }

        else{
            $respuesta = array (
                'error' => 'Usuario no existe'
            );
        }

        $stmt->close();
        $conn->close();


    
    } catch(Exception $e){
        $respuesta = array(
            'pass' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}
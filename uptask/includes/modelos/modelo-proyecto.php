<?php

$proyecto = $_POST['proyecto'];
$accion = $_POST['accion'];

if($accion === 'crear'){

    include '../funciones/conexion.php';

    try{
        $stmt = $conn->prepare("INSERT INTO proyectos (nombre) VALUES(?) ");
        $stmt->bind_param('s', $proyecto);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $respuesta = array(
                'res' => 'correcto',
                'id' => $stmt->insert_id,
                'proyecto' => $proyecto,
                'accion' => $accion
            );
        }
        else{
            $respuesta = array(
                'res' => 'error'
            );
        }

        $stmt->close();
        $conn->close();
    }
    catch(Exception $e){
        $respuesta = array(
            'res' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}
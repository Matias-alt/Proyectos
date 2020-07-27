<?php

$nombreTarea = $_POST['tarea'];
$idTarea = $_POST['id'];
$accion = $_POST['accion'];

if($accion === 'crear'){

    include '../funciones/conexion.php';

    try{
        $stmt = $conn->prepare("INSERT INTO tareas (nombre, id_proyecto) VALUES(?,?) ");
        $stmt->bind_param('si', $nombreTarea, $idTarea);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $respuesta = array(
                'res' => 'correcto',
                'accion' => $accion,
                'id_tarea' => $stmt->insert_id,
                'tarea' => $nombreTarea,
                'id_proyecto' => $idTarea
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


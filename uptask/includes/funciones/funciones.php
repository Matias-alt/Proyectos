<?php

//CONSULTAS

//Obtener todos los proyectos
function obtenerProyectos(){
    include "conexion.php";

    try{
        return $conn->query("SELECT id, nombre FROM proyectos");
    }
    catch(Exception $e){
        echo "Error: ".$e->getMessage();
        return false;
    }
}

//Obtener el nombre del proyecto
function obtenerNombre($id = null){
    include "conexion.php";

    try{
    return $conn->query("SELECT nombre FROM proyectos WHERE id = {$id}");
    }
    catch(Exception $e){
        echo "Error: ".$e->getMessage();
        return false;
    }
}
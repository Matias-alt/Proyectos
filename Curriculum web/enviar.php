<?php
    $nombre = $_POST['nombre'];
    $razonSocial = $_POST['razonSocial'];
    $mensaje = $_POST['mensaje'];

    $correoDestino = 'mat.altamirano.22@gmail.com';
    $header = "Enviado desde curriculum web";  
    $asunto = 'Oferta Laboral!';

    mail($correoDestino, $asunto, $msn, $header);

    header("Location:index.html");
?>


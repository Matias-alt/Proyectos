<?php 
    include 'includes/funciones/sesiones.php';
    include 'includes/funciones/funciones.php';
    include 'includes/templates/header.php';

    //Obtener ID del proyecto por la URL
    if(isset($_GET['id_proyecto'])){
        $id_proyecto = $_GET['id_proyecto'];

    }

?>

<body>

<?php include 'includes/templates/barra.php'; ?>

<div class="contenedor">
    
    <?php include 'includes/templates/sidebar.php'; ?>

    <main class="contenido-principal">
        
        <?php 
            $proyecto = obtenerNombre($id_proyecto);

            if($proyecto): ?>
                <h1>Proyecto Actual: 
                    <?php foreach($proyecto as $nombre): ?>
                        <span><?php echo $nombre['nombre']; ?></span>
                    <?php endforeach;?>                   
                </h1>
            

                <form action="#" class="agregar-tarea" method="post">
                    <div class="campo">
                        <label for="tarea">Tarea:</label>
                        <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
                    </div>
                    <div class="campo enviar">
                        <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                        <input type="submit" class="boton nueva-tarea" value="Agregar">
                    </div>
                </form>
        
        
 

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>  
            </ul>
        </div>

        <?php 
            else:
                echo "Selecciona un proyecto en el menu de la izquierda";
            endif; 
        ?>
    </main>
</div><!--.contenedor-->

<script src="js/sweetalert2.all.min.js"></script>
<script src="js/scripts.js"></script>

</body>
</html>
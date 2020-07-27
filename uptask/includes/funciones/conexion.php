<?php

$conn = new mysqli('localhost', 'root', 'root', 'uptaks');

if($conn->connect_error != null){
    echo $conn->connect_error;
}
  



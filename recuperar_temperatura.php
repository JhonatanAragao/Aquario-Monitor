<?php
include 'db_config.php';

$sql = "SELECT temp_min, temp_max FROM registros_temperatura ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(array("temp_min" => null, "temp_max" => null));
}

$conn->close();
?>

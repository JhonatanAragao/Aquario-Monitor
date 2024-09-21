<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_config.php';

$temp_min = $_POST['temp_min'];
$temp_max = $_POST['temp_max'];
$data_atual = date('Y-m-d'); // Formato de data: YYYY-MM-DD

// Verifica se já existe um registro para hoje
$sql = "SELECT id FROM registros_temperatura WHERE data = ? ORDER BY id DESC LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $data_atual);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Atualiza o registro existente
    $row = $result->fetch_assoc();
    $id = $row['id'];

    $sql = "UPDATE registros_temperatura SET temp_min = ?, temp_max = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ddi", $temp_min, $temp_max, $id);
} else {
    // Insere um novo registro
    $sql = "INSERT INTO registros_temperatura (data, temp_min, temp_max) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdd", $data_atual, $temp_min, $temp_max);
}

if ($stmt->execute()) {
    echo "Dados salvos com sucesso.";
} else {
    echo "Erro ao salvar os dados: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

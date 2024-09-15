<?php
include 'db_config.php'; // Inclua o arquivo com as configurações do banco de dados

$temp_min = $_POST['temp_min'];
$temp_max = $_POST['temp_max'];

// Prepara a consulta SQL
$sql = "INSERT INTO registros_temperatura (temp_min, temp_max) VALUES (?, ?)";

// Prepara e executa a consulta
$stmt = $conn->prepare($sql);
$stmt->bind_param("dd", $temp_min, $temp_max);

if ($stmt->execute()) {
    echo "Dados salvos com sucesso.";
} else {
    echo "Erro ao salvar os dados: " . $stmt->error;
}

// Fecha a declaração e a conexão
$stmt->close();
$conn->close();
?>

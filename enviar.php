<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['name']);
    $telefono = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['message']);
    
    $destinatario = "fakeac385@gmail.com";
    $asunto = "Nuevo mensaje de S&G Enfermería";
    
    $cuerpo = "
    Nombre: $nombre\n
    Teléfono: $telefono\n
    Email: $email\n
    Mensaje: $mensaje\n
    ";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "<script>
            alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
            window.location.href = 'index.html';
        </script>";
    } else {
        echo "<script>
            alert('Error al enviar el mensaje. Por favor intenta nuevamente.');
            window.history.back();
        </script>";
    }
} else {
    header("Location: index.html");
}
?>
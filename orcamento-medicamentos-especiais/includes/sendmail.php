<?php
// using SendGrid's PHP Library
// https://github.com/sendgrid/sendgrid-php
 require 'sendgrid-php/vendor/autoload.php'; // If you're using Composer (recommended)
// Comment out the above line if not using Composer
//require("sendgrid/lib/loader.php");
// If not using Composer, uncomment the above line
$email = new \SendGrid\Mail\Mail();
$email->setFrom("no-reply@araujo.com.br", "Drogaria Araújo");
$email->setSubject("Medicamentos Especiais");
$email->addTo("thiagot@lapisraro.com.br", "Teste de e-mail");
$email->addContent(
    "text/plain", "and easy to do anywhere, even with PHP"
);

$identificacao      = $_POST['identificacao'];
$nome               = $_POST['nome'];
$telefone           = $_POST['telefone'];
$email              = $_POST['email'];
$paciente           = $_POST['paciente'];
$nomemedicamento   = $_POST['nome-medicamento'];
$qtd                = $_POST['qtd'];
$arquivo            = $_POST['arquivo'];
$aceite             = $_POST['aceite'];

$html_body  = "<p>Pedido de orçamento</p>";
$html_body  .= "<p> Identificação: ".$identificacao." </p>";
$html_body  .= "<p> Nome: ".$nome." </p>";
$html_body  .= "<p> Telefone: ".$telefone." </p>";
$html_body  .= "<p> E-mail: ".$email." </p>";
$html_body  .= "<p> Paciente: ".$paciente." </p>";
$html_body  .= "<p> Nome/dosagem do medicamento: ".$nomemedicamento." </p>";
$html_body  .= "<p> Quantidade: ".$qtd." </p>";
$html_body  .= "<p> Aceite: ".$aceite." </p>";

$email->addContent("text/html", $html_body);

$sendgrid = new \SendGrid('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');
try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>

<script>
    location.href = 'index.php'
</script>

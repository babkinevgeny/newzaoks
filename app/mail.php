<?php

	require 'mail/Exception.php';
	require 'mail/PHPMailer.php';
	require 'mail/SMTP.php';

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;


	$mail = new PHPMailer(true);                         // Passing `true` enables exceptions
	try {

      $organization = $_POST['organization'];
      $email = $_POST['email'];
      $tel = $_POST['tel'];
      $message = $_POST['message'];
	    //Recipients
	    $mail->setFrom($_POST['email']);
	    $mail->addAddress('babkinevgeny@gmail.com');     // Add a recipient

	    //Content
	    $mail->isHTML(true);
	    $mail->Subject = 'Заявка с сайта zaoks.ru';
	    $mail->Body    = "Имя или название организации: $organization<br>Почта: $email<br>Телефон: $tel<br>Текст сообщения: $message";
      if ($_FILES) {
        $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
      }
      $mail->CharSet = "utf-8";
	    $mail->send();
	    echo 'Message has been sent';
	} catch (Exception $e) {
	    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
	}

<!DOCTYPE html>
<!--[if lt IE 10]>      <html class="no-js lt-ie11 lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 10]>         <html class="no-js lt-ie11 lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 11]>         <html class="no-js lt-ie11"> <![endif]-->
<!--[if gt IE 11]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
	<title>Emocar Insurance Brokerage</title>
	<link rel="shortcut icon" href="<?= base_url()?>assets/images/favicon.ico" type="image/x-icon">
	<link rel="icon" href="<?= base_url()?>assets/images/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="<?= base_url("assets/css/")?>style.css">
	<link rel="stylesheet" href="<?= base_url("assets/css/")?>login.css">
	<link rel="stylesheet" href="<?= base_url("assets/css/")?>css/media.css">
	<link rel="stylesheet" href="<?= base_url("assets/css/")?>css/font-awesome.min.css">
</head>
	<body>
		<div class="protect-me">
		<div class="clearfix">

<!-- Header -->
			<main>
				<div class="main_login_details">
					<figure>
						<img src="<?= base_url("assets/images/")?>comp_logo.png" alt="">
					</figure>
					<form method="post" action="<?= base_url("login/process_login")?>" >
						<input required type="text" name="username" placeholder="Username">
						<input required type="password" name="password" placeholder="Password">
						<input type="submit" name="submit" value="Login">
					</form>
					
					<div>
						<?php 
							if(!empty($this->session->flashdata('err'))){
								echo $this->session->flashdata('err');
							}
						?>
					</div>
				</div>
			</main>

		</div> <!-- End Clearfix -->
		</div> <!-- End Protect Me -->

  <script src="<?= base_url("assets/css/")?>js/jquery-2.1.1.min.js"></script>
  <script src="<?= base_url("assets/css/")?>js/plugins.js"></script>
</body>
</html>
<!-- End Footer -->

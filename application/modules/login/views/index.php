<!DOCTYPE html>
<!--[if lt IE 10]>      <html class="no-js lt-ie11 lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 10]>         <html class="no-js lt-ie11 lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 11]>         <html class="no-js lt-ie11"> <![endif]-->
<!--[if gt IE 11]><!-->
<html class="no-js" lang="en-US">
<!--<![endif]-->

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
    <link rel="stylesheet" href="<?= base_url("assets/css/")?>warning.css">
</head>

<body>
    <div class="protect-me">
        <div class="clearfix">
            <?php if(SHOW_WARNING)  {?>
            <div class="warning_alert">
                <div class="warning_alert_container">
                    <div class="warning_alert_header">
                        <h3>Warning Message</h3>
                        <button class="warning-btn-close">x</button>
                    </div>
                    <div class="warning_alert_content">
                        <p>Good day! I would like to inform you Maam/Sir na ma expire na ang atong website domain
                            (<strong>emocarinsurancebrokerage.com</strong>) this coming
                            <strong>November 21, 2023</strong> please ko pa renew sa domain para ma accessable gihapon
                            atong website application kay basin ma pending ang inyo transactions if dli ma renew. Please
                            lang contact ni <strong>Sir Jessie</strong> sa pag renew or pwede rasad ako, mo anha lang ko
                            sa office before
                            that date. And ang web hosting is next year pa ma expire. Please lang ko view sa attached
                            screenshots images provided sa link below.
                        </p>
                        <a href="https://drive.google.com/drive/folders/1YFq3WWvK-xHzKSh4tEu2KPV2sAsfyAau?usp=sharing"
                            target="_blank">
                            <strong>View Screenshots images</strong>
                        </a>
                    </div>
                    <div class="warning_footer">
                        <div>
                            <p>From Programmer:</p>
                            <p><strong>Juphet Vitualla</strong></p>
                            <p>09058927403</p>
                        </div>
                    </div>
                </div>
            </div>
            <?php } ?>

            <!-- Header -->
            <main>
                <div class="main_login_details">
                    <figure>
                        <img src="<?= base_url("assets/images/")?>comp_logo.png" alt="">
                    </figure>
                    <form method="post" action="<?= base_url("login/process_login")?>">
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

    <script src="<?= base_url("assets/js")?>/jquery-2.1.1.min.js"></script>
    <script src="<?= base_url("assets/css/")?>js/plugins.js"></script>
    <?php
		if(SHOW_WARNING) {
			?>
    <script>
    (function() {
        $(document).ready(function() {
            $(".warning-btn-close").on('click', () => {
                $(".warning_alert").fadeOut();
            })
        })
    })()
    </script>
    <?php
		}
	?>
</body>

</html>
<!-- End Footer -->
<?php
	$userdata = get_logged_user();
	$fname = $userdata["first_name"] . " ". $userdata["last_name"];
	$route = $this->router->fetch_class();

?>

<div id="dash_right_info">
	<div class="dash_intro">
		<a class="<?= $route == "my_profile" ? 'active' : '' ?>" href="<?=base_url("my_profile")?>"><i class="fa fa-user"></i> My Profile</a>
		<a href="<?=base_url("logout")?>"><i class="fa fa-sign-out"></i> Logout</a>
		<h2> (<?=ucfirst($fname);?>) </h2>
		<figure><img src="<?=base_url("assets/")?>images/sample_profile.png" alt=""></figure>
		<!-- <div class="show_hover">
			<ul>
				<li><a href="">Update Profile</a></li>
				<li><a href="">Logout</a></li>
			</ul>
		</div> -->
	</div>
<?php
	$userdata = getUserData();
	$fname = ucfirst($userdata["first_name"]) . " ". ucfirst($userdata["last_name"]);
	$route = $this->router->fetch_class();

	$profile = $userdata["profile_name"] != "" ? $userdata["profile_name"] : "dummy-profile.jpg"
	

?>
<div class="preloader">
	<div class="pre_cont">Loading Please wait... </div>
</div>

<div class="printing_loader" style="display:none;width: 100%; height: 100%; position: fixed; z-index: 123123; background: #fff;">
    <div style="text-align:center;font-size:20px;font-style:italic;position:absolute; top:50%; left:50%; transform:translate(-50%, -50%)">
         Printing, Please wait...
    </div>
</div>

<div id="dash_right_info">
	<div class="dash_intro">
		<a class="<?= $route == "my_profile" ? 'active' : '' ?>" href="<?=base_url("my_profile")?>"><i class="fa fa-user"></i> My Profile</a>
		<a href="<?=base_url("logout")?>"><i class="fa fa-sign-out"></i> Logout</a>
		<h2> (<?=ucfirst($fname);?>) </h2>
		<figure><img src="<?=base_url("assets/profiles/$profile")?>" alt=""></figure>
		<!-- <div class="show_hover">
			<ul>
				<li><a href="">Update Profile</a></li>
				<li><a href="">Logout</a></li>
			</ul>
		</div> -->
	</div>
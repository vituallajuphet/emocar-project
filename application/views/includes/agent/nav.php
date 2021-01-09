<?php
	$route = $this->router->fetch_class();
	$userinfo = getUserData();
?>

<div id="head_nav">
	<header>
		<figure>
			<img src="<?=base_url("assets/")?>images/comp_logo.png" alt="">
		</figure>
	</header>
	<nav>
		<ul>
			<li class="<?= $route == "agent" ? 'active' :'' ?>"><a href="agent"><i class="fa fa-file"></i> DETAILS ENTRY</a></li>
		</ul>
	</nav>
	<div class="nav_userinfo">
		<label for="#">Date:</label>
		<div class="usrval f20"><?= date("F j, Y")?></div>
		<label for="#">Time:</label>
		<div class="usrval time_div f20"></div>
		<label for="#">Location:</label>
		<div class="usrval"><?= $userinfo["location_name"]?></div>
		<label for="#">Branch:</label>
		<div class="usrval"><?= $userinfo["branch_name"]?></div>
	</div>
</div>
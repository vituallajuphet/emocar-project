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
			<li class="<?= $route == "employee" ? 'active' :'' ?>"><a href="employee">EMOCAR</a></li>
			<li class="<?= $route == "employee_policies" ? 'active' :'' ?>"><a href="employee_policies">POLICIES</a></li>
		</ul>
	</nav>
	<div class="nav_userinfo">
		<label for="#">Date:</label>
		<div class="usrval"><?= date("F j, Y")?></div>
		<label for="#">Location:</label>
		<div class="usrval"><?= $userinfo["location"]?></div>
		<label for="#">Location:</label>
		<div class="usrval"><?= $userinfo["branch"]?></div>
	</div>
</div>
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
			<li class="<?= ($route == "admin") ? 'active' :''  ?>"><a href="admin"><i class="fa fa-users"></i> Users</a></li>
			<li class="<?= ($route == "admin_policies") ? 'active' :''  ?>"><a href="/admin_policies"><i class="fa fa-list-alt"></i> Policies</a></li>
			<li class="<?= ($route == "admin_location") ? 'active' :''  ?>"><a href="/admin_location"><i class="fa fa-map-marker"></i> Locations</a></li>
			<li class="<?= ($route == "admin_branches") ? 'active' :''  ?>"><a href="/admin_branches"><i class="fa fa-map"></i> Branches</a></li>
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
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
			<li class="<?= $route == "employee" ? 'active' :'' ?>"><a href="employee"><i class="fa fa-file"></i> DETAILS ENTRY</a></li>
			<li class="<?= $route == "employee_policies" ? 'active' :'' ?>"><a href="employee_policies"><i class="fa fa-list-alt"></i> DETAIL RECORDS</a></li>
			<li class="<?= $route == "employee_archived" ? 'active' :'' ?>"><a href="employee_archived"><i class="fa fa-trash"></i> ARCHIVED DETAILS</a></li>
			<li class="<?= $route == "employee_trust_receipt" ? 'active' :'' ?>"><a href="employee_trust_receipt"><i class="fa fa-newspaper-o"></i> GENERATE TRUST RECEIPT</a></li>
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
<?php
	$route = $this->router->fetch_class();
?>

<div id="head_nav">
	<header>
		<figure>
			<img src="<?=base_url("assets/")?>images/comp_logo.png" alt="">
		</figure>
	</header>
	<nav>
		<ul>
			<li class="<?= ($route == "admin") ? 'active' :''  ?>"><a href="admin">Employees</a></li>
			<li class="<?= ($route == "admin_policies") ? 'active' :''  ?>"><a href="admin_policies">Policies</a></li>
			<li><a href="">Sample Text</a></li>
		</ul>
	</nav>
</div>
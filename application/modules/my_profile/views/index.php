<?php 
$usr = getUserData();

echo '<pre>';
print_r($usr);
echo '</pre>';
exit;
?>
<div id="main">
    <div class="main_area">
        <div class="profile_container">
            <h1 class="headingTitle"><?=$title?></h1>

            <form action="#" method="post" class="profile_form">
                <div class="row">
                    <div class="col-md-4">
                        <label for="">First Name</label>
                        <div>Name here</div>
                    </div>
                    <div class="col-md-4">
                        <label for="">First Name</label>
                        <div>Name here</div>
                    </div>
                    <div class="col-md-4">
                        <label for="">First Name</label>
                        <div>Name here</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
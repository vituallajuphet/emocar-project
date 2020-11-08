</div>
<!-- Header -->

  </div> <!-- End Clearfix -->
  </div> <!-- End Protect Me -->
  <script>
    var base_url = "<?= base_url()?>";
  </script>
  <script src="<?=base_url("assets/")?>js/jquery-2.1.1.min.js"></script>
  <script src="http://code.jquery.com/jquery-migrate-1.0.0.js"></script>
  <script src="<?=base_url("assets/")?>js/app.js"></script>
  <script src="<?= base_url("assets/")?>js/axios.js"></script>
  <script src="<?= base_url("assets/js/datatable/datatable.js")?>"></script>
  <script src="<?= base_url("assets/js/bootstrap.js")?>"></script>
  <script src="<?=base_url("assets/")?>js/printjs.js"></script>
  <script type="text/javascript">
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];       
var tomorrow = new Date();
tomorrow.setTime(tomorrow.getTime() + (1000*3600*24));       
document.getElementById("spanDate").innerHTML = months[tomorrow.getMonth()] + " " + tomorrow.getDate()+ ", " + tomorrow.getFullYear();
</script>


<?php 
$this->current_class = $this->router->fetch_class();
  echo (_user_script($this->current_class))?"\t<script type='text/javascript' src='".base_url('assets/js/'._user_script($this->current_class))."'></script>\n":'';
?>
</body>
</body>
</html>
<!-- End Footer -->
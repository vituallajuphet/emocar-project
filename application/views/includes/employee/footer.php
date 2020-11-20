<div class="project_author">Emocar Brokerage Logger System Version 2.0 </div>
</div>
<!-- Header -->

  </div> <!-- End Clearfix -->
  </div> <!-- End Protect Me -->
  
  <script>
    var base_url = "<?= base_url()?>";
  </script>
  <script src="<?=base_url("assets/")?>js/jquery-2.1.1.min.js"></script>
  <script src="<?=base_url("assets/")?>js/js_migrate.js"></script>
  <!-- <script src="http://code.jquery.com/jquery-migrate-1.0.0.js"></script> -->
  <script src="<?=base_url("assets/")?>js/app.js"></script>
  <script src="<?= base_url("assets/")?>js/axios.js"></script>
  <script src="<?= base_url("assets/js/datatable/datatable.js")?>"></script>
  <script src="<?= base_url("assets/js/datatable/datatable_responsive.js")?>"></script>
  <script src="<?= base_url("assets/js/bootstrap.js")?>"></script>
  <script src="<?=base_url("assets/")?>js/printjs.js"></script>
  <script type="text/javascript">

</script>


<?php 
$this->current_class = $this->router->fetch_class();
  echo (_user_script($this->current_class))?"\t<script type='text/javascript' src='".base_url('assets/js/'._user_script($this->current_class))."'></script>\n":'';
?>
</body>
</body>
</html>
<!-- End Footer -->
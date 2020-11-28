</div>
<!-- Header -->

  </div> <!-- End Clearfix -->
  </div> <!-- End Protect Me -->
  <script src="<?=base_url("assets/")?>js/jquery-2.1.1.min.js"></script>
  <script src="<?=base_url("assets/")?>js/js_migrate.js"></script>
  <!-- <script src="http://code.jquery.com/jquery-migrate-1.0.0.js"></script> -->
  <script src="<?=base_url("assets/")?>js/app.js"></script>
  <script src="<?= base_url("assets/")?>js/axios.js"></script>
  <script src="<?= base_url("assets/js/datatable/datatable.js")?>"></script>
  <script src="<?= base_url("assets/js/datatable/datatable_responsive.js")?>"></script>
  <script src="<?= base_url("assets/js/bootstrap.js")?>"></script>
  <script src="<?=base_url("assets/")?>js/printjs.js"></script>
  <script src="<?=base_url("assets/")?>js/real_time.js"></script>
  <script src="<?=base_url("assets/")?>js/alertify/alertify.js"></script>
  <script src="<?=base_url("assets/")?>js/alert.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
   <script>
    var base_url = "<?= base_url()?>";
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $(".preloader").show();
    $(document).ready(function(){$(".preloader").hide();})
  </script>
<?php 

if(!empty($this->session->flashdata("flash_data"))){ 
  $fdta = $this->session->flashdata("flash_data");  
?>
  <script>
      swalMessage("<?= $fdta['message']?>", "<?= $fdta['err']?>")
  </script>
<?php }

$this->current_class = $this->router->fetch_class();
  echo (_user_script($this->current_class))?"\t<script type='text/javascript' src='".base_url('assets/js/'._user_script($this->current_class))."'></script>\n":'';
?>
</body>
</html>
<!-- End Footer -->
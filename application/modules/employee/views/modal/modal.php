<!-- start modal -->
<div id="modal_view_policy" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      
    </div>
  </div>
</div>
<!-- end modal -->

<!-- start modal -->
<div id="modal_code" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class='p-4 form-code'>
            <h5 class='text-md text-center text-danger'>You have reached the maximum number of printing of this documents! </h5>
            <p class='text-center'>Please verify the code first to proceed</p>
            <div class='text-center'>
                <Button id="btnSendCode" class="btn btn-success"><i class='fa fa-send'></i> Send Code to Admin</Button>
            </div>
            <div class='form-verification'>
                <form id="form_verification_code" action="#" class='mt-4'>
                  <div class='text-center'>
                  <input class='code-inputfield' required type="text" class='form-control'>
                  <Button class='btn btn-success btnVerifyCode' type="submit"><i class='fa fa-check'></i> Verify Code</Button>
                  </div>
                </form>
            </div>
        </div>
        
    </div>
  </div>
</div>
<!-- end modal -->
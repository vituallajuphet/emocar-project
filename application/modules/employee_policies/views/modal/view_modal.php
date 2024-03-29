<!-- start modal -->
<div class="modal fade" id="view_policy_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-file"></i> Policy Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div>
           <input type="hidden" class="vtrans_id">
           <input type="hidden" class="vtrans_type">
        </div>
      </div>
      <div class="modal-body">
        <form>
          <div>
              <h2 class="heading_modal ">Approval Status: <span class="policy_status">Approved</span></h2>
              <h2 class="heading_modal ">Transaction Type: <span class="policy_type policy_edit_type">Approved</span></h2>
          </div>
          <div class="row mt-3">
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MV FILE NO.</label>
                    <input type="text" class="form-control dta_mv_file" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MODEL NO.</label>
                    <input type="text" class="form-control dta_model_no" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">DATE ISSUED</label>
                    <input type="text" class="form-control dta_date_issued">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">PLATE NO.</label>
                    <input type="text" class="form-control dta_plate_no">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MAKE</label>
                    <input type="text" class="form-control dta_make" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">FROM 12:00 NN</label>
                    <input type="text" class="form-control dta_date_from">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MOTOR NO.</label>
                    <input type="text" class="form-control dta_motor_no" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">TYPE OF BODY</label>
                    <input type="text" class="form-control dta_type_body" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">TO 12:00 NN</label>
                    <input type="text" class="form-control dta_date_to" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">SERIAL / CHASSIS</label>
                    <input type="text" class="form-control dta_serial_chassis" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">OFFICIAL RECEIPT</label>
                    <input type="text" class="form-control dta_of_receipt" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">COC NO.</label>
                    <input type="text" class="form-control dta_coc_no" >
                </div>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">POLICY NO.</label>
                    <input type="text" class="form-control dta_policy_no" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">COLOR</label>
                    <input type="text" class="form-control dta_color" >
                </div>
              </div>
              <div class="col-md-4"></div>
          </div>
          <hr>
          <!-- next -->
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">PLACE</label>
                  <input type="text" class="form-control dta_place" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">OTHERS</label>
                  <input type="text" class="form-control dta_others">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DATE</label>
                  <input type="text" class="form-control dta_date_day" >
              </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DOCS. STAMP</label>
                  <input type="text" class="form-control dta_docs_stamp" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">MONTH</label>
                  <input type="text" class="form-control dta_month" >
              </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">LGT</label>
                  <input type="text" class="form-control dta_lgt" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">YEAR</label>
                  <input type="text" class="form-control dta_year" >
              </div>
            </div>
          </div>
          <hr>
          <!-- next here -->
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">RECEIVED FROM</label>
                  <input type="text" class="form-control dta_received_from" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">PREMIUM SALES</label>
                  <input type="text" class="form-control dta_premium_sales">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">MISC</label>
                  <input type="text" class="form-control dta_or_misc" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">ADDRESS</label>
                  <input type="text" class="form-control dta_or_address" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DOCS. STAMP</label>
                  <input type="text" class="form-control dta_or_doc_stamp">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">TOTAL</label>
                  <input type="text" class="form-control dta_or_total" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DATE</label>
                  <input type="text" class="form-control dta_or_date" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">LG TAX</label>
                  <input type="text" class="form-control dta_lg_tax">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">THE SUM OF PESOS</label>
                  <input type="text" class="form-control dta_sum_pesos" >
              </div>
            </div>
        </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnPrintCoc" class="btn btn-favorate"><i class="fa fa-print"></i> Print COC</button>
        <button type="button" id="btnPrintOR" class="btn btn-favorate"><i class="fa fa-print"></i> Print OR</button>
        <button type="button" id="btnPrintPolicy" class="btn btn-favorate"><i class="fa fa-print"></i> Print Policy</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
      </div>
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
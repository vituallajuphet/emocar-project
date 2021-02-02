<!-- start modal -->
<div class="modal fade" id="edit_policy_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-pencil"></i> Update Policy Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="form_edit_policy" method="post">
      <div class="modal-body">
           <input type="hidden" name="trans_type" class="dta_edit_trans_type">
           <input type="hidden" name="trans_id" class="dta_edit_trans_id">
          <div>
              <h2 class="heading_modal ">Approval Status: <span class="policy_edit_status">Approved</span></h2>
              <h2 class="heading_modal ">Transaction Type: <span class="policy_edit_type">Approved</span></h2>
          </div>
          <div class="row mt-3">
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MV FILE NO.</label>
                    <input type="text" name="mb_file_no" required class="form-control dta_edit_mv_file" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MODEL NO.</label>
                    <input type="text" required  name="model_no" class="form-control dta_edit_model_no" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">DATE ISSUED</label>
                    <input type="text" readonly  class="form-control dta_edit_date_issued">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">PLATE NO.</label>
                    <input type="text" name="plate_no" required class="form-control dta_edit_plate_no">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MAKE</label>
                    <input type="text" name="make" required class="form-control dta_edit_make" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group custdd">
                    <label for="recipient-name" class="col-form-label">FROM 12:00 NN</label>
                    <input type="date" class="form-control dd_datefrm_cust">
                    <input type="text" readonly  class="form-control dta_edit_date_from">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">MOTOR NO.</label>
                    <input type="text" name="motor_no"  required class="form-control dta_edit_motor_no" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">TYPE OF BODY</label>
                    <input type="text" name="type_of_body" required class="form-control dta_edit_type_body" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">TO 12:00 NN</label>
                    <input type="text" readonly class="form-control dta_edit_date_to" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">SERIAL / CHASSIS</label>
                    <input type="text" name="serial_chassis"  class="form-control dta_edit_serial_chassis" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">OFFICIAL RECEIPT</label>
                    <input type="text" required name="official_receipt" class="form-control dta_edit_of_receipt" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">COC NO</label>
                    <input type="text" required name="coc_no" class="form-control dta_edit_coc_no" >
                </div>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">POLICY NO.</label>
                    <input type="text" required name="policy_no" class="form-control dta_edit_policy_no" >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">COLOR</label>
                    <input type="text" name="color" class="form-control dta_edit_color" >
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
                  <input type="text" required name="place" class="form-control dta_edit_place" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">OTHERS</label>
                  <input type="text" name="others" required class="form-control dta_edit_others">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DATE</label>
                  <input type="text" required name="policy_day" class="form-control dta_edit_date_day" >
              </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DOCS. STAMP</label>
                  <input type="text" name="pol_docs_stamp" required class="form-control dta_edit_docs_stamp" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">MONTH</label>
                  <input type="text" name="policy_month" required class="form-control dta_edit_month" >
              </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">LGT</label>
                  <input type="text" name="lgt" required class="form-control dta_edit_lgt" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">YEAR</label>
                  <input type="text" name="policy_year" required class="form-control dta_edit_year" >
              </div>
            </div>
          </div>
          <hr>
          <!-- next here -->
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">RECEIVED FROM</label>
                  <input type="text" name="received_from" required class="form-control dta_edit_received_from" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">PREMIUM SALES</label>
                  <input type="text" name="premium_sales" required class="form-control dta_edit_premium_sales">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">MISC</label>
                  <input type="text" required name="misc" class="form-control dta_edit_or_misc" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">ADDRESS</label>
                  <input type="text" required name="address" class="form-control dta_edit_or_address" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DOCS. STAMP</label>
                  <input type="text" required name="docs_stamp" class="form-control dta_edit_or_doc_stamp">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">TOTAL</label>
                  <input type="text" required name="or_total" class="form-control dta_edit_or_total" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">DATE</label>
                  <input type="text" readonly required class="form-control dta_edit_or_date" >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">LG TAX</label>
                  <input type="text" required name="lg_tax" class="form-control dta_edit_lg_tax">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">THE SUM OF PESOS</label>
                  <input type="text" name="the_sum_of_pesos" required class="form-control dta_edit_sum_pesos" >
              </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-favorate"><i class="fa fa-check"></i> Update & Save</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
      </div>
      </form>
    </div>
  </div>
</div>
<!-- end modal -->
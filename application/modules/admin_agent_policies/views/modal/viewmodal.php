<!-- start modal -->
<div class="modal fade" id="view_trust_info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-file"></i> Trust File Informations</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="row">
                <div class="col-md-3">
                    <label class="font-weight-bold" for="">Issued By: </label>
                    <input type="text" class="form-control trs-issued_by" readonly>
                </div>
                <div class="col-md-3">
                    <label class="font-weight-bold" for="">Trust Receipt No.: </label>
                    <input type="text" class="form-control trs-receipt_no" readonly>
                </div>
                <div class="col-md-3">
                    <input type="hidden" class="form-control trs-user_id">
                </div> 
            </div>
            <div class="row mt-4">
                <div class="col-md-3">
                    <label class="font-weight-bold" for="">Date Issued: </label>
                    <input type="text" class="form-control trs-date_issued" readonly> 
                </div>
                <div class="col-md-6">
                    <label class="font-weight-bold" for="">Place Issued: </label>
                    <input type="text" class="form-control trs-place_issued" readonly>
                </div>
            </div>

            <hr class="my-5">

            <div class="row mb-3">
               <div class="col-md-3">
                  <label for="">Sort By:</label>
                  <select id="table-sorter" class="form-control table-sorter">
                      <option value="">Motor</option>
                      <option value="">Motor</option>
                      <option value="">Motor</option>
                  </select>
               </div>
            </div>

            <table id="table_trust_list" class="display">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Serial No.</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
      </div>

      <div class="row py-0 px-4 pb-4">
          <div class="col-md-4">
             <label for="" class="d-block font-weight-bold">Total COC Used:</label>
             <input type="text" readonly class="form-control tot_coc_used">
          </div>
          <div class="col-md-4">
             <label for="" class="d-block font-weight-bold">Total OR Used:</label>
             <input type="text" readonly class="form-control tot_or_used">
          </div>
          <div class="col-md-4">
             <label for="" class="d-block font-weight-bold">Total POLICY Used:</label>
             <input type="text" readonly class="form-control tot_policy_used">
          </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
        <button type="button" class="btn btn-success btn-use-submit" ><i class="fa fa-check"></i> Submit</button>
      </div>
    </div>
  </div>
</div>
<!-- end modal --> 
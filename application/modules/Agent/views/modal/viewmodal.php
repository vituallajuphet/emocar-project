<!-- start modal -->
<div class="modal fade" id="view_trust_info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
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

            <table id="table_trust_list" class="display">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Serial No.</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
      </div>
    </div>
  </div>
</div>
<!-- end modal -->
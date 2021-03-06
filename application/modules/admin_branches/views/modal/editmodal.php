<!-- start modal -->
<div class="modal fade" id="edit_branch_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
       <form id="frm_edit_branch" method="post" action ="">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-pencil"></i> Edit Branch</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <label for="recipient-name" class="col-form-label">Location Name</label>
                    <select name="location" id="" class="form-control dta_edit_location">
                        <option value="">Please select...</option>
                    </select>
                    <input type="hidden" name="branch_id" class="dta_edit_branch_id">
                </div>
                <div class="col-md-6">
                    <label for="recipient-name" class="col-form-label">Branch Name</label>
                    <input required required name="branch_name"  type="text" class="form-control dta_edit_branch_name" >
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-success" ><i class="fa fa-check"></i> Update and Close</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
        </div>
       </form>
    </div>
  </div>
</div>
<!-- end modal -->
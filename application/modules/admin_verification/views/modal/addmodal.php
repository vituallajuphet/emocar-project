<!-- start modal -->
<div class="modal fade" id="add_location_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
       <form id="frm_add_location" method="post" action ="">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-map"></i> Add Location</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <label for="recipient-name" class="col-form-label">Location Name</label>
                        <input type="text" name="location_name" required class="form-control">
                    </div>
                </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-success" ><i class="fa fa-check"></i> Save and Close</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
        </div>
       </form>
    </div>
  </div>
</div>
<!-- end modal -->
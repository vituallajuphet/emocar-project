<!-- start modal -->
<div class="modal fade" id="add_upload_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <form action="">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-file"></i> Upload</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div class="cont_grid">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="">Type</label>
                                    <select name="" id="" class="form-control">
                                        <option value="">Please Select...</option>
                                        <option value="Motorcycle">Motorcycle</option>
                                        <option value="Tricycle">Tricycle</option>
                                        <option value="Private Car">Private Car</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Truck">Truck</option>
                                    </select>
                                </div>                    
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="">From.</label>
                                    <input type="text" class="form-control">
                                </div>  
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="">Qty.</label>
                                    <input type="text" class="form-control">
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="new_row_btn text-center" >
                    <hr>
                        <button type="submit" class="btn_new_row btn btn-success"><i class="fa fa-plus"></i>Add Row</button>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
            </div>
        </form>
    </div>
  </div>
</div>
<!-- end modal -->
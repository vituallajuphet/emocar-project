<!-- start modal -->
<div class="modal fade" id="edit_user_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
       <form id="frm_update_user" method="post" action ="">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-pencil"></i> Edit User Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
                <div class="row">
                  <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">User Type</label>
                        <input readonly  type="text" class="form-control dta_edit_user_type" >
                        <input type="hidden" name="user_type" class="dta_edit_hidden_user_type" >
                    </div>
                </div>
                <div class="row">
                    <input type="hidden" name="user_id" class="dta_edit_user_id">
                    <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">First Name</label>
                        <input required name="first_name"  type="text" class="form-control dta_edit_first_name" >
                    </div>
                    <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">Middle Name</label>
                        <input required name="middle_name" type="text" class="form-control dta_edit_middle_name" >
                    </div>
                    <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">Last Name</label>
                        <input required required name="last_name"  type="text" class="form-control dta_edit_last_name" >
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <label for="recipient-name" class="col-form-label">Address</label>
                        <input required type="text" name="address" class="form-control dta_edit_address" >
                    </div>
                    <div class="col-md-4">
                        <label required for="recipient-name" class="col-form-label">Birth Date</label>
                        <input  type="date" name="birth_date" class="form-control dta_edit_birth_date" >
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">Gender</label>
                        <select name="gender" required class="form-control dta_edit_gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">Location</label>
                        <select name="location" required class="form-control dta_edit_location">
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="recipient-name" class="col-form-label">Branch</label>
                        <select name="branches" required class="form-control dta_edit_branches">
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label required for="recipient-name" class="col-form-label">Email Address</label>
                        <input  type="text" name="email" class="form-control dta_edit_email" >
                    </div>
                    <div class="col-md-4">
                        <label required for="recipient-name" class="col-form-label">Contact No</label>
                        <input  type="text" name="contact" class="form-control dta_edit_contact_no" >    
                    </div>
                    <div class="col-md-4">
                        <label required for="recipient-name" class="col-form-label">Username</label>
                        <input  type="text" name="username" class="form-control dta_edit_username" >    
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
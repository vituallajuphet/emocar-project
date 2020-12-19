<div id="main">
    <div class="main_area">
        <div class="addEmployee">
            <span class="addemp_button">+ Add User</span>
            <!-- modal -->
             <?php
             
                if(!empty($modal)){
                    $this->load->view("modal/{$modal}");
                }
             ?>
             <input type="hidden" class="tab_sort_value" value="employee">
             <h2 class="page_header user_header"><?= $page_header;?></h2>
             <div class="text-left mb-3">
                 <button class="btn btn-success btn_sort_admin"><i class="fa fa-user"></i> Administrator</button>
                 <button class="btn btn-warning btn_sort_semiadmin"><i class="fa fa-user"></i> Semi Administrator</button>
                 <button class="btn btn-primary btn_sort_employee"><i class="fa fa-user"></i> Employees</button>
             </div>
            <!-- end modal -->
            <!-- start table -->
            <table id="trans_table" class="display" >
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Office Location</th>
                        <th>Branch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody> 
                </tbody>
            </table>
            <!-- end -->
        </div>
    </div>
</div>
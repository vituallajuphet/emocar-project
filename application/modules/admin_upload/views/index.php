<div id="main">
    <div class="main_area">
        <div class="addEmployee">
            <div>
                <button class="btn btn-success btn_add_upload"><i class="fa fa-plus"></i> Add New</button>
            </div>
            <!-- modal -->
             <?php
             
                if(!empty($modal)){
                    $this->load->view("modal/{$modal}");
                }
             ?>
             <input type="hidden" class="tab_sort_value" value="employee">
             <h2 class="page_header user_header"><?= $page_header;?></h2>
            <!-- end modal -->
            <!-- start table -->
            <!-- <table id="trans_table" class="display" >
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
            </table> -->
            <!-- end -->
        </div>
    </div>
</div>
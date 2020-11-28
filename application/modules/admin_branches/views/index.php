<div id="main">
    <div class="main_area">
        <div class="addEmployee">
            <!-- <span class="addemp_button">+ Add Employee</span> -->
            <!-- modal -->
             <?php
             
                if(!empty($modal)){
                    $this->load->view("modal/{$modal}");
                }
             ?>
            <div class="text-right">
                <button class="btn btn-success btn_addbranch"><i class="fa fa-plus"></i> Add Branch</button>
            </div>
            <h2 class="page_header user_header"><?= $page_header;?></h2>
            <!-- end modal -->
            <!-- start table -->
            <table id="trans_table" class="display" >
                <thead>
                    <tr>
                        <th>Branch ID</th>
                        <th>Branch Name</th>
                        <th>Location Name</th>
                        <th>Date Added</th>
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
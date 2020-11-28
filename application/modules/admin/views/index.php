<div id="main">
    <div class="main_area">
        <div class="addEmployee">
            <span class="addemp_button">+ Add Employee</span>
            <!-- modal -->
             <?php
             
                if(!empty($modal)){
                    $this->load->view("modal/{$modal}");
                }
             ?>
             <h2 class="page_header"><?= $page_header;?></h2>
            <!-- end modal -->
            <!-- start table -->
            <table id="trans_table" class="display" >
                <thead>
                    <tr>
                        <th>Employee ID</th>
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
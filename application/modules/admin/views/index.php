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
            <!-- end modal -->
            <!-- start table -->
            <table id="employee_table" class="display" >
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
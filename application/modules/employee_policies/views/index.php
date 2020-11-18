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
            <!-- end modal -->
            <!-- start table -->
            <table id="trans_table" class="display" >
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Type</th>
                        <th>MV FILE NO.</th>
                        <th>PLATE NO.</th>
                        <th>Processed By</th>
                        <th>Location</th>
                        <th>Office</th>
                        <th>Date Issued</th>
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
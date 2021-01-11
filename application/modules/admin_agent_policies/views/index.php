<div id="main">
    <div class="main_area">
        <div class="addEmployee">

             <?php if(!empty($modal)){ $this->load->view("modal/{$modal}"); } ?>

             <h2 class="page_header user_header"><?= $page_header;?></h2>
            <table id="trans_table" class="display" >
                <thead>
                    <tr>
                        <th>Trust ID</th>
                        <th>Trust Receipt No.</th>
                        <th>Issued By</th>
                        <th>Agent Full Name</th>
                        <th>Date Issued</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody> 
                </tbody>
            </table>
        </div>
    </div>
</div>
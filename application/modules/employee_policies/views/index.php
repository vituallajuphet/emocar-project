<?php          
    if(!empty($modal)){
        $this->load->view("modal/{$modal}");
    }
?>

<div id="main">
    <div class="main_area">
        <div class="addEmployee">
            <!-- <span class="addemp_button">+ Add Employee</span> -->
            <!-- modal -->
       

             <h2 class="page_header"><?= $page_header;?></h2>
            <!-- end modal -->
            <!-- start table -->
            <div class="row p-3">
                <div class="col-md-3">
                    <label for="">Sort by Transaction type: </label>
                  <select id="datatable_sorter_select"  class="form-control" id="">
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Tricycle">Tricycle</option>
                        <option value="Private Car">Private Car</option>
                        <option value="Commercial Vehicle">Commercial Vehicle</option>
                        <option value="Trailer">Trailer</option>
                    </select>
                </div>
            </div>

            <table data-tbl='datatable' id="trans_table" class="display" >
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Received From</th>
                        <th>Transaction Type</th>
                        <th>MV File No.</th>
                        <th>Plate No.</th>
                        <th>Status</th>
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
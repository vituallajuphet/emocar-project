<?php $this->load->view("print_elements"); ?>

<?php          
    if(!empty($modal)){
        $this->load->view("modal/{$modal}");
    }
?>

<div id="main">
    <div class="main_area">
        <div class="addEmployee">

            <h2 class="page_header"><?= $page_header;?></h2>
            <hr>
            <div class='trust_receipt'>
                <form action="" method='' id="formTrustReceipt">

                    <div class="row mt-5">
                        <div class="col-md-3">
                            <label for="">Select User</label>
                            <select name="employee_id" required id="employee_id" class='form-control'> </select>
                        </div>
                        <div class="col-md-12 mb-3"></div>
                        <div class="col-md-3">
                            <label for="">Date</label>
                            <input type="text" name='date_of_issued' required class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label for="">Trust Reciept Form No.</label>
                            <input  type="text" readonly required name='trust_id' class="form-control">
                        </div>
                        <div class="col-md-4">
                            <label for="">Place Issued</label>
                            <input type="text" value="Cebu City" required name='place_issued' class="form-control">
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <label class='d-block' for="">Select Option</label>
                            <div class="d-flex align-items-center">
                                <select id="sel_type" class="form-control" style='max-width:237px;margin-right:1rem;'>
                                    <option value="">Please select...</option>
                                    <option value="motorcycle">MOTORCYCLE (MC)</option>
                                    <option value="tricycle">TRICYCLE (TC-Hire)</option>
                                    <option value="private">PRIVATE CAR (UV - CAR)</option>
                                    <option value="commercial">COMMERCIAL VEHICLE (TRUCK)</option>
                                    <option value="trailer">TRAILER</option>
                                </select>
                                <button type='button' class="btn btn-primary btn-add-row"><i class='fa fa-plus'></i> Add Row</button>
                            </div>
                        </div>
                    </div>

                    <div class="row-table mt-3">
                        <table class="table table-bordered tbl-rows">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Serial Numbers</th>
                                    <th>Set</th>
                                    <th>Total Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody class='tbody-tbl'>
                                
                            </tbody>

                        </table>
                    </div>

                    <hr>
                    <div class="row mt-5">
                        <div class="col-md-12 text-right">
                            <button type='submit' disabled class='btn btn-success btn-submit'><i class='fa fa-print'></i> Generate Trust Receipt</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
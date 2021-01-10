<div id="main">
    <div class="main_area">
        <div class="addEmployee">

            <?php if(!empty($modal)){ $this->load->view("modal/{$modal}"); } ?>

            <h2 class="page_header user_header"><?= $page_header;?></h2>
    
            <hr>

            <div class="row mb-4">
                <div class="col-md-12">
                    <h4 class="font-weight-bold">Fill Up the form</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="">MV FILE NO.</label>
                    <input type="text" class="form-control" required name="mb_file_no">
                </div>
                <div class="col-md-4">
                    <label for="">MAKE</label>
                    <input type="text" class="form-control" required name="make">
                </div>
                <div class="col-md-4">
                    <label for="">DATE ISSUED</label>
                    <input type="text" class="form-control" required name="date_issued">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="">PLATE NO.</label>
                    <input type="text" class="form-control" required name="plate_no">
                </div>
                <div class="col-md-4">
                    <label for="">SERIES</label>
                    <input type="text" class="form-control" required name="series_no">
                </div>
                <div class="col-md-4">
                    <label for="">FROM 12:00 NN</label>
                    <input type="text" class="form-control" required name="date_from">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="">MOTOR NO.</label>
                    <input type="text" class="form-control" required name="motor_no">
                </div>
                <div class="col-md-4">
                    <label for="">TYPE OF BODY</label>
                    <input type="text" class="form-control" required name="type_of_body">
                </div>
                <div class="col-md-4">
                    <label for="">TO 12:00 NN</label>
                    <input type="text" class="form-control" required name="date_from">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="">SERIAL / CHASSIS NO.</label>
                    <input type="text" class="form-control" required name="serial_chassis">
                </div>
                <div class="col-md-4">
                    <label for="">MODEL NO.</label>
                    <input type="text" class="form-control" required name="model_no">
                </div>
                <div class="col-md-4">
                    <label for="">COLOR</label>
                    <input type="text" class="form-control" required name="color">
                </div>
            </div>

            <!-- ebd -->

            <div class="row mt-5">
                <div class="col-md-4">
                    <label for="">OFFICIAL RECEIPT</label>
                    <input type="text" class="form-control" required name="official_receipt">
                </div>
                <div class="col-md-4">
                    <label for="">OTHERS</label>
                    <input type="text" class="form-control" required name="others">
                </div>
                <div class="col-md-4">
                    <label for="">DATE</label>
                    <input type="text" class="form-control" required name="policy_day">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="">COC NO.</label>
                    <input type="text" class="form-control" required name="coc_no">
                </div>
                <div class="col-md-4">
                    <label for="">DOCS. STAMP</label>
                    <input type="text" class="form-control" required name="pol_docs_stamp">
                </div>
                <div class="col-md-4">
                    <label for="">MONTHS</label>
                    <input type="text" class="form-control" required name="policy_month">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="">POLICY NO.</label>
                    <input type="text" class="form-control" required name="policy_no">
                </div>
                <div class="col-md-4">
                    <label for="">LGT</label>
                    <input type="text" class="form-control" required name="pol_lgt">
                </div>
                <div class="col-md-4">
                    <label for="">YEAR</label>
                    <input type="text" class="form-control" required name="pol_year">
                </div>
            </div>
            
            <div class="row mt-5">
                <div class="col-md-4">
                    <label for="">RECEIVED FROM</label>
                    <input type="text" class="form-control" required name="received_from">
                </div>
                <div class="col-md-4">
                    <label for="">PREMIUM SALES</label>
                    <input type="text" class="form-control" required name="premium_sales">
                </div>
                <div class="col-md-4">
                    <label for="">MISC</label>
                    <input type="text" class="form-control" required name="misc">
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <label for="">ADDRESS</label>
                    <input type="text" class="form-control" required name="address">
                </div>
                <div class="col-md-4">
                    <label for="">DOCS. STAMP</label>
                    <input type="text" class="form-control" required name="or_docs_stamp">
                </div>
                <div class="col-md-4">
                    <label for="">TOTAL</label>
                    <input type="text" class="form-control" required name="or_total">
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <label for="">PLACE OF ISSUE</label>
                    <input type="text" class="form-control" required name="place">
                </div>
                <div class="col-md-4">
                    <label for="">LG TAX</label>
                    <input type="text" class="form-control" required name="lg_tax">
                </div>
                <div class="col-md-4">
                    <label for="">THE SUM OF PESOS</label>
                    <input type="text" class="form-control" required name="the_sum_of_pesos">
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-12 text-right">
                    <button class="btn btn-success" type="submit"><i class="fa fa-check"></i> Log Transaction</button>
                </div>
            </div>
        </div>
    </div>
</div>
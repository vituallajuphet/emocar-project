<div id="main">
    <div class="main_area">
        <div class="addEmployee">

            <h2 class="page_header user_header"><?= $page_header;?></h2>

            <hr>

            <div class="row mb-4">
                <div class="col-md-12">
                    <h4 class="font-weight-bold text-left">Fill Up the form</h4>
                </div>
            </div>
            <form id="trust_form" method="post" action="#">
                <input type="hidden" required value='<?= $trust_data?>' class="trust_info" name="trust_info">
                <input class="trans_type" type="hidden" required name="trans_type">
                <input class="trust_id" type="hidden" value="<?= $trust_id?>" required name="trust_id">
                <input class="fk_user_id" type="hidden" value="<?= $trust_id?>" required name="fk_user_id">
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
                        <input type="text" class="form-control" required name="date_to">
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
                        <input id="pol_others" type="text" class="form-control" required name="others">
                    </div>
                    <div class="col-md-4">
                        <label for="">DATE</label>
                        <input id="pol_date" type="text" class="form-control" required name="policy_day">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">COC NO.</label>
                        <input type="text" class="form-control" required name="coc_no">
                    </div>
                    <div class="col-md-4">
                        <label id="docs_or_vat" for="">DOCS. STAMP</label>
                        <input type="text" id="pol_docs_stamp" class="form-control" required name="pol_docs_stamp">
                    </div>
                    <div class="col-md-4">
                        <label for="">MONTHS</label>
                        <input id="pol_months" type="text" class="form-control" required name="policy_month">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">POLICY NO.</label>
                        <input type="text" class="form-control" required name="policy_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">LGT</label>
                        <input id="pol_lgt" type="text" class="form-control" required name="lgt">
                    </div>
                    <div class="col-md-4">
                        <label for="">YEAR</label>
                        <input type="text" id="pol_year" class="form-control" required name="policy_year">
                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-md-4">
                        <label for="">RECEIVED FROM</label>
                        <input type="text" class="form-control" required name="received_from">
                    </div>
                    <div class="col-md-4">
                        <label for="">PREMIUM SALES</label>
                        <input type="text" id="or_prem_sales" class="form-control" required name="premium_sales">
                    </div>
                    <div class="col-md-4">
                        <label for="">MISC</label>
                        <input id="or_misc" type="text" class="form-control" required name="misc">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <label for="">ADDRESS</label>
                        <input type="text" class="form-control" required name="address">
                    </div>
                    <div class="col-md-4">
                        <label for="">DOCS. STAMP</label>
                        <input type="text" id="or_docs_stamp" class="form-control" required name="docs_stamp">
                    </div>
                    <div class="col-md-4">
                        <label for="">TOTAL</label>
                        <input id="or_total" type="text" class="form-control" required name="or_total">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <label for="">PLACE OF ISSUE</label>
                        <input type="text" class="form-control" required name="place">
                    </div>
                    <div class="col-md-4">
                        <label for="">LG TAX</label>
                        <input id="or_lg_tax" type="text" class="form-control" required name="lg_tax">
                    </div>
                    <div class="col-md-4">
                        <label for="">THE SUM OF PESOS</label>
                        <input id="or_total_text" type="text" class="form-control" required name="the_sum_of_pesos">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="mt-4 text-left">
                            <div>PAID BY:</div>
                            <label class="d-inline" for="paid_type_cash">Cash</label>
                            <input checked type="radio" id="paid_type_cash" name="paid_type" value="Cash">
                            <label class="d-inline" for="paid_type_cash">Check</label>
                            <input type="radio" id="paid_type_check" name="paid_type" value="Check">
                            <div class="check_field mt-3">
                                <input class="form-control" type="text" name="check_no" placeholder="Check Number"
                                    required>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-md-12 text-right">
                        <button class="btn btn-success" type="submit"><i class="fa fa-check"></i> Log
                            Transaction</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
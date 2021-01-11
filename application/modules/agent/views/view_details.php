<div id="main">
    <div class="main_area">
        <div class="addEmployee">

            <?php if(!empty($modal)){ $this->load->view("modal/{$modal}"); } ?>

            <h2 class="page_header user_header"><?= $page_header;?></h2>
             <?php $dta = $trans_data[0]; ?>
            <hr>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">MV FILE NO.</label>
                        <input value="<?=$dta['mb_file_no'] ?>" readonly type="text" class="form-control" required name="mb_file_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">MAKE</label>
                        <input value="<?=$dta['make'] ?>" readonly type="text" class="form-control" required name="make">
                    </div>
                    <div class="col-md-4">
                        <label for="">DATE ISSUED</label>
                        <input value="<?=$dta['date_issued'] ?>" readonly type="text" class="form-control" required name="date_issued">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">PLATE NO.</label>
                        <input value="<?=$dta['plate_no'] ?>" readonly type="text" class="form-control" required name="plate_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">SERIES</label>
                        <input value="<?=$dta['series_no'] ?>" readonly type="text" class="form-control" required name="series_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">FROM 12:00 NN</label>
                        <input value="<?=$dta['date_from'] ?>" readonly type="text" class="form-control" required name="date_from">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">MOTOR NO.</label>
                        <input value="<?=$dta['motor_no'] ?>" readonly type="text" class="form-control" required name="motor_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">TYPE OF BODY</label>
                        <input value="<?=$dta['type_of_body'] ?>"  readonly type="text" class="form-control" required name="type_of_body">
                    </div>
                    <div class="col-md-4">
                        <label for="">TO 12:00 NN</label>
                        <input value="<?=$dta['date_to'] ?>"  readonly type="text" class="form-control" required name="date_to">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">SERIAL / CHASSIS NO.</label>
                        <input value="<?=$dta['serial_chassis'] ?>" readonly type="text" class="form-control" required name="serial_chassis">
                    </div>
                    <div class="col-md-4">
                        <label for="">MODEL NO.</label>
                        <input value="<?=$dta['model_no'] ?>" readonly type="text" class="form-control" required name="model_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">COLOR</label>
                        <input value="<?=$dta['color'] ?>" readonly type="text" class="form-control" required name="color">
                    </div>
                </div>

                <!-- ebd -->

                <div class="row mt-5">
                    <div class="col-md-4">
                        <label for="">OFFICIAL RECEIPT</label>
                        <input value="<?=$dta['official_receipt'] ?>" readonly type="text" class="form-control" required name="official_receipt">
                    </div>
                    <div class="col-md-4">
                        <label for="">OTHERS</label>
                        <input value="<?=$dta['others'] ?>" readonly id="pol_others" type="text" class="form-control" required name="others">
                    </div>
                    <div class="col-md-4">
                        <label for="">DATE</label>
                        <input value="<?=$dta['policy_day'] ?>" readonly id="pol_date" type="text" class="form-control" required name="policy_day">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">COC NO.</label>
                        <input value="<?=$dta['coc_no'] ?>" readonly type="text" class="form-control" required name="coc_no">
                    </div>
                    <div class="col-md-4">
                        <label id="docs_or_vat" for="">DOCS. STAMP</label>
                        <input value="<?=$dta['pol_docs_stamp'] ?>" readonly type="text" id="pol_docs_stamp" class="form-control" required name="pol_docs_stamp">
                    </div>
                    <div class="col-md-4">
                        <label for="">MONTHS</label>
                        <input value="<?=$dta['policy_month'] ?>" readonly id="pol_months" type="text" class="form-control" required name="policy_month">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">POLICY NO.</label>
                        <input value="<?=$dta['policy_no'] ?>" readonly type="text" class="form-control" required name="policy_no">
                    </div>
                    <div class="col-md-4">
                        <label for="">LGT</label>
                        <input value="<?=$dta['lgt'] ?>" readonly id="pol_lgt" type="text" class="form-control" required name="lgt">
                    </div>
                    <div class="col-md-4">
                        <label for="">YEAR</label>
                        <input value="<?=$dta['policy_year'] ?>" readonly type="text" id="pol_year" class="form-control" required name="policy_year">
                    </div>
                </div>
                
                <div class="row mt-5">
                    <div class="col-md-4">
                        <label for="">RECEIVED FROM</label>
                        <input value="<?=$dta['received_from'] ?>" readonly type="text" class="form-control" required name="received_from">
                    </div>
                    <div class="col-md-4">
                        <label for="">PREMIUM SALES</label>
                        <input value="<?=$dta['premium_sales'] ?>" readonly type="text" id="or_prem_sales" class="form-control" required name="premium_sales">
                    </div>
                    <div class="col-md-4">
                        <label for="">MISC</label>
                        <input value="<?=$dta['misc'] ?>" readonly id="or_misc" type="text" class="form-control" required name="misc">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <label for="">ADDRESS</label>
                        <input value="<?=$dta['address'] ?>" readonly type="text" class="form-control" required name="address">
                    </div>
                    <div class="col-md-4">
                        <label for="">DOCS. STAMP</label>
                        <input value="<?=$dta['docs_stamp'] ?>" readonly type="text" id="or_docs_stamp" class="form-control" required name="docs_stamp">
                    </div>
                    <div class="col-md-4">
                        <label for="">TOTAL</label>
                        <input value="<?=$dta['or_total'] ?>"  readonly id="or_total" type="text" class="form-control" required name="or_total">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <label for="">PLACE OF ISSUE</label>
                        <input value="<?=$dta['place'] ?>" readonly type="text" class="form-control" required name="place">
                    </div>
                    <div class="col-md-4">
                        <label for="">LG TAX</label>
                        <input value="<?=$dta['lg_tax'] ?>" readonly id="or_lg_tax" type="text" class="form-control" required name="lg_tax">
                    </div>
                    <div class="col-md-4">
                        <label for="">THE SUM OF PESOS</label>
                        <input value="<?=$dta['the_sum_of_pesos'] ?>" readonly id="or_total_text" type="text" class="form-control" required name="the_sum_of_pesos">
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-12 text-right">
                        <a href="<?=base_url("agent")?>" class="btn btn-danger">Back</a>
                    </div>
                </div>

        </div>
    </div>
</div>
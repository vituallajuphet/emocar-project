<?php
	$this->load->view("print_elements");
	$this->load->view("modal/modal");
?>
<main>
		<div class="main_area">
			<div class="mn_heading_tabs">
				<ul>
					<li class="active">MOTORCYCLE (MC)</li>
					<li>TRICYCLE (TC-Hire)</li>
					<li>PRIVATE CAR (UV - CAR)</li>
					<li>COMMERCIAL VEHICLE (TRUCK)</li>
					<li>TRAILER</li>
				</ul>
			</div>
			<form action="<?=base_url("employee/save_transaction")?>" method="POST" class="form_field_emocar">
				<input type="hidden" name="trans_type" class="trans_type" value="motorcycle">
				<input type="hidden" class="hidden_trans_id">
				<div class="header_form">
					<div class="opt_2">
						<h2 class="opt2_heading">Options</h2>
						<div class="form_field_radio">
							<input type="radio" name="options" value="StrongHold">
							<label for="StrongHold">StrongHold</label>
						</div>
					</div>
					<div class="search_bar_cont">
							<div>					
								<label for="">Search</label>
								<div class="flex_cont">
									<div class="flex-left">
										<input type="text" id="search_bar" placeholder="Search here">
									</div>
									<div class="flex-right">
										<button class="buttonSearch" type="button"><i class="fa fa-search"></i> Search</button>
									</div>	
								</div>							
							</div>
					</div>
				</div>
				<div class="formfield_box coc_formfield">
					<h2 class="main_form_heading">Fill up the form</h2>
					<div class="form_outer_cont">
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="MV FILE NO.">MV FILE NO.</label>
								<input type="text" required name="mb_file_no" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="PLATE NO.">PLATE NO.</label>
								<input type="text" required name="plate_no" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="MOTOR NO.">MOTOR NO.</label>
								<input type="text" required name="motor_no" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="SERIAL / CHASSIS">SERIAL / CHASSIS NO.</label>
								<input type="text" required name="serial_chassis" placeholder="">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="MAKE">MAKE</label>
								<input type="text" required name="make" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="MAKE">SERIES</label>
								<input type="text" required name="series_no" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="TYPE OF BODY">TYPE OF BODY</label>
								<input type="text" required name="type_of_body" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="MODEL NO">MODEL NO.</label>
								<input type="text" required name="model_no" placeholder="">
							</div>							
						</div>
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="DATE ISSUED">DATE ISSUED</label>
								<input type="date" class="opacity_formed" name="date_issued" placeholder="" class="date_issued" readonly>
								<input type="text" name="date_issued" class="dummy_date_text" id="date_final_get" readonly>
							</div>
							<div class="main_frm_fields customfff">
								<label for="FROM 12:00 NN">FROM 12:00 NN</label>
								<input type="date" id="frmdd"  name="date_from" placeholder="" class="date_issued1">
								<input type="text" for="date_nn" name="date_from" class="dummy_date_text1" id="date_nn">
							</div>
							<div class="main_frm_fields customfff">
								<label for="TO 12:00 NN">TO 12:00 NN</label>
								<input type="date" name="date_to" placeholder="" class="date_issued2" >
								<input type="text" name="date_to" class="dummy_date_text2" id="date_end" readonly>
							</div>
							<div class="main_frm_fields">
								<label for="COLOR">COLOR</label>
								<input type="text" required name="color" placeholder="">
							</div>
						</div>
					</div>

					<!-- start -->
					<div class="form_outer_cont">
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="OFFICIAL RECEIPT">OFFICIAL RECEIPT</label>
								<input type="text" required name="official_receipt" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="COC NO.">COC NO.</label>
								<input type="text" required name="coc_no" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="POLICY NO">POLICY NO.</label>
								<input type="text" required name="policy_no" placeholder="">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="OTHERS">OTHERS</label>
								<input type="text" required name="others" placeholder="" value="200" id="pol_others">
							</div>
							<div class="main_frm_fields">
								<label for="DOCS. STAMP" id="docs_or_vat">DOCS. STAMP</label>
								<input type="text" name="pol_docs_stamp" placeholder="" value="200" id="pol_docs_stamp">
							</div>
							<div class="main_frm_fields">
								<label for="LGT">LGT</label>
								<input type="text" name="lgt" placeholder="" value="200" id="pol_lgt">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="DATE">DATE</label>
								<input type="text"  name="policy_day" placeholder="" id="pol_date">
							</div>
							<div class="main_frm_fields">
								<label for="MONTHS">MONTHS</label>
								<input type="MISC"  name="policy_month" placeholder="" id="pol_months">
							</div>
							<div class="main_frm_fields">	
								<label for="YEAR">YEAR</label>
								<input type="text"  name="policy_year" placeholder="" id="pol_year">
							</div>
						</div>
					</div>
					<!-- end -->

					<!-- start -->
					<div class="form_outer_cont">
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="RECEIVED FROM">RECEIVED FROM</label>
								<input type="text" required name="received_from" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="ADDRESS">ADDRESS</label>
								<input type="text" required name="address" placeholder="">
							</div>
							<div class="main_frm_fields">
								<label for="PLACE">PLACE OF ISSUE</label>
								<input type="text" required name="place" placeholder="">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="PREMIUM SALES">PREMIUM SALES</label>
								<input type="text" required name="premium_sales" placeholder="" value="250" id="or_prem_sales">
							</div>
							<div class="main_frm_fields">
								<label for="DOCS. STAMP">DOCS. STAMP</label>
								<input type="text" required name="docs_stamp" placeholder="" value="100" id="or_docs_stamp">
							</div>
							<div class="main_frm_fields">
								<label for="LG TAX">LG TAX</label>
								<input type="text" name="lg_tax" placeholder="" value="100" id="or_lg_tax">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fields">
								<label for="MODEL NO">MISC</label>
								<input type="MISC" name="misc" placeholder="" value="200" id="or_misc">
							</div>
							<div class="main_frm_fields">
								<label for="TOTAL">TOTAL</label>
								<input type="text" name="or_total" placeholder="" value="650" id="or_total">
							</div>
							<div class="main_frm_fields">
								<label for="THE SUM OF PESOS">THE SUM OF PESOS</label>
								<textarea type="text" name="the_sum_of_pesos" id="or_total_text">SIX HUNDRED FIFTY PESOS ONLY</textarea>
							</div>
						</div>
						
					</div>
					<div class="paid_type_cont">
						<div>PAID BY:</div>
						<label for="paid_type_cash">Cash</label>
						<input checked type="radio" id="paid_type_cash" name="paid_type" value="Cash">
						<label for="paid_type_cash">Check</label>
						<input type="radio" id="paid_type_check" name="paid_type" value="Check">
						<div class="check_field">
							<input type="text" name="check_no" placeholder="Check Number" required>
						</div>
						<div class='counter-div'>
							Print Counter
							
						</div>
						<div>
						<div> OR Print Count: <span class='or_count count_val'></span></div>
							<div> COC Print Count: <span class='coc_count count_val'></span></div>
							<div> POLICY Print Count: <span class='policy_count count_val'></span></div>
						</div>
					</div>
					<!-- end -->
					<div class="print_sec">
						<button type="button" id="printOr"><i class="fa fa-print"></i> PRINT OR</button>
						<button type="button" id="printCOC"><i class="fa fa-print"></i> PRINT COC</button>
						<button type="button" id="printPolicy"><i class="fa fa-print"></i> PRINT POLICY</button>
					</div>
				   </div>
				<div class="submit">
					<input type="submit" name="submit" value="LOG TRANSACTION"> 
				</div>
			</form>
			<div class="footer">
	
		</div>
		</div>
	</main>
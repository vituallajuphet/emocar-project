<?php
	$this->load->view("print_elements");
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
				<div class="header_form">
					<div class="opt_2">
						<h2 class="opt2_heading">Options</h2>
						<div class="form_field_radio">
							<input type="radio" name="options" value="StrongHold">
							<label for="StrongHold">StrongHold</label>
						</div>
					</div>
					<div class="search_bar_cont">
						<form action="" class="search_form" method="post" >
							<div>					
								<label for="">Search</label>
								<div class="flex_cont">
									<div class="flex-left">
										<input required type="text" id="search_bar" placeholder="Search here">
									</div>
									<div class="flex-right">
										<button class="buttonSearch" type="button">Search</button>
									</div>	
								</div>							
							</div>
						</form>
					</div>
				</div>
				<div class="formfield_box coc_formfield">
					<h2 class="main_form_heading">Fill up the form</h2>
					<div class="form_outer_cont">
						<div class="form_sec">
							<div class="main_frm_field">
								<label for="MV FILE NO.">MV FILE NO.</label>
								<input type="text" required name="mb_file_no" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="PLATE NO.">PLATE NO.</label>
								<input type="text" required name="plate_no" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="MOTOR NO.">MOTOR NO.</label>
								<input type="text" required name="motor_no" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="SERIAL / CHASSIS">SERIAL / CHASSIS</label>
								<input type="text" required name="serial_chassis" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="POLICY NO">POLICY NO.</label>
								<input type="text" required name="policy_no" placeholder="">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_field">
								<label for="MODEL NO">MODEL NO.</label>
								<input type="text" required name="model_no" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="MAKE">MAKE</label>
								<input type="text" required name="make" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="TYPE OF BODY">TYPE OF BODY</label>
								<input type="text" required name="type_of_body" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="OFFICIAL RECEIPT">OFFICIAL RECEIPT</label>
								<input type="text" required name="official_receipt" placeholder="">
							</div>
							<div class="main_frm_field">
								<label for="COLOR">COLOR</label>
								<input type="text" required name="color" placeholder="">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_field">
								<label for="DATE ISSUED">DATE ISSUED</label>
								<input type="date" name="date_issued" placeholder="" class="date_issued" readonly>
								<input type="text" name="date_issued" class="dummy_date_text" id="date_final_get" readonly>
							</div>
							<div class="main_frm_field">
								<label for="FROM 12:00 NN">FROM 12:00 NN</label>
								<input type="date" name="date_from" placeholder="" class="date_issued1">
								<input type="text" name="date_from" class="dummy_date_text1" id="date_nn">
							</div>
							<div class="main_frm_field">
								<label for="TO 12:00 NN">TO 12:00 NN</label>
								<input type="date" name="date_to" placeholder="" class="date_issued2" readonly>
								<input type="text" name="date_to" class="dummy_date_text2" id="date_end" readonly>
							</div>
						</div>
					</div>

					<!-- start -->
					<div class="form_outer_cont">
						<div class="form_sec">
							<div class="main_frm_fieldss">
								<label for="PLACE">PLACE</label>
								<input type="text" required name="place" placeholder="">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fieldss">
								<label for="OTHERS">OTHERS</label>
								<input type="text" required name="others" placeholder="" value="200" id="pol_others">
							</div>
							<div class="main_frm_fieldss">
								<label for="DOCS. STAMP" id="docs_or_vat">DOCS. STAMP</label>
								<input type="text" name="pol_docs_stamp" placeholder="" value="200" id="pol_docs_stamp">
							</div>
							<div class="main_frm_fieldss">
								<label for="LGT">LGT</label>
								<input type="text" name="lgt" placeholder="" value="200" id="pol_lgt">
							</div>
						</div>
						<div class="form_sec">
							<div class="main_frm_fieldss">
								<label for="DATE">DATE</label>
								<input type="text"  name="policy_day" placeholder="" id="pol_date">
							</div>
							<div class="main_frm_fieldss">
								<label for="MONTHS">MONTHS</label>
								<input type="MISC"  name="policy_month" placeholder="" id="pol_months">
							</div>
							<div class="main_frm_fieldss">	
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
								<label for="DATE">DATE</label>
								<input type="text" name="or_date" placeholder="" id="or_curr_date" readonly>
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
					</div>
					<!-- end -->
					<div class="print_sec">
						<input type="button" id="printOr" value="PRINT OR">
						<input type="button" id="printCOC" value="PRINT COC">
						<input type="button" id="printPolicy" value="PRINT POLICY">
					</div>
				   </div>
				<div class="submit">
					<input type="submit" name="submit" value="LOG TRANSACTION"> 
				</div>
			</form>
			<div class="footer">
            <ul>
				<li>User: Main Branch</li> 
				<li>Branch: Cebu City</li>
				<li>Date: <span id="spanDate"></span></li>
			</ul>
		</div>
		</div>
	</main>
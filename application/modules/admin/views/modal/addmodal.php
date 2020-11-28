<div class="pop_app_add_Emp">
					<div class="pop_up_inner">
						<span class="close_pop_up">X</span>
						<form action="#" method="POST" id="add_emp_admin">
							<h2 class="addhead_emp">Add Employee</h2>
							<div class="parent_form">
								<div class="form_box">
									<label for="">First Name:</label>
									<input type="text" name="first_name" required placeholder="Enter First Name ...">
								</div>
								<div class="form_box">
									<label for="">Middle Name:</label>
									<input type="text" name="middle_name" placeholder="Enter Middle Name ...">
								</div>
								<div class="form_box">
									<label for="">Last Name:</label>
									<input type="text" name="last_name" required placeholder="Enter Last Name ...">
								</div>
						    </div>
							<div class="form_box">
								<label for="">Address:</label>
								<input type="text" name="address" required placeholder="Enter Address ...">
							</div>
							<div class="form_box birthdate">
								<label for="">Birthdate:</label>
								<div class="birth_form">
									<select name="birth_month" required id="">
										<option value="">Month</option>
										<option value="01">Jan</option>
										<option value="02">Feb</option>
										<option value="03">Mar</option>
										<option value="04">Apr</option>
										<option value="05">May</option>
										<option value="06">Jun</option>
										<option value="07">Jul</option>
										<option value="08">Aug</option>
										<option value="09">Sep</option>
										<option value="10">Oct</option>
										<option value="11">Nov</option>
										<option value="12">Dec</option>
									</select>
									<select name="birth_day" required id="">
										<option value="">Day</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
										<option value="21">21</option>
										<option value="22">22</option>
										<option value="23">23</option>
										<option value="24">24</option>
										<option value="25">25</option>
										<option value="26">26</option>
										<option value="27">27</option>
										<option value="28">28</option>
										<option value="29">29</option>
										<option value="30">30</option>
										<option value="31">31</option>
									</select>
									<select name="birth_year" id="">
										<option value="">Year</option>
										<?php
											$curyear = date("Y");
											for ($i=intval($curyear); $i > 1900; $i--) { 
												echo "<option value='$i'>$i</option>\n";
											}
										?>
									</select>
								</div>
							</div>
							<div class="parent_form">
								<div class="form_box">
									<label for="">Gender:</label>
									<select required name="gender" id="">
										<option value="Male">Male</option>
										<option value="Female">Female</option>
									</select>
								</div>
								<div class="form_box">
									<label for="">Type Of User:</label>
									<select name="user_type" required id="">
										<option value="1">Admin</option>
										<option value="2">Employee</option>
										<option value="3">Semi-Admin</option>
									</select>
								</div>
							</div>
							<div class="parent_form">
								<div class="form_box">
									<label for="">Email Address</label>
									<input type="email" name="email" placeholder="Enter email address...">
								</div>
								<div class="form_box">
									<label for="">Contact No.</label>
									<input type="contact" name="contact" placeholder="Enter contact...">
								</div>
							</div>
							<div class="parent_form">
								<div class="form_box">
									<label for="">Office Location:</label>
									<select name="office_location" class="add_location" required id=""> </select>
								</div>
								<div class="form_box">
									<label for="">Branch:</label>
									<select class="add_branch" name="branch" required id=""> </select>
								</div>
							</div>
							<div class="parent_form">
								<div class="form_box">
									<label for="">Username:</label>
									<input required type="text" name="username" placeholder="Enter Username ...">
								</div>
								<div class="form_box">
									<label for="">Password:</label>
									<input class="add_password" type="password" name="password" required placeholder="Enter Password ...">
								</div>
							</div>
							<div class="form_box">
								<input type="submit" name="submit" value="Submit">
							</div>
						</form>
					</div>
				</div>
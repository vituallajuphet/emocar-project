<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_trust_receipt extends MY_Controller {

	public function index(){
		$data["title"] 		="Employee Trust Receipt";
		$data["page_header"] = "Trust Receipt";
		$data["modal"] = "index";
		$this->load_employee_page('index', $data);
	}

	public function get_all_user_data (){
		
		if(is_ajaxs()){

			$response = ["status" => "error", "data" => [], "message" => "No users found on the database!"];

			$res = get_all_users(4);

			if(!empty($res)){
				$response = ["status" => "success", "data" => $res];
			}

			echo json_encode($response);

		}
	}

	public function get_trust_number (){
		
		if(is_ajaxs()){

			$response = ["status" => "error", "trust_id" => 0, "message" => "Something Wrong!"];

			$res =	getNextId("tbl_trust_receipt");

			if(!empty($res)){
				$response = ["status" => "success", "trust_id" => $res];
			}

			echo json_encode($response);
		}	

	}

	private function increment_trust_number() {
		insertData("tbl_trust_receipt" , ["status" => 1, "date_added" => date("Y-m-d")]);
	}

	public function validate_range(){

		if(is_ajaxs()){

			$post = $this->input->post();

			$response = ["status" => "error", "message" => "Something Wrong!"];
			if(!empty($post)){
				
				$par["select"] = "table_data";

				$res = getData("tbl_agent_policies", $par);

				if(!empty($res)){
					$haserr = false;
					foreach ($res as $key) {
						$dta = json_decode($key["table_data"]);
						foreach ($dta as $inner) {
							if($inner->id == $post["trans_type"]){

								$tbleDta = $inner->tble_data;
								
								foreach ($tbleDta as $tbl) {
									if($tbl->id == $post["type"]){
										if(
											(int)$post["sfrom"] >= (int)$tbl->sfrom && (int)$post["sfrom"] <= (int)$tbl->sTo ||
											(int)$post["sfrom"] < (int)$tbl->sfrom && (int)$post["sfrom"] < (int)$tbl->sTo
										){
											$haserr = true;
										}
									}
								}

							}
						}
					}

					$response = ["status" => "success", "message" => "no found"];
					if($haserr){
						$response = ["status" => "error", "message" => "This range is already assigned"];
					}
				}else{
					$response = ["status" => "success", "message" => "no found"];
				}	
			}

			echo json_encode($response);
		}

	}

	public function get_last_data($option =""){

		$maxOr = 0;
		$maxPolicy = 0;
		$maxCOC = 0;

		if(is_ajaxs()){
			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($option)){

				$par["where"] = " table_data like '%$option%' ";

				$result = [];

				$res = getData("tbl_agent_policies", $par);

				if(!empty($res)){

					foreach ($res as $dta) {
						$tbldata = json_decode($dta["table_data"]);

						foreach ($tbldata as $key) {
							if($key->id == $option){

								foreach ($key->tble_data as $tdata) {
									if($tdata->id == "or"){
										$maxOr = ($maxOr > (int)$tdata->sTo) ? $maxOr : $tdata->sTo;
									}
									if($tdata->id == "coc"){
										$maxCOC = ($maxCOC > (int)$tdata->sTo) ? $maxCOC : $tdata->sTo;
									}
									if($tdata->id == "policy"){
										$maxPolicy = ($maxPolicy > (int)$tdata->sTo) ? $maxPolicy : $tdata->sTo;
									}
								}

							}
						}

					}
					
				

				}

				$response = ["status" => "success", "data" => ["or" => $maxOr, "coc" => $maxCOC, "policy" => $maxPolicy]];
			}
			echo json_encode($response);
		}

	}

	public function  save_trust_receive(){

		if(is_ajaxs()){

			$post = $this->input->post();

			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($post)){

				$parseJson = json_decode($post["tableData"]);

				$data = [
					"fk_user_id" =>  $post["agent_id"],
					"fk_user_id" =>  $post["agent_id"],
					"trust_receipt_no" =>  $post["trust_id"],
					"place_issued" =>  $post["address"],
					"table_data" =>  json_encode($parseJson),
					"status" =>  1,
					"date_added" =>  date("Y-m-d"),
				];
			}

			insertData("tbl_agent_policies" , $data);
			$response = ["status" => "success", "message" => "Successful"];

			$this->increment_trust_number();

			echo json_encode($response);
		}
	}
}

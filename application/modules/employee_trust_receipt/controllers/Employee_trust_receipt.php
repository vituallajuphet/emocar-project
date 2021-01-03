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

			$res = get_all_users();

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

	public function increment_trust_number() {

		if(is_ajaxs()){

			$response = ["status" => "error", "message" => "Something Wrong!"];

			insertData("tbl_trust_receipt" , ["status" => 1, "date_added" => date("Y-m-d")]);

			$response = ["status" => "success", "message" => "Successful"];

			echo json_encode($response);

		}	

	}

}

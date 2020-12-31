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

}

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

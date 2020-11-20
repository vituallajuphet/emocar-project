<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee extends MY_Controller {

	public function index(){
		$data["title"] 		="Employee";
		$this->load_employee_page('index', $data);
	}

	public function save_transaction (){

		$post = $this->input->post();

		if(!empty($_POST)){
			
			$paid_type = $post["paid_type"];

			$data = array(
				"fk_user_id" => get_user_id(),
				"trans_type" => $post["trans_type"],
				"mb_file_no" => $post["mb_file_no"],
				"trans_option" => "StrongHold",
				"plate_no" => $post["plate_no"],
				"motor_no" => $post["motor_no"],
				"serial_chassis" => $post["serial_chassis"],
				"policy_no" => $post["policy_no"],
				"model_no" => $post["model_no"],
				"make" => $post["make"],
				"type_of_body" => $post["type_of_body"],
				"official_receipt" => $post["official_receipt"],
				"color" => $post["color"],
				"date_issued" =>  date('Y-m-d', strtotime($post["date_issued"])),
				"date_from" =>  date('Y-m-d', strtotime($post["date_from"])),
				"date_to" =>  date('Y-m-d', strtotime($post["date_to"])),
				"others" => $post["others"],
				"pol_docs_stamp" => $post["pol_docs_stamp"],
				"lgt" => $post["lgt"],
				"policy_day" => $post["policy_day"],
				"policy_month" => $post["policy_month"],
				"policy_year" => $post["policy_year"],
				"received_from" => ucfirst($post["received_from"]),
				"address" => $post["address"],
				"place" => $post["place"],
				"or_date" =>  date('yy-m-d', strtotime($post["or_date"])),
				"premium_sales" => $post["premium_sales"],
				"docs_stamp" => $post["docs_stamp"],
				"lg_tax" => $post["lg_tax"],
				"misc" => $post["misc"],
				"or_total" => $post["or_total"],
				"the_sum_of_pesos" => $post["the_sum_of_pesos"],
				"status" => 1,
				"published_status" => 0,
				"paid_type" => $post["paid_type"],
				"check_no" => $post["check_no"],
			);
		}
		
		$res = insertData("tbl_transactions", $data);
	
	}

	public function search_policy ($search_val){
	
		$response = ["status" => "error", "data" => []];

		$par["where"] = " trans.mb_file_no = '$search_val' OR trans.plate_no = '$search_val'";

		if(isset($_GET["search_by_id"])){
			$par["where"] = " trans.trans_id = $search_val";
		}

		if(!empty($search_val)){
			
			$par["join"] = [ 
				"employees emp" => "emp.fk_user_id = trans.fk_user_id"
			];
			$res = getData("tbl_transactions trans", $par);
			if(!empty($res)){
				$response = ["status" => "success", "data" => $res];
			}
		}

		echo json_encode($response);

	}

}

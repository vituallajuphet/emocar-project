<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee extends MY_Controller {

	public function index(){
		$data["title"] 		="Employee";
		$this->load_employee_page('index', $data);
	}

	public function save_transaction (){

		$response = ["status"=> "error", "message" => "Something Wrong!"];

		if(is_ajaxs()){
			$post = $this->input->post();
			if(!empty($post)){
			
				$paid_type = $post["paid_type"];
	
				$data = array(
					"fk_user_id" => get_user_id(),
					"trans_type" => ucfirst($post["trans_type"]),
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
					"or_date" =>  date('yy-m-d', strtotime($post["date_issued"])),
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
					"coc_no" => $post["coc_no"],
					"series_no" => $post["series_no"]
					
				);
			}
			
			$id = insertData("tbl_transactions", $data);
			$response = ["status" => "success", "message" => "Saved Successfully!", "id" =>$id ];
			echo json_encode($response);
		}

	
	}

	private function is_transaction_exists ($off_rec){
		$par ["where"] =" official_receipt = '$off_rec'";
		$res = getData("tbl_transactions", $par);
		return $res;
	}



	public function search_policy (){
		
		if(is_ajaxs()){
			$response = ["status" => "error", "data" => []];

			if(isset($_GET["search_val"]) && isset($_GET["tab_value"])){

				$search_val = $_GET["search_val"];
				$tab_value  = $_GET["tab_value"];
				$par["where"] = " (trans.mb_file_no = '$search_val' OR trans.plate_no = '$search_val') AND trans_type = '$tab_value'";
			}

			if(isset($_GET["search_by_id"])){
				$search_val = $_GET["search_val"];
				$par["where"] = " trans.trans_id = $search_val";
			}
			

			if(!empty($search_val) ){
				
				$par["join"] = [ 
					"employees emp" => "emp.fk_user_id = trans.fk_user_id"
				];

				$par["select"] ="*, trans.address as t_address";

				$res = getData("tbl_transactions trans", $par);
				
				if(!empty($_GET["print"])){
					$printData = [
						"trans_id"=> $res[0]["trans_id"],
						"print_counts" => 1,
						"status" => 1,
						"print_type" => $_GET['print_type'],
						"print_data" => json_encode([
							"user_id" => $res[0]["fk_user_id"]
						])
					];
					
					$id = insertData("tbl_print_counts", $printData);
				}
				
				if(!empty($res)){
					
					$counts = $this->get_print_counts($res[0]["trans_id"]);
					
					$response = ["status" => "success", "data" => $res, "counts" => $counts ];
				}
			}

			echo json_encode($response);
		}
	}

	private function get_print_counts ($trans_id) {
		$par["select"] ="*";
		$par["where"] = ["trans_id" => $trans_id, "status" => 1];

		$res = getData("tbl_print_counts print", $par);
		return $res;
	}

	public function send_code (){
		if(is_ajaxs()){
			$id = get_user_id();
			
			$res = ["id" => $id, "code" => rand(100000, 999999)];

			echo json_encode($res);
		}
	}

	public function api_check_transaction($off_rec){
		
		if(is_ajaxs()){
			$resp = ["status"=> "error", "message" => ""];
			if($this->is_transaction_exists($off_rec)){
				$resp = ["status"=> "error", "message" => "Transaction already recorded. Please contact the administrator!"];
			}else{
				$resp = ["status"=> "success", "message" => ""];
			}

			echo json_encode($resp);

		}

	}

}

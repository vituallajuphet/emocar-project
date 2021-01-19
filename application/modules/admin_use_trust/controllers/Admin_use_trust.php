<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_use_trust extends MY_Controller {

	private $trust_name;
	private $serial_num;

	public function index(){
		$data["title"] 			="Add Entries";
		$data["modal"] 			= "index";
		$data["page_header"] 			="Add Entries";
		
		if(empty($_GET["data"])){
			redirect(base_url("agent"));
		}
		
		$getdata = $_GET["data"];
		$data["trust_data"] = $getdata;
		$data["trust_id"] = $_GET["trust_id"];
		$data["fk_user_id"] = $_GET["user_id"];

		$this->load_page('index', $data);
	}

	public function save_transaction (){

		$response = ["status"=> "error", "message" => "Something Wrong!"];

		if(is_ajaxs()){
			
			$post = $this->input->post();

			if(!empty($post)){
			
				$paid_type = $post["paid_type"];
	
				$data = array(
					"fk_user_id" => $post["fk_user_id"],
					"trans_type" => ucfirst($post["trans_type"]),
					"fk_trust_receipt_id" => $post["trust_id"],
					"trust_data" => $post["trust_info"],
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
			
			$res = insertData("tbl_trust_agents", $data);

			$response = ["status" => "success", "message" => "Saved Successfully!"];

			echo json_encode($response);

		}
	}
}

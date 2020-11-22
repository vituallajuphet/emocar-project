<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_policies extends MY_Controller {

	public function index(){
		$data["title"] 		="Employee Policies";
		$data["page_header"] = "List of policies";
		$data["modal"] = "index";
		$this->load_employee_page('index', $data);
	}

	public function get_transaction_data(){

		if(is_ajaxs()){

			$limit        = $this->input->post('length');
			$offset       = $this->input->post('start');
			$search       = $this->input->post('search');
			$order        = $this->input->post('order');
			$draw         = $this->input->post('draw');
			
			$column_order = array(
				'trans.trans_id',
				'trans.received_from',
				'trans.trans_type',
				'trans.mb_file_no',
				'trans.plate_no',
				'trans.published_status',
				'trans.date_issued',
			);

			$join         = array(
				"employees emp" => "emp.fk_user_id = trans.fk_user_id",
			);
			$select       = "*";
			$where        = array(
				'trans.status' 		=> 1,
				'trans.fk_user_id' 	=> get_user_id(),
			);
			$group        = array();
			$list         = getDataTables('tbl_transactions trans',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
			
			$list_array = array(
				"draw" => $draw,
				"recordsTotal" => $list['count_all'],
				"recordsFiltered" => $list['count'],
				"data" => $list['data']
			);
			echo json_encode($list_array);

		}
	}

	public function get_trans_info($id){
		if(is_ajaxs()){

			$response = ["status" => "error", "data" => []];
			if(!empty($id)){
				$par["where"] = [ "trans_id" => $id, "status" => 1 ];
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

	public function api_delete_policy (){
		
		if(is_ajaxs()){
			$post 		= $this->input->post();
			$response 	= ["status" => "error", "message" => ""];

			if(!empty($post)){
				$trans_id = $post["trans_id"];

				$set 	= [ "status" 	=> 0 ];
				$where 	= [ "trans_id" 	=> $trans_id ];

				updateData("tbl_transactions", $set, $where);

				$response = ["status" => "success"];
			}

			echo json_encode($response);
		}
	}
	

	public function api_update_policy (){
		
		if(is_ajaxs()){
			
			$response 	= ["status" => "error", "message" => ""];
			$post = $this->input->post();

			$set = array(
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
				"others" => $post["others"],
				"pol_docs_stamp" => $post["pol_docs_stamp"],
				"lgt" => $post["lgt"],
				"policy_day" => $post["policy_day"],
				"policy_month" => $post["policy_month"],
				"policy_year" => $post["policy_year"],
				"received_from" => ucfirst($post["received_from"]),
				"address" => $post["address"],
				"place" => $post["place"],
				"premium_sales" => $post["premium_sales"],
				"docs_stamp" => $post["docs_stamp"],
				"lg_tax" => $post["lg_tax"],
				"misc" => $post["misc"],
				"or_total" => $post["or_total"],
				"the_sum_of_pesos" => $post["the_sum_of_pesos"],
			);

			$where = [
				"trans_id" => $post["trans_id"]
			];

			updateData("tbl_transactions", $set, $where);

			$response = ["status" => "success"];

			echo json_encode($response);

		}


	}

}

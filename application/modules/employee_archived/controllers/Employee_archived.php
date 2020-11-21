<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_archived extends MY_Controller {

	public function index(){
		$data["title"] 		="Archived Policies";
		$data["page_header"] = "List of archived policies";
		$data["modal"] = "index";
		$this->load_employee_page('index', $data);
	}

	public function get_transaction_data(){

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
			'trans.status' 		=> 0,
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

	public function get_trans_info($id){

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

	public function api_restore_policy (){
		
		$post 		= $this->input->post();
		$response 	= ["status" => "error", "message" => ""];

		if(!empty($post)){
			$trans_id = $post["trans_id"];

			$set 	= [ "status" 	=> 1 ];
			$where 	= [ "trans_id" 	=> $trans_id ];

			updateData("tbl_transactions", $set, $where);

			$response = ["status" => "success"];
		}

		echo json_encode($response);
	}
	

}

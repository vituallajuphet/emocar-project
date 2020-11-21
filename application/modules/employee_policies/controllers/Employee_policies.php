<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_policies extends MY_Controller {

	public function index(){
		$data["title"] 		="Employee Policies";
		$data["page_header"] = "List of policies";
		$data["modal"] = "modal";
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
			'trans.trans_type',
			'trans.mb_file_no',
			'trans.plate_no',
			'emp.first_name',
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
	

}

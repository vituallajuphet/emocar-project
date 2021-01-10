<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Agent extends MY_Controller {

	public function index(){
		$data["title"] 			="Details Entries";
		$data["modal"] 			= "index";
		$data["page_header"] 	= "Details Entries";
		
		$this->load_agent_page('index', $data);
	}

	public function get_trust_data(){

		if(is_ajaxs()){

			$limit        = $this->input->post('length');
			$offset       = $this->input->post('start');
			$search       = $this->input->post('search');
			$order        = $this->input->post('order');
			$draw         = $this->input->post('draw');
			
			$column_order = array(
				'agent_policy_id',
				'trust_receipt_no',
				'date_added',
			);

			$join = [];

			$select       = "*";
			
			$where        = array(
				'status' 		=> 1
			);

			$group        = array();
			$list         = getDataTables('tbl_agent_policies trust',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
			
			$list_array = array(
				"draw" => $draw,
				"recordsTotal" => $list['count_all'],
				"recordsFiltered" => $list['count'],
				"data" => $list['data']
			);
			echo json_encode($list_array);

		}
	}

	public function get_trust_details($id =0){

		if(is_ajaxs()){

			$response = ["status" => "error", "data" => []];
			if(!empty($id)){
				$par["where"] = [ "agent_policy_id" => $id, "status" => 1 ];
				
				$res = getData("tbl_agent_policies trust", $par);

				if(!empty($res)){
					$response = ["status" => "success", "data" => $res];
				}
			}
			echo json_encode($response);
		}
	} 

}
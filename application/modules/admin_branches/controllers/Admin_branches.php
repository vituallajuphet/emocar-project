<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_branches extends MY_Controller {

	public function index(){
		$data["title"] 		="Admin Branches";
		$data["modal"] = "index";
		$data["page_header"] = "List of Branches";
		$this->load_page('index', $data);
	}
	
	public function get_branches_data(){

		$limit        = $this->input->post('length');
		$offset       = $this->input->post('start');
		$search       = $this->input->post('search');
		$order        = $this->input->post('order');
		$draw         = $this->input->post('draw');
		
		$column_order = array(
			'brn.branch_id',
			'brn.branch_name',
			'loc.location_name',
			'brn.date_added',
		);

		$join         = array(
			"tbl_locations loc" => "brn.fk_location_id = loc.loc_id",
		);
		$select       = "*";
		$where        = array(
			'brn.status' 	=> 1,
		);
		$group        = array();
		$list         = getDataTables('tbl_branches brn',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
		
		$list_array = array(
			"draw" => $draw,
			"recordsTotal" => $list['count_all'],
			"recordsFiltered" => $list['count'],
			"data" => $list['data']
		);
		echo json_encode($list_array);
	}	

	public function api_get_branch ($brn_id){

		if(is_ajaxs()){	

			$response = ["status" => "error", "data" => []];

			if(!empty($brn_id)){
				
				$par["where"] = [ "brn.branch_id" => $brn_id ];

				$par["join"] = [ 
					"tbl_locations loc" => "loc.loc_id = brn.fk_location_id"
				];

				$res = getData("tbl_branches brn", $par);
				if(!empty($res)){
					$response = ["status" => "success", "data" => $res];
				}

			}

			echo json_encode($response);
		}
	}

	public function api_save_branch (){

		if(is_ajaxs()){	
			
			$post = $this->input->post();

			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($post["location"]) && !empty($post["branch_name"])){
				
				$data = [
					"fk_location_id" => $post["location"],
					"branch_name" => $post["branch_name"],
					"date_added" => date("Y-m-d"),
					"status" => 1,
				];

				insertData("tbl_branches" ,$data);

				$response = ["status" => "success", "message" => "Saved Successfully!"];

			}

			echo json_encode($response);
		}
	} 

	public function api_delete_branch (){

		if(is_ajaxs()){	
			
			$branch_id = $this->input->post("branch_id");

			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($branch_id)){
				
				$set = array("status" => 0);
				$where = array("branch_id" => $branch_id);

				updateData("tbl_branches", $set, $where);

				$response = ["status" => "success", "message" => "Deleted Successfully!"];

			}

			echo json_encode($response);
		}
	} 
	
}

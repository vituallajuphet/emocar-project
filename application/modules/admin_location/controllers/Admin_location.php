<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_location extends MY_Controller {

	public function index(){
		$data["title"] 		="Admin Location";
		$data["modal"] = "index";
		$data["page_header"] = "List of Locations";
		$this->load_page('index', $data);
	}
	
	public function get_location_data(){

		$limit        = $this->input->post('length');
		$offset       = $this->input->post('start');
		$search       = $this->input->post('search');
		$order        = $this->input->post('order');
		$draw         = $this->input->post('draw');
		
		$column_order = array(
			'loc.loc_id',
			'loc.location_name',
			'loc.date_added',
		);

		$join         = array();
		$select       = "*";
		$where        = array(
			'loc.status' 	=> 1,
		);
		$group        = array();
		$list         = getDataTables('tbl_locations loc',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
		
		$list_array = array(
			"draw" => $draw,
			"recordsTotal" => $list['count_all'],
			"recordsFiltered" => $list['count'],
			"data" => $list['data']
		);
		echo json_encode($list_array);
	}	

	public function api_get_location ($loc_id){

		if(is_ajaxs()){	

			$response = ["status" => "error", "data" => []];

			if(!empty($loc_id)){
				
				$par["where"] = [ "loc_id" => $loc_id ];

				$res = getData("tbl_locations loc", $par);
				if(!empty($res)){
					$response = ["status" => "success", "data" => $res];
				}

			}

			echo json_encode($response);
		}
	}

	public function api_save_location (){

		if(is_ajaxs()){	
			
			$post = $this->input->post();

			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($post["location_name"])){
				
				if($this->is_exists($post)){
					$response = ["status" => "error", "message" => "Location already exists!"];
				}
				else{
					$data = [
						"location_name" => ucfirst($post["location_name"]),
						"date_added" => date("Y-m-d"),
						"status" => 1,
					];
	
					insertData("tbl_locations" ,$data);
	
					$response = ["status" => "success", "message" => "Saved Successfully!"];
				}
			}

			echo json_encode($response);
		}
	} 

	private function is_exists($post, $loc_id= 0){
		
		$par["where"] = ["location_name" =>$post["location_name"], "status" => 1 ];
		
		if($loc_id != 0){
			$par["where"] = ["location_name" =>$post["location_name"], "status" => 1, "loc_id !=" => $loc_id ];
		}
		
		$res = getData("tbl_locations", $par);

		return !empty($res);
	}

	public function api_delete_location (){

		if(is_ajaxs()){	
			
			$loc_id = $this->input->post("loc_id");

			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($loc_id)){
				
				$set = array("status" => 0);
				$where = array("loc_id" => $loc_id);

				updateData("tbl_locations", $set, $where);

				$response = ["status" => "success", "message" => "Deleted Successfully!"];

			}

			echo json_encode($response);
		}
	} 

	public function api_update_location (){

		if(is_ajaxs()){	
			
			$post = $this->input->post();

			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($post["location_name"]) && !empty($post["loc_id"])){
				
				if($this->is_exists($post, $post["loc_id"])){
					$response = ["status" => "error", "message" => "Location is already exist!"];
				}else{
					$set = [
						"location_name" => $post["location_name"],
					];
	
					$where = ["loc_id" => $post["loc_id"]];
					updateData("tbl_locations" ,$set, $where);
					
					$response = ["status" => "success", "message" => "Updated Successfully!"];
				}

				

			}

			echo json_encode($response);
		}
	} 

	
	
}

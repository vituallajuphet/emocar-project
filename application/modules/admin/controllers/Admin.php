<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {

	public function index(){
		redirect(base_url("admin/employees"));
	}

	public function employees (){
		$data["title"] 			="Admin";
		$data["modal"] 			= "index";
		$data["page_header"] 	= "List of employees";
		
		$this->load_page('index', $data);
	}

	// api
	public function save_employee(){

		if(is_ajaxs()){
			$post = $this->input->post();
			$response = ["status" => "failed"];

			if(!empty($post)){

				$data = array(
					"username" => $post["first_name"],
					"password" => password_hash($post["first_name"], PASSWORD_DEFAULT),
					"user_type" => 2,
					"user.status" => 1,
					"is_logged" => 0,
				);

				$user_id = insertData("users", $data);

				if($user_id){
					$data = array(
						"fk_user_id" => $user_id,
						"first_name" => $post["first_name"],
						"middle_name" =>  $post["middle_name"],
						"last_name" => $post["last_name"],
						"address" => $post["address"],
						"birth_date" => $post["birth_year"] ."-".$post["birth_month"]. "-".$post["birth_day"],
						"gender" => $post["gender"],
						"location" => $post["office_location"],
						"branch" => $post["branch"],
					);

					insertData("employees",  $data)  ;
					$response = ["status" => "success"];
				}
			}

			echo json_encode($response);
		}

	}

	public function get_employees_data(){

		$limit        = $this->input->post('length');
		$offset       = $this->input->post('start');
		$search       = $this->input->post('search');
		$order        = $this->input->post('order');
		$draw         = $this->input->post('draw');
		
		$column_order = array(
			'emp.employee_id',
			'emp.first_name',
			'emp.middle_name',
			'emp.last_name',
			'emp.branch',
			'emp.location',
		);

		$join         = array(
			"users user" => "user.user_id = emp.fk_user_id",
		);
		$select       = "*";
		$where        = array(
			'user.status' 	=> 1,
			'user.user_type' 	=> 2,
		);
		$group        = array();
		$list         = getDataTables('employees emp',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
		
		if(!empty($list["data"])){
			$c = 0;
			foreach ($list['data'] as $key) {

				$location_id = $key->location;
				$branch_id =  $key->branch;

				$list['data'][$c]->usr_location = $this->get_user_location($location_id, true);
				$list['data'][$c]->usr_branch =  $this->get_user_location($branch_id, false);
				$c++;
			}
		}
		

		$list_array = array(
			"draw" => $draw,
			"recordsTotal" => $list['count_all'],
			"recordsFiltered" => $list['count'],
			"data" => $list['data']
		);
		echo json_encode($list_array);
	}

	public function api_get_userinfo ($user_id){
		
		if(is_ajaxs()){
			
			$response = ["status" => "error", "data" => []];
			if(!empty($user_id)){
				$par["where"] = [ "user.user_id" => $user_id, "status" => 1 ];
				$par["join"] = [ 
					"employees emp" => "emp.fk_user_id = user.user_id"
				];
				$res = getData("users user", $par);

				if(!empty($res)){
					$res[0]["location"] = $this->get_user_location($res[0]["location"], true);
					$res[0]["branch"] = $this->get_user_location($res[0]["branch"], false);
					unset($res[0]["password"]);
					$response = ["status" => "success", "data" => $res];
				}
			}
			echo json_encode($response);

		}
	}

	private function get_user_location($id, $is_location = true){
	
		$result= [];

		if($is_location){
			$par["where"] = ["loc_id" => $id];
			$res= getData("tbl_locations", $par, "obj");
		}else{
			$par["where"] = ["branch_id" => $id];
			$res = getData("tbl_branches", $par, "obj");
		}

		if(!empty($res)){
			$result = $res[0];
		}

		return $result;

	}

	public function api_get_locations (){

		if(is_ajaxs()){
			
			$response = ["status" => "error", "data" => []];
			$locations = get_branches_and_location();

			if(!empty($locations)){
				$response = ["status" => "success", "data" => $locations];
			}

			echo json_encode($response);
		}
	}

	public function api_update_user (){

		if(is_ajaxs()){
			
			$response = ["status" => "error", "data" => []];
			
			echo '<pre>';
			print_r($_POST);
			echo '</pre>';
			exit;

			// echo json_encode($response);
		}
	}
	
}

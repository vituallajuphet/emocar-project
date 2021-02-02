<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_agents extends MY_Controller {

	public function index(){
		$data["title"] 			="Admin";
		$data["modal"] 			= "index";
		$data["page_header"] 	= "List of Agents";
		$this->load_page('index', $data);
	}

	// api
	public function save_employee(){

		if(is_ajaxs()){
			$post = $this->input->post();
			$response = ["status" => "error", "message" => "Something Wrong!"];

			if(!empty($post)){

				if($this->validatedUser($post["username"])){
					$data = array(
						"username" => $post["username"],
						"password" => password_hash($post["password"], PASSWORD_DEFAULT),
						"user_type" => $post["user_type"],
						"status" => 1,
						"is_logged" => 0,
					);
	
					$user_id = insertData("users", $data);
	
					if($user_id){
						$data = array(
							"fk_user_id" => $user_id,
							"first_name" => ucfirst($post["first_name"]),
							"middle_name" =>  ucfirst($post["middle_name"]),
							"last_name" => ucfirst($post["last_name"]),
							"address" => ucfirst($post["address"]),
							"birth_date" => $post["birth_year"] ."-".$post["birth_month"]. "-".$post["birth_day"],
							"gender" => ucfirst($post["gender"]),
							"location" =>  $post["office_location"],
							"branch" => $post["branch"],
							"email" => $post["email"],
							"contact_no" => $post["contact"],
							"profile_name" => "",
						);

						insertData("employees",  $data);
							
						$response = ["status" => "success"];
					}
				}else{
					$response = ["status" => "error", "message" => "The username is already used!"];
				}

			}

			echo json_encode($response);
		}
	}

	private function validatedUser ($username, $user_id = 0){
		
		$ret = true;

		$par["where"] = ["username" => $username];

		if($user_id != 0){
			$par["where"] = ["username" => $username, "user_id !=" => $user_id];
		}

		$res = getData("users", $par);

		if(!empty($res)){
			$ret = false;
		}

		return $ret;
	}

	public function get_employees_data(){

		$limit        = $this->input->post('length');
		$offset       = $this->input->post('start');
		$search       = $this->input->post('search');
		$order        = $this->input->post('order');
		$draw         = $this->input->post('draw');
		$sort_by       = $this->input->post('sortby');
		
		$user_type = 4;
		$select_table = "employees emp";

	
		$column_order = array(
			'emp.fk_user_id',
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
			'user.user_type' 	=> 4,
		);


		$group        = array();
		$list         = getDataTables($select_table ,$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
		
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
				$user_type = $_GET["type"];

				
				$par["where"] = [ "user.user_id" => $user_id, "status" => 1 ];

				$par["join"] = [ 
					"employees emp" => "emp.fk_user_id = user.user_id"
				];
				if($user_type == 1){
					$par["join"] = [ 
						"user_meta emp" => "emp.fk_user_id = user.user_id"
					];
				}

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
			
			$response 	= ["status" => "error", "message" => "Something Wrong!"];
			$post 		= $this->input->post();
			$where 	    = ["user_id" => $post["user_id"]];
			$set 	    = array( "username" => $post["username"], "user_type" => $post["user_type"], );

			updateData("users", $set, $where);

			$set = array(
				"first_name" => ucfirst($post["first_name"]),
				"middle_name" =>  ucfirst($post["middle_name"]),
				"last_name" => ucfirst($post["last_name"]),
				"address" => ucfirst($post["address"]),
				"birth_date" => $post["birth_date"],
				"gender" => ucfirst($post["gender"]),
				"location" =>  $post["location"],
				"branch" => $post["branches"],
				"email" => $post["email"],
				"contact_no" => $post["contact"],
			);

			$where 	    = ["fk_user_id" => $post["user_id"]];

			updateData("employees",  $set, $where);

			$response = ["status" => "success"];

			echo json_encode($response);
		}
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
				$res = getData("tbl_transactions trans", $par);
				if(!empty($res)){
					$response = ["status" => "success", "data" => $res];
				}
			}

			echo json_encode($response);
		}
	}


	public function api_delete_employee (){

		if(is_ajaxs()){
			$response = ["status" => "error", "message" => "Something Wrong!"];	
			
			if(!empty($_POST["user_id"])){
				$where = [
					"user_id" => $_POST["user_id"]
				];

				updateData("users", ["status"=> 2 ], $where);
				$response = ["status" => "success", "message" => "Success"];	
			}

			echo json_encode($response);
		}
	}

	
	
}

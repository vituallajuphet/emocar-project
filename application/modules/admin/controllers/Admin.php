<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {

	public function index(){
		$data["title"] 		="Admin";
		$data["modal"] = "modal.php";
		$this->load_page('index', $data);
	}

	// api
	public function save_employee(){

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
		
		$list_array = array(
			"draw" => $draw,
			"recordsTotal" => $list['count_all'],
			"recordsFiltered" => $list['count'],
			"data" => $list['data']
		);
		echo json_encode($list_array);
	}

	
}

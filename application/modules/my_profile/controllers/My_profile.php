<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_profile extends MY_Controller {

	public function index(){
		$data["title"] 		= "My Profile";
		$data["userdata"] 	= getUserData();

		$this->load_global_page('index', $data);
	}

	public function update_profile(){
		
		if(is_ajaxs()){

			$response 	= ["status" => "error", "message" => "Something Wrong!"];
			$post 	  	= getJsonData();

			if(!empty($post)){

				if(!$this->validate_password($post)){
					$response 	= ["status" => "error", "message" => "Incorrect Password!"];
				}
				else{
					$user_id = $post->user_id;
					$set 	 = array(
						"first_name"	=> $post->fname,
						"middle_name"	=> $post->mname,
						"last_name"		=> $post->lname,
						"address"		=> $post->address,
						"birth_date"	=> $post->bday,
						"gender"		=> $post->gender,
					);
					$where	= array("fk_user_id" => $user_id);

					$tlbname = ($post->user_type == 2 ) ? "employees" : "user_meta";

					updateData($tlbname, $set, $where);
				}
			}
			
			echo json_encode($response);
		}

	}

	private function validate_password($post){
		
	}

	public function get_profile_info(){

		if(is_ajaxs()){

			$res 	 = ["status"=>"error"];
			$usrdata = getUserData();

			if(!empty($usrdata)){
				$res = ["status"=> "success", "data"=> $usrdata];
			}

			echo json_encode($res);

		}

	}

}

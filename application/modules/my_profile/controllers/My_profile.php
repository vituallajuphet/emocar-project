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
						"first_name"	=> ucfirst($post->fname),
						"middle_name"	=> ucfirst($post->mname),
						"last_name"		=> ucfirst($post->lname),
						"address"		=> ucfirst($post->address),
						"birth_date"	=> $post->bday,
						"gender"		=> $post->gender,
					);
					$where	= array("fk_user_id" => $user_id);

					$tlbname = ($post->user_type == 2 ) ? "employees" : "user_meta";

					updateData($tlbname, $set, $where);

					$set	= [
						"username" => $post->username, 
						"password" => password_hash($post->con_password, PASSWORD_DEFAULT)
					];
					$where	= array("user_id" => $user_id);
					updateData("users", $set, $where);

					$response 	= ["status" => "success", "message" => "Updated Successfully!"];
				}
			}
			
			echo json_encode($response);
		}

	}

	private function validate_password($post){
		
		$userdata = getUserData(true);
		return (password_verify($post->password, $userdata["password"]));

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

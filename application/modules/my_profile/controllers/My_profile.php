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

					$tlbname = ($post->user_type == 2 || $post->user_type == 4 ) ? "employees" : "user_meta";

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

	public function api_update_profilepic(){

		if(is_ajaxs()){

			$response = ["status" => "error" , "message" => "Something Wrong!"];

			if(!empty($_FILES["file"]["name"])){

				$settings["file_name"] = "profile-".time();
				$path = $_FILES['file']['name'];
				$ext = pathinfo($path, PATHINFO_EXTENSION);

				if(upload_file($_FILES, $settings)){

					// update database

					$filename = $settings["file_name"].".".$ext;

					$user_id = get_user_id();
					$tbl_name = "employees";
					$set = ["profile_name" => $filename];
					$where = ["fk_user_id" => $user_id];

					if(get_user_type() == 1){
						$tbl_name = "user_meta";
					}

					updateData($tbl_name, $set, $where);

					$response = ["status" => "success" , "message" => "Uploaded successfully!"];
				}
	
			}
			echo json_encode($response);
		}

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

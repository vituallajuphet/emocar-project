<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_verification extends MY_Controller {

	public function index(){
		$data["title"] 		="Admin Print Code";
		$data["modal"] = "index";
		$data["page_header"] = "List of Locations";
		$this->load_page('index', $data);
	}

	public function get_verification_code($direct = true){
		if(is_ajaxs()){
			$par["select"] ="*";
			$par["order"] = "id DESC";
			$par["limit2"] = [1];
			$response = ["status" => "error", "data" => []];
			$res = getData("tbl_verification_code", $par);
			if(!empty($res)){
				$response = ["status" => "success", "data" => $res];
			}

			if (!$direct) {
				return $res;
			}

			else{
				echo json_encode($response);
			}
		}
	}



	public function generate_newcode(){
		if(is_ajaxs()){
			$response = ["status" => "error", "data" => []];

			$data = array(
				"code" => $this->generate_code(6),
				"user_id" => get_user_id(),
			);

			$res = insertData("tbl_verification_code",  $data);
			if($res != 0){
				$response = ["status" => "success"];
				if(get_user_type() == 1){
					$response["data"] = $this->get_verification_code(false);
				}
			}
			echo json_encode($response);
		}
	}


	private function generate_code($length) {
		$characters = '0123456789abcdefghijklmnopqrs092u3tuvwxyzaskdhfhf9882323ABCDEFGHIJKLMNksadf9044OPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

}

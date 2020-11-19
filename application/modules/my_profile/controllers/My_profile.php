<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_profile extends MY_Controller {

	public function index(){
		$data["title"] 		="My Profile";
		$data["userdata"] = getUserData();

		$this->load_global_page('index', $data);
	}


}

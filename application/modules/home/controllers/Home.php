<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {

		public function index(){

			$user_type = $this->session->userdata("user_type");

			if($user_type == 1){
				redirect(base_url("admin"));
			}
			else if($user_type == 2){
				redirect(base_url("employee"));
			}
			else if($user_type == 4){
				redirect(base_url("agent"));
			}
		}

}

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logout extends MY_Controller {

	public function index(){
		$session_data = array( "user_id", "is_logged","firstname","lastname", "user_type", "username", "status");
		$this->session->unset_userdata($session_data);
		
		redirect(base_url('login'));
	}

}
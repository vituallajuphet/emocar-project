<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_upload extends MY_Controller {

	public function index (){
		$data["title"] 			="Admin Upload Policy";
		$data["modal"] 			= "index";
		$data["page_header"] 	= "Upload Policy";
		
		$this->load_page('index', $data);
	}
	
}

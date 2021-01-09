<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Agent extends MY_Controller {

	public function index(){
		$data["title"] 			="Agent";
		$data["modal"] 			= "index";
		$data["page_header"] 	= "Agent";
		
		$this->load_agent_page('index', $data);

		
	}

}

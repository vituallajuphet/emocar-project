<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_agent_policies extends MY_Controller {

	public function index(){
		$data["title"] 		="Agent Policies";
		$data["page_header"] = "Agent Policies";
		$data["modal"] = "index";
		$this->load_page('index', $data);
	}
	
}

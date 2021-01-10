<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Agent_use_trust extends MY_Controller {

	private $trust_name;
	private $serial_num;

	public function index(){
		$data["title"] 			="Add Entries";
		$data["modal"] 			= "index";
		$data["page_header"] 			="Add Entries";
		
		
		if(empty($_GET["data"])){
			redirect(base_url("agent"));
		}
		
		$getdata = $_GET["data"];
		$data["trust_data"] = json_decode($getdata);

		$this->load_agent_page('index', $data);
	}
	
}

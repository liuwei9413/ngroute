<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
	public function index()
	{		
		$this->load->model('NewsModel');
		// $this->load->database();

		// $data = $this->NewsModel->getTest();
		// $data = $this->NewsModel->get('2');
		// print_r($data); die;

		$this->load->view('main/index.html');
	}


	public function add() {
		// echo "hello"; die;
		print_r($_REQUEST);die;
		$data = $this->input->post();
		print_r($data); die;
	}
}

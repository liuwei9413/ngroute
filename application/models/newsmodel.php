<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class NewsModel extends BaseModel
{
    public $TABLE_NAME = 'news';
    
    function getTest() {
    	// $query = $this->db->query("SELECT * FROM $this->TABLE_NAME WHERE id = 1");
    	$query = $this->db->query("SELECT * FROM $this->TABLE_NAME");
    	// print_r($query); die;
    	$result = $query->result();
    	// $result = $query->row();
    	return $result;
    	// return $this->db->query('SELECT * FROM $this->TABLE_NAME WHERE id = 1');
    }  
}

?>

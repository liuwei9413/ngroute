<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

header('Content-Type:text/html;charset=utf-8');

class AreaModel extends BaseModel
{
    public $TABLE_NAME = 'area';
    
    /*
     * 获取所有p_id为0的地区
     */
    public function getParentArea()
    {
        $sql = " SELECT * FROM ".$this->TABLE_NAME." WHERE `pid` = '0'";
        $parent_areas = $this->db->query( $sql )->result();
        
        return $parent_areas;
    }
    
    public function getById( $id )
    {
        $sql = " SELECT * FROM ".$this->TABLE_NAME." WHERE `id` = '{$id}' LIMIT 1 ";
        $res = $this->db->query( $sql )->row();
        
        return $res;
    }
    
    public function getChildArea( $id )
    {
        $sql = "SELECT * FROM ".$this->TABLE_NAME." WHERE `pid`= '{$id}'";
        $result = $this->db->query( $sql )->result();
        
        return $result;
    }
}

?>

<?php
  class svc_data
  {
    private $db_server;
    private $db_name;
    private $db_user;
    private $db_pass;
    
    private $v;
    private $q;
    private $i;
    private $s1;
    private $s2;
    private $o;

    function __construct()
    {
      $config = file_get_contents('config.json');
      $config_list = json_decode($config, TRUE);
      
      $this->db_server = $config_list['config'][0]['db_server'];
      $this->db_name = $config_list['config'][0]['db_name'];
      $this->db_user = $config_list['config'][0]['db_user'];
      $this->db_pass = $config_list['config'][0]['db_pass'];

      #The verb
      if (isset($_REQUEST['v']))
      {
        $this->v = $_GET['v'];
      }

      #The table
      if (isset($_REQUEST['q']))
      {
        $this->q = $_GET['q'];
      }
      
      #The row id
      if (isset($_REQUEST['i']))
      {
        $this->i = $_GET['i'];
      }
      
      #The subquery id
      if (isset($_REQUEST['s1']))
      {
        $this->s1 = $_GET['s1'];
        $this->s2 = $_GET['s2'];
      }

      #The order
      if (isset($_REQUEST['o']))
      {
        $this->o = $_GET['o'];
      }
      
    }

    function __destruct()
    {
      #$this->db->close();
    }
    
    public function get_data()
    {
      $con = @mysqli_connect($this->db_server, $this->db_user, $this->db_pass, $this->db_name);

      $var = array();

      $sql = "";
      $sql .= "SELECT * FROM $this->q WHERE 1=1 ";

      if ($this->i != "")
      {
        $sql .= "AND id=$this->i ";
      }
      
      if ($this->s1 != "")
      {
        $sql .= "AND $this->s1=$this->s2 ";
      }

      if ($this->o != "")
      {
        $sql .= "ORDER BY $this->o ";
      }
      
      $result = mysqli_query($con, $sql);

      while($obj = mysqli_fetch_object($result))
      {
        $var[] = $obj;
      }

      #echo $sql;

      #echo '{"data":' . json_encode($var) . '}';
      echo '' . json_encode($var) . '';
    }

    
    public function set_data()
    {
      $t = "";

      if (isset($_REQUEST['t']))
      {
        $t = $_GET['t'];
      }

      #Pull the json apart
      $json_data = json_decode($t, TRUE);
      
      $sql = "";
      $fields = "";
      $values = "";
      
      foreach ($json_data['data'] as $myData)
      {
        $table_name = $myData['pt'];
        $table_id   = $myData['id'];
        
        if ((int)$table_id == 0)
        {
          #If the table_id is 0 then we must write an insert statement
          $sql = $sql . "INSERT INTO " . $table_name . " ";
        
          foreach ($myData as $field => $value)
          {
            if ($field == 'pt' OR $field == 'id')
            {}
            else
            {
              if (strpos($field, "is_") !== FALSE OR strpos($field, "_id") !== FALSE)
              { $value = "" . $value . ""; }
              else
              { $value = "'" . $value . "'"; }
            
              $fields = $fields . $field . ',';
              $values = $values . $value . ',';
            }
          }
          $sql = $sql . '(' . substr($fields, 0, -1) . ') ' . 'VALUES (' . substr($values, 0, -1) . ') ';
        }
        else
        {
          #If the table_id is not 0 then we must write an update statement
          $sql = $sql . "UPDATE " . $table_name . " SET ";
        
          foreach ($myData as $field => $value)
          {
            if ($field == 'pt' OR $field == 'id')
            {}
            else
            {
              if (strpos($field, "is_") !== FALSE OR strpos($field, "_id") !== FALSE)
              { $value = "" . $value . ""; }
              else
              { $value = "'" . $value . "'"; }
            
              $sql = $sql . $field . "=" . $value . ",";
            }
          }
          $sql = substr($sql, 0, -1) . " WHERE id=" . $table_id . "";
        }
      }
      
      #echo $sql;
      
      $con = @mysqli_connect($this->db_server, $this->db_user, $this->db_pass, $this->db_name);
      $result = mysqli_query($con, $sql);
    }

    
    public function del_data()
    {
      $t = "";

      if (isset($_REQUEST['t']))
      {
        $t = $_GET['t'];
      }

      #Pull the json apart
      $json_data = json_decode($t, TRUE);
      
      $sql = "";
      
      foreach ($json_data['data'] as $myData)
      {
        $table_name = $myData['pt'];
        $table_id   = $myData['id'];
      }

      $sql = $sql . "DELETE FROM " . $table_name . " WHERE id=" . $table_id . "";

      #echo $sql;

      $con = @mysqli_connect($this->db_server, $this->db_user, $this->db_pass, $this->db_name);
      $result = mysqli_query($con, $sql);
    }

  }

  
  $api = new svc_data;
  
  #Get the action type
  if (isset($_REQUEST['v']))
  {
    $verb = strtoupper($_GET['v']);
  }

  #Use the appropriate function based ont he action
  switch ($verb)
  {
    case "GET":
      $api->get_data();
      break;
    case "SET":
      $api->set_data();
      break;
    case "DEL":
      $api->del_data();
      break;
    default:
      echo "";
  }   
  
?>

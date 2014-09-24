<?php
  class svc_product
  {
    private $db_server;
    private $db_name;
    private $db_user;
    private $db_pass;

    private $v;
    private $q;
    
    function __construct()
    {
      $config = file_get_contents('config.json');
      $config_list = json_decode($config, TRUE);
      
      $this->db_server = $config_list['config'][0]['db_server'];
      $this->db_name = $config_list['config'][0]['db_name'];
      $this->db_user = $config_list['config'][0]['db_user'];
      $this->db_pass = $config_list['config'][0]['db_pass'];

      if (isset($_REQUEST['v']))
      {
        $this->v = $_GET['v'];
      }

      if (isset($_REQUEST['q']))
      {
        $this->q = $_GET['q'];
      }

      if (isset($_REQUEST['s']))
      {
        $this->s = $_GET['s'];
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

      $sql1 = "SELECT * FROM vw_products_with_types WHERE ruid=$this->q ";

      $result1 = mysqli_query($con, $sql1);


      $data = array();
      $c1 = 0;
      $c2 = 0;
      
      while($header = mysqli_fetch_array($result1))
      {
        $data[$c1]->id = $header['ruid'];
        $data[$c1]->product_name = $header['product_name'];
        $data[$c1]->product_type_id = $header['product_type_id'];
        $data[$c1]->product_type_name = $header['product_type_name'];
        $data[$c1]->product_desc = $header['product_desc'];
        
        $result2 = mysqli_query($con, "SELECT * FROM dv_sys_product_lines WHERE product_id=" . $header['ruid'] . " ");

        $c2 = 0;
        while($lines = mysqli_fetch_array($result2))
        {
          $data[$c1]->availability[$c2]->id = $lines['id'];
          $data[$c1]->availability[$c2]->product_measure_id = $lines['product_measure_id'];
          $data[$c1]->availability[$c2]->product_unit_price = $lines['product_unit_price'];
          $data[$c1]->availability[$c2]->is_active = $lines['is_active'];

          array_push($data->availability);
          $c2++;
        }
        
        array_push($data);
        $c1++;
      }

      //echo '{"data":'.json_encode($data).'}';
      echo '' . json_encode($data) . '';
    }

  }

  
  $api = new svc_product;
  
  #Get the action type
  if (isset($_REQUEST['v']))
  {
    $verb = strtoupper($_GET['v']);
  }

  #Use the appropriate function based on the action
  switch ($verb)
  {
    case "GET":
      $api->get_data();
      break;
    default:
      echo "";
  }   
  
?>

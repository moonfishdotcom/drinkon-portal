<?php
  class svc_orders
  {
    private $db_server;
    private $db_name;
    private $db_user;
    private $db_pass;

    private $v;
    private $q;
    private $s;
    
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

      //$sql1 = "SELECT * FROM vw_order_header WHERE 1=1 ";
      $sql1 = "SELECT * FROM vw_order_header_with_totals WHERE 1=1 ";

      if ($this->s == "ALL")
      {
        $sql1 .= "AND vendor_id=$this->q ";
        $sql1 .= "ORDER BY order_reqd_for ASC ";
      }
      else
      {
        $sql1 .= "AND id=$this->q ";
      }

      $result1 = mysqli_query($con, $sql1);


      $data = array();
      $c1 = 0;
      $c2 = 0;
      
      while($header = mysqli_fetch_array($result1))
      {
        $data[$c1]->id = $header['id'];
        $data[$c1]->order_number = $header['order_number'];
        $data[$c1]->order_cust_name = $header['order_cust_name'];
        $data[$c1]->order_reqd_for = $header['order_reqd_for'];
        $data[$c1]->order_status_id = $header['order_status_id'];
        $data[$c1]->order_status_name = $header['order_status_name'];
        $data[$c1]->order_owner_id = $header['order_owner_id'];
        $data[$c1]->user_known_as = $header['user_known_as'];
        $data[$c1]->is_active = $header['is_active'];
        $data[$c1]->order_total = $header['order_total'];
        
        $result2 = mysqli_query($con, "SELECT * FROM vw_order_lines WHERE id=" . $header['id'] . " ");

        $c2 = 0;
        while($lines = mysqli_fetch_array($result2))
        {
          $data[$c1]->order[$c2]->ruid = $lines['ruid'];
          $data[$c1]->order[$c2]->product_id = $lines['product_id'];
          $data[$c1]->order[$c2]->product_name = $lines['product_name'];
          $data[$c1]->order[$c2]->product_type_id = $lines['product_type_id'];
          $data[$c1]->order[$c2]->product_measure_name = $lines['product_measure_name'];
          $data[$c1]->order[$c2]->product_qty = $lines['product_qty'];
          $data[$c1]->order[$c2]->product_unit_price = $lines['product_unit_price'];
          $data[$c1]->order[$c2]->is_active = $lines['is_active'];

          array_push($data->order);
          $c2++;
        }
        
        array_push($data);
        $c1++;
      }

      #echo '{"data":' . json_encode($data) . '}';
      echo '' . json_encode($data) . '';
    }

  }

  
  $api = new svc_orders;
  
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

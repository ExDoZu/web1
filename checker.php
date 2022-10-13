<?php
$time_start = microtime(true);



$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];



function validate($x, $y, $r)
{
    $y = str_replace(',', '.', $y);
    if (is_numeric($x) && is_numeric($y) && is_numeric($r)) {
        if ($x >= -5 && $x <= 3 &&
            $y >= -5 && $y <= 5 &&
            $r >= 1 && $r <= 3) {
            return true;
            }   
    }
  return false;
}


if(validate($x, $y, $r)){
    if ($x <= 0 && $y >= 0 && 
        $x*$x + $y*$y <= $r*$r/4) {
        $result = "true";
    } else if ($x >= 0 && $y >= 0 && 
                $y <= $r && $x<=$r) {
        $result = "true";
    } else if ($x >= 0 && $y <= 0 && 
                $y>=$x-$r) {
        $result = "true";
    } else {
        $result = "false";
    }
} else {
    http_response_code(400);
    echo "Bad request";
    exit();
}

date_default_timezone_set('Europe/Moscow');
$time = date('H:i:s');



$time_end = microtime(true);

$exe_time = $time_end - $time_start;

$exe_time = number_format($exe_time, 6, '.', '');


if($result == "true") {
    echo "<div class=\"table_row\" value=\"true\"><div class=\"table_cell\">Попал(а)</div><div class=\"table_cell\">$r</div><div class=\"table_cell\">$x</div><div class=\"table_cell\">$y</div><div class=\"table_cell\">$time</div><div class=\"table_cell\">$exe_time</div></div>";
} else {
    echo "<div class=\"table_row\" value=\"false\"><div class=\"table_cell\">Не попал(а)</div><div class=\"table_cell\">$r</div><div class=\"table_cell\">$x</div><div class=\"table_cell\">$y</div><div class=\"table_cell\">$time</div><div class=\"table_cell\">$exe_time</div></div>";
}


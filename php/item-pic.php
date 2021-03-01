<?php
header('Content-type:text/html,charset=utf-8');
$id1 = $_GET['id'];
$link = mysqli_connect('localhost','root','','dangdang');
mysqli_set_charset($link,'utf8');
$sql="select*from item_src where id='$id1'";
$res = mysqli_query($link,$sql);
$arr=[];
if($row = mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
echo json_encode($arr);
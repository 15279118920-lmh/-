<?php
header('Content-Type:text/plain;charset=UTF-8');
$id1=$_GET['id1'];
$id2=$_GET['id2'];
$link = mysqli_connect('localhost','root','','dangdang');
mysqli_set_charset($link,'utf8');
$sql = "select*from item limit $id1,$id2";
$res = mysqli_query($link,$sql);
$arr = [];
while($row=mysqli_fetch_assoc($res)){
    array_push($arr,$row);
}
echo json_encode($arr);
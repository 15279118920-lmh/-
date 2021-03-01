<?php
header('Content-type:text/html,charset=utf-8');
$id = $_GET['id'];
$link = mysqli_connect('localhost','root','','dangdang');
mysqli_set_charset($link,'utf8');
$sql="select*from item_list where id='$id'";
$res = mysqli_query($link,$sql);
if(mysqli_fetch_assoc($res)){
    echo 1;
}else{
    echo 0;
};
mysqli_close($link);
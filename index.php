<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <?php if(preg_match("/iPhone/", $_SERVER["HTTP_USER_AGENT"])): ?>
  <meta name="viewport" content="target-densitydpi=device-dpi,width=640,user-scalable=no">
  <?php endif; ?>
  <title>pp</title>
  <link rel="stylesheet" href="./css/init.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="./js/jquery-1.7.2.min.js"></script>
  <script src="./js/jquery-ui.min.js"></script>
  <script src="./js/jquery.ui.touch-punch.min.js"></script>
  <script src="./js/jquery.easing.1.3.js"></script>
  <script src="./js/script.js"></script>
</head>
<body ontouchmove="event.preventDefault()">

<div id="hp">
  <span></span>
</div>

<div id="puzzle-enemy">
</div>

<ul id="status">
  <li id="delete">delete : <span></span></li>
  <li id="combo">combo : <span></span></li>
</ul>

<ul id="delete_drop" class="clearfix">
</ul>

<div id="puzzle-main">
</div>

<div class="buttons">
  <a class="btn-reset" href="javascript: void(0);">リセット</a>
</div>

</body>
</html>

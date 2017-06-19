<html>
<head>
<title>API Google Maps</title>
<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--bootstrap-->
	<link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<!--javascript-->
	<script src="assets/jquery/jquery-3.1.1.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
	<!-- Custom JS -->
	<script src="assets/custom.js"></script>
</head>
<body>
<div class="container">
<div class="row">
<h5 style="text-align:center"><strong>Pemanfaatan Google Maps API</strong><br>
Tim : <br>
1. Rizka Fitriani Hadi (16.01.63.0003)<br>
2. Agnes Oka Rosalin (16.01.63.0020)<br>
3. Rezky Febriani (16.01.63.0022)</h5>
<hr>
</div>

<div class="row">
	<form action="" method="post">
		<div class="form-group">
			<label for="api">API Key:</label>
			<input type="text" class="form-control" id="api" name="api" value="AIzaSyBQyCUJ93pD6_SL-1WVkZxuDqiqu4_8bHI">
		</div>
		<div class="form-group">
			<label for="latitude">Latitude:</label>
			<input type="text" class="form-control" id="latitude" name="lat">
		</div>
		<div class="form-group">
			<label for="Longitude">Longitude:</label>
			<input type="text" class="form-control" id="longitude" name="lon">
		</div>

		<hr>
  
		<input id="pac-input" class="controls" type="text" placeholder="Cari Lokasi..." style="position: absolute; width: 200%; height: 50px">
  
		<div id="map" style="width:100%; height:400px"></div>
		
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBQyCUJ93pD6_SL-1WVkZxuDqiqu4_8bHI&sensor=false&libraries=places"></script>
		
		<script src="google-map.js"></script>
		
		<button type="submit" name="buatxml" class="btn btn-primary btn-block">Buat XML</button>
	</form> 

<?php
	if(isset($_POST['buatxml']))
	{ 
		$key=$_POST['api'];
		$lat=$_POST['lat'];
		$lon=$_POST['lon'];
		$latlng=$lat.','.$lon;
?>

		<script type="text/javascript">window.open('https://maps.googleapis.com/maps/api/geocode/xml?latlng=<?php echo $latlng; ?>&key=<?php echo $key; ?>');</script>

<?php } ?>
</div></div>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>BackToTheFutures <?= $this->fetch('title') ?></title>       
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <?= $this->fetch('meta') ?>
        
    <?= $this->Html->css('bootstrap.min.css'); ?>
    <?= $this->Html->css('datepicker3.css'); ?>
    <?= $this->Html->css('styles.css'); ?>
   

    <?= $this->fetch('css') ?>
</head>

<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#"><span>Back</span>to<span>the</span>Futures</a>
				<ul class="user-menu">
					<li class="dropdown pull-right">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> User <span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#"><span class="glyphicon glyphicon-user"></span> Profile</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-cog"></span> Settings</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
						</ul>
					</li>
				</ul>
			</div>
							
		</div><!-- /.container-fluid -->
	</nav>
		
	<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<form role="search">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Search">
			</div>
		</form>
		<ul class="nav menu">
            <li><a href="index.html"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>
            <li><a href="buy.html"><span class="glyphicon glyphicon-shopping-cart"></span>Buy/Sell</a></li>
            <li><a href="positions.html"><span class="glyphicon glyphicon-check"></span> My Positions </a></li>
            <li><a href="advice.html"><span class="glyphicon glyphicon-info-sign"> </span> Trading Advice </a></li>
            <li><a href="notifications.html"><span class="glyphicon glyphicon-flag"> </span> Notifications </a></li>
            <li><a href="logs.html"><span class="glyphicon glyphicon-record"></span> Logs </a></li>            
            <li role="presentation" class="divider"></li>            
            <li><a href="settings.html"><span class="glyphicon glyphicon-cog"></span> Settings </a></li>
		</ul>
	</div><!--/.sidebar-->
		
	<div class="columns col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
        
        <div class="container-fluid">
        
            <div class="row">
                <ol class="breadcrumb">
                    <li><a href="#"><span class="glyphicon glyphicon-home"></span></a></li>
                    <li class="active">Dashboard</li>
                </ol>
            </div><!--/.row-->
                 
            <div class="row">
                <?= $this->Flash->render() ?>
                <?= $this->fetch('content') ?>
            </div>
        </div> <!-- /.container-fluid -->
	</div>	<!--/.main-->

        
    <?= $this->Html->script('jquery-1.11.1.min.js'); ?>
    <?= $this->Html->script('bootstrap.min.js'); ?>
    <?= $this->Html->script('chart-min.js'); ?>
    <?= $this->Html->script('easypiechart.js'); ?>
    <?= $this->Html->script('easypiechart-data.js'); ?>
    <?= $this->Html->script('bootstrap-datepicker.js'); ?>
    
    <?= $this->fetch('script') ?>
	<!--
    <script>
		$('#calendar').datepicker({
		});

		!function ($) {
		    $(document).on("click","ul.nav li.parent > a > span.icon", function(){          
		        $(this).find('em:first').toggleClass("glyphicon-minus");      
		    }); 
		    $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
		}(window.jQuery);

		$(window).on('resize', function () {
		  if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
		})
		$(window).on('resize', function () {
		  if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
		})
	</script>	
    -->
</body>

</html>





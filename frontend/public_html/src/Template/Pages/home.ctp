<!--
<div class="row">
    <?= $this->element('title_header', ['title' => 'Trading Dashboard']); ?>
</div>
-->
<div class="row">
    <div class="columns col-lg-4 col-md-6">
        <?= $this->element('okcoin_widget_data'); ?>
    </div>
    
    <div class="columns col-lg-4 col-md-6">
        <?= $this->element('sevenninesix_widget_data'); ?>
	</div>
    
    <div class="columns col-lg-4 col-md-6">
        <?= $this->element('bitvc_widget_data'); ?>
	</div>
</div>

<div class="row">
    <div class="col-lg-2 col-md-6">
        <div class="panel panel-teal panel-widget ">
            <div class="row no-padding">
                <div class="col-sm-3 col-lg-5 widget-left">
                    <em class="glyphicon glyphicon-shopping-cart glyphicon-l"></em>
                </div>
                <div class="col-sm-9 col-lg-7 widget-right">
                    <div class="large">Buy</div>
                    <div class="text-muted">OKCoin.com</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-2 col-md-6">
        <div class="panel panel-red panel-widget ">
            <div class="row no-padding">

                <div class="col-sm-9 col-lg-7 widget-right">
                    <div class="large">Sell</div>
                    <div class="text-muted">OKCoin.com</div>
                </div>
                <div class="col-sm-3 col-lg-5 widget-left">
                    <em class="glyphicon glyphicon-usd glyphicon-l"></em>
                </div>
            </div>
        </div>
    </div>  

    <div class="col-lg-2 col-md-6">
        <div class="panel panel-teal panel-widget ">
            <div class="row no-padding">
                <div class="col-sm-3 col-lg-5 widget-left">
                    <em class="glyphicon glyphicon-shopping-cart glyphicon-l"></em>
                </div>
                <div class="col-sm-9 col-lg-7 widget-right">
                    <div class="large">Buy</div>
                    <div class="text-muted">796.com</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-2 col-md-6">
        <div class="panel panel-red panel-widget ">
            <div class="row no-padding">
                <div class="col-sm-9 col-lg-7 widget-right">
                    <div class="large">Sell</div>
                    <div class="text-muted">796.com</div>
                </div>
                <div class="col-sm-3 col-lg-5 widget-left">
                    <em class="glyphicon glyphicon-usd glyphicon-l"></em>
                </div>
            </div>
        </div>
    </div>  
    
        <div class="col-lg-2 col-md-6">
        <div class="panel panel-teal panel-widget ">
            <div class="row no-padding">
                <div class="col-sm-3 col-lg-5 widget-left">
                    <em class="glyphicon glyphicon-shopping-cart glyphicon-l"></em>
                </div>
                <div class="col-sm-9 col-lg-7 widget-right">
                    <div class="large">Buy</div>
                    <div class="text-muted">BitVC.com</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-2 col-md-6">
        <div class="panel panel-red panel-widget ">
            <div class="row no-padding">
                <div class="col-sm-9 col-lg-7 widget-right">
                    <div class="large">Sell</div>
                    <div class="text-muted">BitVC.com</div>
                </div>
                <div class="col-sm-3 col-lg-5 widget-left">
                    <em class="glyphicon glyphicon-usd glyphicon-l"></em>
                </div>
            </div>
        </div>
    </div>  
         
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="panel panel-default">
            <div class="panel-heading">Recent Trades</div>
            <div class="panel-body">
                <table data-toggle="table" data-url="recentTrades.json"  data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc">
                    <thead>
                    <tr>
                        <th data-field="date" data-sortable="true" >Date</th>
                        <th data-field="exchange" data-checkbox="true" >Exchange</th>
                        <th data-field="price" data-sortable="true">Price</th>
                        <th data-field="volume"  data-sortable="true">Volume</th>
                        <th data-field="vwap" data-checkbox="true">Exchange VWAP</th>
                        <th data-field="diff" data-sortable="true">Difference</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    
    <div class="col-lg-4">
        <div class="panel panel-primary">
            <div class="panel-heading">Exchange Prices</div>
            <div class="panel-body">
                Multi-timeseries of Candle/Trade Data 
            </div>
        </div>
    </div>
</div>

<div class="row">
    
    <div class="col-lg-4">
        <div class="panel panel-primary">
            <div class="panel-heading">Realized Profit/Loss</div>
            <div class="panel-body">
                Some Table Here
            </div>
        </div>
    </div>

    <div class="col-lg-8">
        <div class="panel panel-default">
            <div class="panel-heading">My Active Positions</div>
            <div class="panel-body">
                <table data-toggle="table" data-url="activePositions.json"  data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc">
                    <thead>
                    <tr>
                        <th data-field="date" data-sortable="true" >Date Opened</th>
                        <th data-field="exchange" data-checkbox="true" >Exchange</th>
                        <th data-field="bias" data-checkbox="true">Position BIAS</th>
                        <th data-field="price" data-sortable="true">Open Price</th>
                        <th data-field="diff" data-sortable="true">Current Price</th>
                        <th data-field="volume"  data-sortable="true">Profit / Loss</th>
                        <th data-field="action" data-checkbox="true"> Close Position </th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>    
</div>

<?= $this->Html->script('dashboard_widgets'); ?>




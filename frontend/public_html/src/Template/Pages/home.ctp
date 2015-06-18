<?php 
use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

$dir = new Folder(WWW_ROOT . '../../../history/');
$files = $dir->find('.*' . date('Y-m-d') .  '\.db', true);
$recentTrades[] = "";
$vwap_line_data = array();;

foreach($files as $file) {
    $file = new File($dir->pwd() . DS . $file);
    
    $file_contents = str_replace('}', '};', $file->read());
        
    if(stripos($file->name, 'okcoin') !== false) {
        $contents['okcoin'] = explode(";", $file_contents);
    } else if (stripos($file->name, 'sevenninesix') !== false) {
        $contents['sevenninesix'] = explode(";", $file_contents);
    } else if (stripos($file->name, 'bitvc') !== false ) {
        $contents['bitvc'] = explode(";", $file_contents);
    }
    
   
    
    $file->close();    
}

foreach(['okcoin', 'sevenninesix', 'bitvc'] as $provider) {
    $vwap_total = 0;
    $total_volume = 0;
    $max_s = 0;
    $data[$provider]['min'] = 99999.99;

    foreach($contents[$provider] as $entry) {
        $json = json_decode($entry);
                
        if(isset($json->l) && $json->l != "") {
            $json = json_decode($entry);
            
            $vwap_total += ( $json->l * $json->v );
            $total_volume += $json->v;
            
            if($json->l < $data[$provider]['min']) {
                $data[$provider]['min'] = $json->l;
            }
            
            if($json->l > $data[$provider]['max']) {
                $data[$provider]['max'] = $json->l;
            }
            
            if($json->s > $max_s) {
                $data[$provider]['current'] = $json->l;
                $max_s = $json->s;        
            }
        
    
            $recentTrades[] = [
                'exchange' => $provider,
                'date' => date("Y-m-d H:i:s", strtotime('today midnight') + $json->s),
                'price' => $json->l,
                'volume' => $json->v,
            ];
        
            if(count($vwap_line_data[$provider]['data']) < 60) {
                $vwap_line_data[$provider]['data'][] = $json->l; 
                $vwap_line_data[$provider]['labels'][] = date("H:i:s", strtotime('today midnight') + $json->s);
            } else {
                array_shift($vwap_line_data[$provider]['data']);
                array_shift($vwap_line_data[$provider]['labels']);
                
                $vwap_line_data[$provider]['data'][] = $json->l; 
                $vwap_line_data[$provider]['labels'][] = date("H:i:s", strtotime('today midnight') + $json->s);
            }
            
            
        }
    }
        
    $data[$provider]['vwap'] = ($vwap_total / $total_volume);
    
  
    array_multisort($vwap_line_data['okcoin']['labels'], $vwap_line_data['okcoin']['data']);
    array_multisort($vwap_line_data['sevenninesix']['labels'], $vwap_line_data['sevenninesix']);
  
}
?>

<!--
<div class="row">
    <?= $this->element('title_header', ['title' => 'Trading Dashboard']); ?>
</div>
-->
<div class="row">
    <div class="columns col-lg-4 col-md-6">
        <?= $this->element('okcoin_widget_data', ['data' => $data['okcoin'] ]); ?>
    </div>
    
    <div class="columns col-lg-4 col-md-6">
        <?= $this->element('sevenninesix_widget_data', ['data' => $data['sevenninesix'] ]); ?>
	</div>
    
    <div class="columns col-lg-4 col-md-6">
        <?= $this->element('bitvc_widget_data', ['data' => $data['bitvc'] ]); ?>
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
    <div class="col-lg-7">
        <div class="panel panel-default">
            <div class="panel-heading">Recent Trades</div>
            <div class="panel-body">
                <table id="recentTradesTable" data-toggle="table" data-url="recentTrades.json"  data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc">
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
                    <tbody>
                        <?php 
                            foreach($recentTrades as $trade) {
                                if($trade['price'] != "") :
                                ?>
                                <tr>
                                    <td><?= $trade['date'] ?></td>
                                    <td><?= $trade['exchange'] ?></td>
                                    <td><?= $trade['price'] ?></td>
                                    <td><?= $trade['volume'] ?></td>
                                    <td><?= $data[$trade['exchange']]['vwap'] ?></td>
                                    <td><?= $trade['price'] - $data[$trade['exchange']]['vwap']; ?></td>
                                </tr>
                                <?php
                                endif; 
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <div class="col-lg-5">
        <div class="panel panel-primary">
            <div class="panel-heading">Exchange Prices</div>
            <div class="panel-body">
                <canvas id="exchangePriceChart" width="450px" height="450px"></canvas>
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

<?php 
$this->Html->scriptStart(['block' => true]);
echo '
var data = {
    labels:' . json_encode($vwap_line_data["okcoin"]["labels"]) . ', 
    datasets: [
        {
            label: "OKCoin",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: ' . json_encode($vwap_line_data["okcoin"]["data"]) . '
        },
        {
            label: "796.com",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: ' . json_encode($vwap_line_data["sevenninesix"]["data"]) . '
        }
    ]
};
var ctx = document.getElementById("exchangePriceChart").getContext("2d");
var myLineChart = new Chart(ctx).Line(data, 
    {
        responsive: true,
        labels: false,
    });
';
$this->Html->scriptEnd();
///////////////////////////////////////////////////////////////////////////////
$this->Html->scriptStart(['block' => true]);
echo "$(document).ready(function() {
    $('#recentTradesTable').dataTable( {

    } );
} );";
$this->Html->scriptEnd();
?>
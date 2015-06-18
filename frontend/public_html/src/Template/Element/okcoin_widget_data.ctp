<div class="panel panel-blue">
    <div class="panel-heading dark-overlay">OKCoin.com Today</div>
    <div class="panel-body">
    
        <!-- LHS -->
        <div class="col-lg-4">
            <div class="row"> 
                <h4><small> Min. </small> <?= number_format($data['min'], 2) ?> USD</h4>
            </div>
            
            <div class="row"> 
                <h4><small> Max. </small> <?= number_format($data['max'], 2) ?> USD</h4>
            </div>
            
        </div>
        
        <!-- RHS -->
        <div class="col-lg-8">
            <div class="row pull-right">
                <h2><small>VWAP: $<?= number_format($data['vwap'], 2) ?> USD</small> </h2>
                <h2>Current: $<?= number_format($data['current'], 2) ?> USD</h2>
            </div>
        </div>
    </div>
</div>
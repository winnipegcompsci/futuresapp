<div class="row">
    <div class="columns col-lg-12">
        <div class="panel panel-info">
            <div class="panel-heading">OKCoin Logs</div>
            <div class="panel-body">
                <p>
                    <?php
                        $last_line = system('dir', $test); 
                    ?>
                    
                    <?= "Last Line: <pre>" . print_r($last_line, TRUE) . "</pre>"; ?>
                    <?= "Test::: <pre>" . print_r($test, TRUE) . "</pre>" ?>
                </p>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="columns col-lg-12">
        <div class="panel panel-info">
            <div class="panel-heading">796 Logs</div>
            <div class="panel-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="columns col-lg-12">
        <div class="panel panel-info">
            <div class="panel-heading">BitVC Logs</div>
            <div class="panel-body">
                <p> Yet to Be Implemented </p>
            </div>
        </div>
    </div>
</div>
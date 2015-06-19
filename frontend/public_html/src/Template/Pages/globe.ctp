    <main>
      <div id='globe'></div>
    </main>
      
    <?= $this->Html->script('//cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js'); ?>
    <?= $this->Html->script('globe.js'); ?>
    
    <?php 
    
    $this->Html->startScript(['block' => true]);
    echo "
    <script>
      var div = document.getElementById('globe');
      var urls = {
        earth: \"" .  $this->Url->build('/img/world.jpg') . "\",
        bump: \"" .  $this->Url->build('/img/bump.jpg') . "\",
        specular: \"" . $this->Url->build('/img/specular.jpg') . "\",
      }
      // create a globe
      var globe = new Globe(div, urls);
      // start it
      globe.init();
      // - create a random block (somewhere on earth)
      // - center the globe to that position
      // - spawn the block on that position (after 300ms)
      var drawRandomLevitatingBlock = function() {
        var data = {
          color: '#'+Math.floor(Math.random()*16777215).toString(16),
          size: Math.random() * 100,
          lat: Math.random() * 160 - 80,
          lon: Math.random() * 360 - 180,
          size: 20
        };
        // center the globe to the position
        globe.center(data);
        setTimeout(function() {
          // offset the lat/long so you can actually
          // see the block levitating
          
          data.lat += 10;
          data.lon += 10;
          globe.addLevitatingBlock(data);
        }, 300);
      }
      setInterval(drawRandomLevitatingBlock, 2000);
    ";
    $this->Html->endScript();
    ?>
    </script>
    
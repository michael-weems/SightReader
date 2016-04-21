////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handlers and Initialization

$(document).ready(function() {
   /* 
    var configurations = init_configurations();
    set_config(configurations);
    
    $('#configure select').change(function(){
        var index = $(this).children(":selected").index();
        var cfg = configurations[index];
        
        $("#tempo").val(cfg.tempo);
        $("#beat").val(cfg.beat);
        $("#beatcount").val(cfg.beatcount);
        $('input:radio[value=' + cfg.difficulty + ']').prop('checked', true);
    });
    */
    $('select').material_select();
    
    var timer = null;
    var timer_marker = null;
    
    var current_beat = 0;
    var current = 0;

    $("#start").click(function() {
        startloop();
    });
    
    $("#end").click(function() {
        endloop();
    });
    
    $('input[type=radio][id=difficulty]').change(function() {
        endloop();
        startloop();
    });
    
    $('.select_changed').change(function(){
        endloop();
        startloop();
    });
    
    function set_config(config){
        for (cfg in config){
            $('#configure select')
                .append($("<option></option>")
                    .attr("value",cfg.name)
                    .attr("id", "config_" + cfg.name)
                    .text(cfg.name));
        }
        $('#configure select').val('Default');
    }
    
    function startloop() {
        
        var beatcount = parseInt($("#beatcount select option:selected").text());
        var tempo = parseInt($('input[type=range]').val());
        var time = (beatcount * (60 / tempo)) * 1000;
        var time_marker = time / beatcount;
        console.log('Time: ' + time);
        console.log('Beat Time: ' + time_marker);
        
        if (timer != null){
            endloop();
        }
        
        loop_marker();
        loop();
        timer_marker= setInterval(loop_marker, time_marker);
        timer= setInterval(loop, time);
    }
    
    function endloop() {
        clearInterval(timer);
        clearInterval(timer_marker);
        current_beat = 0;
        var canvas = $("#sightread-canvas")[0];
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function loop(){
        //var canvas = $("#sightread-canvas")[0];
        //var context = canvas.getContext('2d');
        //context.clearRect(0, 0, canvas.width, canvas.height);
        
        var difficulty = $('form input[type=radio]:checked').attr('id');
        var beat = $("#beat select option:selected").text();
        var beatcount = $("#beatcount select option:selected").text();
        loopStaff(difficulty, beat, beatcount);
    }
    
    function loop_marker(){
        var beat = $("#beat select option:selected").text();
        var beatcount = $("#beatcount select option:selected").text(); 
        var audio;
        if (current_beat == 0){
            audio = new Audio('audio/clave.mp3');
        }
        else {
            audio = new Audio('audio/woodblock.mp3');
        }
        audio.play();
        current_beat = loopMarker(current_beat, beat, beatcount);
        
    }
        
}); // end of document ready function
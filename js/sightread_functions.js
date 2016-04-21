////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Functions

/////////////////////////////////////////////////////////////////////////////////
//  LoopStaff
//
//		Begins a calling loop to the server to get a randomized 
//		staff to display in the designated canvas
//
function loopStaff( difficulty, beat, beatcount ) {
	var config = {'beat' : beat, 'beatcount' : beatcount, 'difficulty' : difficulty};
    buildStaff(config);
}

/////////////////////////////////////////////////////////////////////////////////
//	buildStaff
//
//		Build a music staff with the given parameters
//
function buildStaff(config) {
    
    var timesignature = '' + config.beatcount + '/' + config.beat;
    var duration = '' + config.beat;
    if (config.difficulty == 'hard'){
        duration = '' + config.beat * 2;
    }
    var staff = {'timesignature': timesignature, 'duration': duration};
    
    var notes = ['C','D','E','F','G','A','B'];
    var accidentals = ['x', '#', 'b', 'n'];
    
    var treble = [];
    var bass = [];
    
    
    
    for (var i = 0; i < config.beatcount; i++){
        tgroup = [];
        bgroup = [];
        
        if (config.difficulty == 'easy'){
            
            shuffle(notes);
            tnote = notes[0] + "/5";

            shuffle(notes);
            bnote = notes[0] + "/3";

            tgroup.push(tnote);
            bgroup.push(bnote);

            // push the notes into the treble and bass clefs
            treble.push(tgroup);
            bass.push(bgroup);

        }
        else if (config.difficulty == 'medium'){

            var count = Math.floor((Math.random() * 3) + 1);
            var treb_notes = notes.slice();  // get shallow copy of notes
            var bass_notes = notes.slice();  // get shallow copy of notes
            
            for (var j = 0; j < count; j++){
                shuffle(treb_notes);
                    tnote = treb_notes[0] + "/5";

                    shuffle(bass_notes);
                    bnote = bass_notes[0] + "/3";
                    
                    treb_notes.splice(0, 1);
                    bass_notes.splice(0, 1);

                    tgroup.push(tnote);
                    bgroup.push(bnote);
            }
            // push the notes into the treble and bass clefs
            treble.push(tgroup);
            bass.push(bgroup);
        }
        else if (config.difficulty == 'hard'){
            count = Math.floor((Math.random() * 3) + 1);

            var oct = Math.floor((Math.random() * 2) + 1);
            var high = "/5";
            var low = "/3";
            if (oct == 1){
                high = "/4";
                low = "/3";
            }

            for (var j = 0; j<2; j++){
                tgroup = [];
                bgroup = [];
                
                var treb_notes = notes.slice();  // get shallow copy of notes
                var bass_notes = notes.slice();  // get shallow copy of notes

                for (var k = 0; k < count; k++){
                    shuffle(treb_notes);
                    tnote = treb_notes[0] + high;

                    shuffle(bass_notes);
                    bnote = bass_notes[0] + low;
                    
                    treb_notes.splice(0, 1);
                    bass_notes.splice(0, 1);

                    tgroup.push(tnote);
                    bgroup.push(bnote);
                }

                // push the notes into the treble and bass clefs
                treble.push(tgroup);
                bass.push(bgroup);
            }
        }
    }
    
    staff['treble'] = treble;
    staff['bass'] = bass;

	drawStaff(staff);
}


// Shuffles an array
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

/////////////////////////////////////////////////////////////////////////////////
//	drawStaff
//
//		takes the data present in the staff object argument and
//		displays it on the designated canvas
//
//		**	Utilizes the Vexflow library to accomplish this **
//
function drawStaff(staff) {
    
	var canvas = $("#sightread-canvas")[0];
    var context = canvas.getContext('2d');
    context.clearRect(0,25,canvas.width, canvas.height);
	
    var renderer = new Vex.Flow.Renderer(canvas,
	Vex.Flow.Renderer.Backends.CANVAS);

	var ctx = renderer.getContext();
	var treble = new Vex.Flow.Stave(10, 50, 500);
	var bass = new Vex.Flow.Stave(10, 200, 500, 'bass');

	// Add clef designators
	treble.addClef("treble");
	bass.addClef("bass");
    
    // wipe the canvas clean
    
	//console.log("time signature: " + staff['timesignature']);
	treble.addTimeSignature(staff['timesignature']);
	bass.addTimeSignature(staff['timesignature']);
	
	treble.setContext(ctx).draw();
	bass.setContext(ctx).draw();

	var treble_notes = [];
	for (var i = 0; i < staff['treble'].length; i++){
		treble_notes['' + i] = new Vex.Flow.StaveNote({
			keys: staff['treble'][i], duration: staff['duration'],
			clef: "treble"});
	}
	
	var bass_notes = [];
	for (var i = 0; i < staff['bass'].length; i++){
		bass_notes['' + i] = new Vex.Flow.StaveNote({
			keys: staff['bass'][i], duration: staff['duration'],
			clef: "bass"});
	}
    //console.clear();
	
	// Helper function to justify and draw a 4/4 voice
	Vex.Flow.Formatter.FormatAndDraw(ctx, treble, treble_notes);
	Vex.Flow.Formatter.FormatAndDraw(ctx, bass, bass_notes);

}

function loopMarker(current, beat, beatcount){
    var config = {'beat' : beat, 'beatcount' : beatcount, 'current' : current};
    
    buildMarker(config);
    if (current >= beatcount - 1){
        current = -1;
    }
    return current += 1;
}

function buildMarker(config){
    var distance = 450 / config.beatcount;
    var start = 50 + (distance) * config.current; 
    var mid = start + 25;
    var end = mid + 25;
    
    drawMarker(start, mid, end);
}

function drawMarker(start, mid, end) {
  var canvas = $("#sightread-canvas")[0];
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
      
    ctx.clearRect(0,0,canvas.width, 25);

    ctx.beginPath();
    ctx.moveTo(start,0);
    ctx.lineTo(mid,25);
    ctx.lineTo(end,0);
    ctx.fill();
  }
}
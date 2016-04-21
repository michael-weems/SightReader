	var canvas = $("canvas")[0];
	var renderer = new Vex.Flow.Renderer(canvas,
    Vex.Flow.Renderer.Backends.CANVAS);

	var ctx = renderer.getContext();
	var stave = new Vex.Flow.Stave(10, 0, 500);

  // Add a treble clef
  stave.addClef("treble");
  stave.setContext(ctx).draw();

  var notes = [
    new Vex.Flow.StaveNote(
      { keys: ["g/4", "b/4", "cb/5", "e/5", "g#/5", "b/5"],
        duration: "h" }).
      addAccidental(0, new Vex.Flow.Accidental("bb")).
      addAccidental(1, new Vex.Flow.Accidental("b")).
      addAccidental(2, new Vex.Flow.Accidental("#")).
      addAccidental(3, new Vex.Flow.Accidental("n")).
      addAccidental(4, new Vex.Flow.Accidental("b")).
      addAccidental(5, new Vex.Flow.Accidental("##")),
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "h" })
  ];

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);
// Create the application helper and add its render target to the page
let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

// Create window frame
let frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.lineStyle({ color: 0xffffff, width: 2, alignment: 0 });
frame.drawRect(0, 0, 208, 208);
frame.position.set(320 - 104, 180 - 104);
app.stage.addChild(frame);

// Create a graphics object to define our mask
let mask = new PIXI.Graphics();
// Add the rectangular area to show
mask.beginFill(0xffffff);
mask.drawRect(0,0,200,200);
mask.endFill();

// create sprite bunny

let bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
bunny.x = app.screen.width /2;
bunny.y = 20;
bunny.tint = 'rgba(255,160,1,1)'
bunny.anchor.set(0.5);
app.stage.addChild(bunny);

// Add container that will hold our masked content
let maskContainer = new PIXI.Container();
// Set the mask to use our graphics object from above
maskContainer.mask = mask;
// Add the mask as a child, so that the mask is positioned relative to its parent
maskContainer.addChild(mask);
// Offset by the window's frame width
maskContainer.position.set(4,4);
// And add the container to the window!
frame.addChild(maskContainer);

// Create contents for the masked container
let text = new PIXI.Text(
  'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
  'You can put anything in the container and it will be masked!',
  {
    fontSize: 24,
    fill: 0x1010ff,
    wordWrap: true,
    wordWrapWidth: 180
  }
);
text.x = 10;

maskContainer.addChild(text);




maskContainer.eventMode = 'static';
maskContainer.cursor = 'pointer';
maskContainer.on('pointerdown', ()=> {console.log('debugtext')})

// text.eventMode = 'static';
// text.cursor = 'pointer';
// text.on('pointerdown', ()=> {console.log('debuged')})

//event mouse


// Add a ticker callback to scroll the text up and down
let elapsed = 0.0;
app.ticker.add((delta) => {
  // Update the text's y coordinate to scroll it
  elapsed += delta;
  text.y = 10 + -100.0 + Math.cos(elapsed/50.0) * 100.0;

  bunny.rotation += 0.1 * delta;
});
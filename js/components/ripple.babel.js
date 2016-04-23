import Module  from './module';
import HammerJS from 'hammerjs';
import mojs    from 'mo-js';

// require('css/blocks/handle.postcss.css');
// let CLASSES = require('css/blocks/handle.postcss.css.json');

class Ripple extends Module {
  /*
    Method to declare defaults.
    @private
    @overrides @ Module.
  */
  _declareDefaults () {
    super._declareDefaults();
    this._defaults.withHold = true;
  }
  /*
    Method to render the component.
    @private
    @overrides @ Module
  */
  _render () {
    super._render();
    this._addRipple();
  }
  /*
    Method to construct ripple object.
    @private
  */
  _addRipple () {
    this.transit = new mojs.Transit({
      parent:       this.el,
      strokeWidth:  { 10 : 0 },
      fill:         'none',
      // stroke:       'white',
      stroke:       'hotpink',
      fill:         'hotpink',
      fillOpacity:  .75,
      opacity:      { .85: 0 },
      radius:       { 0: 40 },
      isShowEnd:    false,
      onStart:      this._onStart.bind( this ),
      onUpdate:     this._onUpdate.bind( this )
    });
  }
  /*
    Method that is invoked on ripple start.
    @private
  */
  _onStart () { this.isStart = true; }
  /*
    Method that is invoked on ripple update.
    @private
    @param {Number} Curret progress [0...1].
  */
  _onUpdate ( p ) {
    if ( !this._props.withHold ) { return; }
    if ( p >= .15 && this.isStart && !this.isRelease ) {
      this.isStart = false;
      this.transit.setSpeed( .02 );
    }
  }
  /*
    Method that should be run on touch serface release.
    @private
  */
  _release () {
    if ( !this._props.withHold ) { return; }
    this.isRelease = true;
    this.transit.setSpeed( 1 ).play();
  }
  /*
    Method that should be run on touch serface hold.
    @private
    @param {Object} Origin event object.
  */
  _hold ( e ) {
    this.isRelease = false;
    this.transit.tune({ x: e.layerX, y: e.layerY }).replay();
  }
  /*
    Method that should be run on touch serface cancel.
    @private
  */
  _cancel () {
    if ( !this._props.withHold ) { return; }
    this.isRelease = true;
    this.transit
      .pause()
      .setSpeed( 1 )
      .playBackward();
  }
}

export default Ripple;
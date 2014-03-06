var Pieces = function( options ){
	
	this.piecesOffsets  = [];
	this.$pieces = null;
	
	this.init = function(){
		var self = this;
		this.$pieces	= $( '.piece' );
		this.$promo = $( '.promo' );
		//save initial offsets
		$.each( self.$pieces, function( index, value ){
			var offset = {
				init : $( value ).offset().top,
				current : $( value ).offset().top
			}
			self.piecesOffsets.push( offset );
		});
		
		//set css with position absolute and offsets
		$.each(self.$pieces, function( index, value ){
			var offset = self.piecesOffsets[ index ].init;
			$( value ).css({
				'top' : offset,
				'position' : 'absolute'
			});
		});
		
		//this.movePromo();
		this.handlers();
		
	};
	
	this.movePromo = function(){
		var startY, endY, heightChange, speedVar;
		var self = this;
		
		heightChange = $( self.$promo[ 0 ] ).height();
		speedVar = 1700;
		
		for( i = 0, len = this.$promo.length; i < len; i++ ){
			setTimeout(function(){
				pageLoad.a.movePieces( heightChange, 0 );
			}, (i+1)*speedVar);
		}
		
	};
	
	this.movePieces = function( startY, endY ){
		var self = this;
		var change;
		self.$pieces.stop( true );
		if ( endY > startY && (endY - startY) != 0) {
    		//console.log('moving down');
    		change = endY - startY;
    		var j = 0;
    		
    		for( i = self.$pieces.length-1, len = 0; i >= 0; i-- ){

    			if( self.piecesOffsets[ i ].current + change >= self.piecesOffsets[ i ].init ){
    				self.piecesOffsets[ i ].current = self.piecesOffsets[ i ].init;
				}else{
					self.piecesOffsets[ i ].current = self.piecesOffsets[ i ].current + change;
				}
    			
    				$( self.$pieces[ i ] ).delay( j * 30 * .7 ).animate( {
        				'top':  self.piecesOffsets[ i ].current
        			}, 2000, 'easeOutQuad' );
        			j++
    			
    		}
		} else {
			if( ( startY - endY ) != 0 ){
				//console.log('moving up');
    			change = (startY - endY);
    			var j = 0;
    		
    			for( i = 0, len = self.$pieces.length; i < len; i++ ){
        			if( self.piecesOffsets[ i ].init + endY > -$( '.menu' ).position().top ){
        				//animate the pieces that are in frame
        				self.piecesOffsets[ i ].current = self.piecesOffsets[ i ].current - change;
        				$( self.$pieces[ i ] ).delay( j * 40 * .7 ).animate( {
            				'top':  self.piecesOffsets[ i ].current 
            			}, j * 200 * .6, 'easeOutQuad' );
        				j++;
        			}else{
        				//if the piece is out of frame, save it's new offset in the array but don't animate
        				self.piecesOffsets[ i ].current = self.piecesOffsets[ i ].current - change;
        			}
        		}
    			
    			console.log( j );
    			//console.log( self.piecesOffsets )
			}
			
		}
		//endY = startY;
	};
	
	this.handlers = function(){
		var self = this;
		var startY, endY, lastY, currY;
		var to;
  	 	
  	 	var endY = 0;
  	 	$( '.menu' ).on( 'touchstart', function( e ){
  	 		//console.log( e );
  	 		startY = e.originalEvent.pageY;
  	 		
  	 		//reset the endY so on touch without move, there is no delta
  	 		endY = startY;
  	 	});
  	 	
  	 	
  	 	$( '.menu' ).on( 'touchmove', function( e ){	
  	 		
  	 		currY = e.originalEvent.targetTouches[0].pageY;
  	 		
  	 		
  	 		console.log( "BEFORE: " + lastY );
  	 		console.log( "AFTER: " + currY)
  	 
  	 		
  	 		endY = currY;

  	 	});
  	 	
  	 	$( '.menu' ).on( 'touchend', function( e ){
  	 		//var currentY = e.originalEvent.pageY;
  	 		self.movePieces( startY, endY );
  	 	})
		
		
	}
};


var pageLoad = {
	
	loading : true,	
	a : null,
		
	init : function(){
		self = this;
		
		$( window ).load( function(){
			this.loading = false;
			
			self.hideLoadingScreen();
			self.showMenu();
		});
		
	},
	
	hideLoadingScreen : function(){
		$( '.loading' ).animate({
			'top' : '-480px',
		}, 1000, 'easeInExpo', function(){
			$( this ).hide();
		});
	},
	
	showMenu : function(){
		
		this.a = new Pieces();
		this.a.init();
		
	}
	
	
}

pageLoad.init();


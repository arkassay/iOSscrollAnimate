var pieces = function(){
	
	this.init = function(){
		
	};
	
	this.moveMe = function(){
		
	};
	
	
};


var pageLoad = {
	
	loading : true,	
	pieces : [],
		
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
		}, 800, 'easeInExpo', function(){
			$( this ).hide();
		});
	},
	
	showMenu : function(){
		//$( '.menu' ).show();
		//var menHeight = $('.menu').height();
  	 	//var $menuEl = $( '.menu' );
		var self = this;
		var $pieces	= $( '.piece' );
		
		$.each( $pieces, function( index, value ){
			var offset = $( value ).offset().top;
			self.pieces.push( offset );
		});
		
		$.each($pieces, function( index, value ){
			var offset = self.pieces[ index ];
			$( value ).css({
				'top' : offset,
				'position' : 'absolute'
			});
		});
		
  	 	var lastY, change;
  	 	var pos = 0;
  	 	var startY = 0;
  	 	var endY = 0;
  	 	$( 'body' ).on( 'touchstart', function( e ){
  	 		console.log( e );
  	 		startY = e.originalEvent.pageY;
  	 		console.log("START: " + startY);
  	 	});
  	 	$( 'body' ).on( 'touchmove', function( e ){
  	 		endY = e.originalEvent.targetTouches[0].pageY;
  	 		
  	 	} )
  	 	
  	 	$( 'body' ).on( 'touchend', function( e ){
  	 		
  	 		var currentY = e.originalEvent.pageY;
  	 		if ( endY > startY && endY != 0) {
        		//console.log('moving down');
        		change = endY - startY;
        		var j = 0;
        		
        		for( i = $pieces.length, len = 0; i >= 0; i-- ){
        			
        			self.pieces[ i ] = self.pieces[ i ] + change;
        			$( $pieces[ i ] ).delay( j * 100 * .7 ).animate( {
        				'top':  self.pieces[ i ]
        			}, 500 );
        			j++
        		}
    		} else {
    			if( endY != 0 ){
    				//console.log('moving up');
        			change = (startY - endY);
        			var j = 0;
        		
        			for( i = 0, len = $pieces.length; i < len; i++ ){
            			
            			self.pieces[ i ] = self.pieces[ i ] - change;
            			
            			if( self.pieces[ i ] > -240 ){
            				$( $pieces[ i ] ).delay( j * 50 * .7 ).animate( {
                				'top':  self.pieces[ i ]
                			}, 1000, 'easeOutExpo' );
            				j++;
            			}
            			
            			
            			
            		}
    			}
    			
    		}
  	 	})
		
		
	}
	
	
}

pageLoad.init();


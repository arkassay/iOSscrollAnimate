var pieces = function(){
	
	this.init = function(){
		
	};
	
	this.moveMe = function(){
		
	};
	
	
};


var pageLoad = {
	
	loading : true,	
		
	init : function(){
		
		self = this;
		$( window ).load(function(){
			this.loading = false;
			self.hideLoadingScreen();
			self.showMenu();
		});
		
	},
	
	hideLoadingScreen : function(){
		$('.loading').animate({
			'top' : '-480px',
		}, 800, 'easeInExpo', function(){
			$(this).hide();
		});
	},
	
	showMenu : function(){
		$('.menu').show();
	}
	
	
}

pageLoad.init();
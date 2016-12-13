var App = function() {
	var inicio = '#inicio';
	var presupuestos = '#presupuestos';
	var navbar = '.navbar';
	
	var comp_creacion = 'componentes/creacion.html';
	var comp_presupuestos = 'componentes/presupuestos.html';
	var comp_menu = 'componentes/menu.html';
	
	var refresh = function() {
		$('[data-role="page"]').trigger('create');
	};
	
	var initComponente = function(selector, componente, callback) {
		$(selector).load(componente, callback);
	};
	
	var initNavegacion = function() {
		initComponente(navbar, comp_menu, function() {			
			refresh();
		});
	};
	
	this.refreshNavegacion = function() {
		var pagina = $(':mobile-pagecontainer').pagecontainer( 'getActivePage' ).attr( 'id' );
		
		$('[data-role="navbar"] a').removeClass('ui-btn-active');
		$('a[href="#'+pagina+'"]').addClass('ui-btn-active');
	};
	
	this.init = function() {
		initComponente(inicio, comp_creacion, function() {			
			initNavegacion();
			
			$('fieldset#complejidad input').on('click', function() {
				$('small#complejidad-descripción').html($(this).attr('data-descripcion'));
			});
		});
		
		initComponente(presupuestos, comp_presupuestos, function() {
			initNavegacion();
		});
	};
};

$(document).on('pagebeforeshow', function() {	
	var app = new App();
	app.init();
});

$(document).on('pagechange', function() {
	var app = new App();
	app.refreshNavegacion();
});
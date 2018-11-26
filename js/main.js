if (VvvebTheme === undefined) var VvvebTheme = {};

VvvebTheme.Cart = {
	add: function(product_id, quantity) {
		
		
		
		return;
		
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.alert-dismissible, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#alert-box').append('<div class="alert alert-success alert-dismissible">' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('#alert-box').addClass('open');

					// Need to set timeout otherwise it wont update the total
					$('#cart').parent().load('index.php?route=common/cart/info');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});		
		
		
		
	},
	
	update: function(key, quantity) {
	},
	
	remove: function(key) {
	}
}

VvvebTheme.Alert  = {
	
	show: function(message) {
		$('.alert-top .message').html(message);
		$('.alert-top').addClass("show");
	}
}

VvvebTheme.Gui = {
	
	init: function() {
		$("[data-vvveb-action]").each(function () {
			on = "click";
			if (this.dataset.vvvebOn) on = this.dataset.vvvebOn;
			
			$(this).on(on, VvvebTheme.Gui[this.dataset.vvvebAction]);
		});
	},
	
	addCart : function () {
		
		var product = $(this).parents("[data-product]");
		var img = $("[data-img]", product).attr("src");
		var name = $("[data-name]", product).text();
		
		VvvebTheme.Cart.add(this.dataset.product_id);

		VvvebTheme.Alert.show('<img height=50 src="' + img + '"> &ensp; ' +  name +' was added to cart');
		
		return false;
	}
}	
		

VvvebTheme.Gui.init();

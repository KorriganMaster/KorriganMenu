$(document).ready(function() {
	$('#my_test_div').korriganMenu({
		'items': [
			{
				'title': 'Menu 1',
				'content': [
					{
						'title': 'Item 1',
						'content': [
							{
								'title': 'Sub item with URL',
								'url': 'http://www.google.fr'
							},
							{
								'title': 'Sub item 2'
							},
							{
								'title': 'Sub item 3',
								'content': [
									{
										'title': 'Sub-sub item 1'
									},
									{
										'title': 'Sub-sub item 2'
									}
								]
							}
						]
					},
					{
						'title': 'Item 2'
					}
				]
			},
			{
				'title': 'Menu 2',
				'content': [
					{
						'title': 'Item 1',
						'content': [
							{
								'title': 'Sub-item 1'
							},
							{
								'title': 'Sub-item 2'
							}
						]
					},
					{
						'title': 'Item 2'
					}
				]
			}
		]
	});
});
$(document).on('done.submit.modal.admin', function (event, data, textStatus, jqXHR) {

	var $new_row = $('.js-permalink-row').last().clone();

	// Update the URL on the new row
	$new_row.find('td[data-field=url]').text(data.url);

	// Update each of the filter values on the new row
	for (var filter_id in data.filter_values) {
		var name = data.filter_values[filter_id].filter;
		var value = data.filter_values[filter_id].label;

		$new_row.find('td[data-field=' + name + ']').text(value);
	}

	// Update the ids on the edit and delete buttons under the cog
	$new_row.find('.js-permalink-edit').data('permalinkId', data.id);
	$new_row.find('.js-permalink-delete').data('permalinkId', data.id);

	// Try and find an existing row with the same data, and delete it
	$('.js-permalink-row').each(function (key, row) {
		for (var filter_id in data.filter_values) {
			var name = data.filter_values[filter_id].filter;
			var new_value = data.filter_values[filter_id].label;
			var value = $(row).find('td[data-field=' + name + ']').text();

			// Stupid whitespace in the html
			value = value.replace(/(^\s+|\s+$)/g, '');

			if (value != new_value) {
				return;
			}
		}

		$(row).remove();
	});

	// Add the new row to the page
	$('.js-permalink-row').last().after($new_row);

});

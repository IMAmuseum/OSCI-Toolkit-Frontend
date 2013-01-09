OsciTk.models.Figure = OsciTk.models.BaseModel.extend({
	defaults: function() {
		return {
			section_id: null,
			delta: null,
			caption: null,
			position: null,
			columns: null,
			aspect: 1,
			body: null,
			options: {},
			plate: false
		};
	},

	initialize: function() {
		this.parsePositionData();
	},

	parsePositionData: function() {
		var position = this.get('position');
		var parsedPosition;

		//set a flag for easily identifing the plate figure
		if (position === "plate") {
			this.set('plate', true);
			position = "p";
		}

		if (position.length == 2) {
			parsedPosition = {
				vertical: position[0],
				horizontal: position[1]
			};
		} else if (position === "n" || position === "p") {
			parsedPosition = {
				vertical: position,
				horizontal: position
			};
		} else {
			parsedPosition = {
				vertical: position,
				horizontal: 'na'
			};
		}

		this.set('position', parsedPosition);

		return this;
	}
});
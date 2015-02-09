OsciTk.models.Figure = OsciTk.models.BaseModel.extend({
	defaults: {
		section_id: null,
		delta: null,
		caption: null,
		position: null,
		columns: null,
		aspect: 0,
		body: null,
		options: {},
		plate: false
	},

	initialize: function() {
		this.parsePositionData();
		this.set('content', $.trim(this.get('content')));
	},

	parsePositionData: function() {
		var position = this.get('position');
		var parsedPosition;

		//set a flag for easily identifing the plate figures
		if (position === "plate" || position === 'platefull') {
			this.set('plate', true);
			if (position === "plate") {
				position = "p";
			} else if (position === 'platefull') {
				position = "ff";
			}
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
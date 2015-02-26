// this file will be used to test search within backbone
// removing the dependency on solr
var book = new backbone.Collection([
	{
		'Section'	: {
			'id': 2,
			'Title': 'Section One',
			'Subtitle:': 'Section One Subtitle'
		},
		'Paragraphs': [
			{
				'id': 1,
				'content': 'Lorum Ipsum'
			},
			{
				'id': 2,
				'content': 'more Content'

			},
			{
				'id': 3,
				'content': 'even more ipsum'
			}
		]
	},
	{
		'Section'	: {
			'id': 6
			'Title': 'Section Two',
			'Subtitle:': 'Section Two Subtitle'
		},
		'Paragraphs': [
			{
				'id': 1,
				'content': 'Lorum Ipsum'
			},
			{
				'id': 2,
				'content': 'more Content'

			},
			{
				'id': 3,
				'content': 'even more ipsum'
			}
		]
	},
	{
		'Section'	: {
			'id': 5
			'Title': 'Section Three',
			'Subtitle:': 'Section Three Subtitle'
		},
		'Paragraphs': [
			{
				'id': 1,
				'content': 'Lorum Ipsum'
			},
			{
				'id': 2,
				'content': 'more Content'

			},
			{
				'id': 3,
				'content': 'even more ipsum'
			}
		]
	}
]);
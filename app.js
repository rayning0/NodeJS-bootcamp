var mongo = require('mongodb')

mongo.Db.connect('mongodb://orange:password@ds053597.mongolab.com:53597/orange',
	function(err, client) {
		if (err) throw err;
		console.log('connnected!')
		client.collection('articles')
			.find().toArray(function(err, docs) {
				if (err) throw err;
				console.log(docs);
		
		// client.collection('things').insert({ thing: 'something'}, function(err, doc) {
			//console.log(err, doc);
		});
	});
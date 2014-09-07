OpenCyc
======

Node.js OpenCyc API

## How to use

#### Load module

```
var cyc = require('opencyc');
```

#### Search concepts by using a keyword query

```
cyc.find('<query>', function(err, results){
	// Example results for query 'batman movies'
	// results is an array of concepts found
	/*
	[
		{
			"id": "Mx8Ngh4rwNYIR5wpEbGdrcN5Y29ycB4rwRRVd5wpEbGdrcN5Y29ycA",
			"name": "(IssueOfCWSeriesFn Batman-MovieSeries)",
			"type": "Collection"
		},
		{
			"id": "Mx4rvb2leZwpEbGdrcN5Y29ycA",
			"name": "BatmanMovie",
			"type": "Collection"
		}
	]
	 */
});
```

#### Find details for a concept

```
cyc.get('<concept id>', function(err, concept){
	// Example concept result as an object using id 'Mx4rvb2leZwpEbGdrcN5Y29ycA'
	/*
	{
		"version": "2009/04/07",
		"thing": {
			"label": "Batman movie",
			"comment": "The collection of Batman movies."
		},
		"subtypes": [
			{
				"id": "MX4RVB2LEZWPEBGDRCN5Y29YCA",
				"label": "Batman movie"
			},
			{
				"id": "MX4RWDAPOJWPEBGDRCN5Y29YCA",
				"label": "movie type by series"
			},
			{
				"id": "MX8NGH4RWNYIR5WPEBGDRCN5Y29YCB4RWRRVD5WPEBGDRCN5Y29YCA",
				"label": "Batman movie"
			},
			{
				"id": "MX4RV973YPWPEBGDRCN5Y29YCA",
				"label": "movie"
			},
			{
				"id": "MX4RVXG6I5WPEBGDRCN5Y29YCA",
				"label": "media product"
			},
			{
				"id": "MX4RWCLAZJWPEBGDRCN5Y29YCA",
				"label": "conceptual work"
			},
			{
				"id": "&CYC;MX4RVB2LEZWPEBGDRCN5Y29YCA",
				"label": "Batman movie"
			}
		],
		"instances": [
			{
				"id": "MX4RWQ_BRJWPEBGDRCN5Y29YCA",
				"label": "Batman"
			},
			{
				"id": "MX4RV79YJZWPEBGDRCN5Y29YCA",
				"label": "Batman"
			},
			{
				"id": "MX4RWCKLHZWPEBGDRCN5Y29YCA",
				"label": "Batman & Robin"
			},
			{
				"id": "MX4RVV9YBJWPEBGDRCN5Y29YCA",
				"label": "Batman And Mr. Freeze Subzero"
			},
			{
				"id": "MX4RVAEYLJWPEBGDRCN5Y29YCA",
				"label": "Batman Forever"
			},
			{
				"id": "MX4RVZPQLJWPEBGDRCN5Y29YCA",
				"label": "Batman Returns"
			},
			{
				"id": "MX4RWHQZK5WPEBGDRCN5Y29YCA",
				"label": "Batman Beyond"
			}
		]
	}
	*/
});
```
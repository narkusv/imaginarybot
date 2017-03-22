
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('userlist', 	require('./components/Userlist.vue'));
Vue.component('item', require('./components/Panel.vue'));


//Converts JSON array from database (no children, just parent ID) to a tree.
function unflatten(arr) {
	console.log("Unflatten ccalled");
  var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem; 

  // First map the nodes of the array to an object -> create a hash table.
  for(var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }
	
	 console.log(mappedArr);

  for (var id in mappedArr) {
	
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem['parent_id'] && mappedArr[mappedElem['parent_id']]) {
        mappedArr[mappedElem['parent_id']]['children'].unshift(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
      	// insert only if parent = 0, so elements with deleted parents are not deleted. 
      	if(mappedElem['parent_id'] == 0){
      		 tree.unshift(mappedElem);
      	}
       
      }
    }
  }
  
  console.log(tree);
  return tree;
} 

function insertToMap(item, map){
  item['children'] = [];

    if(item['parent_id'] == map['id']){
    	console.log(map);
    	if(!map['children']){
    		map['children'] = [];
    	}

      map['children'].unshift(item);
    }else{
      map.unshift(item);
    }
    return map;
}
  
function searchTreePart(element, idToFind){
	if(element['id'] == idToFind){
		return element;
	}else if (element['children'] != null){
		var i;
		var result = null;
		for(i=0; result == null && i < element['children'].length; i++){
		   result = searchTreePart(element['children'][i], idToFind);
		   if(result != null){
		   		element['children'].splice(i, 1);
		   		result = null;
		   }
		}
		return null;
	}
}

function searchTree(elements, idToFind){
	commentHandler.treeData.forEach( function (element, index){
	if(element['id'] == idToFind){
		commentHandler.treeData.splice(index, 1);
		return;
	}else{
		var result = searchTreePart(element, idToFind);
		if(result){
			return;
		}
	}
	  
    });
     return null;

}

function deleteComment(item){
	searchTree(commentHandler.treeData, item.id);
}

function isURL(url){
	return  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
}

function passDataToServer(comment, parent, type, model){
	
	axios.post('/comments', { content : comment, parent_id : parent, type : type})
	.then(function(response){    
	      //Asuming that inserting to highest level element (model argument is empty.)
	      var map = commentHandler.treeData; 
	      if(model){
	        map = model;
	      }
	      insertToMap(response.data, map);
	})
	.catch(function (error){
		console.log(error);
	   	alert("Something went wrong while trying to save comment to database");
	});
}

function isURLIMG(url, callback){
	var img = new Image();
	img.onload = function() { callback(true); };
	img.onerror = function() { callback(false); };
	img.src = url;
}

var commentHandler = new window.Vue({
    el: '#app',
    data: {
    treeData: {}
  	},
    methods:{
	deleteComment: function(e, model) {
		axios.post('/comments/delete', { id : model.id })
		.then(response => {
			deleteComment(model);
		}).catch(error => {
			console.log(error);
			alert("Something went wrong while trying to delete comment from database");
	});
	},

	saveComment: function(e, parent, model) {
		var comment = e.target.value; 
		var type = 0;//0 = type.text
		e.target.value = "";

		if(comment != ''){
			//Checking if input is valid url. if input is valid url checking if url is image. only then data is passed to server. 
			if(isURL(comment.trim())){
				console.log("is url");
				if(isURLIMG(comment, function(isImg){
					if(isImg){
						console.log("is image");
						type  = 1;
					}
					passDataToServer(comment, parent, type, model);
				}));
			}else{
				passDataToServer(comment, parent, type, model);
			}
		}
	}
}
});

function InsertSearchInTree(element, comment){
	if(element['id'] == comment.parent_id){
	
		return element;
	}else if (element['children'] != null){
		var i;
		var result = null;
		for(i=0; result == null && i < element['children'].length; i++){
		   result = InsertSearchInTree(element['children'][i], comment);
		   if(result != null){
		   		if(!element['children'][i]['children']){
		   			element['children'][i]['children'] = [];
		   		}
		   		element['children'][i]['children'].unshift(comment);
		   
		   		result = null;
		   }
		}
		return null;
	}
}



Echo.channel('tester').listen('NewCommentEvent', (data) => {
	console.log(data);
	var comment = data.comment;
	if(comment.parent_id == 0){
		commentHandler.treeData.unshift(comment);
		return;
	}

	$.each(commentHandler.treeData, function (i, element){
	console.log(element['id']);
	if(element['id'] == comment.parent_id){
		if(!element['children']){
			element['children'] = [];
		}
		element['children'].unshift(comment);
		return false;
	}else{
		var result = InsertSearchInTree(element, comment);
		if(result){
			return false;
		}
	}
    });
});


 // GET /someUrl
axios.get('/comments')
	.then(function(response) {
		console.log(response);
 	 	commentHandler.treeData = (unflatten(response.data));	
  	})
	.catch(function(error) {
		console.log(error);
		alert("Something went wrong while trying to receive comments from")
	});


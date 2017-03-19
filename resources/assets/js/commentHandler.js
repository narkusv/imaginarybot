require('./bootstrap');


function unflatten(arr) {
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


  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem['parent_id'] && mappedArr[mappedElem['parent_id']]) {
    
        mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
} 

function insertToMap(item, map){
  console.log("///////////////////");
  console.log(JSON.stringify(map));
  console.log(item);
  item['children'] = [];

   
    if(item['parent_id'] == map['id']){
       console.log("DRAMA: " + map['id'] + "x" + item['parent_id']);
      map.children.push(item);
    }else{
      map.push(item);
    }

    return map;
}
  

Vue.component('item',     require('./components/Panel.vue'));

// task list application
var commentHandler = new window.Vue({
    el: '#demo',
    data: {
    treeData: {}
  	},
    methods:{
      saveComment: function(e, parent, model) {
          Vue.http.post('/comments', { content : e.target.value, parent_id : parent}).then(response => {
              e.target.value = "";

              var map = this.treeData;
              if(model){
                map = model;
              }
              insertToMap(response.body, map);
              
          }, response => {
            // error callback
        });
 

      }

    }
});
 // GET /someUrl
commentHandler.$http.get('/comments').then(response => {

    // get body data
   
    console.log(JSON.stringify(response.body));
  commentHandler.treeData = (unflatten(response.body));	
  console.log(JSON.stringify(commentHandler.treeData));

  }, response => {
    // error callback
});

<template id="item-template">
<li >
    <div @click="toggle">

    <div style="padding-left: 0px;" class="col-md-10 col-xs-10">
      <span v-if="model.type == 0">
        {{model.content}}
      </span>
      <img style="max-width:600px; height: auto" class="img-responsive" v-else :src="model.content" alt="bot is confused about this image"></img>
     
    </div>
    <div class="col-md-1 col-xs-1">
      <button  v-show="admin" @click="deleteElement" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
    
    </div>
    <ul style="list-style: inherit;"  v-if="isFolder">
      <item
        class="item"
        :admin="admin"
        v-for="model in model.children"
        :model="model">
      </item>
     
    </ul>
    
    <input @keyup.enter="processComment" v-show="(isEmpty || reply) && admin" type="text" class="form-control" placeholder="reply"/>
  </li>

</template>


<script>


     export default {
        name: "tree",
        template: '#item-template',
        props: {
          model: Object,
          newcomment: "",
          admin: ''
        },
        data: function () {
          return {
            open: false,
            reply: false,
            isImage: false
          }
        },
        mounted: function() {

           
        },
        computed: {
          isFolder: function () {
            return this.model.children &&
              this.model.children.length
          },
          isEmpty: function(){
            return this.model["parent_id"] == '-1'  ;
          }
        },
        methods: {
          deleteElement: function (e) {

            this.$root.$options.methods.deleteComment(e, this.model);
            e.stopPropagation();
          },
          toggle: function () {
            if (this.isFolder) {
              this.open = !this.open
              this.reply = this.open
            }else{
              this.reply = !this.reply
            }
          },
          changeType: function () {
            if (!this.isFolder) {
              Vue.set(this.model, 'children', [])
              this.addChild()
              this.open = true
            }
          },
          showReply: function() {
            if(!this.reply){
              this.reply = true
            }
            this.reply = !this.reply;
          },
          processComment: function(e) {
            this.open = true;
            this.$root.$options.methods.saveComment(e, this.model.id, this.model);
          },
          addChild: function () {
            this.model.children.push({
              content: 'new stuff'
            })
          }
        }
      }
</script>

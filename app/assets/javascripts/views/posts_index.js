JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST["posts/index"],
  
  events: {
    "click button": "removePost"
  },
  
  initialize: function(options) {
    this.listenTo(this.collection,
                  "remove add change:title reset sort",
                  this.render);
  },
  
  
  render: function() {
    var content = this.template({posts: this.collection});
    this.$el.html(content);
    
    return this
  },
  
  removePost: function(event) {
    var $target = $(event.currentTarget);
    var id = $target.data("id");
    var post = this.collection.get(id);
    post.destroy();
  }
})
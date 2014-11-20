JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST["posts/new_form"],
  events: {
    "submit form": "createPost"
  },
  
  initialize: function(options){
    this.collection = options.collection;
    if (options.id){
      this.id = options.id;      
    }
    this.listenTo(this.collection, "add", this.render);
  },
  
  render: function() {
    if (this.id) {
      this.post = this.collection.get(this.id);
    } else {
      this.post = new JournalApp.Models.Post();
    }
    var content = this.template({post: this.post});
    this.$el.html(content);

    return this
  },
  
  createPost: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget);
    var params = $target.serializeJSON()["post"];
    this.post.set(params);
    var that = this;
    if (this.post.isNew()){
      this.collection.create(params, {
        error: function(model, response) {
          that.render();
          that.$el.prepend(response.responseJSON)
        },
        success: function() {
          that.$el.empty();
          Backbone.history.navigate("#", {trigger: true})
        }
      }) 
    } else {
      this.post.save({}, {
        error: function(model, response) {
          that.render();
          that.$el.prepend(response.responseJSON)
        },
        success: function() {
          that.$el.empty();
          Backbone.history.navigate("#", {trigger: true})
        }
      })      
    }

  }
})
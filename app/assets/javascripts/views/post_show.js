JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST["posts/show"],
  
  events: {
    "dblclick .editable": "startEditing",
    "blur input": "endEditing",
    "blur textarea": "endEditing",
  },
  
  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function(options) {
    var content = this.template({post: this.model});
    this.$el.html(content);
    
    return this;
  },
  
  startEditing: function (event) {
    var $target = $(event.currentTarget);
    var content = $target.text();
    var type = $target.data("type");
    if (type === "title") {
      this.$inputContent = $('<input type="text">').val(content);
    } else {
      this.$inputContent = $('<textarea>').text(content);
    }
    this.$inputContent.data("type", type)
    $target.replaceWith(this.$inputContent);
  },
  
  endEditing: function (event) {
    if (this.$inputContent) {
      var type = this.$inputContent.data("type");
      var content = this.$inputContent.val();        
      this.model.set(type, content);
      this.model.save();      
    }
  }
})
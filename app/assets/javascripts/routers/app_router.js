JournalApp.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "postsIndex",
    "posts/new": "postForm",
    "posts/:id/edit": "postForm",
    "posts/:id": "postShow",
  },
  
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.$sidebarEl = this.$rootEl.find("div.sidebar");
    this.$contentEl = this.$rootEl.find("div.content");
    this._collection = new JournalApp.Collections.Posts();
  },
  
  postsIndex: function(){
    this._collection.fetch();
    this._collection.comparator = function(post) {
      return -post.get('updated_at');
    }
    
    var postsIndexView =
      new JournalApp.Views.PostsIndex({collection: this._collection});
    this.$sidebarEl.html(postsIndexView.render().$el)
  },
  
  postShow: function(id){
    this.postsIndex();
    var postModel = this._collection.getOrFetch(id);
        
    var postShowView =
      new JournalApp.Views.PostShow({model: postModel});
    
    this.$contentEl.html(postShowView.render().$el);
  },
  
  postForm: function(id) {
    this.postsIndex();
    var options = {};
    if (id) {
      options.id = id
      this._collection.getOrFetch(id);
    }
    options.collection = this._collection;
    var newPostView =
      new JournalApp.Views.PostForm(options);
    this.$contentEl.html(newPostView.render().$el)
  },
  
})
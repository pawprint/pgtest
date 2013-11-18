var ServerView = function() {
    this.initialize = function() {
      this.el = $('<div/>');

      $.ajax({
        url:'http://www.pawprint.ca/inpost.php',
        type:'post',
        data:'go=true',
        success:function(data){
          $('.serverResult').html(data);
        },
        error:function(w,t,f){
          $('.serverResult').html('<strong>'+w+' '+t+' '+f+'</strong>');
        }
      });
      return false;
    };

    this.render = function() {
        this.el.html(ServerView.template());
        return this;
    };

    this.initialize();
}

ServerView.template = Handlebars.compile($("#server-tpl").html());
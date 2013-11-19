var ServerView = function() {

    this.scanCode = function() {
      try {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        $('.serverResult').append('scanner loaded<br />');
        scanner.scan(
          function (result) {
            if(!result.cancelled){
              $('.serverResult').append('<strong>Scan Returned</strong><br />')
                                .append('Result: ' + result.text+'<br />')
                                .append('Format: ' + result.format+'<br />');


              $.ajax({
                  url:'http://www.pawprint.ca/inpost.php',
                  type:'post',
                  data:'url='+result.text,
                  success:function(data){
                    $('.serverResult').append(data+'<br />');
                  },
                  error:function(w,t,f){
                    $('.serverResult').append('<strong>Error: '+w+' '+t+' '+f+'</strong>');
                  }
                });
            }else{
              $('.serverResult').append('<strong>Scan Canceled</strong><br />');
            }
          },
          function (error) {
              app.showAlert("Scanning failed: " + error);
          }
        );
      }
      catch(e) {
        app.showAlert('scanner could not be loaded');
      }


      return false;
    };

    this.initialize = function() {
      this.el = $('<div/>');

      $.ajax({
          url:'http://www.pawprint.ca/inpost.php',
          type:'post',
          data:'go=true',
          success:function(data){
            $('.serverResult').append(data+'<br />');
          },
          error:function(w,t,f){
            $('.serverResult').append('<strong>Error: '+w+' '+t+' '+f+'</strong>');
          }
        });
    };

    this.render = function() {
      this.el.html(ServerView.template());
      $('.serverResult',this.el).append('<em>Initalized</em><br />');
      $('.scanBC',this.el).on('click',this.scanCode).html('Scan');

      return this;
    };

    this.initialize();
}

ServerView.template = Handlebars.compile($("#server-tpl").html());
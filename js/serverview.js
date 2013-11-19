var ServerView = function() {

    this.scanCode = function() {
      try {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        app.showAlert('scanner loaded');
        $('.serverResult').append('<strong>Attempt Scan</strong><br />');
        scanner.scan(
          function (result) {
              app.showAlert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
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
    };

    this.render = function() {
      this.el.html(ServerView.template());

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
      $('.serverResult',this.el).append('<em>Initalized</em><br />');
      $('.scanBC',this.el).on('click',this.scanCode).html('Scan');

      return this;
    };

    this.initialize();
}

ServerView.template = Handlebars.compile($("#server-tpl").html());
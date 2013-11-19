var ServerView = function() {

    this.scanCode = function() {
      $('.serverResult').append('<strong>Attempt Scan</strong><br />');
      this.scanner.scan(
        function (result) {
            showAlert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        },
        function (error) {
            showAlert("Scanning failed: " + error);
        }
      );
      return false;
    };

    this.initialize = function() {
      this.el = $('<div/>');
      this.scanner = cordova.require("cordova/plugin/BarcodeScanner");
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
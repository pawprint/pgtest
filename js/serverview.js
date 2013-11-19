var ServerView = function() {
    this.initialize = function() {
      this.el = $('<div/>');
      $('.scanBC',this.el).on('click', this.scanCode);

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

    this.scanCode = function() {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
          },
          function (error) {
              alert("Scanning failed: " + error);
          }
       );
    }

    this.render = function() {
        this.el.html(ServerView.template());
        return this;
    };

    this.initialize();
}

ServerView.template = Handlebars.compile($("#server-tpl").html());
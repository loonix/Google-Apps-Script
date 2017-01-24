  //get Mailing List
  var mailing = spreadsh.getSheetByName('References');
  var dataRange = mailing.getRange("A:A");
  var mailingemails = dataRange.getValues();
  //get active email
  var email = Session.getEffectiveUser().getEmail();
  var client = dataRange.getValues();
/*Global Vars*/


function doGet() {
 var app = UiApp.createApplication().setTitle('Security').
setStyleAttribute('background', '#ccc');
 var mainPanel = app.createVerticalPanel().setStyleAttribute('padding','25');
 var reject = app.createHTML("Hello,<BR><BR>You are connected with the user name <B>"+email+"</B> who is not authorized to our Webapp,<BR><BR>"+
 "If you think this is an error please contact the owner of this app at me@domain.com<BR><BR>Thank you.").setStyleAttribute('padding','25');
 
  for(n=0;n<client.length;++n){
    
   if(client[n][0].match(email)==email){
   
     var clientOK = true ; var name = client[n][0] ;

  var sheet = SpreadsheetApp.openById('key').getSheetByName('Sheet');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 0; i < values.length; i++) {
    var row = "";
    for (var j = 0; j < values[i].length; j++) {     
      if (values[i][j] == email) {
        var role = values[i][j+16].toString();
        //return role;
      }
    }    
  }  
     if(role == "IT"){
     return HtmlService
         .createTemplateFromFile('ITDEP')
         .evaluate()
         .setTitle('Webapp - IT Department');
     }
     /* else if(email == "email@domain.com"){
     return HtmlService
         .createTemplateFromFile('Tests')
         .evaluate()
         .setTitle('Webapp - Test');
     }*/
      else if(role == "Manager" || role == "TL"){
     return HtmlService
         //.createTemplateFromFile('Index')
     .createTemplateFromFile('Supervisor')
         .evaluate()
         .setTitle('Webapp - Supervisor');
     }
    
   };
 }
 if(!clientOK){
 app.add(reject);
 MailApp.sendEmail('admin@domain.com','Unknown user tried to use our Webapp ', email+' tried to connect without authorization, think about calling him to check what happened...');
 return app;
 }
 // here comes the normal code
 app.add( app.createHTML("<div>"+role+"</div>"));
 return app;
 
}

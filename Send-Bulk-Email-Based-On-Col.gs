// If you made changes in the Main Sheet you just need to check if the SHEETNAME Sheet is selecting the correct data. 
// Then you need to change the columns in the "BODY" section. 
// Just replace the number after column[X] to the correct column number. The array starts in [0] so the first column will be 0


function sendbulk() {
  //Intro
  var ss = SpreadsheetApp.openById('SPREADSHEETKEY');
  var sheet = ss.getSheetByName('SHEETNAME');
  var startRow = 2;  // First row of data to process
  var numRows = sheet.getLastRow()-1;   // Number of rows to process
  // Fetch the Total Range of the Sheet
  var dataRange = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn());
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();

 for (i in data) {
    var column = data[i];
    if( column[8] == "Bulk Email") {//iN ORDER FOR THIS TO WORK YOU WILL NEED TO WRITE "Bulk Email" IN THE SPECIFIED COL (CHANGE THIS).
      var emailAddress = column[4];  // HERE YOU GET THE EMAIL ADRESS OF THE PERSON YOU WANT TO SEND TO (CHANGE THIS AS WELL)
  
  
  // THE HTML ABOVE IS NOT VERY GOOD, BUT GIVES YOU AN INSIGHT OF HOW TO DO IT
  
      var body = "";
      body += "<p>Hi "+column[3]+",</p>"+
        "<table cellpadding='0' cellspacing='0' class='c18'>"+
            "<table cellpadding='0' cellspacing='0' class='c12' style='border:1px solid black;'>"+
              "<tbody>"+
                "<tr class='c10'>"+
                  "<td colspan='1' rowspan='1'>"+
                    "<p></p>"+
                    "<p><b>"+column[3]+" "+column[2]+"</b></p>"+
                      "<p><b>"+column[4]+"</b></p>"+
                    "<p><b>NAME:</b> "+column[7]+"</p>"+
                    "<p><b>ID:</b> "+column[5]+"</p>"+
                    "<p><b>PASS:</b> "+column[6]+"</p>"+
                  "</td>"+
                "</tr>"+
              "</tbody>"+
            "</table>"+
            "<p class='c1'><span class='c0'></span></p>"+
          "</td>"+
        "</tr>"+
      "</tbody>"+
    "</table>"+
              "<p>Thanks,</p>"+
              "<p>DANIEL CARNEIRO IS AMAZING</p>";
      var subject = "SUBJECT OF THE EMAIL";
      try {
          MailApp.sendEmail(emailAddress, subject,body,{htmlBody: body});
      } catch(errorDetails) {
      }

    }
  }
}

// THE ONLY THING MISSING IN THIS SCRIPT IS A SMALL CHECKER AT THE END THAT CHECK IF THE EMAIL WAS SENT AND THEN IT CLEARS THE "BULK EMAIL" CELLS



function onOpen() { // CREATES A MENU
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Menu')
      .addItem('Send Bulk Email', 'sendbulk')
      .addToUi();
  
}



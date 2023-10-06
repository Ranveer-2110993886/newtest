var flaga = 1;
var flags = 0;
var flagr = 0;

var genflag = 0;
var appendflag = 0;

var startup = 0;

$("#lengthbar").on("input", function() {
    document.getElementById("length").innerHTML = document.getElementById("lengthbar").value;
});
  
$("#alpha").click(function() {

  if(flaga == 0) {
    anime({
      targets: "#oal",
      color: "#008000",
      duration: 350,
      easing: "easeInOutQuad"
    });

    anime({
      targets: "#ln1",
      backgroundColor: "#008000",
      duration: 350,
      easing: "easeInOutQuad"
    });

    flaga = 1;

  }

  else if(flags == 1){
    // Info Dropper
  }
  
  else {
    anime({
      targets: "#oal",
      color: "#ffffff",
      duration: 350,
      easing: "easeInOutQuad"
    });

    anime({
      targets: "#ln1",
      backgroundColor: "#ffffff",
      duration: 350,
      easing: "easeInOutQuad"
    });

    flaga = 0;
  }

});

$("#schar").click(function() {

  if(flagr == 1){
    // Info Dropper
  }

  else if(flags == 0) {
    anime({
      targets: ["#osc", "#oal"],
      color: "#008000",
      duration: 350,
      easing: "easeInOutQuad"
    });

    anime({
      targets: ["#ln2", "#ln1"],
      backgroundColor: "#008000",
      duration: 350,
      easing: "easeInOutQuad"
    });

    flaga = 1;
    flags = 1;
  }

  else{
    anime({
      targets: "#osc",
      color: "#ffffff",
      duration: 350,
      easing: "easeInOutQuad"
    });

    anime({
      targets: "#ln2",
      backgroundColor: "#ffffff",
      duration: 350,
      easing: "easeInOutQuad"
    });

    flags = 0;
  }

});

async function password_request() {
  let response = await fetch("/password");
  let data = response.json();
  return data;
}

$("#contact").mouseenter(function() {
  document.getElementById("contact").style.textDecoration = "underline";
});

$("#contact").mouseleave(function() {
  document.getElementById("contact").style.textDecoration = "none";
});

$("#info").mouseenter(function() {
  document.getElementById("info").style.textDecoration = "underline";
});

$("#info").mouseleave(function() {
  document.getElementById("info").style.textDecoration = "none";
});

$("#generate").click(function() {
  
  let flagdata = {
    flag1: flaga,
    flag2: flags,
    password_length: document.getElementById("lengthbar").value
  };

  flagdata = JSON.stringify(flagdata);

  fetch("/config", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: flagdata
    })
    .then(response => response.json())
    .catch(error => console.error(error));
  
  
  if(flaga == 0 && flags == 0){
    $("#password").animate({opacity:0}, 250);
    $("#strength").animate({opacity:0}, 250);
    setTimeout(function() {
      document.getElementById("password").innerHTML = "Please Select Atleast One Option ツ";
      document.getElementById("strength").innerHTML = "Weak";
      document.getElementById("strength").style.color = "#f50000";
      setTimeout(function() {
        $("#password").animate({opacity:1}, 250);
        $("#strength").animate({opacity:1}, 250);
      }, 100);
    }, 250);
  }
    else{
    $("#password").animate({opacity:0}, 250);
    $("#strength").animate({opacity:0}, 250);
    
    data = password_request();
    data.then(function(result) {
      setTimeout(function() {
        document.getElementById("password").innerHTML = result.password;

        if(result.strength == "low"){
          document.getElementById("strength").innerHTML = "Weak";
          document.getElementById("strength").style.color = "#f50000";
        }

        else if(result.strength == "medium"){
          document.getElementById("strength").innerHTML = "Medium";
          document.getElementById("strength").style.color = "#ffa500";

        }

        else if(result.strength == "high"){
          document.getElementById("strength").innerHTML = "Strong";
          document.getElementById("strength").style.color = "#008000";
        }
        else{
          document.getElementById("strength").innerHTML = "Something Went Wrong";
          document.getElementById("strength").style.color = "#000000";
        }
      }, 270);

    });

    document.getElementById("generate").style.pointerEvents = "none";
    anime({
      targets: "#loader1",
      width: "30vw",
      duration: 900,
      easing: "easeInOutQuad"
    });

    setTimeout(function() {
      anime({
        targets: "#loader1",
        opacity: 0,
        duration: 400,
        easing: "linear"
      });
    }, 950);

    setTimeout(function() {
      document.getElementById("loader1").style.width = "0vw";
      document.getElementById("loader1").style.opacity = "1";
      document.getElementById("generate").style.pointerEvents = "auto";
    }, 1400);
    setTimeout(function() {
    $("#password").animate({opacity:1}, 310);
    $("#strength").animate({opacity:1}, 310);
    }, 700);
  }

  startup++;

})


function copyPassword(event) {
  var row = event.target.closest('tr');
  var passwordCell = row.querySelector('td:nth-child(2)');
  var copyButton = event.target;

  var tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.value = passwordCell.textContent;
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  copyButton.textContent = "Copied!";
  setTimeout(function () {
    copyButton.textContent = "Copy";
  }, 1500);
}

function addRow(platform, password) {
  var tablebody = document.getElementById("tablebody");
  var newRow = document.createElement("tr");

  var platformCell = document.createElement("td");
  platformCell.textContent = platform;

  var passwordCell = document.createElement("td");
  passwordCell.textContent = password;

  var copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  copyButton.addEventListener("click", copyPassword);

  var copyButtonCell = document.createElement("td");
  copyButtonCell.appendChild(copyButton);

  newRow.appendChild(platformCell);
  newRow.appendChild(passwordCell);
  newRow.appendChild(copyButtonCell);

  tablebody.appendChild(newRow);
}

$("#pfile").click(function() {
  appendflag = 1;
  genflag = 0;
  document.getElementById("file2").style.backgroundColor = "#aeaeae";
  document.getElementById("pfile").style.backgroundColor = "#ffffff";
});

$("#file2").click(function() {
  appendflag = 0;
  genflag = 1;
  document.getElementById("pfile").style.backgroundColor = "#aeaeae";
  document.getElementById("file2").style.backgroundColor = "#ffffff";
});


$("#savebtn").click(() => {
  if (genflag == 1){
    var passfetch = document.getElementById("pass2").value;
    var platfetch = document.getElementById("plat2").value;

    var pin = document.getElementById("pin2").value;

    const plat = encryptText(platfetch, pin);
    const pass = encryptText(passfetch, pin);
    
    var content = plat+"\n"+pass;
    const blob = new Blob([content], { type: 'text/plain' });

    
    const url = URL.createObjectURL(blob);


    const a = document.createElement('a');
    a.href = url;
    a.download = 'new.cipher';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
  
  }

  else if(appendflag == 1){
    const fileInput = document.getElementById('file1');

    var pin = document.getElementById("pin2").value;

    const selectedFile = fileInput.files[0];
    var passfetch = document.getElementById("pass2").value;
    var platfetch = document.getElementById("plat2").value;

    const plat = encryptText(platfetch, pin);
    const pass = encryptText(passfetch, pin);
    
    var dataToAppend = plat+"\n"+pass;

    appendToFile(selectedFile, dataToAppend);

  }

  else{
    alert("Please select an option");
  }

});

function appendToFile(file, data) {
  const reader = new FileReader();
  reader.onload = function(event) {
      const originalContent = event.target.result;

      const blob = new Blob([originalContent+"\n", data], { type: 'text/plain' });

      const writer = new FileWriter();

      writer.write(blob);
  };

  
  reader.readAsText(file);
}

function FileWriter() {
  this.write = function(blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = "new.cipher";
      a.style.display = 'none';

      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(a.href);
  };
}

function encryptText(text, secretKey) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
}

function decryptText(ciphertext, secretKey) {
  try{
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  catch(err){
    console.log("Wrong Key");
  }
}

$("#copy").click(function() {
  if(startup > 0){
    $("#copy").animate({opacity:0.3}, 200, "swing");
    var textarea = document.createElement("textarea");

    textarea.value = document.getElementById("password").innerHTML;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);
    setTimeout(function() {
      $("#copy").animate({opacity:1}, 200, "swing");
    }, 200);
  }

});

$("#decipher").click(function () {

  document.getElementById("tablebody").innerHTML = "";

  const fileInput = document.getElementById('inputfile');
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;
      processData(fileContent);
    };

    reader.readAsText(selectedFile);
  } else {
    alert('Please select a file.');
  }
});

function processData(fileContent) {
  const lines = fileContent.split('\n');

  for (let i = 0; i < lines.length; i += 2) {
    const platform = lines[i].trim();
    const password = lines[i + 1].trim();
    
    if (platform && password) {
      
      var pswd = decryptText(platform, document.getElementById("pininp").value);
      var plat = decryptText(password, document.getElementById("pininp").value);
      if(pswd == "" || plat == "") {
        addRow("Invalid Key", "Invalid Key");
      }
      else{
        addRow(pswd, plat);
      }
    }
  }
}


$("#backbtn").click(()=>{
  $("#savesec").animate({opacity:0}, 500)

  setTimeout(function(){
    document.getElementById("savesec").style.visibility = "hidden";
  }, 500);
});

$("#backtocipher").click(()=>{
  $("#vaultsec").animate({opacity:0}, 500)

  setTimeout(function(){
    document.getElementById("vaultsec").style.visibility = "hidden";
  }, 500);
});


$("#save").click(()=>{
  document.getElementById("savesec").style.visibility = "visible";
  $("#savesec").animate({opacity:1}, 500)
  if(startup == 0){
    //Nothing
  }
  else{
    document.getElementById("pass2").value = document.getElementById("password").innerHTML;
  }
});

$("#vault").click(()=>{
  document.getElementById("vaultsec").style.visibility = "visible";
  $("#vaultsec").animate({opacity:1}, 500)
});


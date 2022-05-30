function ValidateFile(file) {
  var FileSize = file.files[0].size / 1024 / 1024; // in MB
  if (FileSize > 4) {
    document.getElementById("filedata").innerHTML =
      "Max file size exceeds 4 MB.";
    document.getElementById("fileinput").value = "";
  } else {
    document.getElementById("filedata").innerHTML = "";
  }
}

function clearinput() {
  window.location.reload();
}

function sampleinput() {
  document.getElementById("input1").value = "ConvertCodes";
  document.getElementById("input2").value = EncodeText("ConvertCodes");
}

function convert1() {
  var inputdata = document.getElementById("input1").value;
  document.getElementById("input2").value = EncodeText(inputdata);
}

function convert2() {
  var inputdata = document.getElementById("input2").value;
  document.getElementById("input1").value = DecodeText(inputdata);
}

function EncodeText(x) {
  var result = "",
    notation = "";

  chkspace = document.getElementById("chkspace").checked;
  chknotation = document.getElementById("chknotation").checked;
  if (!chknotation) {
    notation = "\\u";
  }

  if (chkspace) {
    for (var i = 0; i < x.length; i++) {
      if (x[i] == " ") result += " ";
      else
        result +=
          notation + ("000" + x[i].charCodeAt(0).toString(16)).substr(-4);
    }
  } else {
    for (var i = 0; i < x.length; i++)
      result += notation + ("000" + x[i].charCodeAt(0).toString(16)).substr(-4);
  }

  return result;
}

function DecodeText(x) {
  var result = "";
  chknotation = document.getElementById("chknotation").checked;
  try {
    if (!chknotation) {
      result = x.replace(/\\u[0-9a-fA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
      });
    } else {
      result = x.replace(/[0-9a-fA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match, 16));
      });
    }
  } catch (err) {
    return err.message;
  } finally {
    return result;
  }
}

function encode() {
  var file = document.getElementById("fileinput").files[0];
  chkdecode = document.getElementById("selectdecode").value;
  try {
    if (file) {
      var reader = new FileReader();
      var output = "ConvertCodes-encode-utf16.txt";
      reader.readAsText(file, chkdecode);
      reader.onload = function (evt) {
        var blob = new Blob([EncodeText(evt.target.result)], {
          type: "text/plain",
        });
        saveAs(blob, output);
      };
      reader.onerror = function (evt) {
        document.getElementById("filedata").innerHTML = "Error reading file";
      };
    }
  } catch (err) {
    document.getElementById("filedata").innerHTML = err.message;
  }
}

function decode() {
  var file = document.getElementById("fileinput").files[0];
  try {
    if (file) {
      var reader = new FileReader();
      var output = "ConvertCodes-decode-utf16.txt";
      reader.readAsText(file);
      reader.onload = function (evt) {
        var blob = new Blob([DecodeText(evt.target.result)], {
          type: "text/plain",
        });
        saveAs(blob, output);
      };
      reader.onerror = function (evt) {
        document.getElementById("filedata").innerHTML = "Error reading file";
      };
    }
  } catch (err) {
    document.getElementById("filedata").innerHTML = err.message;
  }
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:5000/boots", false);
xhr.send();
var result = xhr.responseText;

var json = JSON.parse(result);

$(document).ready(function () {
    var tr;
    for (var a in json) {
        tr = $('<tr/>');
        tr.append("<td>" + a + "</td>");
        tr.append("<td>" + json[a] + "</td>");
        $('table').append(tr);
    }
});


//var text = document.createTextNode(result);
//var child = document.getElementById('table');
//child.parentNode.insertBefore(text, child);

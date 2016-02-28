displayBalance();

function displayBalance() {
    // Vendor is the seller like amazon / boots
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/nessie", false);
    xhr.send();
    var result = xhr.responseText;

    var json = JSON.parse(result);



    $(document).ready(function () {
        var tr;
        for (i = 0; i < 1; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + json['nickname'] + "</td>");
            tr.append("<td>" + "£" + json['balance'] + "</td>");
            $('table').append(tr);
        }
    });
}
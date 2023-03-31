$("#add_user").submit(function (event) {
    alert("added the user sucessfully");
});

$("#update_user").submit(function (event) {
    event.preventDefault();
    var data = {};
    var unindexed_array = $(this).serializeArray();
    $.map(unindexed_array, function (n, i) {
        data[n["name"]] = n.value
    })
    console.log(data);
    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": 'PUT',
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data updated successfully")
    })
});
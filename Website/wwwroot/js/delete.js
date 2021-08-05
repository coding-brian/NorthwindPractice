(function () {

    $('#deletesubmit').on('click', function () {
        var employeeid = $('#employeeid').val();
        var result = deleteEmployee(employeeid);
    })

    function deleteEmployee(employeeid) {
        var url = 'https://localhost:44316/employee/' + employeeid;
        var result = $.ajax({
            type: 'DELETE',
            url: url,
            async: false,
            dataType: 'json',
            success: function (res) {
                return res;
            },
            erro: function (err) {
                console.log('err', err)
            }
        });
        return result.responseJSON;
    }
})();
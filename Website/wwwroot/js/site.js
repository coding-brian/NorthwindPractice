// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
(function () {
    

    $('#submit').on('click', function () {
        submit();
    });

    $('#employee').on('keyup', function (e) {
        if (e.keyCode===13) {
            submit();
        }
    });

    function submit() {
        var employeeid = $('#employee').val();
        var employeedata = getEmployee(employeeid);
        if (employeedata) {
            getEmployeeTableHTML();
            $('#employeename').val(employeedata.firstName + employeedata.lastName);
            $('#imagesrc').attr('src', employeedata.photo);
            $('#country').val(employeedata.country);
            $('#birthday').val(timeChange(employeedata.birthDate));
            $('#title').val((employeedata.title));
            $('#address').val((employeedata.address));
            $('#note').text((employeedata.notes));
        }
        else {
            $('#employeetable').html('');
            $('#employeetable').text('沒有此員工');
        }
    }

    function getEmployeeTableHTML() {
        var url = 'https://localhost:44364/Employee/EmployeeTable?isedit=' + 'false';
        return $.ajax({
            type: 'GET',
            url: url,
            async: false,
            success: function (res) {
                $('#employeetable').html('');
                $('#employeetable').append(res);
                return res;
            },
            erro: function (err) {
                console.log('err', err)
            }
        });

    }

    function  getEmployee(employeeid)
    {
        var url = 'https://localhost:44316/employee/' + employeeid;
        var result = $.ajax({
            type: 'GET',
            url: url,
            async: false,
            dataType:'json',
            success: function (res) {
                return res;
            },
            erro: function (err) {
                console.log('err', err)
            }
        });
        return result.responseJSON;
    }

    function timeChange(time) {
        var datetime = new Date(time);
        var date = datetime.toLocaleDateString();
        var time = datetime.toTimeString().split(" ")[0];

        var result = date + " " + time;

        return result;
    }
})();
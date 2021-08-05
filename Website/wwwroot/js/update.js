(function () {

    var selectemployeeid = 0;

    $('#updatesearchsubmit').on('click', function () {
        var employeeid = $('#updateemployeeid').val();
        var employeedata = getEmployee(employeeid);
        if (employeedata) {
            getEmployeeTableHTML();
            selectemployeeid = employeedata.employeeId;
            $('#employeFirstName').val(employeedata.firstName);
            $('#employeLastName').val(employeedata.lastName);
            $('#imagesrc').attr('src', 'data: image/jpeg;base64,' + employeedata.photo);
            $('#country').val(employeedata.country);
            $('#birthday').val(timeChange(employeedata.birthDate));
            $('#title').val((employeedata.title));
            $('#address').val((employeedata.address));
            $('#note').text((employeedata.notes));
            $('#updatesubmit').show();
        }
        else {
            $('#updateempployeetable').html('');
            $('#updateempployeetable').text('沒有此員工');
            $('#updatesubmit').hide();
        }

    })


    $('#updatesubmit').on('click', function () {
        submit();

    })

    function submit() {
        var firestname = $('#employeFirstName').val()
        var lastname = $('#employeLastName').val()
        var country = $('#country').val()
        var birthday = $('#birthday').val()
        var title = $('#title').val()
        var address = $('#address').val()

        var check = new Check(firestname, lastname, title, birthday, address, country);
        var checkresult = check.checkALL();
        if (checkresult) {
            $('#warning').hide();
            updateEmployee();
        }
        else {
            $('#warning').show();
            var warning = '';
            Object.keys(check.warning).forEach((keys) => {
                if (check.warning[keys]) {
                    warning += check.warning[keys]
                    $('#warning').html(warning);
                }
            })
        }
    }

    function updateEmployee()
    {
        var url = 'https://localhost:44316/employee/' + selectemployeeid;

        var body = {
            FirstName: $('#employeFirstName').val(),
            LastName: $('#employeLastName').val(),
            Title: $('#title').val(),
            BirthDate: ChangeTimeToDateTime($('#birthday').val()),
            Address: $('#address').val(),
        };
        
        var result = $.ajax({
            type: 'PUT',
            url: url,
            data: JSON.stringify(body),
            async: false,
            contentType:'application/json',
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

    function getEmployeeTableHTML() {
        var url = 'https://localhost:44364/Employee/EmployeeTable?isedit=' + 'true';
        return $.ajax({
            type: 'GET',
            url: url,
            async: false,
            success: function (res) {
                $('#updateempployeetable').html('');
                $('#updateempployeetable').append(res);
                return res;
            },
            erro: function (err) {
                console.log('err', err)
            }
        });

    }

    function getEmployee(employeeid) {
        var url = 'https://localhost:44316/employee/' + employeeid;
        var result = $.ajax({
            type: 'GET',
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

    function timeChange(time) {
        var datetime = new Date(time);
        var date = datetime.toLocaleDateString();
        var time = datetime.toTimeString().split(" ")[0];

        var result = date + " " + time;

        return result;
    }

    function ChangeTimeToDateTime(time) {

        var temp = new Date(time);
        var year = temp.getFullYear().toString();
        var mounth = (temp.getMonth()+1).toString();
        var day = temp.getDate().toString();
        
        return year + '-' + (mounth.length < 2 ? '0' + mounth : mounth) + '-' + day + 'T' + temp.toTimeString().substring(0,8);
    }

    class Check {
        constructor(firstname, lastname, title, birthDate, address, country) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.title = title;
            this.birthDate = birthDate;
            this.address = address;
            this.country = country;
            this.warning = {
                name: '',
                title: '',
                birthDate: '',
                address: '',
                country: '',
            }
        }

        checkALL() {

            var checknameresult = this.checkName();
            var checkbirthdayresult = this.checkbitrhday();
            var checktitleresult = this.checktitle();
            var checkAddressresult = this.checkAddress();
            var checkCountryresult = this.checkCountry();

            if (checknameresult &&
                checkbirthdayresult &&
                checktitleresult &&
                checkAddressresult &&
                checkCountryresult) {
                return true;
            }

            return false;
        }

        checkName() {
            if (!this.firstname || this.firstname === undefined || this.firstname.length < 1 ||
                !this.lastname || this.lastname === undefined || this.lastname.length < 1) {
                this.warning.name = '<br>請輸入完整的姓名';
                return false;
            }
            this.warning.name = '';
            return true;
        }

        checkbitrhday() {
            if (!this.birthDate || this.birthDate === undefined || this.birthDate.length < 1) {
                this.warning.birthDate = '<br>請輸入生日';
                return false;
            }
            this.warning.birthDate = '';
            return true;
        }

        checktitle() {
            if (!this.title || this.title === undefined || this.title.length < 1) {
                this.warning.title = '<br>請輸入姓名';
                return false;
            }
            this.warning.title = '';
            return true;
        }

        checkAddress() {
            if (!this.address || !this.address === undefined || this.address.length < 1) {
                this.warning.address = '<br>請輸入地址';
                return false;
            }
            this.warning.address = '';
            return true;
        }

        checkCountry() {
            if (!this.country || !this.country === undefined || this.country.length < 1) {
                this.warning.country = '<br>請輸入國家';
                return false;
            }
            this.warning.country = '';
            return true;
        }
    }
})();
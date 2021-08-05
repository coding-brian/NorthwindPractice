(function () {
    getEmployeeTableHTML();

    $('#doUpLoad').on('click', function (e) {
        e.preventDefault();
        var uploadfile = document.getElementById('uploadfile');
        if (uploadfile) {
            uploadfile.click();
        }
    });

    $('#uploadfile').on('change', function (e) {
        if (e.target.files.length >=1)
        {
            handleFiles(e.target.files);
        }
    });

    $('#insertsubmit').on('click', function () {
        submit();
    });

    function submit() {
        
        var firestname = $('#employeFirstName').val()
        var lastname = $('#employeLastName').val()
        var country = $('#country').val()
        var birthday = $('#birthday').val()
        var title = $('#title').val()
        var address = $('#address').val()
        var img = $('#imagesrc').attr('src');

        var check = new Check(firestname, lastname, title, birthday, address, country, img);
        var checkresult = check.checkALL();
        if (checkresult) {
            $('#warning').hide();
            insertEmployee();
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

    function insertEmployee() {
        var url = 'https://localhost:44316/employee';

        var body = {
            FirstName: $('#employeFirstName').val().toString(),
            LastName: $('#employeLastName').val().toString(),
            Title: $('#title').val().toString(),
            BirthDate: ChangeTimeToDateTime($('#birthday').val()),
            Address: $('#address').val().toString(),
            Notes: $('#note').val().toString(),
            Photo: $('#imagesrc')[0].src.split(',')[1]
        };
        
        var result = $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(body),
            async: false,
            contentType: 'application/json',
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
                $('#insertempployeetable').html('');
                $('#insertempployeetable').append(res);
                return res;
            },
            erro: function (err) {
                console.log('err', err)
            }
        });

    }

    function handleFiles(files) {
        
        var img = document.getElementById('imagesrc');

        const reader = new FileReader()
        // 轉換成 DataURL
        reader.readAsDataURL(files[0])

        reader.onload = function () {
            // 將圖片 src 替換為 DataURL
            img.src = reader.result
        }

    }

    function ChangeTimeToDateTime(time) {

        var temp = new Date(time);
        var year = temp.getFullYear().toString();
        var mounth = (temp.getMonth() + 1).toString();
        var day = temp.getDate().toString();

        return year + '-' + (mounth.length < 2 ? '0' + mounth : mounth) + '-' + (day.length < 2 ?'0' + day : day) + 'T' + temp.toTimeString().substring(0, 8) + '.000' + 'Z';
    }

    class Check {
        constructor(firstname, lastname, title, birthDate, address, country,img) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.title = title;
            this.birthDate = birthDate;
            this.address = address;
            this.country = country;
            this.img = img;
            this.warning = {
                name: '',
                title: '',
                birthDate: '',
                address: '',
                country: '',
                img:''
            }
        }

        checkALL() {

            var checknameresult = this.checkName();
            var checkbirthdayresult = this.checkbitrhday();
            var checktitleresult = this.checktitle();
            var checkAddressresult = this.checkAddress();
            var checkCountryresult = this.checkCountry();
            var checkimg = this.checkImg();

            if (checknameresult &&
                checkbirthdayresult &&
                checktitleresult &&
                checkAddressresult &&
                checkCountryresult &&
                checkimg) {
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

        checkImg() {
            if (!this.img || this.img === undefined) {
                this.warning.img ='<br>請上傳照片'
                return false;
            }
            this.warning.img = '';
            return true;
        }
    }
})()
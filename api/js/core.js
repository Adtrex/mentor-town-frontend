function signup() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var terms = document.getElementById('terms');

    if (terms.checked) {
        terms = 1;
    } else {
        alert('Accept terms');
        return false;
    }

    if(name == '' || email == '' || password == '') {
        alert('Kindly fill all required fields');
        return false;
    }

    var all_data = {
        name: name,
        email: email,
        password: password,
        terms: terms
    }

    $.ajax({
        url: 'http://127.0.0.1:8000/api/signup',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(all_data),
        contentType: 'application/json',
        beforeSend: function(){
            document.getElementById('sign-btn').style.display = 'none';
            document.getElementById('sign-btn-load').style.display = 'block';
        },
        success: function(result){
            document.getElementById('sign-btn').style.display = 'block';
            document.getElementById('sign-btn-load').style.display = 'none';
            //var data_x = JSON.parse(result);
            console.log(result);
        }
    });
}
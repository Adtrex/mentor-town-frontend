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
        url: 'https://mentor-town-api.herokuapp.com/api/signup',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(all_data),
        contentType: 'application/json',
        beforeSend: function(){
            document.getElementById('sign-btn').style.display = 'none';
            document.getElementById('sign-btn-load').style.display = 'block';
        },
        error: function(result){
            error = result.responseJSON;
            document.getElementById('sign-btn').style.display = 'block';
            document.getElementById('sign-btn-load').style.display = 'none';
            document.getElementById('show-error').style.display = 'block';
            document.getElementById('error').innerHTML = Object.values(error)[0];
        },
        success: function(result){
            document.getElementById('sign-btn').style.display = 'block';
            document.getElementById('sign-btn-load').style.display = 'none';

            access_token = result.token;
            document.cookie = "access_token=" + access_token;

            window.location.href = "join.html";
        }
    });
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function getAccess() {
    let access_token = getCookie("access_token");

    if(access_token == "") {
        window.location.href = "sign-in.html";
    } else {

    }
}

function signin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if( email == '' || password == '') {
        alert('Kindly fill all required fields');
        return false;
    }

    var all_data = {
        email: email,
        password: password
    };

    $.ajax({
        url: 'https://mentor-town-api.herokuapp.com/api/signin',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(all_data),
        contentType: 'application/json',
        beforeSend: function(){
            document.getElementById('sign-btn').style.display = 'none';
            document.getElementById('sign-btn-load').style.display = 'block';
        },
        error: function(result){
            console.log(result);
            error = result.responseJSON;
            document.getElementById('sign-btn').style.display = 'block';
            document.getElementById('sign-btn-load').style.display = 'none';
            document.getElementById('show-error').style.display = 'block';
            document.getElementById('error').innerHTML = Object.values(error)[0];
        },
        success: function(result){
            document.getElementById('sign-btn').style.display = 'block';
            document.getElementById('sign-btn-load').style.display = 'none';

            access_token = result.token;
            document.cookie = "access_token=" + access_token;

            user_status = result.user.status;
            if (user_status == 0){
                window.location.href = "join.html";
            }

            if (user_status == 1){
                window.location.href = "mentor-dashboard.html";
            }

            if (user_status == 2){
                window.location.href = "mentee-dashboard.html";
            }
            
        }
    });
}

function matchMentee() {
    var industry = document.getElementById('industry').value;
    var profession = document.getElementById('profession').value;
    var experience = document.getElementById('experience').value;
    var available = document.getElementById('available').value;
    var time_available = document.getElementById('time_available').value;

    if( industry == '' || profession == '' || experience == '' || available == ''|| time_available == '') {
        alert('Kindly select all required fields');
        return false;
    }


    var all_data = {
        industry: industry,
        profession: profession,
        experience: experience,
        available: available,
        time_available: time_available
    };

    let access_token = getCookie("access_token");

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + access_token
          },
        url: 'https://mentor-town-api.herokuapp.com/api/mentee/match',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(all_data),
        contentType: 'application/json',
        beforeSend: function(){
            document.getElementById('sign-btn').style.display = 'none';
            document.getElementById('sign-btn-load').style.display = 'block';
        },
        error: function(result){
            if(result.status == 311) {
                console.log(result);
                error = result.responseText;
                document.getElementById('sign-btn').style.display = 'block';
                document.getElementById('sign-btn-load').style.display = 'none';
                document.getElementById('show-error').style.display = 'block';
                document.getElementById('error').innerHTML = error;
            } else {
                document.getElementById('success').style.display = 'block';
                document.getElementById('join-form').style.display = 'none';
            } 
        },
        success: function(result){
            document.getElementById('success').style.display = 'block';
            document.getElementById('join-form').style.display = 'none';
        }
    });
}

function matchMentor() {
    var industry = document.getElementById('industry').value;
    var profession = document.getElementById('profession').value;
    var interest = document.getElementById('interest').value;
    var available = document.getElementById('available').value;
    var time_available = document.getElementById('time_available').value;

    if( industry == '' || profession == '' || interest == '' || available == ''|| time_available == '') {
        alert('Kindly select all required fields');
        return false;
    }


    var all_data = {
        industry: industry,
        profession: profession,
        interest: interest,
        available: available,
        time_available: time_available
    };

    let access_token = getCookie("access_token");

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + access_token
          },
        url: 'https://mentor-town-api.herokuapp.com/api/mentor/match',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(all_data),
        contentType: 'application/json',
        beforeSend: function(){
            document.getElementById('sign-btn').style.display = 'none';
            document.getElementById('sign-btn-load').style.display = 'block';
        },
        error: function(result){
            if(result.status != 201) {
                error = result.responseJSON;
                document.getElementById('sign-btn').style.display = 'block';
                document.getElementById('sign-btn-load').style.display = 'none';
                document.getElementById('show-error').style.display = 'block';
                document.getElementById('error').innerHTML = Object.values(error)[0];
            } else {
                document.getElementById('success').style.display = 'block';
                document.getElementById('join-form').style.display = 'none';
            } 
        },
        success: function(result){
            document.getElementById('success').style.display = 'block';
            document.getElementById('join-form').style.display = 'none';
        }
    });
}

function loggedIn() {
    let access_token = getCookie("access_token");

    if(access_token != "") {
        window.location.href = "join.html";
    } else {
        
    }
}

/*function logout() {
    let access_token = getCookie("access_token");

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + access_token
          },
        url: 'https://mentor-town-api.herokuapp.com/api/logout',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(){
            document.getElementById('logout-loader').style.display = 'block';
            document.getElementById('logout-text').style.display = 'none';
        },
        error: function(result){
            if(result.status != 201) {
                error = result.responseJSON;
                //document.getElementById('error').innerHTML = Object.values(error)[0];
                
            }
        },
        success: function(result){
            document.cookie = `access_token= ${access_token}; expires=Sun, 20 Aug 2000 12:00:00 UTC`;

            window.location.href = "sign-in.html";
        }
    });
}*/

function logout() {
    let access_token = getCookie("access_token");

    document.cookie = `access_token= ${access_token}; expires=Sun, 20 Aug 2000 12:00:00 UTC`;

    window.location.href = "sign-in.html";
}

function getStatus() {
    let access_token = getCookie("access_token");

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + access_token
          },
        url: 'https://mentor-town-api.herokuapp.com/api/status',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(){
            
        },
        error: function(result){
            if(result.status != 201) {
                error = result.responseJSON;
                //document.getElementById('error').innerHTML = Object.values(error)[0];
            }
        },
        success: function(result){
            console.log(result);

            if(result == 0) {

            }

            if(result == 1) {
                window.location.href = "mentor-dashboard.html";
            }

            if(result == 2) {
                window.location.href = "mentee-dashboard.html";
            }

            //window.location.href = "sign-in.html";
        }
    });
}

function matchedMentor() {
    let access_token = getCookie("access_token");

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + access_token
          },
        url: 'https://mentor-town-api.herokuapp.com/api/matched-mentor',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(){
            
        },
        error: function(result){
            if(result.status != 201) {
                error = result.responseJSON;
                console.log(result);
                //document.getElementById('error').innerHTML = Object.values(error)[0];
            } 
        },
        success: function(result){
            console.log(result);
            mentor_name = result.name;
            mentor_interest = result.interest;
            mentor_available = result.available;
            mentor_profession = result.profession;

            document.getElementById('mentor_name').innerHTML = mentor_name;
            document.getElementById('mentor_interest').innerHTML = mentor_interest;
            document.getElementById('mentor_available').innerHTML = mentor_available;
            document.getElementById('mentor_profession').innerHTML = mentor_profession;

            document.getElementById('mentor_loader').style.display = 'none';
            document.getElementById('mentor_info').style.display = 'block';



            //window.location.href = "sign-in.html";
        }
    });
}

function matchedMentees() {
    let access_token = getCookie("access_token");

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + access_token
          },
        url: 'https://mentor-town-api.herokuapp.com/api/matched-mentee',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(){
            
        },
        error: function(result){
            if(result.status != 201) {
                error = result.responseJSON;
                console.log(result);
                //document.getElementById('error').innerHTML = Object.values(error)[0];
            } 
        },
        success: function(result){

            var mentee_list = document.getElementById('all-mentees');

            if(result.length == 0){
                mentee_list.innerHTML += "<div class='card' style='color: #fff; font-size:18px; margin-bottom:0; text-align:center;'><p style='margin-bottom:0;'>You will be matched with a mentee soon</p></div>";
            } else {
                console.log(result);
            
                for(var i=0; i < result.length; i++) {
                var mentee  =  `<div class="col-lg-4" style="margin-top: 10px">
                                    <div class="card">
                                        <img 
                                            src="assets/img/person/Ellipse 12.png" 
                                            alt="image" 
                                            style="width: 80px; height: 80px; border-radius: 50px;"
                                        />

                                        <p style="color: #EEE5E0; font-weight: 500; font-size: 16px; margin-bottom: 10px;">
                                            ${result[i].name}
                                        </p>

                                        <div class="all-info">
                                            <div class="single-info">
                                                <div><img src="assets/img/vector/ranking.png"></div>
                                                <div><p>${result[i].profession}</p></div>
                                            </div>
                                            <div class="single-info">
                                                <div><img src="assets/img/vector/advise.png"></div>
                                                <div><p>Industry <br />${result[i].industry}</p></div>
                                            </div>
                                            <div class="single-info">
                                                <div><img src="assets/img/vector/level.png"></div>
                                                <div><p>level of experience <br />${result[i].experience}</p></div>
                                            </div>
                                            <div class="single-info">
                                                <div><img src="assets/img/vector/time.png"></div>
                                                <div><p>Availability <br />${result[i].available}</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  `;
                                mentee_list.innerHTML += mentee;
                }

                
            }

            document.getElementById('mentee_loader').style.display = 'none';

        }
    });
}
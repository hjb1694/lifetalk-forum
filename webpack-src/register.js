import './navtoggle';
import moment from 'moment'; 
import validator from 'validator';
import striptags from 'striptags';
import {AllHtmlEntities as htmlEntities} from 'html-entities';

const subbut = document.querySelector('#subbut');

const yearInput = document.querySelector('#year');
const curYear = new Date().getFullYear();

for(let i = 0; i < 100; i++){
    const yr = curYear - i;

    yearInput.insertAdjacentHTML('beforeend', `<option value="${yr}">${yr}</option>`);
}


function handleFormSubmission(e){
    e.preventDefault();

    subbut.disabled = true;
    subbut.innerHTML = '<img src="./assets/blocks-spinner.gif" style="width:2rem;" alt="Loading..."> Register';


    const errbox = document.querySelector('.errbox-static');

    errbox.innerHTML = null;

    const month = document.querySelector('#month').value;
    const day = document.querySelector('#day').value;
    const year = document.querySelector('#year').value;
    const dateformat = 'YYYY/MM/DD';
    const momentBDay = moment(`${year}/${month}/${day}`, dateformat, true);
    const today = new Date();
    const momentToday = moment(`${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`, dateformat, true);
    const diff = momentToday.diff(momentBDay, 'years');

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmpassword').value;
    const username = striptags(htmlEntities.decode(document.querySelector('#username').value)).trim();
    const genderSelections = document.getElementsByName('gender');

    const specialChars = /[!@#$%&*-+_]/;
    const nums = /[0-9]/;
    const lcLetters = /[a-z]/;
    const ucLetters = /[A-Z]/;


    let errors = 0;
    const errmsgs = [];

    function addError(msg){

        errors++;
        errmsgs.push(msg);

    }

    function getGender(){

        for(let i = 0; i < genderSelections.length; i++){

            if(genderSelections[i].checked){

                return genderSelections[i].value;
            }

        }

        return false;


    }

    if(!validator.isEmail(email)){
        addError('Please enter a valid email address.');
    }

    if(!momentBDay.isValid()){
        addError('Please enter a valid birth date.');
    };

    if(diff < 16){
        addError('You must be at least 16 years of age to join LifeTalk.');

    }



    if(
        password.length < 8 || 
        !specialChars.test(password) ||
        !nums.test(password) ||
        !lcLetters.test(password) ||
        !ucLetters.test(password)
        ) 
        {

            addError('Passwords must be at least 8 characters long and contain at least on uppercase letter, one lowercase letter, on number, and at least on of the following special characters: !@#$%&*-+_');

    }

    if(confirmPassword !== password){

        addError('Confirm password does not match password.');

    }

    if(username.length < 5 ||  /\s/.test(username)){

        addError('Username must be at least 5 characters long and contain no spaces.');

    }

    const gender = getGender();

    if(!gender){

        addError('Please select a gender.');

    } 

    if(errors){

        subbut.disabled = false;
        subbut.innerHTML = 'Register';
        
        for(let msg of errmsgs){

            errbox.insertAdjacentHTML('beforeend', `<p><i class="fa fa-exclamation-triangle"></i> ${msg}</p>`);

        }

    } else {

        function responseHandler(){

            if(this.status === 200){

                console.log(this.response);

                const resp = JSON.parse(this.response);

                if(resp.success){

                    window.location.href = 'verify-registration.php';

                }else if(resp.errors){

                    for(let error of resp.errors){

                        errbox.insertAdjacentHTML('beforeend', `<p><i class="fa fa-exclamation-triangle"></i> ${error} </p>`);

                        subbut.disabled = false;
                        subbut.innerHTML = 'Register';


                    }

                }

            }else{

                xhrErrorHandler();

            }

        }

        function xhrErrorHandler(){

            errbox.innerHTML = '<p><i class="fa f-exclamation-triangle"></i> There was an error processing your request!</p>';

        }

        const fd = new FormData();
        fd.append('username', username);
        fd.append('password', password);
        fd.append('gender', gender);
        fd.append('email', email);
        fd.append('dobYear', year);
        fd.append('dobMonth', month);
        fd.append('dobDay', day);

        
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load',responseHandler);
        xhr.addEventListener('error', xhrErrorHandler);
        xhr.open('POST','./proc/processRegistration.php',true);
        xhr.send(fd);


    } 
    

}



subbut.addEventListener('click',handleFormSubmission);


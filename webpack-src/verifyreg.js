import './navtoggle';
import { createHash } from 'crypto';


const subbut = document.querySelector('#subbut');
const resendBtn = document.querySelector('#resendBtn');

function toggleDisabledBtns(){

    subbut.disabled = !subbut.disabled;
    resendBtn.disabled = !resendBtn.disabled;

}


function handleVerification(e){

    e.preventDefault();

    const vericode = document.querySelector('#vericode').value.trim();

    toggleDisabledBtns();

    subbut.innerHTML = `<img src="./assets/blocks-spinner.gif" style="width:2rem;" alt="loading..."/> Submit`;

    if(vericode.length < 12 || vericode.length > 12){

        flashError(['Verification code must be 12 characters.']);

        setTimeout(() => {
            toggleDisabledBtns();
            subbut.innerHTML = 'Submit';

        },5000);

    } else {

        const fd = new FormData();
        fd.append('vericode', vericode);

        function responseHandler(){


            const result = JSON.parse(this.response);

            if(result.errors){

                flashError(result.errors);
                toggleDisabledBtns();

            } else if(result.success){

                window.location.replace('index.php');

            }

        }

        function errorHandler(){
            flashError('There was an issue processing your request.');
            toggleDisabledBtns();
            subbut.innerHTML = 'submit';
        }

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load',responseHandler);
        xhr.addEventListener('error',errorHandler);
        xhr.open('POST','./proc/processVerification.php',true);
        xhr.send(fd);




    }



    function flashError(msgs){

        const errbox = document.querySelector('.errbox');
    
        msgs.forEach(msg => {
    
            errbox.insertAdjacentHTML('beforeend', `
            <p><i class="fa fa-exclamation-triangle"></i> ${msg}</p>
            `);
    
        });
    
        errbox.classList.add('show');
    
        setTimeout(() => {
            errbox.classList.remove('show');
            errbox.innerHTML = null;
        }, 5000);
    
    
    }


}



subbut.addEventListener('click', handleVerification);
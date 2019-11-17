import './navtoggle';

const subbut = document.querySelector('#subbut');

function processLogin(e){

    e.preventDefault();

    subbut.disabled = true;
    subbut.innerHTML = '<img src="./assets/blocks-spinner.gif" style="width:2rem;" alt="Loading..."/> Login';

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;

    const fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);

    function responseHandler(){

        console.log(this.response);

        const resp = JSON.parse(this.response);

        if(resp.success){

            window.location.replace('index.php');


        } else if(resp.errors) {

            flashError(resp.errors);

            setTimeout(()=> {
                subbut.disabled = false;
                subbut.innerHTML = 'Login';
            },5000);

        }

    }

    function errorHandler(){

        console.log('Error!');

    }


    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load',responseHandler);
    xhr.addEventListener('error', errorHandler);
    xhr.open('POST', './proc/processLogin.php', true);
    xhr.send(fd);



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

subbut.addEventListener('click',processLogin);
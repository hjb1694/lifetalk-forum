import './navtoggle';
import striptags from 'striptags';
import {AllHtmlEntities as htmlEntities} from 'html-entities'; 


const imageInput = document.querySelector('.add-image-btn__input');

document.querySelector('.add-image-btn__select').addEventListener('click', () => {
    document.querySelector('.add-image-btn__input').click();
});

imageInput.addEventListener('change', () => {

    const file = imageInput.files[0];

    const existingImg = document.querySelector('.img-preview');

    if(existingImg){
        existingImg.remove();
    }

    const img = document.createElement('img');
    img.className = 'img-preview';
    document.querySelector('.image-preview-container').appendChild(img);

    const reader = new FileReader();
    reader.onload = e => {
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);


});

//Add poll option
let counter = 3;
const addPollOptBtn = document.querySelector('#addPollOption');

addPollOptBtn.addEventListener('click', () => {

    if(counter < 7){

        document.querySelector(`.poll-option--${counter}`).classList.add('show');
        if(counter === 6){
            addPollOptBtn.style.display = 'none';
        }
        ++counter;

    }

});

let includePoll = false;
const togglePollBtn = document.querySelector('#togglePollBtn');

function togglePoll(){

    includePoll = !includePoll;

    if(includePoll){
        togglePollBtn.innerText = 'Exclude Poll';
    }else {
        togglePollBtn.innerText = 'Include Poll';
    }

    document.querySelector('.poll-form').classList.toggle('show');

}


function processForm(e) {

    e.preventDefault();

    const editorContents = document.querySelector('#postContent').value;
    const headline = striptags(htmlEntities.decode(document.querySelector('#postHeadline').value)).trim();
    const postCategory = document.querySelector('#postCategory').value;
    const anon = document.querySelector('#anon').checked;
    const editorContentsToValidate = striptags(htmlEntities.decode(editorContents)).replace(/\n/,'').replace(/\s{2,}/,' ').trim();
    const image = document.querySelector('#postImage').files[0];

    let errors = 0;
    const errmsgs = [];

    function addError(msg){
        errors++;
        errmsgs.push(msg);
    }

    headline.length < 10 ? addError('Headline must be at least 10 characters') : null;
    editorContentsToValidate.length < 50 ? addError('Your content is too short!') : null;
    postCategory == '' ? addError('Please select a post category.') : null;

    if(image){
       if(image.size > 3500000){
            addError('The image size is too large');
       }
       if(image.type !== 'image/jpeg' && image.type !== 'image/png' && image.type !== 'image/gif'){
            addError('Only jpeg, png, and gif images are accepted!');
       }
    }

    let pollOpts = {};

    if(includePoll){

        pollOpts.option1 = striptags(document.querySelector('.poll-option--1 input').value).trim();
        pollOpts.option2 = striptags(document.querySelector('.poll-option--2 input').value).trim();

        const counter = 3;

        if(pollOpts.option1 == '' || pollOpts.option2 == ''){
            addError('Poll options A and B must be included');
        }

        for(let i = counter; i < 7; i++){

            let subject = striptags(document.querySelector(`.poll-option--${i} input`).value).trim();

            if(subject == ''){

                for(let j = counter + 1; j < 7; j++){

                    if(striptags(document.querySelector(`.poll-option--${j} input`).value).trim() != ''){

                        addError('If including poll, do not skip poll options.');

                        break;

                    }

                }

                break;


            } else {

                pollOpts[`option${i}`] = subject;

            }

        }

    }

    if(errors){
        flashError(errmsgs);
    } else {

        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('headline',headline);
        formData.append('category',postCategory);
        formData.append('content',editorContents);
        formData.append('isAnon',anon);
        formData.append('includePoll', includePoll);

        if(image){
            formData.append('image',image);
        }

        if(includePoll){
            formData.append('pollopts',pollOpts);
        }

        function reqHandler(){

            console.log(this.responseText);

        }

        xhr.addEventListener('load', reqHandler);
        xhr.open('POST','./proc/processNewPost.php');
        xhr.send(formData);


    }

}

togglePollBtn.addEventListener('click', togglePoll);
document.querySelector('#subbut').addEventListener('click', processForm);


//Flash Error Box
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
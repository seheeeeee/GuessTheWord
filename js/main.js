let playBtn = document.querySelector('.playBtn');
let resetBtn = document.querySelector('.resetBtn');
let submitBtn = document.querySelector('.submitBtn');
let infoBtn = document.querySelector('.infoBtn');
let answerBox = document.querySelector('.answer');
let inputBox = document.querySelector('.inputBox');
let board = document.querySelector('.board > ul');

let randomAnswer = '';
makeAnswer();


playBtn.addEventListener('click',()=>{
    if(answerBox.classList.contains('play')){
        answerBox.classList.remove('play');
    }else{
        answerBox.classList.add('play');
    }
})

submitBtn.addEventListener('click',(e)=>{
    let userAnswer = inputBox.value;
    let pattern = /[a-zA-Z]/; 
    e.preventDefault();
    if(userAnswer !== '' && pattern.test(userAnswer)){
        sessionStorage.setItem(userAnswer, userAnswer);
        let answer = sessionStorage.getItem(userAnswer);
        putAnswerSpan(answer);
        inputBox.value = '';
        answerBox.classList.remove('play');
    }else if(userAnswer === ''){
        alert('답을 작성해주세요.');
    }else if(pattern.test(userAnswer) == false){
        alert('영어로 작성해주세요');
    }
});

resetBtn.addEventListener('click',()=>{
    sessionStorage.clear();
    while(board.hasChildNodes()){
        board.removeChild(board.firstChild);
    };
    makeAnswer();
});

function putAnswerSpan(userAnswer){
    let arr = [];
    let answer = userAnswer.split('');
    arr.push(answer);

    let randomArr = randomAnswer.split('');
    console.log(randomArr);

    let li = document.createElement('li');
    for(let i = 0; i < arr[0].length; i++){
        let span = document.createElement('span');
        let t = document.createTextNode(arr[0][i]);
        span.appendChild(t);
        if(randomArr[i] == arr[0][i]){
            span.classList.add('codeA');
        }else if(randomArr.includes(arr[0][i])){
            span.classList.remove('codeA');
            span.classList.add('codeB');
        }
        li.appendChild(span);
    }
    let hasClassLength = li.getElementsByClassName('codeA')
    if(hasClassLength.length == 5){
        li.classList.add('codeC');
        board.appendChild(li);
        alert('축하합니다! 정답을 맞췄습니다! RESET 버튼을 눌러주세요');
    }
    board.appendChild(li);
}

function makeAnswer(){
    let result = '';
    let chart = ['sport','yello','hello','books','enslo'];
    result = Math.floor(Math.random() * chart.length);
    randomAnswer = chart[result];
    console.log(chart[result]);
}

infoBtn.addEventListener('click',()=>{
    let desc = document.querySelector('.desc');
    if(desc.style.display == 'block'){
        desc.style.display = 'none';
    }else{
        desc.style.display = 'block';
    }
});

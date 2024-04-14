const answer = generateNumber();
var ball =0;
var strike =0;
var out = 0;

function generateNumber(){
    var answer =[];
    while(answer.length<4){
        let randomNumber = parseInt(Math.floor(Math.random()*10))
        if(answer.indexOf(randomNumber) <0){
            answer.push(randomNumber);
        }
    }
    return answer;
}
function isValue(inputValue){
    for(const element of inputValue){
        if(inputValue.indexOf(element)!=inputValue.lastIndexOf(element)){
            return 1;
        }
    }
    return 0;
}
function checkValue(inputValue){
    for(let i=0;i<4;i++){
        if(inputValue[i]==answer[i]){
            strike+=1;
        }
        else if(inputValue.includes(answer[i])){
            ball+=1;
        }
        else{
            out+=1;
        }
    }
    if(strike==4){
        alert("정답입니다!");
    }
    else{
        alert(ball+" ball "+ strike + " strike " + out +" out ");
    }
    strike=0;
    ball=0;
    out=0;
}
document.querySelector("#btnInput").onclick = function (){
    var inputValue = document.querySelector("#numInput").value;
    if(inputValue ===""){
        alert("숫자를 입력하세요!")
    } 
    else if(inputValue.length!=4){
        alert("4자리 숫자만 입력하세요!");
    } 
    else if(isValue(inputValue)){
        alert("각 자리수가 중복되지 않은 수만 입력하세요.");
    } 
    else{
        checkValue(inputValue);
    }
}
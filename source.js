const answer = generateNumber();
var ball =0;
var strike =0;
var out = 0;
var j=1;

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
    else if(j>14&&strike!=4){
        alert("GAME OVER!");
    }
    else{
        var listDiv = document.getElementsByClassName("list")[0];
        var listP  = document.createElement("p");
        var resultValue = document.createTextNode("입력값: " + inputValue + " " + j + "회차 결과 : " +
         + ball + " ball " + strike + " strike " + out + " out ");
        listP.appendChild(resultValue);
        listDiv.appendChild(listP);
    }
    strike=0;
    ball=0;
    out=0;
    j++
}
document.querySelector("#btnInput").onclick = function (){
    var inputValue = document.querySelector("#numInput").value;
    if(inputValue ===""||parseInt(inputValue)<1){
        alert("입력값이 올바르지 않습니다!")
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
    document.querySelector("#numInput").value="";
}
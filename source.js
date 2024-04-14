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
        alert("입력한 숫자: " + inputValue);
    }
}
generateNumber();
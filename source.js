
const answer = generateNumber();
var ball =0;
var strike =0;
var out = 0;
var j=1;
var startTime;
var timerInterval;
var seconds;
window.onload=hideInput();

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
        alert("정답입니다! \nClear Time: "+seconds+"초");
        stopTimer();
        location.reload();
    }
    else if(j>14&&strike!=4){
        alert("GAME OVER!");
    }
    else{
        // var listDiv = document.getElementsByClassName("list")[0];
        // var listP  = document.createElement("p");
        // var resultValue = document.createTextNode(j + "회차  : " +"<b>"+inputValue+"</b> "
        //  + ball + " Ball " + strike + " Strike " + out + " Out ");
        // listP.appendChild(resultValue);
        // listDiv.appendChild(listP);
        var listDiv = document.getElementsByClassName("list")[0];
        var listP  = document.createElement("p");
        var boldElement = document.createElement("b");
        boldElement.textContent = inputValue;

        listP.innerHTML = j + "회  : ";
        listP.appendChild(boldElement);
        listP.innerHTML += " " + ball + "B " + strike + "S ";

        listDiv.appendChild(listP);

    }
    strike=0;
    ball=0;
    out=0;
    j++
}
function hideInput(){
    let inputNumberDiv = document.querySelector(".inputNumber");
    let listDiv = document.querySelector(".list");
    let postRankingDiv = document.querySelector(".postRanking");
    inputNumberDiv.style.visibility ='hidden'
    listDiv.style.visibility ='hidden'
    postRankingDiv.style.display ='none';
}
function gameStart(){
    let inputNumberDiv = document.querySelector(".inputNumber");
    let gamestartDiv = document.querySelector(".gamestart");
    let listDiv = document.querySelector(".list");
    let rulesDiv = document.querySelector(".rules");
    inputNumberDiv.style.visibility ='visible'
    listDiv.style.visibility ='visible'
    gamestartDiv.style.display ='none';
    rulesDiv.style.display ='none';
    
    startTimer();
}
function startTimer() {
    startTime = new Date(); // 시작 시간 기록
    timerInterval = setInterval(updateTimer, 1000); // 1초마다 updateTimer 함수 호출
}
function updateTimer() {
    var currentTime = new Date(); // 현재 시간 기록
    var elapsedTime = currentTime - startTime; // 경과 시간 계산 (밀리초 단위)

    // 밀리초를 초 단위로 변환하여 출력
    seconds = Math.floor(elapsedTime / 1000);
    console.log("경과 시간:", seconds, "초");
}
function stopTimer() {
    clearInterval(timerInterval); // 타이머 정지
    console.log("타이머가 정지되었습니다.");
}
document.querySelector("#btnInput").onclick = function (){
    var inputValue = document.querySelector("#numInput").value;
    if(inputValue=="00000000"){ //Return Answer For Test
        alert(answer);
    } 
    else if(parseInt(inputValue)<1||isNaN(inputValue)){
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
function hideRules(){
    let rulesDiv = document.querySelector(".rules");
    rulesDiv.style.display ="none";
}
function showRules(){
    let rulesDiv = document.querySelector(".rules");
    rulesDiv.style.display ="block";
    
}
function postRanking(e) {
    e.preventDefault(); /* POST 이벤트 중지 */
    const rankName = e.target.name.value;
    const rankTime = e.target.rankTime.value;
    if (!rankName || !rankTime) {
      return alert('이름과 시간을 입력하시오');
    }
  
    const url = 'https://asia-northeast3-winged-idiom-421311.cloudfunctions.net/function-1';
    const data = { rankName, rankTime };
    fetch(url, {
      method: 'get',
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // 서버로부터 받은 응답을 콘솔에 출력
      // 여기서 받은 데이터를 필요에 따라 다른 동작에 활용할 수 있습니다.
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  document.querySelector('.postRanking').addEventListener('submit', postRanking);
  
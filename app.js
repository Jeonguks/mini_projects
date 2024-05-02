import { db } from './config.js';
import { collection, addDoc , getDocs } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const fetchDataBtn = document.getElementById('fetchDataBtn');
const dataContainer = document.getElementById('dataContainer');
const form = document.getElementById('myForm');

fetchDataBtn.addEventListener('click', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        
        // HTML 테이블 생성
        let tableHTML = '<table border="1">';
        
        // 테이블 헤더 생성
        tableHTML += '<tr>';
        for (const key in querySnapshot.docs[0].data()) {
            tableHTML += '<th>' + key + '</th>';
        }
        tableHTML += '</tr>';
        
        // 각 문서의 데이터를 테이블에 추가
        querySnapshot.forEach(doc => {
            tableHTML += '<tr>';
            for (const key in doc.data()) {
                tableHTML += '<td>' + doc.data()[key] + '</td>';
               //console.log(typeof(doc.data()[key]));
                //console.log(doc.data()[key]);
                if(typeof(doc.data()[key])==Object){
                    console.log("이건 시간이다");
                }
            }
            tableHTML += '</tr>';
        });

        // 테이블 닫기
        tableHTML += '</table>';
        
        // 데이터를 표시할 컨테이너에 HTML 삽입
        dataContainer.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error getting documents:', error);
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 이벤트 동작을 중지

    const formData = new FormData(form); // 폼 데이터 가져오기
    const nickname = formData.get('nickname');
    const rank = formData.get('rank');
    const time = formData.get('time');

    try {
        // Firebase Firestore에 데이터 추가
        await addDoc(collection(db, 'users'), {
            nickname: nickname,
            rank: parseInt(rank),
            time: time
        });
        
        console.log('Document successfully written!');
        // 성공한 경우 메시지를 표시하거나 리디렉션 등을 수행할 수 있음
    } catch (error) {
        console.error('Error writing document: ', error);
        // 실패한 경우 오류 메시지를 표시하거나 추가적인 작업을 수행할 수 있음
    }
});
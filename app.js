// 1. 제공해주신 이름과 나이 데이터 목록
const memberList = {
    'Lee h': 19,
    'Kim y': 30,
    'Park P': 50
};

// DOM 요소 가져오기
const nameSelect = document.getElementById('nameSelect');
const resultCard = document.getElementById('resultCard');
const resName = document.getElementById('resName');
const resAge = document.getElementById('resAge');

// 앱이 실행되면 콤보 리스트(Select)에 데이터 채워넣기
function init() {
    // memberList의 Key(이름)들을 가져와서 option 태그로 추가
    Object.keys(memberList).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        nameSelect.appendChild(option);
    });
}

// 3. 사용자가 이름을 선택(변경)했을 때 실행되는 이벤트
nameSelect.addEventListener('change', (event) => {
    const selectedName = event.target.value;

    if (selectedName) {
        // 선택한 이름이 있으면 데이터를 찾아서 보여주기
        const age = memberList[selectedName];
        
        resName.textContent = selectedName;
        resAge.textContent = `${age} 세`;
        
        // 결과 카드 보이기
        resultCard.classList.remove('hidden');
    } else {
        // '-- 이름을 선택하세요 --'를 골랐을 경우 결과 카드 숨기기
        resultCard.classList.add('hidden');
    }
});

// 초기화 실행
init();

// 서버에서 읽어온 JSON 데이터를 저장할 변수
let memberList = {};

// DOM 요소 가져오기
const nameSelect = document.getElementById('nameSelect');
const resultCard = document.getElementById('resultCard');
const resName = document.getElementById('resName');
const resAge = document.getElementById('resAge');

// 1. 서버에 저장된 aaa.json 파일을 자동으로 불러오는 함수
async function loadDataFromServer() {
    try {
        
        // 서버 경로에 있는 aaa.json 파일을 비동기로 가져옵니다.
        // const response = await fetch('./aaa.json');
        
        // 경로 앞에 './data/' 를 붙여서 별도 폴더 안을 탐색하도록 설정합니다.
        const response = await fetch('./data/aaa.json');
        if (!response.ok) {
            throw new Error('서버에서 json 파일을 찾을 수 없습니다.');
        }

        // 🌟 가져온 JSON 데이터를 자바스크립트 객체(Object)로 즉시 변환합니다.
        memberList = await response.json();
        
        // 2. 데이터를 성공적으로 읽었으므로 콤보 리스트를 생성합니다.
        updateSelectBox();

    } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('서버 데이터를 불러오는데 실패했습니다. aaa.json 파일이 서버에 있는지 확인해주세요.');
    }
}

// 콤보 리스트(Select Box)를 동적으로 생성하는 함수
function updateSelectBox() {
    // 초기 기본 옵션 설정
    nameSelect.innerHTML = '<option value="">-- 이름을 선택하세요 --</option>';
    
    // 데이터가 비어있다면 콤보박스 비활성화
    if (Object.keys(memberList).length === 0) {
        nameSelect.disabled = true;
        return;
    }

    // JSON 데이터의 Key값(이름들)을 순회하며 옵션 태그 추가
    Object.keys(memberList).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        nameSelect.appendChild(option);
    });

    // 데이터 로드가 끝났으므로 콤보 박스 잠금 해제
    nameSelect.disabled = false;
}

// 3. 콤보 리스트에서 이름을 선택했을 때 실행되는 이벤트
nameSelect.addEventListener('change', (event) => {
    const selectedName = event.target.value;

    if (selectedName) {
        // 4. 선택한 이름의 나이를 찾아 화면에 표시
        const age = memberList[selectedName];
        
        resName.textContent = selectedName;
        resAge.textContent = `${age} 세`;
        
        // 결과 카드 보여주기
        resultCard.classList.remove('hidden');
    } else {
        // 아무것도 선택하지 않았을 때는 결과 카드 숨기기
        resultCard.classList.add('hidden');
    }
});

// 앱이 실행되면 자동으로 서버에 있는 json 파일 호출 시작
loadDataFromServer();

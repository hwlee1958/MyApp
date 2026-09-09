// 서버에서 읽어온 데이터를 저장할 객체
let memberList = {};

const nameSelect = document.getElementById('nameSelect');
const resultCard = document.getElementById('resultCard');
const resName = document.getElementById('resName');
const resAge = document.getElementById('resAge');

// 1. 서버의 JSON 파일을 자동으로 불러오는 함수
async function loadDataFromServer() {
    try {
        // aaa.json 파일을 요청
        const response = await fetch('./aaa.json');
        
        if (!response.ok) {
            throw new Error('서버에서 json 파일을 찾을 수 없습니다.');
        }

        // 🌟 복잡한 텍스트 파싱 필요 없이, json() 한 줄로 파이썬 dict와 똑같은 객체로 변환됩니다.
        memberList = await response.json();
        
        // 2. 콤보 리스트 생성 및 활성화
        updateSelectBox();

    } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('서버 데이터를 불러오는데 실패했습니다.');
    }
}

// 콤보 리스트 동적 생성 함수 (기존과 동일)
function updateSelectBox() {
    nameSelect.innerHTML = '<option value="">-- 이름을 선택하세요 --</option>';
    if (Object.keys(memberList).length === 0) {
        nameSelect.disabled = true;
        return;
    }
    Object.keys(memberList).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        nameSelect.appendChild(option);
    });
    nameSelect.disabled = false;
}

// 콤보 리스트 선택 이벤트 (기존과 동일)
nameSelect.addEventListener('change', (event) => {
    const selectedName = event.target.value;
    if (selectedName) {
        resName.textContent = selectedName;
        resAge.textContent = `${memberList[selectedName]} 세`;
        resultCard.classList.remove('hidden');
    } else {
        resultCard.classList.add('hidden');
    }
});

// 앱 시작 시 실행
loadDataFromServer();

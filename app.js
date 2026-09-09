let memberList = {};

// DOM 요소 가져오기
const nameSelect = document.getElementById('nameSelect');
const resultCard = document.getElementById('resultCard');
const resName = document.getElementById('resName');
const resAge = document.getElementById('resAge');
const resPhoto = document.getElementById('resPhoto');

// 1. 서버에서 JSON 데이터 불러오기
async function loadDataFromServer() {
    try {
        const response = await fetch('./data/aaa.json');
        
        if (!response.ok) {
            throw new Error('json 파일을 불러오는데 실패했습니다.');
        }

        memberList = await response.json();
        updateSelectBox();

    } catch (error) {
        console.error(error);
        alert('데이터 로드 실패: data/aaa.json 경로를 확인하세요.');
    }
}

// 2. 콤보 박스 채우기 (공백이 있는 이름 그대로 노출)
function updateSelectBox() {
    nameSelect.innerHTML = '<option value="">-- 이름을 선택하세요 --</option>';
    
    if (Object.keys(memberList).length === 0) {
        nameSelect.disabled = true;
        return;
    }

    // json에 있는 Key(공백 포함 이름)를 그대로 콤보박스에 추가
    Object.keys(memberList).forEach(name => {
        const option = document.createElement('option');
        option.value = name;        // 예: "Lee h"
        option.textContent = name;  // 화면에도 "Lee h"로 표시
        nameSelect.appendChild(option);
    });

    nameSelect.disabled = false;
}

// 3. 콤보 리스트 선택 이벤트
nameSelect.addEventListener('change', (event) => {
    const selectedName = event.target.value; // 사용자가 선택한 이름 (예: "Lee h")

    if (selectedName) {
        const age = memberList[selectedName];
        
        // 4. 화면에는 공백이 있는 깔끔한 이름을 보여줍니다.
        resName.textContent = selectedName; 
        resAge.textContent = `${age} 세`;
        
        // 🌟 [핵심] 사진을 불러올 때만 공백(' ')을 밑줄('_')로 변환하여 요청합니다.
        // 예: "Lee h" -> "Lee_h"가 되어 "./data/Lee_h.png" 파일을 정확히 찾아옵니다.
        const photoFileName = selectedName.replace(/ /g, '_');
        resPhoto.src = `./data/${photoFileName}.png`;
        
        resultCard.classList.remove('hidden');
    } else {
        resultCard.classList.add('hidden');
    }
});

// 앱 켜지자마자 데이터 호출
loadDataFromServer();


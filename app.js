let memberList = {};

const nameSelect = document.getElementById('nameSelect');
const resultCard = document.getElementById('resultCard');
const resName = document.getElementById('resName');
const resAge = document.getElementById('resAge');
const resPhoto = document.getElementById('resPhoto');

// 1. 서버에서 JSON 데이터 로드
async function loadDataFromServer() {
    try {
        const response = await fetch('./data/aaa.json');
        if (!response.ok) throw new Error('파일을 찾을 수 없습니다.');

        memberList = await response.json();
        updateSelectBox();
    } catch (error) {
        console.error(error);
        alert('데이터를 불러오는데 실패했습니다.');
    }
}

// 2. 콤보 박스 채우기
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

// 3. 콤보 박스 선택 이벤트
// app.js의 콤보 박스 선택 이벤트 (3번 항목)만 이 코드로 교체해 보세요.
nameSelect.addEventListener('change', (event) => {
    const selectedName = event.target.value;

    if (selectedName) {
        const age = memberList[selectedName];
        
        resName.textContent = selectedName;
        resAge.textContent = `${age} 세`;
        
        // 🌟 공백을 모두 제거하고, 대문자를 전부 소문자로 바꾸어 파일명을 완성합니다.
        // 예: "Lee h" -> "leeh", 이미지 경로는 "./data/leeh.png"가 됩니다.
        const fixedFileName = selectedName.replace(/\s+/g, '').toLowerCase();
        resPhoto.src = `./data/${fixedFileName}.png`;
        
        resultCard.classList.remove('hidden');
    } else {
        resultCard.classList.add('hidden');
    }
});

loadDataFromServer();

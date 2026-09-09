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
nameSelect.addEventListener('change', (event) => {
    const selectedName = event.target.value;

    if (selectedName) {
        const age = memberList[selectedName];
        
        // 4. 화면에 이름과 나이 표시
        resName.textContent = selectedName;
        resAge.textContent = `${age} 세`;
        
        // 🌟 [핵심] 선택한 이름을 사용해 자동으로 './data/이름.png' 경로 생성
        // 브라우저가 공백이나 특수문자를 안전하게 인식하도록 encodeURIComponent를 사용해 묶어줍니다.
        resPhoto.src = `./data/${encodeURIComponent(selectedName)}.png`;
        
        resultCard.classList.remove('hidden');
    } else {
        resultCard.classList.add('hidden');
    }
});

loadDataFromServer();

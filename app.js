// 1. 서버의 특정 폴더(data/)에 저장된 aaa.json 파일을 자동으로 불러오는 함수
async function loadDataFromServer() {
    try {
        // 경로 앞에 './data/' 를 붙여서 별도 폴더 안을 탐색하도록 설정합니다.
        const response = await fetch('./data/aaa.json');
        
        if (!response.ok) {
            throw new Error('data 폴더에서 json 파일을 찾을 수 없습니다.');
        }

        // 자바스크립트 객체로 변환
        memberList = await response.json();
        
        // 콤보 리스트 생성 및 활성화
        updateSelectBox();

    } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('서버 데이터를 불러오는데 실패했습니다. data/aaa.json 경로를 확인해 주세요.');
    }
}


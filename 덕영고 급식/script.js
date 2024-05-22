const mealInfoElement = document.getElementById('mealInfo');
const prevBtn = document.getElementById('prevBtn');
const todayBtn = document.getElementById('todayBtn');
const nextBtn = document.getElementById('nextBtn');


let currentDate = new Date();

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function fetchAndDisplayMealInfo(date) {
    const formattedDate = formatDate(date);
    const key = "01f4c4360212403ebc7c906db30c1862";
    const url = "https://open.neis.go.kr/hub/mealServiceDietInfo";
    
    const params = new URLSearchParams({
        'key': key,
        'Type': 'json',
        'pIndex': '1',
        'pSize': '100',
        'ATPT_OFCDC_SC_CODE': 'J10',
        'SD_SCHUL_CODE': '7751103',
        'MLSV_YMD': formattedDate
    });

    fetch(`${url}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('API 호출에 실패했습니다.');
            }
            return response.json();
        })
        .then(data => {
            const mealData = data.mealServiceDietInfo[1].row;

            const table = document.createElement('table');

            const headers = ['MLSV_YMD', 'DDISH_NM'];

            // 테이블 헤더
            const headerRow = table.insertRow();
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            // 테이블 데이터
            mealData.forEach(rowData => {
                const row = table.insertRow();
                headers.forEach(headerText => {
                    const cell = row.insertCell();
                    let cellText = rowData[headerText];
                    if (headerText === 'DDISH_NM') {
                        cellText = cellText.replace(/<br\/>/g, '<br>');
                    }
                    cell.innerHTML = cellText; // innerHTML을 사용하여 <br> 태그를 HTML로 해석하게 함
                });
            });

            mealInfoElement.innerHTML = '';
            mealInfoElement.appendChild(table);
        })
        .catch(error => {
            mealInfoElement.textContent = '주말이거나 급식이 제공되지 않는 날 입니다.';
            console.error(error);
        });
}

prevBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    fetchAndDisplayMealInfo(currentDate);
});

todayBtn.addEventListener('click', () => {
    currentDate = new Date(); 
    fetchAndDisplayMealInfo(currentDate);
});

nextBtn.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    fetchAndDisplayMealInfo(currentDate);
});


// 버튼 클릭 시 모달 창 열기
document.getElementById("showAllergyBtn").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "block";
});

// 닫기 버튼 또는 모달 외부를 클릭 시 모달 창 닫기
document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
});
window.addEventListener("click", function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

fetchAndDisplayMealInfo(currentDate);

import requests
import json
import datetime

now_date  = datetime.datetime.now()
# tm_date   = now_date + datetime.timedelta(days=1) // 다음 날의 데이터 가지고 오기
now_datef = now_date.strftime("%Y%m%d")
# tm_datef  = tm_date.strftime("%Y%m%d")

print(now_datef)

key = "01f4c4360212403ebc7c906db30c1862"
url = "https://open.neis.go.kr/hub/mealServiceDietInfo"

params = {
    'key' : key,
    'Type' : 'json',
    'pIndex' : '1',
    'pSize' : '100',
    'ATPT_OFCDC_SC_CODE' : 'J10',
    'SD_SCHUL_CODE' : '7531328',
    'MLSV_YMD' : now_datef
}

response = requests.get(url, params=params)

eat_data = json.loads(response.text)

print(eat_data, end="\n\n\n")


# for item in eat_data[]:

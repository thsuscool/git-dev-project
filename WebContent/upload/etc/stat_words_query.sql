delete from srv_dt_board
where board_cd = 'BOARD_005';


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
1,
0,
0,
1,
'인구밀도 [Population density]',
'Population density',
'일정지역 내의 인구를 해당 지역의 면적으로 나눈 수치로서 지역 내에 거주하는 인구의 과밀한 정도(통상 ㎢당 인구수로 표시)',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
2,
0,
0,
2,
'부양비 [Dependency ratio]',
'Dependency ratio',
'생산가능인구(15∼64세)에 대한 유소년인구(0∼14세)와 고령인구(65세 이상)의 합의 백분비로, 인구의 연령구조를 나타내는 지표',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
3,
0,
0,
3,
'연 령 [Age]',
'Age',
'조사기준시점 현재 호적이나 주민등록과는 관계없이 실제로 태어난 사실상의 만 나이',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
4,
0,
0,
4,
'혼인상태 [Marital status]',
'Marital status',
'호적이나 주민등록상의 신고와 관계없이 15세 이상의 사람에 대한 사실상의 혼인상태</br></br>
■ 미  혼[Never married] : 혼인한 사실이 없는 사람</br>
■ 배우자 있음[Married] : 결혼하여 배우자가 있는 사람</br>
■ 사  별[Bereavement] : 혼인은 하였으나 배우자가 사망하고 현재 재혼하지 않고 혼자 사는 사람</br>
■ 이  혼[Divorced] : 배우자와 헤어지고 현재 재혼하지 않고 혼자 사는 사람',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
5,
0,
0,
5,
'교육정도 [Educational attainment]',
'Educational attainment',
'교육부장관이 인정하는 정규교육 중 이수한 최고학력',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
6,
0,
0,
6,
'가 구 [Household]',
'Household',
'1인 또는 2인 이상이 모여서 취사, 취침 등 생계를 같이하는 생활단위',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
7,
0,
0,
7,
'점유형태 [Type of residence]',
'Type of residence',
'조사기준일 현재 사는 집을 점유하는 형태</br></br>
■ 자  기  집[Own house]: 법률상 소유 여하를 불문하고 실제 거주자 소유로 되어 있는 집</br>
■ 전      세[Lease]: 일정액의 현금 또는 기타 방법으로 전세금을 내고 계약기간 세 들어 사는 경우</br>
■ 보증금 있는 월세[Monthly rent with deposit in advance] : 일정액의 보증금을 내고 매월 집세를  내는 경우</br>
■ 보증금 없는 월세[Monthly rent without deposit] : 일정액의 보증금 없이 매월 집세(또는 월세)를 내는 경우</br>
■ 사  글  세[Monthly rent paid in advance] : 세입자가 1년 또는 10개월 등 일정기간의 집세를 한꺼번에 내고 매월 1개월분의 집세를 공제하는 경우.</br>
■ 무      상[Free use] : 다른 사람 소유의 건물 등을 사용하지만 임차료 등 대가를 지불하지 않는 경우',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
8,
0,
0,
8,
'세대별 가구 [Households by generation]',
'Households by generation',
'일반가구에 한하여 가구주와 그 가족의 친족관계에 따라 1세대 가구, 2세대 가구, 3세대 가구, 4세대 이상 가구로 구분한 것을 말함</br></br>
■ 1세대가구[One generation household] : 가구주와 같은 세대에 속하는 친족들만 함께 사는 가구</br>
■ 2세대가구 [Two generations household] : 가구주와 그 직계 또는 방계의 친족 2세대가 함께 사는 가구</br>
■ 3세대가구[Three generations household] : 가구주와 그 직계 또는 방계의 친족 3세대가 함께 사는 가구</br>
■ 4세대이상가구[Household of four generations or more] : 가구주와 그 직계 또는 방계의 친족    4세대 이상이 함께 사는 가구',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
9,
0,
0,
9,
'거 처 [Living quarters]',
'Living quarters',
'사람이 살고 있는 모든 장소를 통칭하는 말로서 구조적으로 분리되고 독립된 하나의 거주단위',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
10,
0,
0,
10,
'주   택 [Housing unit]',
'Housing unit',
'한 가구가 살림을 할 수 있도록 지어진 집으로서 부엌과 한 개 이상의 방과 독립된 출구를 갖춘 영구 또는 준영구 건물이어야 하며,</br>관습상 소유 또는 매매의 한 단위를 이루어야 한다.</br></br>
■ 단독주택[Detached dwelling] : 한 가구가 생활할 수 있도록 건축된 일반 단독주택과 여러 가구가 살 수 있도록 설계된 다가구 단독주택</br>
■ 아 파 트[Apartment] : 한 건물 내에 여러 가구가 거주할 수 있도록 지은 5층 이상의 영구건물로서, 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택</br>
■ 연립주택[Row house] : 한 건물 안에 여러 가구가 살 수 있도록 지은 4층 이하의 영구건물로서 건축 당시 ‘연립주택’으로 허가받은 주택</br>
■ 다세대주택[Apartment unit in a private house] : 한 건물 내에 여러 가구가 살 수 있도록 건축된 4층 이하의 영구건물로서 건물의 연면적이 660㎡이하이면서 건축 당시 다세대주택으로 허가받은 주택</br>
■ 비거주용 건물 내 주택[House within commercial building] : 비거주용 건물에 사람이 살되, 그 거주 부분이 주택의 요건(방, 부엌, 독립된 출입구)을 갖추고 있는 경우를 말함',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
11,
0,
0,
11,
'주택이외의 거처 [Living in structures other than dwellings]',
'Living in structures other than dwellings',
'주택의 요건을 갖추진 못한 거처',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
12,
0,
0,
12,
'사업체 [Establishment]',
'Establishment',
'일정한 물리적 장소에서 단일 또는 주된 경제활동을 독립적으로 수행하는 기업체나 기업체를 구성하는 부분을 말함',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
13,
0,
0,
13,
'농가 [Farm household]',
'Farm household',
'생계, 영리, 연구를 목적으로 농업을 경영하거나 농업에 종사하는 가구',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
14,
0,
0,
14,
'농가인구[Farm household population]',
'Farm household population',
'조사기준 시점 현재 농가로 정의된 개인농가에서 취사, 취침 등 생계를 같이하는 사람',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
15,
0,
0,
15,
'임가 [Forestry household]',
'Forestry household',
'조사기준일 현재 산림면적을 3ha 이상 보유하면서 지난 5년간 육림작업 실적이 있거나</br>지난 1년간 벌목업, 양묘업을 경영하였거나, 직접 생산한 임산물 판매대금이 120만 원 이상인 가구',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
16,
0,
0,
16,
'어가 [Fishery household]',
'Fishery household',
'지난 1년간 판매할 목적으로 1개월 이상 어선어업, 마을어업(맨손, 나잠, 기타어업), 양식어업을 직접 경영한 가구이거나,</br>지난 1년간 직접 잡거나 양식한 수산물을 판 금액이 120만 원 이상인 가구',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
17,
0,
0,
17,
'기초단위구 [Basic unit district]',
'Basic unit district',
'도로, 하천, 철도, 산능성 등과 같은 준항구적인 명확한 지형지물을 이용하여 지도상에 구획한 최소단위구역',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
18,
0,
0,
18,
'집계구 [Output Area]',
'Output Area',
'인구, 사회경제적 동질성, 형태지수를 고려하여 획정한 통계집계 공표구역',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
19,
0,
0,
19,
'도시화지역 [Urban Area]',
'Urban Area',
'인구밀도와 지목을 기준으로 도시의 기능을 하는 기초단위구로 이루어진 구역으로 행정구역과는 별도로 실질적인 도시지역을 나타내는 구역단위',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
20,
0,
0,
20,
'도시권 [Metropolitan Area]',
'Metropolitan Area',
'도시를 중심으로 그 주변지역이 기능적으로 높은 연계를 형성하고 있는 지역',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
21,
0,
0,
21,
'지리정보시스템 [Geographic Information System]',
'Geographic Information System',
'지리공간데이터(geographic or geospatial data)를 기반으로 유용한 정보를 생성하는 정보시스템',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
22,
0,
0,
22,
'통계지리정보시스템/서비스 [Statistical GIS]',
'Statistical GIS',
'인구주택 및 사업체 센서스 데이터에 지리학적 공간(geographic space/geospace) 속성,</br>즉 위치값(경위도나 주소 등), 경계, 지도 등을 부가한 센서스 공간데이터(census spatial data)를 기반으로 합리적 의사결정을 지원하는 유용한 정보를 생성하기 위한 정보시스템, 혹은 그 서비스',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
23,
0,
0,
23,
'노년부양비 [Aged dependency ratio]',
'Aged dependency ratio',
'총인구 중에서 생산가능(15~64세)인구에 대한 노년인구(65세이상)의 백분비</br>
노년부양비 = (65세 이상 인구 / 15~64세 인구) × 100',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
24,
0,
0,
24,
'유년부양비 [Child dependency ratio]',
'Child dependency ratio',
'유년부양비 = (15세 미만 인구 / 15~64세 인구) × 100',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
25,
0,
0,
25,
'총부양비 [Total dependency ratio]',
'Total dependency ratio',
'총부양비 = 유년부양비 + 노년부양비',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);


insert into srv_dt_board (
board_cd,
post_no,
post_depth,
post_order,
parent_post_id,
post_title,
post_title_en,
post_content,
low_rank_s_class_cd,
post_hits,
priority_disp_yn,
reg_ts,
reg_member_id,
mod_ts,
file_yn
) values (
'BOARD_005',
26,
0,
0,
26,
'N/A [Not Available]',
'Not Available',
'표출불가 (5 미만)',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);



delete from srv_dt_board
where board_cd = 'BOARD_002';


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
'BOARD_002',
1,
0,
0,
1,
'회원가입시 혜택은 무엇이 있나요?',
'',
'Q&A 에 문의 및 개선요청, 주제도 요청 글 작성 가능, 인터렉티브 맵을 통한 통계조회 결과를 북마크 및 공유 할 수 있습니다.
<br>그리고 통계청에서 자체 생산한 통계지리정보자료를 요청할 수 있으며, 요청된 자료를 이용하여 많은 서비스 및 정보를 제공할 수 있습니다.
<br>개발자 지원 센터를 통하여 OpenAPI 를 이용해 서비스를 할 수 있도록 인증키 발급도 가능 합니다.',
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
'BOARD_002',
2,
0,
0,
2,
'회원 탈퇴는 어떻게 해야 하나요?',
'',
'로그인 후 마이페이지 > 정보관리 에서 가능 합니다.',
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
'BOARD_002',
3,
0,
0,
3,
'예전에 조회했던 결과를 다시 볼 수 있나요?',
'',
'회원 가입 및 로그인 후 북마크를 이용하여 저장한 통계 결과에 대해서는 히스토리를 제공하고 있습니다. 해당 내용은 마이페이지 에서 확인 가능 합니다.',
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
'BOARD_002',
4,
0,
0,
4,
'SOP Open API 란 무엇인가요?',
'',
'SGIS Open Platform Open API 는 자바스크립트(JacaScript) 언어를 사용하여 웹 사이트를 구현하는데 사용할 수 있는 지도 API 와 Rest 형식의 서비스를 위한 웹 사이트를 구현하는데 사용할 수 있는 Data API 를 제공합니다.',
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
'BOARD_002',
5,
0,
0,
5,
'JIT 란 무엇인가요?',
'',
'JIT( Just In Time ) 는SOP Open API 에서 제공되는 지도API, Data API 를 실시간으로 확인, 테스트 할 수 있는 서비스 입니다.',
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
'BOARD_002',
6,
0,
0,
6,
'로그인시 신뢰되지 않는 보안인증서(https) 경고가 뜨는 경우 처리 방법은?',
'',
'통계지리정보서비스는 로그인시 보안을 위해 https(보안회선)을 사용하고 있지만 일부 링크가 http회선을 사용해서 발생하는 내용입니다.</br>
"모든 콘텐츠를 표시"를 누르고 진행하시면 됩니다. 파이어폭스의 경우 위험사항 확인 -> 예외추가를 하시면 정상적으로 화면을 볼 수 있습니다.',
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
'BOARD_002',
7,
0,
0,
7,
'집계구 설정기준은?',
'',
'행정구역내 기초 단위구 대 구역 경계내에서 설정, 500인을 최적 인구로 하여 인구 규모, 형태, 사회 결제적 동질성 지수를 선정하여 가중치부여 후 AZP(Automatic Zoning Procedure) 프로그램으로 확정, 설정 됩니다.',
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
'BOARD_002',
8,
0,
0,
8,
'행정동과 법정동이란 무엇인가요?',
'',
'행정동은 행정편의상 설정한 행정구역이고, 법정동은 법률로 지정된 행정구역으로 전통적인 지역이름을 사용합니다.</br>
예) 서울 서초구 양재1동(행정동), 우면동(법정동)',
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
'BOARD_002',
9,
0,
0,
9,
'행정구역과 소지역(집계구)의 차이점은?',
'',
'행정구역은 읍면동 이상의 통계기준 구역이고, 소지역(집계구)은 편의상 통계 자료를 집계하기 위한 구역으로 인구 500명 정도의 규모이며, 크기는 읍면동의 약 1/23 크기입니다.',
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
'BOARD_002',
10,
0,
0,
10,
'통계지리정보서비스에서 보여주는 자료의 기준년도는?',
'',
'인구, 가구, 주택 부문 "2000년, 2005년, 2010년" 인구주택총조사 자료, 사업체 "2000 ~ 2013년" 사업체조사 자료, 농림어업 "2000년, 2005년, 2010년" 농림어업총조사 자료를 기준으로 보여 줍니다.</br>
※ 인구 : 군부대, 재외공관 등 특별조사구 및 외국인 제외
&nbsp;&nbsp;&nbsp;&nbsp;가구 : 집단가구, 외국인가구, 특별조사구 제외
&nbsp;&nbsp;&nbsp;&nbsp;주택 : 외국인, 빈집, 특별조사구 제외
&nbsp;&nbsp;&nbsp;&nbsp;사업체 : 일정치 않은 개인운수(개인택시 등)업체 제외
&nbsp;&nbsp;&nbsp;&nbsp;특별조사구 : 일반조사구와는 달리 조사원의 출입이 제한되거나 조사원에 의한 조사가 불가능한 지역으로서 재외주재공관, 경찰서, 교도소 및 군부대 등에 대하여</br>별도로 설정한 조사구</br>
※ 현재시점의 주변정보와 조사시점의 차이가 있으므로 자료이용에 유의하시기 바랍니다.',
'',
0,
'N',
sysdate,
'admin',
sysdate,
''
);



















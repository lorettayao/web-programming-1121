# (Group 14) GRE StudEE

## Run the project

### Install dependencies

```bash
yarn
```

### Environment variables

Create a `.env.local` file in the root of the project and add the following variables:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/hack2

AUTH_SECRET=<ANY_RANDOM_STRING>
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

NEXT_PUBLIC_BASE_URL=http://localhost:3000

#### database setup
adminer : localhost:8080
系統資料庫：postgresql
伺服器：postgresql
帳號：postgres
密碼：postgres
in the database adminer->global_dictionary, use SQL command to load the vocabulary

load the below string into the SQL input box:

INSERT INTO global_dictionary (id, word, definition) VALUES
  (1, 'abase', '貶低自己;卑躬屈膝'), 
  (2, 'abash', '驚訝'), 
  (3, 'abate', '減弱'), 
  (4, 'abbreviate', '縮寫'), 
  (5, 'abdicate', '放棄'), 
  (6, 'aberrant', '異常'), 
  (7, 'aberration', '畸變'), 
  (8, 'abet', '助長'), 
  (9, 'abeyance', '擱置'), 
  (10, 'abhor', '痛恨'), 
  (11, 'abject', '卑鄙'), 
  (12, 'abjure', '聲明放棄（信念、行為、活動）'), 
  (13, 'ablution', '洗禮'), 
  (14, 'abnegation', '放棄'), 
  (15, 'abolish', '廢除'), 
  (16, 'abominate', '鄙棄'), 
  (17, 'abominable', '可惡'), 
  (18, 'aboriginal', '土著'), 
  (19, 'abortive', '未遂'), 
  (20, 'abrasive', '磨料'), 
  (21, 'abridge', '刪節'), 
  (22, 'abrogate', '廢除'), 
  (23, 'abscission', '脫落'), 
  (24, 'abscond', '潛逃'), 
  (25, 'absolute', '絕對'), 
  (26, 'absolve', '開脫'), 
  (27, 'abstain', '棄權'), 
  (28, 'abstemious', '虛假'), 
  (29, 'abstinence', '節制'), 
  (30, 'abstract', '抽象的'), 
  (31, 'representational', '代表性'), 
  (32, 'abstruse', '奧妙'), 
  (33, 'abusive', '虐待'), 
  (34, 'abut', '鄰接'), 
  (35, 'abysmal', '深淵'), 
  (36, 'abyss', '深淵'), 
  (37, 'academic', '學術的'), 
  (38, 'accede', '加油'), 
  (39, 'accelerate', '加速'), 
  (40, 'accessible', '無障礙'), 
  (41, 'accessory', '配飾'), 
  (42, 'acclaim', '歡呼'), 
  (43, 'acclimate', '適應性'), 
  (44, 'acclivity', '上斜'), 
  (45, 'accolade', '讚譽'), 
  (46, 'merit', '優點'), 
  (47, 'demerit', '過失'), 
  (48, 'earn', '賺'), 
  (49, 'accommodate', '容納'), 
  (50, 'accomplice', '共犯'), 
  (51, 'accord', '符合'), 
  (52, 'accost', '招呼'), 
  (53, 'accoutre', '裝備'), 
  (54, 'accretion', '積聚'), 
  (55, 'accrue', '積累'), 
  (56, 'acerbity', '（言辭的）尖刻'), 
  (57, 'bitter', '苦的'), 
  (58, 'biting', '咬人'), 
  (59, 'acetic', '乙酸'), 
  (60, 'acidulous', '酸溜溜'), 
  (61, 'acknowledge', '承認'), 
  (62, 'acme', '頂端'), 
  (63, 'acoustics', '聲學'), 
  (64, 'acquiesce', '默許'), 
  (65, 'acquittal', '開釋'), 
  (66, 'acrid', '辛辣'), 
  (67, 'acrimonious', '尖刻'), 
  (68, 'acrophobia', '探索恐懼症'), 
  (69, 'actuarial', '精算'), 
  (70, 'actuary', '精算師'), 
  (71, 'actuate', '動態'), 
  (72, 'acuity', '敏銳度'), 
  (73, 'acumen', '敏銳的'), 
  (74, 'acute', '急性'), 
  (75, 'adage', '諺語'), 
  (76, 'proverb', '諺語'), 
  (77, 'adamant', '堅定'), 
  (78, 'adapt', '適應'), 
  (79, 'addendum', '附錄'), 
  (80, 'addiction', '癮'), 
  (81, 'addle', '加法'), 
  (82, 'address', '地址'), 
  (83, 'adept', '熟練'), 
  (84, 'adhere', '粘附'), 
  (85, 'adherent', '粘附'), 
  (86, 'adjacent', '鄰近的'), 
  (87, 'adjoin', '鄰接'), 
  (88, 'adjourn', '休會'), 
  (89, 'adjunct', '附件'), 
  (90, 'adjuration', '校長'), 
  (91, 'adjutant', '副官'), 
  (92, 'admonish', '告誡'), 
  (93, 'adore', '崇拜'), 
  (94, 'adorn', '裝飾'), 
  (95, 'adroit', '機敏的'), 
  (96, 'adulation', '崇拜'), 
  (97, 'adulterate', '摻雜'), 
  (98, 'advent', '來臨'), 
  (99, 'adventitious', '非計劃中的'), 
  (100, 'adversary', '對手'), 
  (101, 'adverse', '不利'), 
  (102, 'adversity', '逆境'), 
  (103, 'advert', '廣告'), 
  (104, 'advocacy', '倡導'), 
  (105, 'advocate', '提倡'), 
  (106, 'aegis', '庇護；主辦；贊助'), 
  (107, 'aerie', '鷹巢'), 
  (108, 'aesthetic', '審美的'), 
  (109, 'affable', '和藹可親的'), 
  (110, 'affected', '做作的'), 
  (111, 'affidavit', '誓章'), 
  (112, 'affiliation', '聯繫'), 
  (113, 'affinity', '親和力'), 
  (114, 'affirmation', '肯定'), 
  (115, 'affliction', '痛苦'), 
  (116, 'affluence', '富裕'), 
  (117, 'affront', '冒犯'), 
  (118, 'agape', '（尤指基督教的）聖愛'), 
  (119, 'agenda', '議程'), 
  (120, 'agglomeration', '聚集'), 
  (121, 'aggrandize', '加熱'), 
  (122, 'aggregate', '總計的'), 
  (123, 'aghast', '震驚'), 
  (124, 'agility', '敏捷'), 
  (125, 'agitate', '激盪'), 
  (126, 'agnostic', '不可知論'), 
  (127, 'agog', '極度興奮的'), 
  (128, 'agrarian', '農業'), 
  (129, 'alacrity', '痛苦'), 
  (130, 'alchemy', '煉金術'), 
  (131, 'alcove', '壁龕'), 
  (132, 'alias', '別名'), 
  (133, 'alienate', '離間'), 
  (134, 'alimentary', '消費'), 
  (135, 'alimony', '贍養費'), 
  (136, 'allay', '艾爾'), 
  (137, 'allege', '指控'), 
  (138, 'allegiance', '忠誠'), 
  (139, 'allegory', '寓言'), 
  (140, 'alleviate', '減輕'), 
  (141, 'alliteration', '頭韻'), 
  (142, 'allocate', '分配'), 
  (143, 'earmark', '標記在耳朵做記號'), 
  (144, 'alloy', '合金'), 
  (145, 'allude', '暗示'), 
  (146, 'allure', '引誘'), 
  (147, 'siren', '警笛'), 
  (148, 'alluvial', '沖積'), 
  (149, 'aloof', '超然'), 
  (150, 'aloft', '在高處'), 
  (151, 'altercation', '爭吵'), 
  (152, 'altruistic', '利他'), 
  (153, 'amalgamate', '合併'), 
  (154, 'amalgam', '汞合金'), 
  (155, 'amass', '積聚'), 
  (156, 'amazon', '亞馬遜'), 
  (157, 'ambidextrous', '野心'), 
  (158, 'ambience', '環境'), 
  (159, 'ambiguous', '模糊的'), 
  (160, 'ambivalence', '矛盾'), 
  (161, 'amble', '緩行'), 
  (162, 'ambrosia', '神的食物'), 
  (163, 'nectar', '花蜜'), 
  (164, 'ambulatory', '臥床'), 
  (165, 'ameliorate', '改善'), 
  (166, 'amenable', '適合'), 
  (167, 'amend', '修正'), 
  (168, 'amenities', '便利'), 
  (169, 'amiable', '可親'), 
  (170, 'amicable', '友好'), 
  (171, 'amiss', '不對勁'), 
  (172, 'amity', '和睦'), 
  (173, 'amnesia', '健忘症'), 
  (174, 'amnesty', '大赦'), 
  (175, 'amoral', '不道德'), 
  (176, 'amorous', '多情'), 
  (177, 'amorphous', '無定形'), 
  (178, 'amphibian', '兩棲動物'), 
  (179, 'amphitheater', '圓形劇場'), 
  (180, 'ample', '充足'), 
  (181, 'amplify', '放大'), 
  (182, 'amputate', '截肢'), 
  (183, 'amok', '狂亂的'), 
  (184, 'amulet', '護身符'), 
  (185, 'anachronism', '過時的'), 
  (186, 'analgesic', '止痛藥'), 
  (187, 'analgesia', '鎮痛'), 
  (188, 'analogous', '類似'), 
  (189, 'analogy', '比喻'), 
  (190, 'anarchist', '無政府主義者'), 
  (191, 'anarchy', '無政府狀態'), 
  (192, 'anathema', '詛咒'), 
  (193, 'ancestry', '祖先'), 
  (194, 'anchor', '錨'), 
  (195, 'ancillary', '輔助'), 
  (196, 'anecdote', '軼事'), 
  (197, 'anemia', '貧血'), 
  (198, 'anesthetic', '麻藥'), 
  (199, 'anguish', '痛苦'), 
  (200, 'angular', '角'), 
  (201, 'animadversion', '動畫'), 
  (202, 'animated', '動畫'), 
  (203, 'animosity', '敵意'), 
  (204, 'animus', '敵意'), 
  (205, 'annals', '史冊'), 
  (206, 'anneal', '退火'), 
  (207, 'annex', '附件'), 
  (208, 'annihilate', '殲滅'), 
  (209, 'annotate', '註釋'), 
  (210, 'annuity', '年金'), 
  (211, 'annul', '廢止'), 
  (212, 'elope', '私奔'), 
  (213, 'anodyne', '肛門'), 
  (214, 'anoint', '膏'), 
  (215, 'anomalous', '異常的'), 
  (216, 'anomaly', '異常'), 
  (217, 'anonymity', '匿名'), 
  (218, 'antagonism', '對抗'), 
  (219, 'protagonist', '主角'), 
  (220, 'antecede', '前編'), 
  (221, 'antecedents', '前情'), 
  (222, 'antediluvian', '早已過時的；上古的'), 
  (223, 'anthem', '國歌'), 
  (224, 'anthology', '選集'), 
  (225, 'anthropoid', '類人'), 
  (226, 'anthropologist', '人類學家'), 
  (227, 'anthropomorphic', '擬人化'), 
  (228, 'anticlimax', '虎頭蛇尾'), 
  (229, 'antidote', '解毒劑'), 
  (230, 'antipathy', '反感'), 
  (231, 'antiquated', '過時'), 
  (232, 'antique', '古董'), 
  (233, 'antiquity', '古代'), 
  (234, 'antiseptic', '防腐劑'), 
  (235, 'antithesis', '對立'), 
  (236, 'antler', '鹿角'), 
  (237, 'anvil', '砧'), 
  (238, 'apathy', '冷漠'), 
  (239, 'ape', '猿'), 
  (240, 'aperture', '光圈'), 
  (241, 'apex', '頂尖'), 
  (242, 'aphasia', '失語症'), 
  (243, 'aphorism', '格言'), 
  (244, 'apiary', '蜂房'), 
  (245, 'hive', '蜂巢'), 
  (246, 'apiculture', '養蜂業'), 
  (247, 'apiarist', '養蜂人'), 
  (248, 'aplomb', '沉睡'), 
  (249, 'poise', '平衡'), 
  (250, 'apocalyptic', '世界末日'), 
  (251, 'apocryphal', '偽造'), 
  (252, 'apogee', '（成功、流行、權力等的）頂峰'), 
  (253, 'apolitical', '非政治'), 
  (254, 'apologist', '辯護律師'), 
  (255, 'apoplexy', '中風'), 
  (256, 'apostate', '叛教'), 
  (257, 'apothecary', '藥劑師'), 
  (258, 'apothegm', '格言'), 
  (259, 'apotheosis', '神化'), 
  (260, 'appall', '驚恐'), 
  (261, 'apparition', '幻影'), 
  (262, 'appease', '安撫'), 
  (263, 'appellation', '稱謂'), 
  (264, 'append', '附加'), 
  (265, 'application', '應用'), 
  (266, 'apposite', '適當'), 
  (267, 'appraise', '評價'), 
  (268, 'appreciate', '欣賞'), 
  (269, 'apprehend', '逮捕'), 
  (270, 'apprehensive', '憂慮'), 
  (271, 'apprise', '通知'), 
  (272, 'approbation', '讚許'), 
  (273, 'appropriate', '合適的'), 
  (274, 'appurtenances', '附件'), 
  (275, 'apropos', '恰當的'), 
  (276, 'aptitude', '才能'), 
  (277, 'aquiline', '鉤狀的'), 
  (278, 'arable', '可耕種'), 
  (279, 'arbiter', '仲裁者'), 
  (280, 'arbitrary', '隨意的'), 
  (281, 'arbitrate', '仲裁'), 
  (282, 'arboretum', '植物園'), 
  (283, 'arboreal', '樹木'), 
  (284, 'arcade', '拱廊'), 
  (285, 'arcane', '奧術'), 
  (286, 'archaeology', '考古學'), 
  (287, 'archaic', '古老'), 
  (288, 'archetype', '原型'), 
  (289, 'arch', '拱'), 
  (290, 'archipelago', '群島'), 
  (291, 'archives', '檔案'), 
  (292, 'ardor', '熱情'), 
  (293, 'arduous', '艱鉅'), 
  (294, 'argot', '隱語'), 
  (295, 'aria', '詠嘆調'), 
  (296, 'arid', '乾旱'), 
  (297, 'aristocracy', '貴族'), 
  (298, 'armada', '艦隊'), 
  (299, 'aromatic', '芳香'), 
  (300, 'arraign', '提拔');
```
<!--一定要load這串字到後段DB -->
#### Get Github OAuth credentials

- Go to `Settings` tab of your Github account
- Click `Developer settings` on the left sidebar
- Click `OAuth Apps` on the left sidebar
- Click `New OAuth App`
- Enter the following information:
  - `Application name`: `Notion Clone` (or any name you like)
  - `Homepage URL`: `http://localhost:3000`
  - `Authorization callback URL`: `http://localhost:3000/api/auth/callback/github`
- Click `Register application`
- Copy the `Client ID` and `Client Secret` to your `.env.local` file:

  ```text
  AUTH_GITHUB_ID=<Client ID>
  AUTH_GITHUB_SECRET=<Client Secret>
  ```

  Note that in NextAuth v5, the prefix `AUTH_` is required for the env variables.

  Note that you do not have to add those keys to `src/lib/env/private.ts` since they are automatically handled by NextAuth.

### Database

1. Start database

```bash
docker compose up -d
```

2. Run migrations

```bash
yarn migrate
```

### Start the server

```bash
yarn dev
```

## Work Distribution
- 姚雲起 B10901037
  - 寫作 database，包含 topic, writing 內容的儲存
  - user mapping
  - 前端 ranking
- 林新晨 B10901041
  - 單字 database，包含 user,project,biglist 之間關係
  - 後端 function
  - 後端 ranking
- 夏良語 B09901049
  - UI 設計
  - 製作網站 Homepage
  - 整合 Homepage 和所有 components 的連結
  - 設計單字答題考試
  - Ranking - All Time Ranking

## Demo 
link: https://youtu.be/9kVBmebtXHU

## Despcription

### Motivation

我們的服務針對準備GRE的考生。GRE考試準備著重在單字及寫作，因此我們的服務分為兩個部分，每日單字和寫作練習。

### Features
點選每日單字，會隨機從尚未學過單字中生成一份7個的單字表，使用者學完後可以將其打勾。在退出單字表之前，系統會生成考試，測試使用者是否學好他打勾的單字。如果答對，該單字將不會再出現；反之，單字的勾勾會被取消，單字有機會再出現在其他生字表。

點選寫作練習，系統會有設定好的題目供使用者選擇，使用者可以在下方的輸入欄練習。每一次的練習會儲存到該使用者的帳號下，可以反覆查看。

另外，在HomePage提供一個分數排行榜（答對考試一題得1分），分為三個類別：
1. 各個使用者的當日得分排行。
2. 使用者的每日得分紀錄，方便使用者追蹤自己的學習進度。
3. 各個使用者的歷史總積分排行。

## Deployed Link
https://wp-final.vercel.app/

## Reference
Hack 2 in WP1121

--ユーザー情報
insert into users (login_id,password, nickname, a_few_words, image_id) values ('1','abc','カラス','こんにちは！','10');
insert into users (login_id,password, nickname, a_few_words, image_id) values ('2','def','めがね','よろしく','20');
insert into users (login_id,password, nickname, a_few_words, image_id) values ('3','ghi','ねこ','おはよう！！！','30');
--日記情報
insert into diaries (login_id, sentence, stamp,resist_time,diary_time) values 
(1,'今日も仕事頑張った✨',1,'2025-06-05 10:00:00','2025-06-05 10:00:00'),
(1,'帰りたい泣',2,'2025-07-02 10:00:00','2025-07-02 10:00:00'),
(1,'今日は酒盛りじゃ！',2,'2025-07-03 10:00:00','2025-07-03 10:00:00'),
(2,'明日雨っていやだなぁ',4,'2025-07-01 10:00:00','2025-07-01 10:00:00'),
(2,'プログラミングむずくね',1,'2025-07-02 10:00:00','2025-07-02 10:00:00'),
(3,'もうすぐ仕事終わりだ',3,'2025-07-01 10:00:00','2025-07-01 10:00:00');
--キーワード
INSERT INTO keywords (keywords) VALUES ('テスト');
INSERT INTO keywords (keywords) VALUES ('テストデータ');
INSERT INTO keywords (keywords) VALUES ('頑張った');
INSERT INTO keywords (keywords) VALUES ('疲れた');
INSERT INTO keywords (keywords) VALUES ('帰りたい');
INSERT INTO keywords (keywords) VALUES ('眠い');
--コメント
INSERT INTO comments (diary_id,login_id,time,sentence) VALUES (1,1,'2025-06-05 10:00:00','テストコメントです');
INSERT INTO comments (diary_id,login_id,time,sentence) VALUES (1,2,'2025-07-02 12:00:00','テストコメント2です');
INSERT INTO comments (diary_id,login_id,time,sentence) VALUES (2,1,'2025-07-01 10:00:00','テストコメント二人目です');
INSERT INTO comments (diary_id,login_id,time,sentence) VALUES (3,1,'2025-07-01 10:00:00','テストコメント三人目です');
--タグ
INSERT INTO tags (tags) VALUES ('#現実逃避');
INSERT INTO tags (tags) VALUES ('#憂鬱');
INSERT INTO tags (tags) VALUES ('#帰りたい');
INSERT INTO tags (tags) VALUES ('#頑張った');
--リアクション
INSERT INTO reactions (diary_id,login_id,reaction1,reaction2,reaction3,reaction4) VALUES (1,1,1,0,0,0);
INSERT INTO reactions (diary_id,login_id,reaction1,reaction2,reaction3,reaction4) VALUES (1,2,0,0,1,0);
INSERT INTO reactions (diary_id,login_id,reaction1,reaction2,reaction3,reaction4) VALUES (1,3,0,1,0,0);
INSERT INTO reactions (diary_id,login_id,reaction1,reaction2,reaction3,reaction4) VALUES (2,1,0,0,0,1);
INSERT INTO reactions (diary_id,login_id,reaction1,reaction2,reaction3,reaction4) VALUES (2,2,0,1,0,0);
INSERT INTO reactions (diary_id,login_id,reaction1,reaction2,reaction3,reaction4) VALUES (2,3,1,0,0,0);
--投稿
INSERT INTO posts (diary_id,hashtag_id) VALUES (1,1);
INSERT INTO posts (diary_id,hashtag_id) VALUES (1,2);
INSERT INTO posts (diary_id,hashtag_id) VALUES (2,1);
INSERT INTO posts (diary_id,hashtag_id) VALUES (3,1);
--画像
--INSERT INTO images (name,mime_type,image_data) VALUES ('カラス','jpeg'LOAD_FILE('/path/to/test.png'));
--タイムライン
INSERT INTO users (login_id,nickname) VALUES ('4','カラス');
INSERT INTO diaries (sentence, stamp,resist_time, diary_time,login_id) VALUES ('テストデータ','1',now(),now(),1);

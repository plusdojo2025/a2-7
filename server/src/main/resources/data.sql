--ユーザー情報
insert into users (login_id,password, nickname, a_few_words, image_id) values ('1','abc','カラス','こんにちは！',10);
insert into users (login_id,password, nickname, a_few_words, image_id) values ('2','def','めがね','よろしく',20);
insert into users (login_id,password, nickname, a_few_words, image_id) values ('3','ghi','ねこ','おはよう！！！',30);
insert into users (login_id,password, nickname, a_few_words, image_id) values ('4','jkl','いぬ','わんわん',30);
insert into users (login_id,password, nickname, a_few_words, image_id) values ('5','mno','あひる','がーがー',30);
--日記情報
insert into diaries (login_id, sentence, stamp,resist_time,diary_time) values 
(1,'今日も仕事頑張った✨　#頑張った #公開',1,'2025-06-05 10:00:00','2025-06-05 10:00:00'),
(1,'帰りたい泣 #公開',2,'2025-07-02 10:00:00','2025-07-02 10:00:00'),
(1,'今日は酒盛りじゃ！#公開',2,'2025-07-03 10:00:00','2025-07-03 10:00:00'),
(2,'明日雨っていやだなぁ #公開',4,'2025-07-01 10:00:00','2025-07-01 10:00:00'),
(2,'プログラミングむずくね #公開',1,'2025-07-02 10:00:00','2025-07-02 10:00:00'),
(3,'もうすぐ仕事終わりだ #公開',3,'2025-07-01 10:00:00','2025-07-01 10:00:00'),
(1,'今日は仕事が忙しかったけど、やりがいを感じた！ #公開 #頑張った',1,'2025-06-05 10:00:00','2025-06-05 10:00:00'),
(1,'早起きしてジムに行ったよ！気持ちいい朝だった🌞 #公開 #健康',2,'2025-06-06 06:30:00','2025-06-06 06:30:00'),
(1,'午後からの会議が長すぎた…でも頑張ったよ！ #公開 #会議 #頑張った',3,'2025-06-07 15:00:00','2025-06-07 15:00:00'),
(1,'今日は久しぶりに友達と飲みに行った！楽しかったなぁ #公開 #飲み会',4,'2025-06-08 20:00:00','2025-06-08 20:00:00'),
(1,'仕事帰りに本屋さんで立ち読み #公開 #読書',2,'2025-06-09 18:00:00','2025-06-09 18:00:00'),
(1,'今日も一日頑張った！明日も仕事がんばろう！ #公開 #仕事 #頑張った',1,'2025-06-10 17:00:00','2025-06-10 17:00:00'),
(1,'今日は買い物してたくさん歩いた〜疲れたけど楽しかった！ #公開 #ショッピング',2,'2025-06-11 14:00:00','2025-06-11 14:00:00'),
(2,'今日は大好きな映画を観てきた！最高だった #公開 #映画',1,'2025-06-05 20:00:00','2025-06-05 20:00:00'),
(2,'久しぶりにゆっくりできた日曜日。のんびり過ごせた #公開 #リラックス',3,'2025-06-06 12:00:00','2025-06-06 12:00:00'),
(2,'今日はちょっと風邪気味。無理せず休んだ方が良さそう #公開 #体調不良',4,'2025-06-07 09:00:00','2025-06-07 09:00:00'),
(2,'ランチに美味しいカレーを食べた！午後からも頑張るぞ #公開 #カレー',1,'2025-06-08 13:00:00','2025-06-08 13:00:00'),
(2,'気になるニュースを見て一日中考えてた。今後どうなるんだろう #公開 #ニュース',2,'2025-06-09 19:00:00','2025-06-09 19:00:00'),
(2,'やっぱり音楽っていいな〜 今日は音楽をたくさん聴いた #公開 #音楽',3,'2025-06-10 22:00:00','2025-06-10 22:00:00'),
(2,'今日は少し疲れたけど、明日が楽しみ！ #公開 #前向き',1,'2025-06-11 16:00:00','2025-06-11 16:00:00'),
(3,'友達と遊びに行ってきた！楽しい時間だったなぁ #公開 #友達',1,'2025-06-05 14:00:00','2025-06-05 14:00:00'),
(3,'朝は早起きして散歩した！すっきりした一日 #公開 #散歩 #朝活',2,'2025-06-06 07:00:00','2025-06-06 07:00:00'),
(3,'今日は家でゆっくり過ごした。のんびりできた #公開 #休日',2,'2025-06-07 13:00:00','2025-06-07 13:00:00'),
(3,'ちょっと勉強してみたけど、難しかった #公開 #勉強',3,'2025-06-08 16:00:00','2025-06-08 16:00:00'),
(3,'久しぶりに外でご飯を食べた！美味しかった〜 #公開 #外食',4,'2025-06-09 19:00:00','2025-06-09 19:00:00'),
(3,'最近、朝のジョギングが習慣になってきた！気持ちいい #公開 #ジョギング',1,'2025-06-10 06:30:00','2025-06-10 06:30:00'),
(3,'夜遅くまで仕事が続いて疲れたけど、明日も頑張ろう #公開 #仕事 #疲れた',2,'2025-06-11 23:00:00','2025-06-11 23:00:00'),
(4,'今日は親とランチに行ってきた！久しぶりにゆっくり話せた #公開 #家族',1,'2025-06-05 12:00:00','2025-06-05 12:00:00'),
(4,'今日は久しぶりにカラオケ行った！歌ってストレス発散 #公開 #カラオケ',2,'2025-06-06 20:00:00','2025-06-06 20:00:00'),
(4,'最近運動不足だな〜 今日から少しずつ運動しようと思う #公開 #健康',3,'2025-06-07 09:00:00','2025-06-07 09:00:00'),
(4,'今日は仕事が忙しくて、帰るのが遅くなった… #公開 #仕事 #疲れた',4,'2025-06-08 21:00:00','2025-06-08 21:00:00'),
(4,'久しぶりにドライブに行った！風を感じてリフレッシュできた #公開 #ドライブ',1,'2025-06-09 15:00:00','2025-06-09 15:00:00'),
(4,'やっと週末！今日はリラックスして過ごすつもり #公開 #リラックス',2,'2025-06-10 11:00:00','2025-06-10 11:00:00'),
(4,'最近、健康を意識して毎日野菜を食べてる！ #公開 #健康',1,'2025-06-11 08:00:00','2025-06-11 08:00:00'),
(5,'今日は仕事を終えてから映画を観に行った！とても面白かった #公開 #映画',1,'2025-06-05 19:00:00','2025-06-05 19:00:00'),
(5,'昨日の雨、すごかったなぁ。今日は晴れてよかった！ #公開 #天気',2,'2025-06-06 10:00:00','2025-06-06 10:00:00'),
(5,'今日は新しいレシピで料理を作ってみた！とても美味しかった #公開 #料理',3,'2025-06-07 18:00:00','2025-06-07 18:00:00'),
(5,'午後はちょっと気分が落ち込んだけど、友達と話して元気になった #公開 #気分転換',4,'2025-06-08 16:00:00','2025-06-08 16:00:00'),
(5,'今日は家でゆっくり映画を観ながら過ごした #公開 #映画 #リラックス',1,'2025-06-09 19:00:00','2025-06-09 19:00:00'),
(5,'今日は久しぶりに友達とアウトドアを楽しんだ！気持ちよかった #公開 #アウトドア',2,'2025-06-10 14:00:00','2025-06-10 14:00:00'),
(5,'来週から忙しくなるから、今週末はリラックスして過ごす予定 #公開 #リラックス',3,'2025-06-11 09:00:00','2025-06-11 09:00:00');

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
-- 前半 (1-11)
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (1, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (1, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (1, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (1, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (2, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (2, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (2, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (2, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (3, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (3, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (3, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (3, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (4, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (4, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (4, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (4, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (5, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (5, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (5, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (5, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (6, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (6, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (6, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (6, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (7, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (7, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (7, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (7, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (8, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (8, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (8, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (8, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (9, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (9, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (9, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (9, 4, 0, 0, 0, 1);

-- 後半 (12-20)
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (10, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (10, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (10, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (10, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (11, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (11, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (11, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (11, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (12, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (12, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (12, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (12, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (13, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (13, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (13, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (13, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (14, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (14, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (14, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (14, 4, 0, 0, 0, 1);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (15, 1, 1, 0, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (15, 2, 0, 1, 0, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (15, 3, 0, 0, 1, 0);
INSERT INTO reactions (diary_id, login_id, reaction1, reaction2, reaction3, reaction4) VALUES (15, 4, 0, 0, 0, 1);




--投稿
INSERT INTO posts (diary_id,hashtag_id) VALUES (1,1);
INSERT INTO posts (diary_id,hashtag_id) VALUES (1,2);
INSERT INTO posts (diary_id,hashtag_id) VALUES (2,1);
INSERT INTO posts (diary_id,hashtag_id) VALUES (3,1);

--画像
INSERT INTO images (name,mime_type,image_data) VALUES ('カラス','jpeg',LOAD_FILE('/path/to/test.png'));

--タイムライン
INSERT INTO diaries (sentence, stamp,resist_time, diary_time,login_id) VALUES ('テストデータ','1',now(),now(),1);
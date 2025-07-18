insert into books (name,author,overview) values ('坊っちゃん','夏
目漱石','ぼっちゃんが先生になって頑張ったけど結局ダメでした。');

insert into books (name,author,overview) values ('吾輩は猫である
','夏目漱石','吾輩は猫ですが失恋してから人間の前足の使い方が不
思議に思えました。');

insert into books (name,author,overview) values ('走れメロス','太
宰治','激怒して走ったら結構速かったので友人と殴り合いました。');

-- レビュー情報
INSERT INTO reviews (book_id, review_datetime, reviewer, review_text) VALUES 
(1, '2024-06-01 10:00:00', '山田太郎', '『坊ちゃん』は、無鉄砲で正義感の強い主人公が新しい環境で成長していく姿が描かれた作品です。松山の学校での教師生活を通じて、彼は初めて社会の厳しさや人間関係の複雑さに直面します。その中で彼が出会う正直な人々、特に親友の山嵐との友情は、彼の成長に大きな影響を与えました。彼の無鉄砲さは最後まで変わりませんが、その中にも少しずつ成熟していく様子が感じられます。坊ちゃんの純粋な心と友情の大切さが伝わる感動的な物語でした。'),
(1, '2024-06-02 11:00:00', '佐藤花子', '明治時代の日本社会の風刺としても読める作品でした。学校という閉鎖的な環境を通じて、権力や出世主義、そして偽善に満ちた人間関係が浮き彫りにされました。坊ちゃんはその中で異端児として振る舞いましたが、彼の正直さと正義感は、社会の矛盾や不条理を鋭く突きつけました。漱石はこの作品を通じて、読者に対して自己の信念を貫くことの重要性と、社会に対する批判的視点を持つことの大切さを訴えかけていました。'),
(1, '2024-06-03 12:00:00', '鈴木次郎', '本書の魅力は、そのユーモアと人間味あふれる描写にあります。坊ちゃんの率直で大胆な言動は、読者に笑いと共感をもたらします。彼の失敗やトラブルも、笑いの中に人間の持つ温かさや愛嬌を感じさせます。また、彼の周囲の人々も個性的で魅力的に描かれており、特に清との心温まるエピソードは印象的です。漱石の巧みな筆致により、読み手は坊ちゃんの世界に引き込まれ、その日常の中にある小さな喜びや悲しみを共に感じることができます。'),
(2, '2024-06-04 13:00:00', '高橋三郎', '『吾輩は猫である』は、漱石の鋭い風刺とユーモアに満ちた作品でした。猫の視点から描かれる人間社会の滑稽さや不条理は、現代にも通じるものがありました。特に、登場人物たちの個性豊かなキャラクターが織り成すエピソードは、笑いと共に深い洞察を与えてくれました。漱石の巧みな描写と独特の語り口が、読者を飽きさせない魅力となっていました。日常の中に潜む人間の愚かさや矛盾を、ユーモラスに描き出す漱石の才能に改めて感嘆しました。'),
(2, '2024-06-05 14:00:00', '田中四郎', '猫の目を通して人間の世界を観察するという独特なアプローチが新鮮でした。猫の吾輩が冷静かつ辛辣に人間たちを観察する姿勢は、時に辛辣でありながらも愛情を感じさせるものでした。猫の視点から描かれる日常生活の中に、人間の本質や社会の問題点が浮かび上がってくる様子が興味深かったです。漱石の観察力と洞察力が存分に発揮された作品であり、猫を通じて人間社会を考えさせられる貴重な体験でした。'),
(2, '2024-06-06 15:00:00', '伊藤五郎', '本書は、単なる娯楽小説ではなく、深い哲学的な問いかけを含んだ作品でした。猫の吾輩が繰り広げる独白や人間観察は、時に哲学的な思索を誘い、人生や社会について考えさせられました。漱石の言葉選びや文体は、美しくも重厚で、文学作品としての高い価値を感じさせました。特に、物語の終盤にかけての展開は、猫の存在を超えた普遍的なテーマを扱っており、読む者に深い感銘を与えました。漱石の文学的才能と哲学的洞察が見事に融合した名作だと感じました。'),
(3, '2024-06-07 16:00:00', '渡辺六郎', '『走れメロス』を読んで、友情と信頼の美しさに深く感動しました。メロスが親友のセリヌンティウスを救うために命をかける姿は、まさに真の友情の象徴でした。彼が絶望しながらも諦めずに走り続ける姿に、強い意志と信念を感じました。最後に二人が再会し、涙ながらに抱き合うシーンは感動的で、友情の尊さを改めて考えさせられました。太宰治の描写力と物語の展開に引き込まれ、最後まで一気に読んでしまいました。'),
(3, '2024-06-08 17:00:00', '中村七子', '人間の弱さと強さを描いた作品だと感じました。メロスが王に捕らえられた時、彼は一度は絶望し、自分の無力さを嘆きました。しかし、友人を救うために再び立ち上がり、全力で走る姿は、人間の強さを象徴していました。物語を通じて、私たちは自分の中にもこのような強さがあることを信じる勇気をもらいました。太宰治は、シンプルな物語の中に深い人間性を描き出しており、その才能に感銘を受けました。'),
(3, '2024-06-09 18:00:00', '小林八郎', '本書を読んで、文学的な価値と教訓の深さに驚きました。メロスの物語は、古典的な英雄譚のようでありながら、太宰治特有の繊細な心理描写が光っています。彼の絶望や希望、そして友人への強い愛情が巧みに描かれており、読者は自然と物語に引き込まれました。この作品は、信頼と誠実の大切さを教えてくれました。特に、最後のシーンでのメロスとセリヌンティウスの抱擁は、読む者に深い感動を与えました。太宰治の文学的才能を改めて感じさせる一作でした。');

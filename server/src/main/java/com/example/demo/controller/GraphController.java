package com.example.demo.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diary;
import com.example.demo.entity.Keyword;
import com.example.demo.entity.Synonyms;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.KeywordsRepository;

import jakarta.servlet.http.HttpSession;


@RestController
public class GraphController {

	@Autowired
	private KeywordsRepository kwrepository;
	
	@Autowired
	private DiariesRepository darepository;
	
	
	@GetMapping("/graph")
	public Map<String,Object> graph(
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day,
		String mode, HttpSession session) {

//		ユーザー情報を取得する。
		String loginId = (String) session.getAttribute("loginId");
		if (loginId == null) {
		    throw new RuntimeException("ログインしていません");
		}
//		全体のデータを格納するMap
		Map<String, Object> responseData = new HashMap<>();
//		1. 感情スタンプのカウントデータ
		Map<Integer, Integer> stamptallies = new HashMap<>();
//		2. キーワード分析のデータ
		Map<String, Integer> keywordcountsmap = new HashMap<>();
//		選択された日付のnullチェックをする。
		if (day == null) {
			day = LocalDate.now();
		}
//		選択された日付の月の始まりと終わりを取得する。
        LocalDate startofmonth = day.withDayOfMonth(1);
        LocalDate endofmonth = day.withDayOfMonth(day.lengthOfMonth());
        
		if ("1".equals(mode)) {

		} else if ("2".equals(mode)) {
	        startofmonth = day;
	        endofmonth = day.plusMonths(1).minusDays(1);
		} else {}
//		そのユーザーに合わせた感情スタンプの数(月範囲)を取得する。
// 		Diaryのrepositoryで操作する。
		List<Diary> diarylist = darepository.findByUserLoginIdAndDiaryTimeBetween(loginId, startofmonth,endofmonth);
		// ★ここからstampのカウントロジックを追加★
		for (Diary diaries : diarylist) {
		    Integer stampValue = diaries.getStamp(); // DiaryエンティティにgetStamp()メソッドがあると仮定
		    if (stampValue != null) { // stampがnullでないことを確認
		    	stamptallies.put(stampValue, stamptallies.getOrDefault(stampValue, 0) + 1);
		    }
		}
		// ★keywordCountsと同様に、大元のresponseDataに追加★
		responseData.put("stamptallies", stamptallies); // 例: "stampCounts"というキーで追加
		
//		キーワード一覧を取得。
        List<Keyword> keywords = kwrepository.findAll();
//		ユーザーの一か月分の日記を取得。
        for (Diary diary : diarylist) {
            String sentence = diary.getSentence();
            if (sentence == null) continue;

            for (Keyword keyword : keywords) {
                String mainWord = keyword.getKeywords();
                boolean matched = false;

                // メインワードにマッチするか
                if (mainWord != null && sentence.contains(mainWord)) {
                    matched = true;
                }

                // 類義語にマッチするか
                List<Synonyms> synonyms = keyword.getSynonyms();
                if (!matched && synonyms != null) {
                    for (Synonyms syn : synonyms) {
                        String synWord = syn.getSynonym();
                        if (synWord != null && sentence.contains(synWord)) {
                            matched = true;
                            break; // 1個マッチしたらそれで十分
                        }
                    }
                }

                // どれか一つでもマッチしたらカウント
                if (matched) {
                    keywordcountsmap.put(mainWord, keywordcountsmap.getOrDefault(mainWord, 0) + 1);
                }
            }
        }
		List<Map<String, Object>> keywordcountslist = new ArrayList<>();
      for (Map.Entry<String, Integer> entry : keywordcountsmap.entrySet()) {
          Map<String, Object> item = new HashMap<>();
          item.put("word", entry.getKey());
          item.put("count", entry.getValue());// "count" というキー名にする
          keywordcountslist.add(item);
      }
////		一か月分の日記の中から、キーワードをカウントする。		
//		for (Diary diaries : diarylist) {
//            String sentence = diaries.getSentence();
//            if (sentence == null) continue; // nullチェックは重要
//
//            for (Keyword keyword : keywords) {
//                String word = keyword.getKeywords(); // KeywordエンティティのgetterがgetWord()だと仮定
//                // もしKeywordエンティティのフィールド名が"keywords"なら、keyword.getKeywords()
//                if (word == null) continue; // nullチェック
//
//                if (sentence.contains(word) ) {
//                    keywordcountsmap.put(word, keywordcountsmap.getOrDefault(word, 0) + 1);
//                }
//            }
//        }
//
//		List<Map<String, Object>> keywordcountslist = new ArrayList<>();
//        for (Map.Entry<String, Integer> entry : keywordcountsmap.entrySet()) {
//            Map<String, Object> item = new HashMap<>();
//            item.put("word", entry.getKey());
//            item.put("count", entry.getValue());// "count" というキー名にする
//            keywordcountslist.add(item);
//        }
        responseData.put("start", startofmonth);
        responseData.put("end", endofmonth);
        // 取得した情報を、responseDataに追加する
        responseData.put("keywordcounts", keywordcountslist); // キー名 "keywordCounts" で追加
//		カウントされたキーワードに応じた文章を取得する。
		System.out.println(keywordcountslist);
		System.out.println(stamptallies);
		System.out.println(responseData);

		
//		情報を格納した変数を画面側に渡す。
		return responseData;
	}
}

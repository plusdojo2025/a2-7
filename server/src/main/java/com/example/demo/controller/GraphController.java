package com.example.demo.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diaries;
import com.example.demo.entity.Keyword;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.KeywordsRepository;


@RestController
public class GraphController {

	@Autowired
	private KeywordsRepository kwrepository;
	
	@Autowired
	private DiariesRepository darepository;
	
	@GetMapping("/graph")
	public Map<String,Object> graph(
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day) {
		
//		ユーザー情報を取得する。
		
//		全体のデータを格納するMap
		Map<String, Object> responseData = new HashMap<>();
//		1. 感情スタンプのカウントデータ
		Map<Integer, Integer> stamptallies = new HashMap<>();
//		2. キーワード分析のデータ
		Map<String, Integer> keywordcounts = new HashMap<>();
		
//		選択された日付のnullチェックをする。
		if (day == null) {
			day = LocalDate.now();
		}
//		選択された日付の月の始まりと終わりを取得する。
        LocalDate startofmonth = day.withDayOfMonth(1);
        LocalDate endofmonth = day.withDayOfMonth(day.lengthOfMonth());
		
//		そのユーザーに合わせた感情スタンプの数(月範囲)を取得する。
// 		Diaryのrepositoryで操作する。
		int loginId = 1;
		List<Diaries> stamplist = darepository.stampcounts();
		// ★ここからstampのカウントロジックを追加★
		for (Diaries diaries : stamplist) {
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
		List<Diaries> diarylist = darepository.findByLoginIdAndDiaryTimeBetween(loginId, startofmonth,endofmonth);
//		一か月分の日記の中から、キーワードをカウントする。		
		for (Diaries diaries : diarylist) {
            String sentence = diaries.getSentence();
            if (sentence == null) continue; // nullチェックは重要

            for (Keyword keyword : keywords) {
                String word = keyword.getKeywords(); // KeywordエンティティのgetterがgetWord()だと仮定
                // もしKeywordエンティティのフィールド名が"keywords"なら、keyword.getKeywords()
                if (word == null) continue; // nullチェック

                if (sentence.contains(word)) {
                    keywordcounts.put(word, keywordcounts.getOrDefault(word, 0) + 1);
                }
            }
        }

        // 取得した情報を、responseDataに追加する
        responseData.put("keywordcounts", keywordcounts); // キー名 "keywordCounts" で追加
//		カウントされたキーワードに応じた文章を取得する。
		System.out.println(keywordcounts);
		System.out.println(stamptallies);
		System.out.println(responseData);

		
//		情報を格納した変数を画面側に渡す。
		return responseData;
	}
}

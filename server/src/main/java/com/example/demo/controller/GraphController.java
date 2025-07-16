package com.example.demo.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Keyword;
import com.example.demo.repository.KeywordsRepository;

@RestController
public class GraphController {

	@Autowired
	private KeywordsRepository kwrepository;
	
	@GetMapping("/analysis/graph")
	public String graph(
		@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day) {
//		ユーザー情報を取得する。
		
//		全体のデータを格納するMap
		Map<String, Object> responseData = new HashMap<>();
//		1. 感情スタンプのカウントデータ
		Map<Integer, Integer> stampcounts = new HashMap<>();
//		2. キーワード分析のデータ
		Map<String, Integer> keywordcount = new HashMap<>();
		
//		選択された日付のnullチェックをする。
		if (day == null) {
			day = LocalDate.now();
		}
//		選択された日付の月の始まりと終わりを取得する。
        LocalDate startofmonth = day.withDayOfMonth(1);
        LocalDate endofmonth = day.withDayOfMonth(day.lengthOfMonth());
		
//		そのユーザーに合わせた感情スタンプの数(月範囲)を取得する。
        
		
		
		
//		キーワード一覧を取得。
        Map<String,Integer> keywords = KeywordsRepository.findAll();
        
//		ユーザーの一か月分の日記を取得。
		
//		一か月分の日記の中から、キーワードをカウントする。		
		
//		カウントされたキーワードに応じた文章を取得する。
		
//		取得した情報を変数に格納する。		
		
//		情報を格納した変数を画面側に渡す。
		
		return 
	}
}

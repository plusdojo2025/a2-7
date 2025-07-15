package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.ReactionsRepository;

@Controller
public class TimelineController {

	@Autowired
	private CommentsRepository commentsrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	
	//タイムライン書記表示
	@GetMapping("/timeline")
	public String timeline(){
		return "timeline";
	}
	
	//タグ検索（未解決）
	@PostMapping("/timeline/tag")
	public String tag(){
		return "redirect:/timeline/tag/?tag=" + tags.toString();
	}
	
	//リアクションスタンプ処理
	@PostMapping("/timeline/stamp")
	public String stamp(){
		return "redirect:/timeline";
	}
}

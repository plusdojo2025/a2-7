package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Reaction;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.ReactionsRepository;

@Controller
public class TimelineController {

	@Autowired
	private CommentsRepository commentsrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	
	@Autowired
	private TagsRepository tagsrepository;
	
	@Autowired
	private Diarysrepository diarysrepository;
	
	@Autowired
	private Postsrepository postsrepository;
	
	
	//タイムライン書記表示
	@GetMapping("/timeline")
	public String timeline(Model model){
		List<Post>posts= postsrepository.getPosts(hashtag_id);//日記を時間順で取得
		model.addAttribute("posts",posts);
		return "timeline";
	}
	
	//タグ検索（未解決）
	@PostMapping("/timeline/tag")
	public String tag(@ModelAttribute Tag tag,Model model){
		List<Post>posts= postsrepository.getPosts(hashtag_id);//ハッシュタグIDで日記検索
		model.addAttribute("posts",posts);
		return "redirect:/timeline/tag/?tag=" + tag.tags.toString();//タグの名前を取ってくる
	}
	
	//リアクションスタンプ処理
	@PostMapping("/timeline/stamp")
	public String stamp(@ModelAttribute Reaction reaction){
		reactionsrepository.save(reaction);
		return "redirect:/timeline";
	}
}

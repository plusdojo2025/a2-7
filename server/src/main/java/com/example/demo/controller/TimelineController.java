package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

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
	private Diariesrepository diariesrepository;
	
	@Autowired
	private Postsrepository postsrepository;
	
	
	
	
	//タイムライン初期表示
	@GetMapping("/timeline")
	public String timeline(Model model){
		
		
		//日記を時間順で取得
		List<Post>posts= postsrepository.findAll();
		
		//日記IDでリアクションを取得
		List<List<Reaction>> reactionslist=new ArrayList<>();
		
		for(Post i:posts) {
			//日記ごとのリアクションリストを追加していく
			reactionslist.add(reactionsrepository.findByDiary_id(0));//diary_id
		}
		
		//日記IDコメント数を取得
		int[] comentslist= new int[posts.size()];
		for(int i=0; i<posts.size();i++) {
			comentslist[i]=commentsrepository.countByDiary_id(0);//diary_id
		}
		
		
		model.addAttribute("posts",posts);
		model.addAttribute("reactionslist",reactionslist);
		model.addAttribute("comentslist",comentslist);
		return "timeline";
	}
	
	//タグ検索（未解決）
	@PostMapping("/timeline/tag")
	public String tag(@ModelAttribute Tag tag,Model model){
		
		//ハッシュタグIDで日記検索
		List<Didary>diaries= diariesrepository.findByHashtag_id(hashtag_id).get();
		model.addAttribute("diaries",diaries);
		
		return "redirect:/timeline/tag/?tag=" + tag.tags.toString();//タグの名前を取ってくる
	}
	
	//リアクションスタンプ処理
	@PostMapping("/timeline/stamp")
	public String stamp(@ModelAttribute Reaction reaction){
		//リアクションの反応を登録（既存データがある場合は更新）
		reactionsrepository.save(reaction);
		return "redirect:/timeline";
	}
}

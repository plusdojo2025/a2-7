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
	
	@Autowired
	private Usersrepository usersrepository;
	
	
	//タイムライン初期表示
	@GetMapping("/timeline")
	public String timeline(Model model){
		
		
		//日記を時間順で取得
		List<Post>postList= postsrepository.findAll();
		
		//日記IDでリアクションを取得
		//数字の配列で返す？
		List<List<Reaction>> reactionList=new ArrayList<>();
		for(Post i:postList) {
			//日記ごとのリアクションリストを追加していく
			reactionList.add(reactionsrepository.findByDiary_id(0));//diary_id
			//もしTrueなら数を増やす（最終的にリアルタイムで反映させる）
		
		}
		
		int[] reaction4 = {0,0,0,0};
		
		//日記IDコメント数を取得
		int[] comentList= new int[postList.size()];
		for(int i=0; i<postList.size();i++) {
			comentList[i]=commentsrepository.countByDiary_id(0);//diary_id
		}
		
		//日記ごとのユーザー情報を取得
		List<User> userList=new ArrayList<>();
		for(Post pos:postList) {
			//日記ごとのユーザーを追加していく
			int login_id=pos.getLogin_id();//書き方後で確認
			userList.add(usersrepository.findByLogin_id(0));//login_id
		}
		
		model.addAttribute("postList",postList);
		model.addAttribute("reactionList",reactionList);
		model.addAttribute("comentList",comentList);
		model.addAttribute("userList",userList);
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

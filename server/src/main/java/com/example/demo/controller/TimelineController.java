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
import com.example.demo.entity.Tag;
import com.example.demo.entity.Timeline;
import com.example.demo.entity.User;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;

@Controller
public class TimelineController {

	@Autowired
	private CommentsRepository commentsrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	

	@Autowired
	private TagsRepository tagsrepository;
	
	@Autowired
	private DiariesRepository diariesrepository;
	
	@Autowired
	private PostsRepository postsrepository;
	
	@Autowired
	private UsersRepository usersrepository;
	
	
	//タイムライン初期表示
	@GetMapping("/timeline")
	public Timeline timeline(@ModelAttribute Tag tag,Model model){
		
		
		//ハッシュタグで日記を時間順で取得
		//現在全件取得になっている。まだできていない
		List<Diary>diaryList= diariesrepository.findAll();
		List<int[]> reaction4 = new ArrayList<>();
		
		//日記IDでリアクションを取得
		List<List<Reaction>> reactionList=new ArrayList<>();
		for(int i=0;i<diaryList.size();i++) {
			//日記ごとのリアクションリストを追加していく
			List<Reaction> reaction=reactionsrepository.findByDiary_id(0);//diary_id
			reactionList.add(reaction);
			
			//もしTrueなら数を増やす（最終的にリアルタイムで反映させる）
			for(int j=0;j<reaction.size();j++) {
				if(reaction.get(j).getReaction1()==true) {
					reaction4.get(i)[0]+=1;
				}
				if(reaction.get(j).getReaction2()==true) {
					reaction4.get(i)[1]+=1;
				}
				if(reaction.get(j).getReaction3()==true) {
					reaction4.get(i)[2]+=1;
				}
				if(reaction.get(j).getReaction4()==true) {
					reaction4.get(i)[3]+=1;
				}
			}
		}
		

		//日記IDでコメント数を取得
		int[] comentList= new int[diaryList.size()];
		for(int i=0; i<diaryList.size();i++) {
			comentList[i]=commentsrepository.countByDiary_id(0);//diary_id
		}
		
		//日記ごとのユーザー情報を取得
		List<User> userList=new ArrayList<>();
		for(Diary diary:diaryList) {
			//日記ごとのユーザーを追加していく
			int login_id=diary.getLogin_id();//書き方後で確認
			userList.add(usersrepository.findByLogin_id(0));//login_id
		}
		
		//タグの扱いが分からんです。
		Timeline TimelineData= {diaryList,reactionList,comentList,userList};
		return TimelineData;
	}
	
	//タグ検索（未解決）
	@PostMapping("/timeline/tag")
	public String tag(@ModelAttribute Tag tag,Model model){
		
		//ハッシュタグIDで日記検索
		List<Didary>diaries= diariesrepository.findByHashtag_id(hashtag_id).get();
		model.addAttribute("diaries",diaries);
		
		return "redirect:/timeline/tag/?tag=" + tag.getTags();//タグの名前を取ってくる
	}
	
	//リアクションスタンプ処理
	@PostMapping("/timeline/stamp")
	public String stamp(@ModelAttribute Reaction reaction){
		//リアクションの反応を登録（既存データがある場合は更新）
		reactionsrepository.save(reaction);
		return "redirect:/timeline";
	}
}

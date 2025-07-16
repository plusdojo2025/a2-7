package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.ReactionsRepository;

@Controller
public class UserDiaryController {
	
	@Autowired
	private Usersrepository usersrepository;
	
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
	

	
	
	
	//日記詳細初期表示
	//ここにログインID書くと、タイムライン画面から移動した人にIDがばれてしまう
	@GetMapping("/diarypage")
	public String diarypage(@ModelAttribute Diary diary,Model model){
		
		//日記を書いたユーザー情報取得
		User user=usersrepository.findByLogin_id(0);//diary.getLogin_id()
		
		//コメントList取得
		List<Comment> comment =commentsrepository.findByDiary_id(0);//diary.getdiary_id()
		
		//コメントごとのユーザー情報取得
		List<List<User>> comUser=new ArrayList<>();
		
		for(int i=0;i<comment.size();i++) {
			comUser.add(usersrepository.findByLogin_id(comment.get(i).getLogin_id()));
		}
		
		return "diarypage";
	}
	
	
	//コメント送信(コメント登録)
	//タイムライン画面の方にいた方が分かりやすかったら移動します。
	@PostMapping("/timeline/comment")
	public String diarypage(@ModelAttribute Comment comment){
		//リアクションの反応を登録（既存データがある場合は更新）
		commentsrepository.save(comment);
		return "redirect:/diarypage";
	}
	
	//日記更新
	//日記削除
		
}
		
			
			
			

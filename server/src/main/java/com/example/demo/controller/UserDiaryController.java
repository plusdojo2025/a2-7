package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Diary;
import com.example.demo.entity.User;
import com.example.demo.entity.UserDiary;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;

@Controller
public class UserDiaryController {
	
	@Autowired
	private UsersRepository usersrepository;
	
	@Autowired
	private CommentsRepository commentsrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	

	@Autowired
	private TagsRepository tagsrepository;
	
	@Autowired
	private DiariesRepository diariesrepository;
	

	

	
	
	
	//日記詳細初期表示
	//ここにログインID書くと、タイムライン画面から移動した人にIDがばれてしまう
	@GetMapping("/diarypage")
	public UserDiary diarypage(@ModelAttribute Diary diary,Model model){
		
		//大元の日記情報の送り方はまだ不明
		
		
		//コメント一覧の情報取得
		//日記を書いたユーザー情報取得
		User user=usersrepository.findByLoginId(diary.getLogin_id());//diary.getLogin_id()
		
		//コメントList取得（新しい時間順）
		List<Comment> comment =commentsrepository.findByDiary_id(0);//diary.getdiary_id()
		
		//コメントごとのユーザー情報取得
		List<User> comUser=new ArrayList<>();	
		for(int i=0;i<comment.size();i++) {
			comUser.add(usersrepository.findByLoginId(comment.get(i).getLogin_id()));
		}
		
		UserDiary userdiary=new UserDiary(comment,comUser);
		
		return userdiary;
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
		
			
			
			

package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Diary;
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
	@GetMapping("/diarypage/{diary_id}")
	public Diary diarypage(@PathVariable("diary_id") Integer diary_id){
		
		//日記データを取得
		Diary diarydata=diariesrepository.findByDiaryId(diary_id);
		
		return diarydata;
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
		
			
			
			

package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Diary;
import com.example.demo.entity.User;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;

@RestController
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
	@GetMapping("/diarypage/{diaryId}")
	public Diary diarypage(@PathVariable("diaryId") Integer diaryId){
		
		//日記データを取得
		Diary diarydata=diariesrepository.findByDiaryId(diaryId);
		
		return diarydata;
	}
	
	//日記詳細初期表示
	@GetMapping("/diarypage/user/{diaryId}")
	public User diarypageUser(@PathVariable("diaryId") Integer diaryId){
			
			//日記データを取得
		Diary diarydata=diariesrepository.findByDiaryId(diaryId);
<<<<<<< Updated upstream
		User userdata=usersrepository.findByLoginId(diarydata.getUser().getLoginId());
			
=======
		//String loginId = diarydata.getUser().getLoginId();
		//System.out.println(diarydata.getUser().getLoginId());
		//User userdata=usersrepository.findByLoginId(loginId);
		//System.out.println(userdata.getNickname());	
>>>>>>> Stashed changes
		//User userdata=usersrepository.findByLoginId("1");
		User user = diarydata.getUser();
		String loginId = user.getLoginId();
			return user;
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
		
			
			
			

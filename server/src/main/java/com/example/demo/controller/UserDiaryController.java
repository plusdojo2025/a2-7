package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

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
	@GetMapping("/diarypage")
	public String timeline(@ModelAttribute Diary diary,Model model){
		
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

}

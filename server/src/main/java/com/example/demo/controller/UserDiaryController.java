package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Diary;
import com.example.demo.entity.Reaction;
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
		User user = diarydata.getUser();
			return user;
	}
	
	//日記詳細初期表示
	@GetMapping("/diarypage/comment/user/{commentId}")
	public User diarypageComUser(@PathVariable("commentId") Integer commentId){
			
			//日記データを取得
		Comment comment = commentsrepository.findByCommentId(commentId);
		User user = comment.getUser();
		System.out.println(user.getNickname());
		return user;
	}
	
	//日記詳細初期表示
		@GetMapping("/timeline/reaction/{diaryId}")
		public int [] diarypagereaction(@PathVariable("diaryId") Integer diaryId){
				
				//日記データを取得
			Diary diary = diariesrepository.findByDiaryId(diaryId);
			int [] rea4= {0,0,0,0};
			for(Reaction r:diary.getReactions()) {
				if(r.getReaction1()) {
					rea4[0]++;
				}
				if(r.getReaction2()) {
					rea4[1]++;
				}
				if(r.getReaction3()) {
					rea4[2]++;
				}
				if(r.getReaction4()) {
					rea4[3]++;
				}
			}
			return rea4;
		}
		
		//日記詳細初期表示
				@GetMapping("/timeline/comsize/{diaryId}")
				public int diarypagecomsize(@PathVariable("diaryId") Integer diaryId){
					Diary diary = diariesrepository.findByDiaryId(diaryId);
					List<Comment> com =diary.getComments();
					
					return com.size();
				}
	
	//コメント送信(コメント登録)
	//タイムライン画面の方にいた方が分かりやすかったら移動します。
	@PostMapping("/timeline/comment")
	public Comment diarypage(@RequestBody Comment comment){
		commentsrepository.save(comment);
		return comment;
	}
	
	
	
	//日記更新
	//日記削除
		
}
		
			
			
			

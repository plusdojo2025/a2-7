package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Diary;
import com.example.demo.entity.Reaction;
import com.example.demo.entity.User;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.PostsRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

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
	
	@Autowired
	private PostsRepository postsrepository;
	

	
	
	
	//日記詳細初期表示
	@GetMapping("/diarypage/{diaryId}")
	public Diary diarypage(@PathVariable("diaryId") Integer diaryId,HttpSession session){
		
		String loginId = (String) session.getAttribute("loginId");
		if (loginId == null) {
		    throw new RuntimeException("ログインしていません");
		}
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
				
	
				//日記詳細初期表示
			@GetMapping("/myId")
			public ResponseEntity<?> myId(HttpSession session){
				String loginId = (String) session.getAttribute("loginId");
				if (loginId == null) {
					   throw new RuntimeException("ログインしていません");
				}
				 return ResponseEntity.ok(new String(loginId));
			}
	
	//コメント送信(コメント登録)
	//タイムライン画面の方にいた方が分かりやすかったら移動します。
	@PostMapping("/timeline/comment")
	public Comment diarypage(@RequestBody Comment comment,HttpSession session){
		
		String loginId = (String) session.getAttribute("loginId");
		if (loginId == null) {
		    throw new RuntimeException("ログインしていません");
		}
		
		User user=usersrepository.findByLoginId(loginId);
		comment.setUser(user);
		commentsrepository.save(comment);
		return comment;
	}
	
	
	
	//日記更新
	@PostMapping("/diarypage/update/{diaryId}")
	@ResponseBody // ← これが必要
	public Map<String, String> diarypageUpdate(@PathVariable("diaryId") Integer diaryId,
			@RequestBody Diary dia){
		System.out.println(dia.getSentence());
		
		Diary diary=diariesrepository.findByDiaryId(diaryId);
		
		diary.setSentence(dia.getSentence());
		diariesrepository.save(diary);
		
		
		Map<String, String> response = new HashMap<>();
		response.put("message", "更新しました");
	    return response; // JSON: {"message": "削除しました"}
	}
	
	//日記削除
		@GetMapping("/diarypage/delete/{diaryId}")
		@ResponseBody // ← これが必要
		public Map<String, String> diarypageDelete(@PathVariable("diaryId") Integer diaryId){
			postsrepository.deleteByDiary_DiaryId(diaryId);
			commentsrepository.deleteByDiaryId(diaryId);
			reactionsrepository.deleteByDiary_DiaryId(diaryId);
			diariesrepository.deleteByDiaryId(diaryId);
			
			Map<String, String> response = new HashMap<>();
			response.put("message", "削除しました");
		    return response; // JSON: {"message": "削除しました"}
		}
		
		
		//表示
		//imageIdとnicknameとaFewWordsとisownerの結果を取得して表示
		@GetMapping("/mypage/data/{loginId2}")
		public Map<String, Object> showMyPage(HttpSession session
				,@PathVariable("loginId2") String loginId2) {
			//ログイン画面の作成者に確認→ログイン時にsessionに保持している
			//sessionからloginIdを取り出す
		    String loginId = (String) session.getAttribute("loginId");
		    if (loginId == null) {
		        throw new RuntimeException("ログインしていません");
		    }

		    User user = usersrepository.findByLoginId(loginId2);

		    return Map.of(
		        "nickname", user.getNickname(),
		        "afewWords", user.getAFewWords(),
		        "imageId", user.getImageId(),
		        "isOwner", true  // ← フロントに明示的に返す
		    );
		}
		
}
		
			
			
			

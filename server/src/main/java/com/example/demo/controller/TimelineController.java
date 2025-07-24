package com.example.demo.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diary;
import com.example.demo.entity.Post;
import com.example.demo.entity.Reaction;
import com.example.demo.entity.Tag;
import com.example.demo.entity.User;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.PostsRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
public class TimelineController {

	@Autowired
	private CommentsRepository commentsrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	
	@Autowired
	private PostsRepository postsrepository;

	@Autowired
	private TagsRepository tagsrepository;
	
	@Autowired
	private DiariesRepository diariesrepository;
	
	
	@Autowired
	private UsersRepository usersrepository;
	
	
	
	
	//タイムライン初期表示
	@GetMapping("/timeline")
	public List<Diary> timeline(@ModelAttribute Tag tag,Model model,HttpSession session){
		
		if(session.getAttribute("loginId")!= null) {
		String loginId=(String)session.getAttribute("loginId");
		}
		//else {
			//ログイン画面に戻る
			//専用のGET作る？
			//return null;
		//}
		
		//現在全件取得になっている。まだできていない
		List<Diary>diaryList= diariesrepository.findAll();
		System.out.println(diaryList.size()+"個のデータがあるよ");	
		
		// リストが空でないか確認
	    if (diaryList.isEmpty()) {
	        // 空の場合の処理（例えば、空のリストを返す、エラーメッセージを設定など）
	        System.out.println("タイムラインに表示するデータがありません");
	        return Collections.emptyList();  // 空のリストを返す
	    }
	
		return diaryList;
	}
	
	//日記詳細初期表示	
	@GetMapping("/timeline/hash/{diaryId}")
	public User diarypageUser(@PathVariable("diaryId") Integer diaryId){
				
				//日記データを取得
				Diary diarydata=diariesrepository.findByDiaryId(diaryId);
				User userdata=usersrepository.findByLoginId(diarydata.getUser().getLoginId());
				//User userdata = usersrepository.findByLoginId("1");
				return userdata;
			}
	
	//日記詳細初期表示	
	@GetMapping("/timeline/tag/{diaryId}")
		public List<Tag> diarypageTag(@PathVariable("diaryId") Integer diaryId){
					
					//日記データを取得
					Post postdata=postsrepository.findByDiaryId(diaryId);
					
					
					return null;
				}
	
	//タグ検索（未解決）
	@PostMapping("/timeline/tag")
	public List<Diary> tag(@ModelAttribute Tag tag,Model model){
		
		//ハッシュタグIDで日記検索
		int id=tag.getHashtagId();
		//List<Diary>diaries= diariesrepository.findByHashtagId(id);//hashtag_id
		
		return null;
	}
	
	//リアクションスタンプ処理
	@PostMapping("/timeline/stamp")
	public String stamp(
			@RequestParam("diary") Diary diary,
			@RequestParam("login_id") String loginId,
			@RequestParam("reaction1") Boolean reaction1,
			@RequestParam("reaction2") Boolean reaction2,
			@RequestParam("reaction3") Boolean reaction3,
			@RequestParam("reaction4") Boolean reaction4){
		
		Reaction data=new Reaction(diary.getDiaryId(), diary,loginId
				,reaction1,reaction2,reaction3,reaction4);
		//リアクションの反応を登録（既存データがある場合は更新）
		reactionsrepository.save(data);
		return "redirect:/timeline";
	}
}

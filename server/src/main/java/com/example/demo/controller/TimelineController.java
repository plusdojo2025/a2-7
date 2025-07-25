package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
		
		String loginId = (String) session.getAttribute("loginId");
		if (loginId == null) {
		    throw new RuntimeException("ログインしていません");
		}
		
		//現在全件取得になっている。まだできていない
		List<Diary>diaryList= diariesrepository.findAll(Sort.by(Sort.Order.desc("resistTime")));
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
	@GetMapping("/timeline/user/{diaryId}")
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
					List<Post> postdata=postsrepository.findByDiary_DiaryId(diaryId);
					
					List<Tag> tagList=new ArrayList<>();
					
					for(Post p:postdata) {
						tagList.add(p.getTag());
						System.out.println(p.getTag().getTags());
						}
					
					return tagList;
				}
	
	//日記詳細初期表示	
		@GetMapping("/timeline/myrea/{diaryId}")
		public int myrea(HttpSession session,@PathVariable("diaryId") Integer diaryId){
			String loginId = (String) session.getAttribute("loginId");
			Reaction rea=reactionsrepository.findByDiaryIdAndLoginId(diaryId,loginId);

			if(rea!=null) {
				if(rea.getReaction1()) {
					return 1;
				}
				else if(rea.getReaction2()) {
					return 2;
				}
				else if(rea.getReaction3()) {
					return 3;
				}
				else if(rea.getReaction4()) {
					return 4;
				}
			}
			return -1;
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
	@PostMapping("/timeline/stamp/{diaryId}")
	public Reaction stamp(
			@RequestBody Map<String, Integer> data,
			@PathVariable("diaryId") Integer diaryId,
			HttpSession session){
		
		String loginId = (String) session.getAttribute("loginId");
		Diary diary=diariesrepository.findByDiaryId(diaryId);
		
		Integer reaction = data.get("reaction");
		System.out.println(reaction);		
		Boolean reaction1=false;
		Boolean reaction2=false;
		Boolean reaction3=false;
		Boolean reaction4=false;
		
		if(reaction==-1) {
			return null;
		}
		
		if(reaction==1) {
			reaction1=true;
		}else if(reaction==2) {
			reaction2=true;
		}else if(reaction==3) {
			reaction3=true;
		}else if(reaction==4) {
			reaction4=true;
		}
		
		Reaction rea=new Reaction(diaryId, diary,loginId
				,reaction1,reaction2,reaction3,reaction4);
		
		
		//リアクションの反応を登録（既存データがある場合は更新）
		reactionsrepository.save(rea);
		return rea;
	}
	
	
	//日記詳細初期表示
			@GetMapping("/timeline/realist/{diaryId}")
			public List<Reaction> timelinereaction(@PathVariable("diaryId") Integer diaryId){
					
					//日記データを取得
				Diary diary = diariesrepository.findByDiaryId(diaryId);

				return diary.getReactions();
			}
			
			
			
			
			//リアクションスタンプ処理
			@GetMapping("/timeline/delrea/{diaryId}")
			public Reaction delrea(@PathVariable("diaryId") Integer diaryId,
					HttpSession session){
				
				String loginId = (String) session.getAttribute("loginId");
				Reaction reaction=reactionsrepository.findByDiaryIdAndLoginId(diaryId, loginId);
				reaction.setReaction1(false);
				reaction.setReaction2(false);
				reaction.setReaction3(false);
				reaction.setReaction4(false);
				
				reactionsrepository.save(reaction);
				return reaction;
			}
			
}

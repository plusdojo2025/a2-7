package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.Diary;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.PostsRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")

public class SearchController {
	
	@Autowired
	private TagsRepository tagsrepository;
	
//	  public List<Tag> getAllTags() {
//		  	List<Tag> tags = tagsrepository.findAll();
//	        return tags;
//	        }
//	  
	@Autowired
	private UsersRepository usersrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	
	@Autowired
	private CommentsRepository commentsrepository;
	
    @Autowired
    private DiariesRepository diaryRepository;
    
    @Autowired
    private PostsRepository postsrepository;


    
    //画像
//    @GetMapping("/user/image/{id}")
//    public ResponseEntity<String> getUserImage(@PathVariable Long id) {
//      String base64Image = UsersRepository.findById(id)
//        .map(User::getImageBase64)
//        .orElse("");
//
//      return ResponseEntity.ok(base64Image);
//    }

    		//タグ検索
    @GetMapping("/search")
    public List<Diary> searchByTag(@RequestParam(required = false) String tag,HttpSession session){    	
    	String loginId = (String) session.getAttribute("loginId");
    	if (tag == null || tag.trim().isEmpty()) {
        	return diaryRepository.findByUser_LoginIdOrderByResistTime(loginId);       	
        }
    	System.out.println(tag);
        return diaryRepository.findByUser_LoginIdAndSentenceLike(loginId,"%" + "#" + tag + "%");
    }
	

//@GetMapping("/search/user")
////public後を変更
//public  List<Diary> searchByTag(@RequestParam(required = false) String tag,HttpSession session){
//			String loginId = (String) session.getAttribute("loginId");
//			//日記データを取得
//			User userdata=usersrepository.findByLoginIdAndImageId(loginId);
//			//User userdata = usersrepository.findByLoginId("1");
//			return userdata;
//		}
    
//    @GetMapping("/users")
//    User userdata=usersrepository.findByLoginId(diarydata.getUser().getLoginId());
//loginIdとニックネームが欲しい


		//日記IDを用いて更新する
		@PostMapping("/update")
		public String update(@RequestBody Diary diary, RedirectAttributes redirectAttributes) {
			redirectAttributes.addFlashAttribute("message", "更新しました");
			diaryRepository.save(diary);
			return "redirect:/search";
		}

		//日記IDを用いて削除する
		@PostMapping("/delete")
		public String del(@RequestBody Diary diary, RedirectAttributes redirectAttributes) {
			redirectAttributes.addFlashAttribute("message", "削除しました");
			diaryRepository.delete(diary);
			return "redirect:/search";
		}
		
		
}



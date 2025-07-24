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
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;


@RestController
@RequestMapping("/search")
public class SearchController {
	
	@Autowired
	private TagsRepository tagsrepository;
	
	@Autowired
	private UsersRepository usersrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	
	@Autowired
	private CommentsRepository commentsrepository;
	
    @Autowired
    private DiariesRepository diaryRepository;
	
	//もし、null、空白、空文字であれば全件表示。そうでなければtagに入った文字を取得
//		@PostMapping("/tag/{tag}")
//		public String search(@PathVariable String tag, Model model) {
//			List<Tag> tags;
//			if(tag == null || tag.trim().isEmpty()) {
//				tags = tagsrepository.findAll();
//			}else {
//				tags = tagsrepository.findByTagsContaining(tag);
//			}
//			model.addAttribute("Tags", tags);
//			model.addAttribute("searchedTag", tag);
//			return "/search";
//		}
//	@GetMapping("/search")
//	@ResponseBody
//	public List<Diary> searchByKeywordAndLoginId(
//	        @RequestParam("keyword") String keyword,
//	        @RequestParam("loginId") String loginId) {
//
//	    List<Diary> diaries;
//
//	    if (keyword == null || keyword.trim().isEmpty()) {
//	        diaries = diariesrepository.findByLoginId(loginId);
//	    } else {
//	        diaries = diariesrepository.findByLoginIdAndTagContaining(loginId, keyword);
//	    }
//
//	    return diaries;
//	}
    		//タグ検索
    @GetMapping("/search")
    public List<Diary> searchByTag(@RequestParam(required = false) String tag) {
        if (tag == null || tag.isBlank()) {
            return diaryRepository.findAll();
        }
        return diaryRepository.findBySentenceLike("%" + "#" + tag + "%");
    }
	//リアクション取得


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



package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.Diary;
import com.example.demo.entity.Tag;
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
	private DiariesRepository diariesrepository;
	
	@Autowired
	private UsersRepository usersrepository;
	
	@Autowired
	private ReactionsRepository reactionsrepository;
	
	@Autowired
	private CommentsRepository commentsrepository;
	
	//もし、null、空白、空文字であれば全件表示。そうでなければtagに入った文字を取得
		@PostMapping("/tag/{tag}")
		public String search(@PathVariable String tag, Model model) {
			List<Tag> tags;
			if(tag == null || tag.trim().isEmpty()) {
				tags = tagsrepository.findAll();
			}else {
				tags = tagsrepository.findByNameContaining(tag);
			}
			model.addAttribute("Tags", tags);
			model.addAttribute("searchedTag", tag);
			return "/search/tag";
		}
	
		@GetMapping("/{username}/{date}")
		public String index(@PathVariable String username, @PathVariable String data, Model model) {
			
			return "/search";
		}

		@PostMapping("/update")
		public String update(@RequestBody Diary diary, RedirectAttributes redirectAttributes) {
			redirectAttributes.addFlashAttribute("message", "更新しました");
			diariesrepository.save(diary);
			return "redirect:/search";
		}
		
		@PostMapping("/delete")
		public String del(@RequestBody Diary diary, RedirectAttributes redirectAttributes) {
			redirectAttributes.addFlashAttribute("message", "削除しました");
			diariesrepository.delete(diary);
			return "redirect:/search";
		}
}



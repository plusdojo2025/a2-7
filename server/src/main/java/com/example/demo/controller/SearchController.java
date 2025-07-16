package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Tag;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;
import com.example.demo.repository.UsersRepository;


@Controller
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
		@PostMapping("/search/tag/{tag}")
		public String search(@PathVariable String tag, Model model) {
			List<Tag> tags;
			if(tag == null || tag.trim().isEmpty()) {
				tags = tagsrepository.findAll();
			}else {
				tags = tagsrepository.findByNameContaining(tag);
			}
			model.addAttribute("Tags", tags);
			model.addAttribute("searchedTag", tag);
			return "search/tag";
		}
	
		
		@GetMapping("/diarypage/{username}/{data}")
		public String index(Model model) {
			return "diarypage";
		}
	
		@PostMapping("/search/update/")
		public String update() {
			return "redirect:/diarypage/{username}/{data}";
		}
		
		@PostMapping("/search/delete/")
		public String delete() {
		return "redirect:/diarypage/{username}/{data}";
		}
}



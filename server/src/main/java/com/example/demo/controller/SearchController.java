package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diary;
import com.example.demo.entity.User;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")

public class SearchController {
	
	@Autowired
	private UsersRepository usersrepository;
	
    @Autowired
    private DiariesRepository diaryRepository;

    		//タグ検索
    @GetMapping("/search")
    public List<Diary> searchByTag(@RequestParam(required = false) String tag,HttpSession session){    	
    	String loginId = (String) session.getAttribute("loginId");
    	if (tag == null || tag.trim().isEmpty()) {
        	return diaryRepository.findByUser_LoginIdOrderByResistTimeDesc(loginId);       	
        }
    	System.out.println(tag);
        return diaryRepository.findByUser_LoginIdAndSentenceLikeOrderByResistTimeDesc(loginId,"%" + "#" + tag + "%");
    }
	

    @GetMapping("/search/user")
	//public後を変更
	public  User getUserInfo(HttpSession session) {
		String loginId = (String) session.getAttribute("loginId");
		return usersrepository.findByLoginId(loginId);
		}
		
}



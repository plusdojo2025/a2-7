package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.repository.UsersRepository;

@Controller
public class MyPageController {
	
	@Autowired
	private UsersRepository repository;
	
	@GetMapping("/mapage")
	public String mypage() {
		
		return "mypage";
	}
}

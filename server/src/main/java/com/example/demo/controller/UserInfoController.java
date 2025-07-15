package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.repository.UsersRepository;

@Controller
public class UserInfoController {
	
	@Autowired
	private UsersRepository repository;
	
	@GetMapping("/userinfo")
	public String userinfo() {
		
		return "userinfo";
	}
}

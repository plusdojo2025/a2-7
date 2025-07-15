package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.repository.CommentsRepository;

@Controller
public class TimelineController {

	@Autowired
	private CommentsRepository repository;
	
	@GetMapping("/timeline")
	public String timeline(){
		return "timeline";
	}
}

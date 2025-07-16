package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.demo.repository.ImagesRepository;

@Controller
public class ImagesController {
	
	@Autowired
	private ImagesRepository repository;
	
	
}

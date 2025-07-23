package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diary;
import com.example.demo.repository.DiariesRepository;

@RestController
@RequestMapping("/api/diaries")
@CrossOrigin(origins = "http://localhost:3000") // Reactのポート番号に合わせる

public class CalendarController {

	 @Autowired
	    private DiariesRepository diaryRepository;

	    @GetMapping
	    public List<Diary> getDiariesWithEmotion() {
	        return diaryRepository.findAll();
	    }
}

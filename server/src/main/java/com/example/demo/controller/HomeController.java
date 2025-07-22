package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diary;
import com.example.demo.repository.DiariesRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {

    @Autowired
    private DiariesRepository diaryRepository;

 
    // 日付指定で日記を取得（なければnull）
    @GetMapping("/diarypage")
    public Diary getDiaryByDate(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diary> diaryOpt = diaryRepository.findByDate(localDate);
        return diaryOpt.orElse(null);
    }

    // タグで日記検索（タグなしなら全件返す）
    @GetMapping("/search")
    public List<Diary> searchByTag(@RequestParam(required = false) String tag) {
        if (tag == null || tag.isBlank()) {
            return diaryRepository.findAll();
        }
        return diaryRepository.findByTagsContaining("#" + tag);
    }
}








package com.example.demo.controller.api;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diaries;
import com.example.demo.repository.DiariesRepository;

@RestController
@RequestMapping("/api/diaries")
public class HomeRestController {

    @Autowired
    private DiariesRepository diaryRepository;

    // 日付で日記を取得
    @GetMapping("/date/{date}")
    public ResponseEntity<Diaries> getDiariesByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return diaryRepository.findByDate(localDate)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    

    // タグで日記を検索するAPI
    @GetMapping("/tag")
    public List<Diaries> getDiariesByTag(@RequestParam String tag) {
        String searchTag = "#" + tag;
        return diaryRepository.findByTagsContaining(searchTag);
    }
}

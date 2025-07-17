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

import com.example.demo.entity.Diaries;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Reactと接続
public class HomeController {

    @Autowired
    private DiariesRepository diaryRepository;

    @Autowired
    private TagsRepository tagRepository;

    @Autowired
    private ReactionsRepository reactionRepository;

    // 日付指定で日記詳細を取得（存在しない場合はnull）
    @GetMapping("/diary")
    public Diaries getDiaryByDate(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diaries> diarypage = diaryRepository.findByDate(localDate);
        return diarypage.orElse(null); // フロントでnullなら登録画面へ遷移
    }

    // タグ検索（日記のタグに #タグ名 が含まれているものを取得）
    @GetMapping("/diary/search")
    public List<Diaries> searchByTag(@RequestParam(required = false) String tag) {
        if (tag == null || tag.isBlank()) {
            return diaryRepository.findAll(); // タグなしなら全件返す
        }
        return diaryRepository.findByTagsContaining("#" + tag);
    }

   
}
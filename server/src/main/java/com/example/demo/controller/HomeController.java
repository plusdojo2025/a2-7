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

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {

    @Autowired
    private DiariesRepository diaryRepository;

 
    // 日付指定で日記を取得（なければnull）
    @GetMapping("/diarypage")
    public Diary getDiaryByDate(@RequestParam String date,HttpSession session) {
    	String loginId = (String)session.getAttribute("loginId");
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diary> diaryOpt = diaryRepository.findFirstByDiaryTimeAndUser_LoginId(localDate,loginId);
        return diaryOpt.orElse(null);
    }

    // タグで日記検索（タグなしなら全件返す）
    @GetMapping("/diary_search")
    public List<Diary> searchByTag(@RequestParam(required = false) String tag,HttpSession session) {
    	String loginId = (String)session.getAttribute("loginId");
        if (tag == null || tag.isBlank()) {
        	List<Diary> all = diaryRepository.findByUser_LoginId(loginId);
        	System.out.println("全件取得: " + all.size());
        	return all;
        }
        
       // return diaryRepository.findByUser_LoginIdAndSentenceContaining(loginId, tag);

        String keyword = "%" + "#" + tag + "%";
        System.out.println("検索キーワード: " + keyword);

        List<Diary> result = diaryRepository.findByUser_LoginIdAndSentenceLike(loginId, keyword);
        System.out.println("検索結果件数: " + result.size());
        return result;
        
    }
}








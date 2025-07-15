package com.example.demo.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @Autowired
    private DiariesRepository diaryRepository;

    @GetMapping("/diaries/detail")
    public String diariesDetail(@RequestParam String date, Model model) {
        LocalDate localDate = LocalDate.parse(date); // 文字列を日付に変換
        Diaries diaries = diaryRepository.findByDate(localDate).orElse(null);
        model.addAttribute("diaries", diaries);
        return "diaries_detail"; // templates/diaries_detail.html を返す
    }
}

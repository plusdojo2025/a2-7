package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Diary;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ReactionsRepository;
import com.example.demo.repository.TagsRepository;

@Controller
public class HomeController {

    @Autowired
    private DiariesRepository diaryRepository;

    @Autowired
    private TagsRepository tagRepository;

    @Autowired
    private ReactionsRepository reactionRepository;

    // カレンダーの感情スタンプを押すと、その日の日記画面へ遷移
    @GetMapping("/userdiary")
    public String diariesDetail(@RequestParam String date, Model model) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diary> opt = diaryRepository.findByDate(localDate);
        if (opt.isPresent()) {
            model.addAttribute("diary", opt.get());
            return "diary_detail"; // 日記詳細ページ
        } else {
            return "redirect:/diary/new?date=" + date; // 日記がなければ登録画面へ
        }
    }

    // 日記を書いていない日なら、日記登録画面に遷移
    @GetMapping("/diary")
    public String newDiary(@RequestParam(required = false) String date, Model model) {
        model.addAttribute("date", date); // 日付だけ渡しておく
        return "diary_form"; // 日記登録フォーム
    }

    // タグが含まれる日記を表示
    @GetMapping("/userdiary")
    public String searchByTag(@RequestParam(required = false) String tag, Model model) {
        List<Diary> results;

        if (tag == null || tag.isBlank()) {
            results = diaryRepository.findAll(); // タグ未指定 → 一覧表示
        } else {
            results = diaryRepository.findByTagsContaining("#" + tag); // 部分一致検索
        }

        model.addAttribute("results", results);
        return "diary_list"; // 一覧を表示するHTML
    }
}
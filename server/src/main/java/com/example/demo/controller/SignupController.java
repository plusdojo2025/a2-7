package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SignupController {

    // 登録画面の表示
    @GetMapping("/Signup")
    public String showSignupForm() {
        return "Signup"; // register.htmlを表示
    }

    // 登録処理
    @PostMapping("/Signup")
    public String registerUser(
            @RequestParam String loginId,
            @RequestParam String password,
            @RequestParam String nickname) {

        // ここでDB保存処理など（今は簡略化して表示のみ）
        System.out.println("新規登録: " + loginId + ", " + nickname);

        // 登録完了後にトップ（ログイン画面）へ戻る
        return "redirect:/login";
    }
}
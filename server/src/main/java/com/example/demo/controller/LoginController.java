package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class LoginController {

    // ログイン画面表示
    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; // login.html を表示
    }

    // ログイン処理
    @PostMapping("/login")
    public RedirectView login(
            @RequestParam("loginId") String loginId,
            @RequestParam("password") String password) {

        // ここで認証処理を入れてもよい（今回は省略）

        // ログイン成功したと仮定して登録画面へリダイレクト
        return new RedirectView("/signup");
    }

    // 登録画面（遷移先）
    @GetMapping("/signup")
    public String showRegisterForm() {
        return "signup"; // signup.htmlを返す想定
    }
}
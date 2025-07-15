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

        // 認証処理をここに追加可能（今は省略）

        // ログイン成功後にホーム画面へリダイレクト
        return new RedirectView("/home");
    }

    // ホーム画面表示
    @GetMapping("/home")
    public String showHomePage() {
        return "home"; // home.html を表示
    }
}

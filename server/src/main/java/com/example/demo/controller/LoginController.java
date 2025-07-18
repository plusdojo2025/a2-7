package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class LoginController {

    // ログインページ表示
    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; // React から API を呼ぶので実際には使わない可能性大
    }

    // 仮のログイン処理
    @PostMapping("/api/login")
    public RedirectView login(
            @RequestParam String loginId,
            @RequestParam String password) {

        // 仮認証（本番はDB照合や認証ロジックを追加）
        if ("user".equals(loginId) && "pass".equals(password)) {
            return new RedirectView("/home");
        } else {
            return new RedirectView("/login?error=true");
        }
    }

    // 新規登録ページ表示
    @GetMapping("/signup")
    public String showSignupForm() {
        return "signup";
    }
}
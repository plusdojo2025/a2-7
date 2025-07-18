package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

@Controller
public class LoginController {

    @Autowired
    private UsersRepository usersRepository;

    // ログイン画面表示
    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; //  React 側で制御
    }

    // ログイン処理
    @PostMapping("/api/login")
    public RedirectView login(@RequestParam String loginId, @RequestParam String password) {
        Optional<User> userOpt = usersRepository.findByLoginId(loginId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // パスワード照合（平文）
            if (password.equals(user.getPassword())) {
                return new RedirectView("/home");
            }
        }

        return new RedirectView("/login?error=true");
    }
}
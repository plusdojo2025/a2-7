package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestParam String loginId,
                                     @RequestParam String password,
                                     HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        
        // バリデーション部分（最初にチェック）
        if (loginId == null || loginId.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            result.put("success", false);
            result.put("message", "ログインIDとパスワードを入力してください");
            return result;  // ← バリデーションエラーならすぐ終了
        }

        // ログインIDとパスワードの検証処理
        User user = usersRepository.findByLoginId(loginId);

        if (user != null) {
            if (user.getPassword().equals(password)) {
                session.setAttribute("loginId", loginId);
                result.put("success", true);
                //result.put("message", "ログイン成功");
            } else {
                result.put("success", false);
                result.put("message", "ログインIDが違います");
            }
        } else {
            result.put("success", false);
            result.put("message", "パスワードが違います");
        }
        return result;
    }

   
}
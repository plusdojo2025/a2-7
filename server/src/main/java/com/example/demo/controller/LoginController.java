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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestParam String loginId,
                                     @RequestParam String password) {
        Map<String, Object> result = new HashMap<>();

        // Optional を使わずに null チェック
        User user = usersRepository.findByLoginId(loginId);

        if (user != null) {
            if (user.getPassword().equals(password)) {
                result.put("success", true);
                result.put("message", "ログイン成功");
            } else {
                result.put("success", false);
                result.put("message", "パスワードが違います");
            }
        } else {
            result.put("success", false);
            result.put("message", "ユーザーが見つかりません");
        }

        return result;
    }

   
}
package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/signup")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // セッション共有を許可
public class SignupController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping
    public User registerUser(@RequestBody User user, HttpSession session) {
        System.out.println("新規登録: " + user.getLoginId() + ", " + user.getNickname());

        // ユーザー情報をDBに保存
        User savedUser = usersRepository.save(user);

        // セッションに loginId と nickname を保存
        session.setAttribute("loginId", savedUser.getLoginId());
        session.setAttribute("nickname", savedUser.getNickname());

        return savedUser;
    }
}
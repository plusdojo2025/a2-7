package com.example.demo.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

@Controller
public class UserInfoController {
	
	@Autowired
	private UsersRepository repository;
	

	// パスワード更新処理
	@PostMapping("/api/userinfo/update")
    public String updatePassword(
            @RequestParam String loginId,                  // どのユーザーか識別するために loginId も受け取る想定
            @RequestParam String currentPassword,
            @RequestParam String newPassword,
            Principal principal,
            Model model) {
		
		loginId = principal.getName(); // 安全に取得
        // loginId でユーザー情報を取得
        User user = repository.findByLoginId(loginId);
        if (user == null) {
            model.addAttribute("error", "ユーザーが見つかりません");
            return "/userinfo/update"; // パスワード更新画面に戻る
        }

        // 現在のパスワードが正しいかチェック
        if (!user.getPassword().equals(currentPassword)) {
            model.addAttribute("error", "現在のパスワードが違います");
            return "/userinfo/update";
        }

        // 新しいパスワードをセットして更新
        user.setPassword(newPassword);
        
		//更新されたユーザー情報をデータベースに保存（上書き）する。
		repository.save(user);
        
        model.addAttribute("message", "パスワードを更新しました");
        return "user"; 
    }
	
	
	
}

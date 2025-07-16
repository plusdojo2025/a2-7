package com.example.demo.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

@Controller
public class UserInfoController {
	
	@Autowired
	private UsersRepository repository;
	
	//初期表示
	@GetMapping("/userinfo")
	public String PasswordUpdatePage(Model model, Principal principal) {
	    // ログインユーザーのloginId取得
	    String loginId = principal.getName();

	    // ユーザー情報取得
	    User user = repository.findByLoginId(loginId);
	    
	    // ユーザー情報をモデルに追加
	    model.addAttribute("user", user);

	    return "userinfo";
	}


	// パスワード更新処理
	@PostMapping("/userinfo/update")
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
        return "userinfo"; 
    }
	
	
	
}

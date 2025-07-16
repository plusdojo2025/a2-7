package com.example.demo.controller;

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
	
	@GetMapping("/userinfo")
	public String userinfo(Model model) {
		
		String nickname = getLoggedInUsername(); // ログインユーザー取得
        User user = repository.findByNickname(nickname);
		
        if (user != null) {
            // ユーザー情報をモデルに追加
            model.addAttribute("user", user);
        } else {
            // ユーザーが見つからない場合の処理
            return "";
        }
        
		return "userinfo";
	}

	// パスワード更新処理
    @PostMapping("/userinfo/update")
    public String updatePassword(@RequestParam("newPassword") String newPassword,
                                 Model model) {
        String nickname = getLoggedInUsername();
        User user = repository.findByNickname(nickname);

        if (user != null && newPassword != null && !newPassword.trim().isEmpty()) {
            user.setPassword(newPassword); 
            repository.save(user);
            model.addAttribute("message", "パスワードが更新されました");
        } else {
            model.addAttribute("error", "新しいパスワードを入力してください");
        }

        model.addAttribute("currentPassword", user.getPassword());

        return "userinfo";
    }
}

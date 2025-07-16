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
public class MyPageController {
	
	@Autowired
	private UsersRepository repository;
	
	//初期表示
	//他のユーザーにも表示される
	//読み取り専用
	@GetMapping("/mypage")
	public String showMyPage(@RequestParam("loginId") String loginId, Model model) {
		User user = repository.findByLoginId(loginId);
		model.addAttribute("nickname", user.getNickname());
		model.addAttribute("aFewWords", user.getAFewWords());
		return "mypage";
	}

	//本人のみがアクセス可能
	//ログイン中のユーザーIDを取得
	@GetMapping("/mypage/update/")
	public String showMyPage(Model model, Principal principal) {
	    String loginId = principal.getName(); 

	    User user = repository.findByLoginId(loginId);
	    model.addAttribute("nickname", user.getNickname());
	    model.addAttribute("aFewWords", user.getAFewWords());
	    return "mypage/update";
	}


    
    //マイページのニックネームとひとことを更新する
	@PostMapping("/mypage/update")
	public String updateMyPage(User formUser, Principal principal, Model model) {
		String loginId = principal.getName();
		User user = repository.findByLoginId(loginId);
		
		// nickname と aFewWords を更新
		user.setNickname(formUser.getNickname());
		user.setAFewWords(formUser.getAFewWords());
		
		//更新されたユーザー情報をデータベースに保存（上書き）する。
		repository.save(user);
		
		// 更新後のユーザー情報を再度モデルにセット
		//更新後の user 情報と、成功メッセージをテンプレートに渡す。
		model.addAttribute("user", user);
		model.addAttribute("message", "プロフィールを更新しました");
		
		return "mypage";
	}
}

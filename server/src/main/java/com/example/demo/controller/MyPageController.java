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
	//imageIdとnicknameとaFewWordsを取得して表示
	@GetMapping("/mypage")
	public String showMyPage(@RequestParam("loginId") String loginId, Model model) {
		User user = repository.findByLoginId(loginId);
		model.addAttribute("nickname", user.getNickname());
		model.addAttribute("aFewWords", user.getAFewWords());
		model.addAttribute("imageId", user.getImageId());
		return "mypage";
	}

	//マイページのアイコン画像を更新する
	@PostMapping("/mypage/update/image")
	public String updateMyPageImage(User formUser, Principal principal, Model model) {
		String loginId = principal.getName();
		//loginIdを使ってデータ取得
		User user = repository.findByLoginId(loginId);

		// imageIdを更新
		user.setImageId(formUser.getImageId());

		//更新されたユーザー情報をデータベースに保存（上書き）する。
		repository.save(user);

		// 更新後のユーザー情報を再度モデルにセット
		//更新後の user 情報と、成功メッセージをテンプレートに渡す。
		model.addAttribute("user", user);
		model.addAttribute("message", "アイコンを更新しました");

		return "user";
	}
    
    //マイページのニックネームとひとことを更新する
	@PostMapping("/mypage/update/profile")
	public String updateMyPage(User formUser, Principal principal, Model model) {
		String loginId = principal.getName();
		//loginIdを使ってデータ取得
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
		
		return "user";
	}
}

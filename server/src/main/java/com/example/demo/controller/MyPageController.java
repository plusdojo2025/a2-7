package com.example.demo.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageController {
	
	@Autowired
	private UsersRepository repository;
	
	//表示
	//他のユーザーのmypageにアクセスしたときはどうなるのか
	//imageIdとnicknameとaFewWordsを取得して表示
	@GetMapping("/api/mypage/")
	public User showMyPage(HttpSession session) {
		//どうやってloginIdを取得するか？
		//ログイン画面の作成者に確認→ログイン時にsessionに保持している
		//sessionからloginIdを取り出す
		String loginId = (String) session.getAttribute("loginId");
		if (loginId == null) {
		    throw new RuntimeException("ログインしていません");
		}
		User user = repository.findByLoginId(loginId);
		return user;
	}


	//マイページのアイコン画像を更新する
	@PostMapping("api/mypage/update/image")
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

		
		return "redirect:/mypage";
	}
    
	//マイページのニックネームとひとことを更新する
	@PostMapping("/api/mypage/update/profile")
	public String updateMyPage(@RequestBody Map<String, String> request, HttpSession session) {
	    String loginId = (String) session.getAttribute("loginId");

	    if (loginId == null) {
	        throw new RuntimeException("ログインしていません");
	    }

	    User user = repository.findByLoginId(loginId);

	    String nickname = request.get("nickname");
	    String aFewWords = request.get("aFewWords");

	    user.setNickname(nickname);
	    user.setAFewWords(aFewWords);

	    repository.save(user);

	    // セッションに保存
	    session.setAttribute("nickname", nickname);
	    session.setAttribute("aFewWords", aFewWords);

	    return "redirect:/api/mypage";
	}


}

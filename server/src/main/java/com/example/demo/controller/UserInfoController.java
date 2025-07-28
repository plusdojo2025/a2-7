package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api/userinfo")
public class UserInfoController {
	
	@Autowired
	private UsersRepository repository;
	
	
	  @GetMapping("")
	    public ResponseEntity<Map<String, String>> getUserInfo(HttpSession session) {
	        String loginId = (String) session.getAttribute("loginId");
	        if (loginId == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("error", "ログインしていません"));
	        }

	        User user = repository.findByLoginId(loginId);
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(Map.of("error", "ユーザーが見つかりません"));
	        }

	        Map<String, String> result = new HashMap<>();
	        return ResponseEntity.ok(result);
	    }
	
	
	// パスワード更新処理
	@PostMapping("/update")
	public ResponseEntity<Map<String, String>> updatePassword(@RequestBody Map<String, String> request, HttpSession session) {
	    Map<String, String> response = new HashMap<>();

	    // セッションからloginIdを取得
	    String loginId = (String) session.getAttribute("loginId");
	    if (loginId == null) {
	        response.put("error", "ログインしていません");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	    }

	    // リクエストからパスワード情報を取得
	    String currentPassword = request.get("currentPassword");
	    String newPassword = request.get("newPassword");

	    if (currentPassword == null || newPassword == null || newPassword.trim().isEmpty()) {
	        response.put("error", "パスワードが正しく入力されていません");
	        return ResponseEntity.badRequest().body(response);
	    }

	    // ユーザーを検索
	    User user = repository.findByLoginId(loginId);
	    if (user == null) {
	        response.put("error", "ユーザーが見つかりません");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }

	    // 現在のパスワードを確認
	    if (!user.getPassword().equals(currentPassword)) {
	        response.put("error", "現在のパスワードが違います");
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	    }

	    // パスワードを更新
	    user.setPassword(newPassword);
	    repository.save(user);

	    response.put("message", "更新完了");
	    return ResponseEntity.ok(response);
	}
	
	
	
}

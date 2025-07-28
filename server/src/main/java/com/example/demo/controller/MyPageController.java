package com.example.demo.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Images;
import com.example.demo.entity.User;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageController {
	
	@Autowired
	private UsersRepository repository;
	
	@Autowired
	private ImagesRepository  imageRepository;
	
	//表示
	//imageIdとnicknameとaFewWordsとisownerの結果を取得して表示
	@GetMapping("/api/mypage/")
	public Map<String, Object> showMyPage(HttpSession session) {
		//ログイン画面の作成者に確認→ログイン時にsessionに保持している
		//sessionからloginIdを取り出す
	    String loginId = (String) session.getAttribute("loginId");
	    if (loginId == null) {
	        throw new RuntimeException("ログインしていません");
	    }

	    User user = repository.findByLoginId(loginId);

	    return Map.of(
	        "nickname", user.getNickname(),
	        "afewWords", user.getAFewWords(),
	        "imageId", user.getImageId(),
	        "isOwner", true  // ← フロントに明示的に返す
	    );
	}


	//マイページのアイコン画像を更新する
	//sessionにimageIdを保存する
	//usersテーブルにあるimageIdを更新
	//mypageアクセス時にimageIdを基に更新した画像を表示したい
	@PostMapping("/api/mypage/update/image")
	public ResponseEntity<String> updateUserImage(
	        @RequestParam("image") MultipartFile imageFile,
	        HttpSession session
	) {
	    String loginId = (String) session.getAttribute("loginId");

	    if (loginId == null) {
	        throw new RuntimeException("ログインしていません");
	    }
	    
	    //画像が選択されていない場合の処理
	    if (imageFile == null || imageFile.isEmpty()) {
	        return ResponseEntity.badRequest().body("画像ファイルが選択されていません");
	    }
	    // データベースからユーザー情報を取得
	    User user = repository.findByLoginId(loginId);
	    try {
	        // 画像を保存
	        Images image = new Images();
	        image.setName(imageFile.getOriginalFilename());
	        image.setMimeType(imageFile.getContentType());
	        image.setImageData(imageFile.getBytes());

	        // 画像をDBに保存
	        Images savedImage = imageRepository.save(image);

	        // ユーザーに画像IDを紐づけて保存
	        user.setImageId(savedImage.getImageId());

	        repository.save(user);  // ユーザー情報を更新
	        // セッションに保存する
	        session.setAttribute("imageId", savedImage.getImageId());

	        return ResponseEntity.ok("画像アップロード成功");
	    } catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("画像の保存に失敗しました");
	    }
	}





	
	//マイページのニックネームとひとことを更新する
	@PostMapping("/api/mypage/update/profile")
	public String updateMyPage(@RequestBody Map<String, String> request, HttpSession session) {
		//sessionからloginIdを取得
		String loginId = (String) session.getAttribute("loginId");
		//loginしていない場合は中止する
	    if (loginId == null) {
	        throw new RuntimeException("ログインしていません");
	    }
	    //データベースからユーザー情報を取得
	    User user = repository.findByLoginId(loginId);
	    //requestからニックネームを自己紹介を取り出す
	    String nickname = request.get("nickname");
	    String aFewWords = request.get("aFewWords");
	    //user情報に更新内容をセット
	    user.setNickname(nickname);
	    user.setAFewWords(aFewWords);
	    //データベースに保存
	    repository.save(user);

	    // セッションに保存
	    session.setAttribute("nickname", nickname);
	    session.setAttribute("aFewWords", aFewWords);

	    return "redirect:/api/mypage";
	}

	@GetMapping("/api/images/{imageId}")
	public ResponseEntity<byte[]> getImage(@PathVariable int imageId){
		//imageIdを利用して、画像の行を取得
		Images image = imageRepository.findFirstByImageId(imageId);
		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.parseMediaType(image.getMimeType()));
		return new ResponseEntity<>(image.getImageData(),header,HttpStatus.OK);
		
	}
}

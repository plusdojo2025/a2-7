package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Diary;
import com.example.demo.entity.Images;
import com.example.demo.entity.User;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;


@CrossOrigin(origins = "http://localhost:3000") // React dev server
@RestController
@RequestMapping("/diary")
public class DiaryController {

	
	@Autowired
	private DiariesRepository diaryRepository;
	@Autowired
	private ImagesRepository  imageRepository;
	@Autowired
	private UsersRepository userRepository;
	
	
//	
//    @PostMapping("/regist")
//    public ResponseEntity<Diary> addDiary(@RequestBody Diary diary) {
//        Diary saved = repository1.save(diary);
//        return ResponseEntity.ok(saved);
//    }
//	
//	
//	    
//
//    @PostMapping("/add")
//    public ResponseEntity<Map<String, String>> uploadImage(
//        @RequestParam("name") String name,
//        @RequestParam("file") MultipartFile file
//    ) throws IOException {
//        Images img = new Images();
//        img.setName(name);
//        img.setImageData(file.getBytes());
//        img.setMimeType(file.getContentType());
//        imageRepo.save(img);
//
//        Map<String, String> res = new HashMap<>();
//        res.put("message", "Image uploaded successfully!");
//        return ResponseEntity.ok(res);
//    }
	
	 @PostMapping("/register")
	    public Diary registerDiaryWithImage(          
	    		@RequestBody Diary diary,
	            HttpSession session
	            //@RequestParam("image") MultipartFile imageFile
	    		) {
	        
	             //Save image if present

//	        Images image = new Images();
//	        image.setName(imageFile.getOriginalFilename());
//	        image.setMimeType(imageFile.getContentType());
//	        try {
//				image.setImageData(imageFile.getBytes());
//			} catch (IOException e) {
//				// TODO 自動生成された catch ブロック
//				e.printStackTrace();
//			}

	        // 画像をDBに保存
	        //Images savedImage = imageRepository.save(image);


	            
//	            // Save diary
//	            Diary diary = new Diary();
	            String loginId = (String) session.getAttribute("loginId");
	    		if (loginId == null) {
	    		    throw new RuntimeException("ログインしていません");
	    		}
	            
	            User user = userRepository.findByLoginId(loginId);
	            diary.setUser(user);
//	            diary.setSentence(sentence);
//	            diary.setStamp(stamp);
//	            diary.setResistTime(Timestamp.valueOf(resistTime));
//	            diary.setDiaryTime(Date.valueOf(diaryDate));
//
//	            if (savedImage != null) {
//	                diary.setImageId(savedImage.getImageId());
//	            }
	            
	            diaryRepository.save(diary);

	            return diary;

	        
	    }
	 
	 
	 
	 @PostMapping("/register2/{diaryId}")
	    public ResponseEntity<?> registerDiaryWithImage2(
	            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
	            @RequestParam(value = "name", required = false) String imageName,
	            @PathVariable("diaryId") Integer diaryId) {
	        
	            // Save image if present
	            Images savedImage = null;
	            if (imageFile != null && !imageFile.isEmpty()) {
	                Images image = new Images();
	                image.setName(imageName != null ? imageName : "untitled");
	                image.setMimeType(imageFile.getContentType());
	                try {
						image.setImageData(imageFile.getBytes());
					} catch (IOException e) {
						// TODO 自動生成された catch ブロック
						e.printStackTrace();
					}

	                savedImage = imageRepository.save(image);
	            }

	            // Save diary
	            Diary diary = diaryRepository.findByDiaryId(diaryId);


	            if (savedImage != null) {
	                diary.setImageId(savedImage.getImageId());
	            }

	            diaryRepository.save(diary);

	            return ResponseEntity.ok("Diary registered successfully");

	        }


	   

}
	
	
	


	
	

	



package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Diary;
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
	    public ResponseEntity<?> registerDiaryWithImage(          
	    		@RequestBody Diary diary,
	            HttpSession session
	    		) {
	        
	            // Save image if present
//	            Images savedImage = null;
//	            if (imageFile != null && !imageFile.isEmpty()) {
//	                Images image = new Images();
//	                image.setName(imageName != null ? imageName : "untitled");
//	                image.setMimeType(imageFile.getContentType());
//	                image.setImageData(imageFile.getBytes());
//
//	                savedImage = imageRepository.save(image);
//	            }

	            
//	            // Save diary
//	            Diary diary = new Diary();
	            String loginId = (String) session.getAttribute("loginId");
	    		if (loginId == null) {
	    		    throw new RuntimeException("ログインしていません");
	    		}
	            
	            User user = userRepository.findByLoginId(loginId);
	            System.out.println("ゆーざーIDこれ！！！！！！"+user.getLoginId());

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

	            return ResponseEntity.ok("Diary registered successfully");

	        
	    }
}
	
	
	


	
	

	



package com.example.demo.controller;

import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Diary;
import com.example.demo.entity.Images;
import com.example.demo.entity.User;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ImagesRepository;


@CrossOrigin(origins = "http://localhost:3000") // React dev server
@RestController
@RequestMapping("/diary")
public class DiaryController {

	
	@Autowired
	private DiariesRepository diaryRepository;
	@Autowired
	private ImagesRepository  imageRepository;
	
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
	            @RequestParam("login_id") int loginId,
	            @RequestParam("sentence") String sentence,
	            @RequestParam("stamp") int stamp,
	            @RequestParam("resist_time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime resistTime,
	            @RequestParam("diary_time") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate diaryDate,
	            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
	            @RequestParam(value = "name", required = false) String imageName
	    ) {
	        try {
	            // Save image if present
	            Images savedImage = null;
	            if (imageFile != null && !imageFile.isEmpty()) {
	                Images image = new Images();
	                image.setName(imageName != null ? imageName : "untitled");
	                image.setMimeType(imageFile.getContentType());
	                image.setImageData(imageFile.getBytes());

	                savedImage = imageRepository.save(image);
	            }

	            // Save diary
	            Diary diary = new Diary();
	            User user = null;//loginIdを利用して取得
	            diary.setUser(user);

	            diary.setSentence(sentence);
	            diary.setStamp(stamp);
	            diary.setResistTime(Timestamp.valueOf(resistTime));
	            diary.setDiaryTime(Date.valueOf(diaryDate));

	            if (savedImage != null) {
	                diary.setImageId(savedImage.getImageId());
	            }

	            diaryRepository.save(diary);

	            return ResponseEntity.ok("Diary registered successfully");

	        } catch (IOException e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("Image processing failed: " + e.getMessage());
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Failed to save diary: " + e.getMessage());
	        }
	    }
}

	
	
	


	
	

	



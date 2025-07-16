package com.example.demo.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Diaries;
import com.example.demo.entity.Images;
import com.example.demo.repository.DiariesRepository;
import com.example.demo.repository.ImagesRepository;


@RestController // Use @RestController instead of @Controller for JSON
@RequestMapping("/diary")
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
	
	@Autowired
	private DiariesRepository repository1;
	@Autowired
	private ImagesRepository imageRepo;
	
	
    @PostMapping("/regist")
    public ResponseEntity<Diaries> addDiary(@RequestBody Diaries diary) {
        Diaries saved = repository1.save(diary);
        return ResponseEntity.ok(saved);
    }
	
	
	    

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> uploadImage(
        @RequestParam("name") String name,
        @RequestParam("file") MultipartFile file
    ) throws IOException {
        Images img = new Images();
        img.setName(name);
        img.setImageData(file.getBytes());
        img.setMimeType(file.getContentType());
        imageRepo.save(img);

        Map<String, String> res = new HashMap<>();
        res.put("message", "Image uploaded successfully!");
        return ResponseEntity.ok(res);
    }
	}
	


	
	

	



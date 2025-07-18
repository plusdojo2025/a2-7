package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="images")
public class Images {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int image_id;
	private String name;
	@Lob
	private byte[] imageData;
	private String mimeType;
	
//	@OneToMany(mappedBy = "image")
//	private List<Diary> diaries;
	

}

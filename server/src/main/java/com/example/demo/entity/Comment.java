package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="comments")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer comments_id;
	@Column(unique = true)
	private String login_id;
	private String time;
	private String sentence;
	
	//@ManyToOne(fetch = FetchType.LAZY)
	//@JoinColumn(name = "diary_id")
	//@JsonIgnore
	//private Diary diary;
	private int diary_id;
	
}

	
	


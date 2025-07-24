package com.example.demo.entity;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	private Integer commentId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "login_id")
	@JsonIgnore
	private User user;
	
	private Timestamp time;
	private String sentence;

	@Column(name = "diary_id")
	private int diaryId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_id" , insertable = false, updatable = false)
	@JsonIgnore
	private Diary diary;
	
}

	
	


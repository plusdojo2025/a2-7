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
	private Integer comments_id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "login_id")
	@JsonIgnore
	@Column(unique = true)
	private User user;
	
	private Timestamp time;
	private String sentence;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_id")
	@JsonIgnore
	private Diary diary;
	
}

	
	


package com.example.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

@Table(name="diaries")
public class Diary {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "diary_id")
	private int diaryId;
	
	@ManyToOne
	@JoinColumn(name = "image_id")
	private Images image;


	private String sentence;
	private int stamp;
	private Timestamp resistTime;
	
	
	private Date diaryTime;


	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "login_id")
	@JsonIgnore
	private User user;
	
//	@Column(unique = true)
//	private String loginId;
	
	@OneToMany(mappedBy = "diary"
			, cascade = CascadeType.ALL
			, fetch = FetchType.LAZY)
	private List<Reaction> reactions;
	
	@OneToMany(mappedBy = "diary"
			, cascade = CascadeType.ALL
			, fetch = FetchType.LAZY)
	private List<Comment> comments;
	
	@OneToMany(mappedBy = "diary"
			, cascade = CascadeType.ALL
			, fetch = FetchType.LAZY)
	private List<Post> posts;


	

}

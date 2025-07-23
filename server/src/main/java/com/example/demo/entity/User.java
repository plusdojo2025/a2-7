package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")

public class User {
	
	@Id
	@Column(unique = true)
	private String loginId;

	

	
	
	@JsonIgnore
	private String password;
	private String nickname;
	private String aFewWords;
	private Integer imageId;
	
	@OneToMany(mappedBy = "user"
			, cascade = CascadeType.ALL
			, fetch = FetchType.LAZY)
	private List<Comment> comments;
	
	@OneToMany(mappedBy = "user"
			, cascade = CascadeType.ALL
			, fetch = FetchType.LAZY)
	private List<Diary> diaries;

	
	
}

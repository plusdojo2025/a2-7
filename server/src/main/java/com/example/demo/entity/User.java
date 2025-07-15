package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	private String login_id;
	private String password;
	private String nickname;
	private String a_few_words;
	private Integer image_id;
}

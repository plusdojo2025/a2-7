package com.example.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;

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

@Table(name="diaries")
public class Diaries {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int diary_id;
	private String login_id;
	private String sentence;
	private int stamp;
	private Timestamp resist_time;
	
	
	private Date diary_time;
	

}

package com.example.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Entity;
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

@Table(name="diaries")
public class Diary {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int diary_id;
	
	@ManyToOne
	@JoinColumn(name = "image_id")
	private Images image;


	private String sentence;
	private Integer stamp;
	private Timestamp resist_time;
	
	
	private Date diary_time;


	public void setLogin_id(int loginId) {
		// TODO 自動生成されたメソッド・スタブ
		
	}
	

}

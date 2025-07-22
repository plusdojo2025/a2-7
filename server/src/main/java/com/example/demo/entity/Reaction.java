package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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
@Table(name="reactions")
@IdClass(ReactionId.class)
public class Reaction {
	
	@Id
	@Column(name = "diary_id")
	private int diaryId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_id", insertable = false, updatable = false)
	@JsonIgnore
	private Diary diary;

	@Id
	@Column(name = "login_id")
	private String loginId;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "login_id")
//	@JsonIgnore
//	private User user;
	
	private Boolean reaction1;
	private Boolean reaction2;
	private Boolean reaction3;
	private Boolean reaction4;
	
	
}

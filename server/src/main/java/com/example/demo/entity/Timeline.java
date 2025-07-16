package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Timeline {


	@Id
	private Diaries diaryList;
	private Reaction reactionList;
	private Comment comentList;
	private User userList;

}


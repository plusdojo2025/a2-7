package com.example.demo.entity;

import java.util.List;

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
	private List<Diaries> diaryList;
	private List<List<Reaction>> reactionList;
	private int[] comentList;
	private List<User> userList;

}


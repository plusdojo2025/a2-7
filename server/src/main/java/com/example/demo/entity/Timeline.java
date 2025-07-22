package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Timeline {


	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @OneToMany
	    private List<Diary> diaryList;

	    @ElementCollection
	    private List<int[]> reactionList;

	    @ElementCollection
	    private List<Integer> commentList;

	    @ManyToMany
	    private List<User> userList;

}


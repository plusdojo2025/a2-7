package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Comment;

public interface CommentsRepository extends JpaRepository<Comment, Integer> {
	int countByDiary_id(int diary_id);
	List<Comment> findByDiary_id(int diary_id);
	void deleteByDiary_id(int diary_id);
	
}

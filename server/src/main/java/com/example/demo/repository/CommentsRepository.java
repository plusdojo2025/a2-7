package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Comment;

public interface CommentsRepository extends JpaRepository<Comment, Integer> {
	//日記に対するコメント数取得
	int countByDiary_id(int diary_id);
	
	//日記に対するコメントList取得
	List<Comment> findByDiary_id(int diary_id);
	
	//日記を削除したときにコメントも削除
	void deleteByDiary_id(int diary_id);
	
}
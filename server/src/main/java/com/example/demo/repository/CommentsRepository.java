package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Comment;

public interface CommentsRepository extends JpaRepository<Comment, Integer> {
	//日記に対するコメント数取得
	int countByDiaryId(int diary_id);
	
	//日記に対するコメントList取得
	List<Comment> findByDiaryId(int diary_id);
	
	//日記を削除したときにコメントも削除

    @Modifying
    @Transactional
	void deleteByDiaryId(int diary_id);
	
	//コメントIDでコメントデータ取得
	Comment findByCommentId(Integer commentId);
	
}
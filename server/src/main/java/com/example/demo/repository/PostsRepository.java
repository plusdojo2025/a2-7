package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Post;

public interface PostsRepository extends JpaRepository<Post, Integer> {
	List<Post> findByDiary_DiaryId(Integer diaryId);
	

    @Modifying
    @Transactional
	void deleteByDiary_DiaryId(int diaryId);
}

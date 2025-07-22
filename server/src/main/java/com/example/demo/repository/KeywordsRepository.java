package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Keyword;

public interface KeywordsRepository extends JpaRepository<Keyword, Integer> {
//	@Query()
//	List<Keyword> getKeywordList(
//			@Param("login_id") String id, 
//			@Param("start_day") LocalDateTime start_day,
//			@Param("end_day") LocalDateTime end_day);
	List<Keyword> findAll();
	
}

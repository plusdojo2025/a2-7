package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Keyword;

public interface KeywordsRepository extends JpaRepository<Keyword, Integer> {
	List<Keyword> findAll();
	
}

package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Tag;

public interface TagsRepository extends JpaRepository<Tag, Integer> {
	
	List<Tag> findBytagsContaining(String tag);
	
	
}

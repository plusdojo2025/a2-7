package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Reaction;

public interface ReactionsRepository extends JpaRepository<Reaction, Integer> {
	List<Reaction> findByDiary_id(int diary_id);
	void deleteByDiary_id(int diary_id);
}

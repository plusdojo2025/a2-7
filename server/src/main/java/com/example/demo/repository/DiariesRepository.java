package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Diaries;

public interface DiariesRepository extends JpaRepository<Diaries, Integer>{
	List<Diaries> findByHashtag_id(int hashtag_id);

}

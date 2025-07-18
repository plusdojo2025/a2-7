package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Diary;

public interface DiariesRepository extends JpaRepository<Diary, Integer>{
	

}

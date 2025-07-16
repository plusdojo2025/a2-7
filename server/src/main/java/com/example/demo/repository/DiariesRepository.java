package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Diaries;

public interface DiariesRepository extends JpaRepository<Diaries, Integer>{
	

}

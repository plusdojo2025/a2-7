package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Diary;

public interface DiariesRepository extends JpaRepository<Diary, Integer>{
	
	List<Diary> findByLoginIdAndDiaryTimeBetween(String loginId, LocalDate startofmonth, LocalDate endofmonth);
}

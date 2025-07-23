package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Diary;

public interface DiariesRepository extends JpaRepository<Diary, Integer>{

	//List<Diary> findByLoginIdAndDiaryTimeBetween(String loginId, LocalDate startofmonth, LocalDate endofmonth);
	List<Diary> findByUserLoginIdAndDiaryTimeBetween(String loginId, LocalDate start, LocalDate end);

	Diary findByDiaryId(int diaryId);
	List<Diary> findBySentenceLike(String tag);
	Optional<Diary> findFirstByDiaryTimeAndUser_LoginId(LocalDate localDate,String loginId);

}

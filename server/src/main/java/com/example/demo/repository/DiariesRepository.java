package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Diary;

public interface DiariesRepository extends JpaRepository<Diary, Integer>{

	//List<Diary> findByLoginIdAndDiaryTimeBetween(String loginId, LocalDate startofmonth, LocalDate endofmonth);
	List<Diary> findByUserLoginIdAndDiaryTimeBetween(String loginId, LocalDate start, LocalDate end);

	Diary findByDiaryId(int diaryId);
	//List<Diary> findBySentenceLike(String tag);
	List<Diary> findByUser_LoginIdAndSentenceLike(String loginId, String keyword);
	Optional<Diary> findFirstByDiaryTimeAndUser_LoginId(LocalDate localDate,String loginId);
	List<Diary> findByUser_LoginId(String loginId);
	List<Diary> findByUser_LoginIdOrderByResistTime(String loginId);
	List<Diary> findBySentenceLike(String tag);
	List<Diary> findBySentenceLikeAndSentenceLike(String keyword1, String keyword2);
	
	
    @Modifying
    @Transactional
	void deleteByDiaryId(int diaryId);

}

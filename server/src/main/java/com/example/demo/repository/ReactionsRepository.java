package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Reaction;

public interface ReactionsRepository extends JpaRepository<Reaction, Integer> {
	//日記に対するリアクションリストを取得
	List<Reaction> findByDiaryId(int diaryId);
	Reaction findByDiaryIdAndLoginId(int diaryId,String loginId);
	
	//日記を削除したときに対応するリアクションを削除
	void deleteByDiaryId(int diaryId);
	
	@Modifying
    @Transactional
	void deleteByDiary_DiaryId(int diaryId);
}
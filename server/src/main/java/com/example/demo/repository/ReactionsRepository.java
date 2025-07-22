package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Reaction;

public interface ReactionsRepository extends JpaRepository<Reaction, Integer> {
	//日記に対するリアクションリストを取得
	List<Reaction> findByDiaryId(int diaryId);
	
	//日記を削除したときに対応するリアクションを削除
	void deleteByDiaryId(int diaryId);
}
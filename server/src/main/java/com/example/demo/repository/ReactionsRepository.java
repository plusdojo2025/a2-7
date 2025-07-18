package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Reaction;

public interface ReactionsRepository extends JpaRepository<Reaction, Integer> {
	//日記に対するリアクションリストを取得
	List<Reaction> findByDiary_id(int diary_id);
	
	//日記を削除したときに対応するリアクションを削除
	void deleteByDiary_id(int diary_id);
}
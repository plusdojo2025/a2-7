
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface UsersRepository extends JpaRepository<User, Integer> {
	// loginId を使ってユーザーを1件取得するメソッド
    User findByLoginId(String loginId);
    
	User findByNickname(String nickname);
}


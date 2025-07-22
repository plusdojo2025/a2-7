package com.example.demo.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ReactionId {
	private Integer diaryId;
	private String loginId;
	
	@Override
	public boolean equals(Object o) {
		return this.diaryId == ((ReactionId)o).diaryId
				&& this.loginId.equals(((ReactionId)o).loginId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.diaryId,this.loginId);
	}
}

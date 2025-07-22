package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReactionId implements Serializable{
	private int diaryId;
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

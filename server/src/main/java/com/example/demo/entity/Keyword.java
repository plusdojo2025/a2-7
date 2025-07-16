package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="keywords")
public class Keyword {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer keywords_id;
	
	private String keywords;
	
}

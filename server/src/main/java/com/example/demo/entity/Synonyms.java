package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="synonyms")
public class Synonyms {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private int synonym_id;

    private String synonym;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;
}
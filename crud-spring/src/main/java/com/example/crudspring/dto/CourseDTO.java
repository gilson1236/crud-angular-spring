package com.example.crudspring.dto;

import com.example.crudspring.enums.Category;
import com.example.crudspring.enums.validation.ValueOfEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CourseDTO(
        @JsonProperty("_id") Long id,
        @NotBlank @NotNull @Length(min = 3, max = 100) String name,
        @NotNull @Length(max = 10) @ValueOfEnum(EnumClass = Category.class) String category,
        @NotNull @NotEmpty @Valid List<LessonDTO> lessonList) {

}

package com.example.crudspring.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record LessonDTO(
        Long id,
        @NotNull @NotEmpty @Length(min = 3, max = 100) String name,
        @NotNull @NotEmpty @Length(min = 10, max = 11) String youtubeUrl
) {
}

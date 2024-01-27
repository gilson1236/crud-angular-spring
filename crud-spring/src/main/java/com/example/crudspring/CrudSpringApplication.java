package com.example.crudspring;

import com.example.crudspring.enums.Category;
import com.example.crudspring.model.Course;
import com.example.crudspring.model.Lesson;
import com.example.crudspring.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {

		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner initDataBase(CourseRepository courseRepository){
		return args -> {
			courseRepository.deleteAll();

			for(int i = 0; i < 20; i++) {

				Course course = new Course();

				course.setName("Angular com Spring" + i);
				course.setCategory(Category.FRONT_END);

				Lesson lesson = new Lesson();
				lesson.setName("Introduction");
				lesson.setYoutubeUrl("12345678901");
				lesson.setCourse(course);
				course.getLessons().add(lesson);

				Lesson lessonOne = new Lesson();
				lessonOne.setName("Angular");
				lessonOne.setYoutubeUrl("12345678902");
				lessonOne.setCourse(course);
				course.getLessons().add(lessonOne);

				courseRepository.save(course);
			}
		};
	}

}

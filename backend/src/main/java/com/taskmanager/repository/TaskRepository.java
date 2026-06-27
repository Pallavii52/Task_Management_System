package com.taskmanager.repository;

import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Status;
import com.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    long countByStatus(Status status);

    List<Task> findByTitleContainingIgnoreCase(String title);

    List<Task> findByAssignedToContainingIgnoreCase(String assignedTo);

    @Query("SELECT t FROM Task t WHERE " +
           "(:title IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
           "(:assignedTo IS NULL OR LOWER(t.assignedTo) LIKE LOWER(CONCAT('%', :assignedTo, '%'))) AND " +
           "(:priority IS NULL OR t.priority = :priority) AND " +
           "(:status IS NULL OR t.status = :status)")
    List<Task> searchAndFilter(@Param("title") String title,
                                @Param("assignedTo") String assignedTo,
                                @Param("priority") Priority priority,
                                @Param("status") Status status);
}

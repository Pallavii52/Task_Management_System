package com.taskmanager.dto;

import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Status;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TaskDTO {

    private Long id;

    @NotBlank(message = "Task title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Assigned To is required")
    private String assignedTo;

    @NotNull(message = "Priority is required")
    private Priority priority;

    private Status status;

    @NotNull(message = "Due date is required")
    @FutureOrPresent(message = "Due date cannot be in the past")
    private LocalDate dueDate;

    private LocalDateTime createdAt;
}

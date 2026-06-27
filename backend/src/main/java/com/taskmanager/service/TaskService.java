package com.taskmanager.service;

import com.taskmanager.dto.DashboardStatsDTO;
import com.taskmanager.dto.TaskDTO;
import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Status;
import com.taskmanager.entity.Task;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        return toDTO(task);
    }

    public TaskDTO createTask(TaskDTO dto) {
        Task task = toEntity(dto);
        if (task.getStatus() == null) {
            task.setStatus(Status.PENDING);
        }
        Task saved = taskRepository.save(task);
        return toDTO(saved);
    }

    public TaskDTO updateTask(Long id, TaskDTO dto) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setAssignedTo(dto.getAssignedTo());
        existing.setPriority(dto.getPriority());
        existing.setDueDate(dto.getDueDate());
        if (dto.getStatus() != null) {
            existing.setStatus(dto.getStatus());
        }

        Task updated = taskRepository.save(existing);
        return toDTO(updated);
    }

    public TaskDTO updateStatus(Long id, Status status) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        existing.setStatus(status);
        return toDTO(taskRepository.save(existing));
    }

    public void deleteTask(Long id) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        taskRepository.delete(existing);
    }

    public List<TaskDTO> searchAndFilter(String title, String assignedTo, Priority priority, Status status) {
        return taskRepository.searchAndFilter(
                        emptyToNull(title), emptyToNull(assignedTo), priority, status)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DashboardStatsDTO getDashboardStats() {
        long total = taskRepository.count();
        long pending = taskRepository.countByStatus(Status.PENDING);
        long inProgress = taskRepository.countByStatus(Status.IN_PROGRESS);
        long completed = taskRepository.countByStatus(Status.COMPLETED);
        return new DashboardStatsDTO(total, pending, inProgress, completed);
    }

    private String emptyToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value.trim();
    }

    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setAssignedTo(task.getAssignedTo());
        dto.setPriority(task.getPriority());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());
        dto.setCreatedAt(task.getCreatedAt());
        return dto;
    }

    private Task toEntity(TaskDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setAssignedTo(dto.getAssignedTo());
        task.setPriority(dto.getPriority());
        task.setStatus(dto.getStatus());
        task.setDueDate(dto.getDueDate());
        return task;
    }
}

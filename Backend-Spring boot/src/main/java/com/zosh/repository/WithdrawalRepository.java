package com.zosh.repository;

import com.zosh.domain.WithdrawalStatus;
import com.zosh.model.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WithdrawalRepository extends JpaRepository<Withdrawal,Long> {
    List<Withdrawal> findByUserId(Long userId);
}

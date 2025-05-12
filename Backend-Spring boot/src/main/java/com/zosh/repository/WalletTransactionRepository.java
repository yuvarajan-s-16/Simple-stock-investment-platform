package com.zosh.repository;

import com.zosh.domain.WalletTransactionType;
import com.zosh.model.Wallet;
import com.zosh.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction,Long> {

    List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);

}

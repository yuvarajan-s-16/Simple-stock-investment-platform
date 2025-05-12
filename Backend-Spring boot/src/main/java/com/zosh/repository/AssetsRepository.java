package com.zosh.repository;

import com.zosh.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssetsRepository extends JpaRepository<Asset,Long> {
   public List<Asset> findByUserId(Long userId);

   Asset findByUserIdAndCoinId(Long userId, String coinId);

   Asset findByIdAndUserId(Long assetId, Long userId);

//   Optional<Assets> findByUserIdAndSymbolAndPortfolioId(Long userId,String symbol, Long portfolioId);
}

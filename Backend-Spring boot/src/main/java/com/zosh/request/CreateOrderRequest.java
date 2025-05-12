package com.zosh.request;

import com.zosh.domain.OrderType;

import com.zosh.model.Coin;
import lombok.Data;

import java.math.BigDecimal;


@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private OrderType orderType;
}

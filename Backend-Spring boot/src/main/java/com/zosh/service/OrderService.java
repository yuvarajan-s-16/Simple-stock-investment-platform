package com.zosh.service;

import com.zosh.domain.OrderType;
import com.zosh.model.Coin;
import com.zosh.model.Order;
import com.zosh.model.OrderItem;
import com.zosh.model.User;
import com.zosh.request.CreateOrderRequest;


import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId);

    List<Order> getAllOrdersForUser(Long userId, String orderType,String assetSymbol);

    void cancelOrder(Long orderId);

//    Order buyAsset(CreateOrderRequest req, Long userId, String jwt) throws Exception;

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

//    Order sellAsset(CreateOrderRequest req,Long userId,String jwt) throws Exception;


}

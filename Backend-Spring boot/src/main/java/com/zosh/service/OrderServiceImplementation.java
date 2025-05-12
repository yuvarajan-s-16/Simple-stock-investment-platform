package com.zosh.service;

import com.zosh.domain.OrderStatus;
import com.zosh.domain.OrderType;
import com.zosh.model.*;
import com.zosh.repository.*;

import com.zosh.repository.AssetsRepository;
import com.zosh.repository.OrderRepository;
import com.zosh.request.CreateOrderRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImplementation implements OrderService {
    private final OrderRepository orderRepository;
    private final AssetService assetService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderServiceImplementation(OrderRepository orderRepository, AssetService assetService) {
        this.orderRepository = orderRepository;
        this.assetService = assetService;
    }

    @Override
    @Transactional
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {


        double price = orderItem.getCoin().getCurrentPrice()*orderItem.getQuantity();

        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setOrderType(orderType);
        order.setPrice(BigDecimal.valueOf(price));
        order.setTimestamp(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);


        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    @Override
    public List<Order> getAllOrdersForUser(Long userId, String orderType, String assetSymbol) {
        List<Order> allUserOrders = orderRepository.findByUserId(userId);

        if (orderType != null && !orderType.isEmpty()) {
            OrderType type = OrderType.valueOf(orderType.toUpperCase());
            allUserOrders = allUserOrders.stream()
                    .filter(order -> order.getOrderType() == type)
                    .collect(Collectors.toList());
        }

        if (assetSymbol != null && !assetSymbol.isEmpty()) {
            allUserOrders = allUserOrders.stream()
                    .filter(order -> order.getOrderItem().getCoin().getSymbol().equals(assetSymbol))
                    .collect(Collectors.toList());
        }

        return allUserOrders;

    }

    @Override
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);

        if (order.getStatus() == OrderStatus.PENDING) {
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
        } else {
            throw new IllegalStateException("Cannot cancel order, it is already processed or cancelled.");
        }
    }


    private OrderItem createOrderItem(Coin coin,double quantity,double buyPrice,double sellPrice) {
        OrderItem orderItem = new OrderItem();


        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(coin.getCurrentPrice());
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);


        return orderItemRepository.save(orderItem);
    }

    @Transactional
    public Order buyAsset(Coin coin,double quantity, User user) throws Exception {
        if(quantity<0)throw new Exception("quantity should be > 0");
        double buyPrice=coin.getCurrentPrice();

        OrderItem orderItem = createOrderItem(coin,quantity,buyPrice,0);


        Order order = createOrder(user, orderItem, OrderType.BUY);
        orderItem.setOrder(order);


        walletService.payOrderPayment(order, user);

        order.setStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY);

        Order savedOrder = orderRepository.save(order);

        Asset oldAsset = assetService.findAssetByUserIdAndCoinId(
                order.getUser().getId(),
                order.getOrderItem().getCoin().getId()
        );

        if (oldAsset == null) {
            assetService.createAsset(
                    user,orderItem.getCoin(),
                    orderItem.getQuantity()
            );
        } else {
            assetService.updateAsset(
                    oldAsset.getId(),quantity
            );
        }

        return savedOrder;
    }

    @Transactional
    public Order sellAsset(Coin coin,double quantity, User user) throws Exception {
        double sellPrice =coin.getCurrentPrice();

        Asset assetToSell = assetService.findAssetByUserIdAndCoinId(
                user.getId(),
                coin.getId()
        );

        if (assetToSell != null) {

            OrderItem orderItem = createOrderItem(coin,quantity, assetToSell.getBuyPrice(), sellPrice);

            Order order = createOrder(user, orderItem, OrderType.SELL);

            orderItem.setOrder(order);

            Order savedOrder = orderRepository.save(order);

            if (assetToSell.getQuantity() >= quantity) {

                walletService.payOrderPayment(order, user);

                Asset updatedAsset=assetService.updateAsset(
                        assetToSell.getId(),
                        -quantity
                );
                if(updatedAsset.getQuantity()*coin.getCurrentPrice()<=1){
                    assetService.deleteAsset(updatedAsset.getId());
                }
                return savedOrder;
            } else {

                orderRepository.delete(order);
                throw new Exception("Insufficient quantity to sell");
            }
        }

            throw new Exception("Asset not found for selling");

    }

    @Override
    @Transactional
    public Order processOrder(Coin coin,double quantity,OrderType orderType, User user) throws Exception {

        if (orderType == OrderType.BUY) {
            return buyAsset(coin,quantity, user);
        } else if (orderType == OrderType.SELL) {
            return sellAsset(coin,quantity, user);
        } else {
            throw new Exception("Invalid order type");
        }
    }


}

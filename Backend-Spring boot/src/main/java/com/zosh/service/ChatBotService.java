package com.zosh.service;

import com.zosh.model.CoinDTO;
import com.zosh.response.ApiResponse;

public interface ChatBotService {
    ApiResponse getCoinDetails(String coinName);

    CoinDTO getCoinByName(String coinName);

    String simpleChat(String prompt);
}

package com.zosh.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoinDTO {
    private String id;
    private String symbol;
    private String name;
    private String image;
    private double currentPrice;
    private double marketCap;
    private int marketCapRank;
    private double totalVolume;
    private double high24h;
    private double low24h;
    private double priceChange24h;
    private double priceChangePercentage24h;
    private double marketCapChange24h;
    private double marketCapChangePercentage24h;
    private double circulatingSupply;
    private double totalSupply;
//    private double maxSupply;
    private long ath;
    private long athChangePercentage;
    private Date athDate;
    private long atl;
    private long atlChangePercentage;
    private Date atlDate;
    private Date lastUpdated;


    @Override
    public String toString() {
        return "{\n" +
                "\"id\": \"" + id + "\",\n" +
                "\"symbol\": \"" + symbol + "\",\n" +
                "\"name\": \"" + name + "\",\n" +
                "\"image\": \"" + image + "\",\n" +
                "\"current_price\": " + currentPrice + ",\n" +
                "\"market_cap\": " + marketCap + ",\n" +
                "\"market_cap_rank\": " + marketCapRank + ",\n" +
                "\"total_volume\": " + totalVolume + ",\n" +
                "\"high_24h\": " + high24h + ",\n" +
                "\"low_24h\": " + low24h + ",\n" +
                "\"price_change_24h\": " + priceChange24h + ",\n" +
                "\"price_change_percentage_24h\": " + priceChangePercentage24h + ",\n" +
                "\"market_cap_change_24h\": " + marketCapChange24h + ",\n" +
                "\"market_cap_change_percentage_24h\": " + marketCapChangePercentage24h + ",\n" +
                "\"circulating_supply\": " + circulatingSupply + ",\n" +
                "\"total_supply\": " + totalSupply + ",\n" +
                "}";
    }

}

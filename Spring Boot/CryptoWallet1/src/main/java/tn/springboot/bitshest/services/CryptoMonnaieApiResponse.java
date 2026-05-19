package tn.springboot.bitshest.services;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CryptoMonnaieApiResponse {

    private String id;
    private String symbol;
    private String name;

    @JsonProperty("market_data")
    private MarketData marketData;

    // Getters et Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MarketData getMarketData() {
        return marketData;
    }

    public void setMarketData(MarketData marketData) {
        this.marketData = marketData;
    }

    public static class MarketData {

        @JsonProperty("current_price")
        private CurrentPrice currentPrice;

        @JsonProperty("price_change_percentage_24h")
        private double priceChangePercentage24h;

        // Getters et Setters
        public CurrentPrice getCurrentPrice() {
            return currentPrice;
        }

        public void setCurrentPrice(CurrentPrice currentPrice) {
            this.currentPrice = currentPrice;
        }

        public double getPriceChangePercentage24h() {
            return priceChangePercentage24h;
        }

        public void setPriceChangePercentage24h(double priceChangePercentage24h) {
            this.priceChangePercentage24h = priceChangePercentage24h;
        }

        public static class CurrentPrice {
            @JsonProperty("eur") // Assurez-vous que ce champ correspond à l'API
            private double eur;

            // Getter et Setter
            public double getEur() {
                return eur; // Retourne le prix en EUR
            }

            public void setEur(double eur) {
                this.eur = eur; // Définit le prix en EUR
            }
        }
    }
}

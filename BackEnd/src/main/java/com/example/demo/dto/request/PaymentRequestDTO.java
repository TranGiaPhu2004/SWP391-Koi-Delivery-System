package com.example.demo.dto.request;

import lombok.Setter;

public class PaymentRequestDTO {
    public enum Currency {
        EUR, USD, VND;
    }
    @Setter
    private String description;
    private int amount; // cents
    @Setter
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;

    public String getDescription() {
        return description;
    }
    public int getAmount() {
        return amount;
    }
    public Currency getCurrency() {
        return currency;
    }
    public String getStripeEmail() {
        return stripeEmail;
    }
    public String getStripeToken() {
        return stripeToken;
    }

}

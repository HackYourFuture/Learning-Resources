package net.hackyourfuture.hyfshop.product.dto;

import java.math.BigDecimal;

public record ProductRequest (
        String title,
        BigDecimal price,
        String category,
        String imageUrl
){}

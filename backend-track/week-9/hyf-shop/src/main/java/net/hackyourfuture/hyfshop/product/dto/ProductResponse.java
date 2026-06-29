package net.hackyourfuture.hyfshop.product.dto;

import net.hackyourfuture.hyfshop.product.Product;

import java.math.BigDecimal;

public record ProductResponse (
        int id,
        String title,
        BigDecimal price,
        String category,
        String imageUrl
){
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getCategory(),
                product.getImageUrl()
        );
    }
}

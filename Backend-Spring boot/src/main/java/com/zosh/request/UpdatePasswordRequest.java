package com.zosh.request;

import com.zosh.domain.VerificationType;
import lombok.Data;

@Data
public class UpdatePasswordRequest {
    private String sendTo;
    private VerificationType verificationType;
}

package com.findincommon.app.payload;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserUpdatePayload {
    String name;
    String description;
    String imageUrl;
}

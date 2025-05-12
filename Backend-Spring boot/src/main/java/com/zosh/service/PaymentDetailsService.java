package com.zosh.service;

import com.zosh.model.PaymentDetails;
import com.zosh.model.User;
import jakarta.persistence.OneToOne;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails( String accountNumber,
                                             String accountHolderName,
                                             String ifsc,
                                             String bankName,
                                             User user
    );

    public PaymentDetails getUsersPaymentDetails(User user);


}

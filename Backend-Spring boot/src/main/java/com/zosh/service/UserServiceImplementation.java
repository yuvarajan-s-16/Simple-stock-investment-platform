package com.zosh.service;

import com.zosh.config.JwtProvider;
import com.zosh.domain.VerificationType;
import com.zosh.exception.UserException;
import com.zosh.model.TwoFactorAuth;
import com.zosh.model.User;
import com.zosh.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email= JwtProvider.getEmailFromJwtToken(jwt);
		
		
		User user = userRepository.findByEmail(email);
		
		if(user==null) {
			throw new UserException("user not exist with email "+email);
		}
		return user;
	}
	
	@Override
	public User findUserByEmail(String username) throws UserException {
		
		User user=userRepository.findByEmail(username);
		
		if(user!=null) {
			
			return user;
		}
		
		throw new UserException("user not exist with username "+username);
	}

	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User> opt = userRepository.findById(userId);
		
		if(opt.isEmpty()) {
			throw new UserException("user not found with id "+userId);
		}
		return opt.get();
	}

	@Override
	public User verifyUser(User user) throws UserException {
		user.setVerified(true);
		return userRepository.save(user);
	}

	@Override
	public User enabledTwoFactorAuthentication(
			VerificationType verificationType, String sendTo,User user) throws UserException {
		TwoFactorAuth twoFactorAuth=new TwoFactorAuth();
		twoFactorAuth.setEnabled(true);
		twoFactorAuth.setSendTo(verificationType);

		user.setTwoFactorAuth(twoFactorAuth);
		return userRepository.save(user);
	}

	@Override
	public User updatePassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
		return userRepository.save(user);
	}

	@Override
	public void sendUpdatePasswordOtp(String email, String otp) {

	}

}

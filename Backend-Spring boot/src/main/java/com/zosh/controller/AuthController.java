package com.zosh.controller;


import com.zosh.config.JwtProvider;
import com.zosh.exception.UserException;
import com.zosh.model.TwoFactorOTP;
import com.zosh.model.User;
import com.zosh.repository.UserRepository;
import com.zosh.request.LoginRequest;
import com.zosh.response.AuthResponse;
import com.zosh.service.*;
import com.zosh.utils.OtpUtils;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomeUserServiceImplementation customUserDetails;
	
	@Autowired
    private UserService userService;

	@Autowired
	private WatchlistService watchlistService;

	@Autowired
	private WalletService walletService;

	@Autowired
	private VerificationService verificationService;

	@Autowired
	private TwoFactorOtpService twoFactorOtpService;

	@Autowired
	private EmailService emailService;

	

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(
			@RequestBody User user) throws UserException {

		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getFullName();
		String mobile=user.getMobile();


		User isEmailExist = userRepository.findByEmail(email);

		if (isEmailExist!=null) {

			throw new UserException("Email Is Already Used With Another Account");
		}

		// Create new user
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setMobile(mobile);
		createdUser.setPassword(passwordEncoder.encode(password));

		User savedUser = userRepository.save(createdUser);

		watchlistService.createWatchList(savedUser);
//		walletService.createWallet(user);


		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = JwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Register Success");

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signing(@RequestBody LoginRequest loginRequest) throws UserException, MessagingException {

		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		System.out.println(username + " ----- " + password);

		Authentication authentication = authenticate(username, password);

		User user=userService.findUserByEmail(username);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = JwtProvider.generateToken(authentication);

		if(user.getTwoFactorAuth().isEnabled()){
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage("Two factor authentication enabled");
			authResponse.setTwoFactorAuthEnabled(true);

			String otp= OtpUtils.generateOTP();

			TwoFactorOTP oldTwoFactorOTP=twoFactorOtpService.findByUser(user.getId());
			if(oldTwoFactorOTP!=null){
				twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
			}


			TwoFactorOTP twoFactorOTP=twoFactorOtpService.createTwoFactorOtp(user,otp,token);

			emailService.sendVerificationOtpEmail(user.getEmail(),otp);

			authResponse.setSession(twoFactorOTP.getId());
			return new ResponseEntity<>(authResponse, HttpStatus.OK);
		}

		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);

		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		System.out.println("sign in userDetails - " + userDetails);

		if (userDetails == null) {
			System.out.println("sign in userDetails - null " + userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			System.out.println("sign in userDetails - password not match " + userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}


	@GetMapping("/login/google")
	public void redirectToGoogle(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		// Redirect to the Google OAuth2 authorization URI
		response.sendRedirect("/login/oauth2/authorization/google");
	}

//	/login/oauth2/code/google
@GetMapping("/login/oauth2/code/google")
public User handleGoogleCallback(@RequestParam(required = false,name = "code") String code,
										 @RequestParam(required = false,name = "state") String state,
										 OAuth2AuthenticationToken authentication) {

	// Extract user details from the authentication object or access token
	String email = authentication.getPrincipal().getAttribute("email");
	String fullName = authentication.getPrincipal().getAttribute("name");
	// You can extract more details as needed

	User user=new User();
	user.setEmail(email);
	user.setFullName(fullName);

	return user;
}

	@PostMapping("/two-factor/otp/{otp}")
	public ResponseEntity<AuthResponse> verifySigningOtp(
			@PathVariable String otp,
			@RequestParam String id
	) throws Exception {


		TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);

		if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP,otp)){
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage("Two factor authentication verified");
			authResponse.setTwoFactorAuthEnabled(true);
			authResponse.setJwt(twoFactorOTP.getJwt());
			return new ResponseEntity<>(authResponse, HttpStatus.OK);
		}
		throw new Exception("invalid otp");
	}



	
}

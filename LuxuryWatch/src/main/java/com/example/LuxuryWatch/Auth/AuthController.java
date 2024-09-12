package com.example.LuxuryWatch.Auth;


import com.example.LuxuryWatch.Beam.User;
import com.example.LuxuryWatch.Dao.RoleDao;
import com.example.LuxuryWatch.Dao.UserDao;
import com.example.LuxuryWatch.Security.JwtService;
import com.example.LuxuryWatch.Security.UserDetailsServiceImpl;
import com.example.LuxuryWatch.http.Response;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
//@RequestMapping("")
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    UserDao userDao;
    @Autowired
    RoleDao roleDao;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthService authService;
    @Autowired
    JwtService jwtService;

    @Autowired
    UserDetailsServiceImpl userDetailsService;


    @PostMapping("/authenticate")
    public String getToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),authRequest.getPassword()));
        if(authentication.isAuthenticated()) {
            return authService.generateToken(authRequest.getUsername());
        }else {
            throw new RuntimeException("invalid access");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );
        if(authentication.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtService.generateToken(authRequest.getUsername());

            User user = (User) authentication.getPrincipal();

            AuthResponse authResponse = new AuthResponse(true, user, jwt);
            return ResponseEntity.ok(authResponse);
        }
        else{
            throw new Error("Invalid access!!");
        }

    }

    @GetMapping("/checkLogin")
    public  ResponseEntity<?> checkLogin(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authHeader = request.getHeader("Authorization");
//        System.out.println(authHeader);
        if (authHeader != null && authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            AuthResponse authResponse = new AuthResponse(true, user, "");
            return ResponseEntity.ok(authResponse);
        } else if (authHeader == null) {
//            throw new Error("Authentication header is missing!");
            return ResponseEntity.ofNullable("");
        } else if (!authHeader.startsWith("Bearer ")){
//            throw new Error("Authentication header is invalid");
            return ResponseEntity.ofNullable("");
        } else {
//            throw new Error("User is not authenticated");
            return ResponseEntity.ofNullable("");
        }
    }

//    @PostMapping("/authenticate")
//    public ResponseEntity<AuthenticationResponse> authenticate(
//            @RequestBody AuthenticationRequest request
//    ) {
//        return ResponseEntity.ok(authService.authenticate(request));
//    }
//
//    @PostMapping("/refresh-token")
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        authService.refreshToken(request, response);
//    }
    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        if(userDao.existsByUsername(user.getUsername())){
            throw new Error("The username is already existed !!");
        }
        //TODO: change to Response{true, false}
        System.out.println(user);
        return authService.createUser(user);
    }

    @PostMapping("/validate")
    public String validateToken(@RequestParam("token") String token, @RequestBody User user) {
        if (authService.isTokenValid(token, user)){
            return "Token is valid";
        }else {
            return "Token is not valid";
        }
    }

}


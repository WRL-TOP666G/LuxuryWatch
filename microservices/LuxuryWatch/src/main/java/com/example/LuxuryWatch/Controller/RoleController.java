package com.example.LuxuryWatch.Controller;


import com.example.LuxuryWatch.Beam.Role;
import com.example.LuxuryWatch.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    RoleService roleService;

//    @PreAuthorize("hasAuthority('ADMIN') and hasAuthority('USER')")
    @GetMapping
    public List<Role> getRoles() {
        return roleService.getRoles();
    }

    @PostMapping
    public Role addRole(@RequestBody Role role) {
        System.out.println(role);
        return roleService.saveRole(role);
    }
}

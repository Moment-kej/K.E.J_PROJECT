package com.kej.app.user.serivce.vo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data	
public class MemberVO implements UserDetails{
	private String id;
	private String pwd;
	private String name;
	private String ph;
	private String zipcode;
    private String email;
    private String addr;
    private String addr_detail;
    private Timestamp sub_dt;
    private Timestamp update_dt;
    private int route;
    private int yn;
    private String sns_token;
    private String authority;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
        auth.add(new SimpleGrantedAuthority(authority));
        return auth;
    }
	@Override
	public String getPassword() {
		return pwd;
	}
	@Override
	public String getUsername() {
		return id;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		if(yn == 1) {
			return true; 
		}
		return false;
	}

}

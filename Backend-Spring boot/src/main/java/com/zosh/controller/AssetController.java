package com.zosh.controller;

import com.zosh.exception.UserException;
import com.zosh.model.Asset;
import com.zosh.model.User;
import com.zosh.service.AssetService;

import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
    private final AssetService assetService;
    @Autowired
    private UserService userService;

    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) {
        Asset asset = assetService.getAssetById(assetId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(
            @PathVariable String coinId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user=userService.findUserProfileByJwt(jwt);
        Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetsForUser(
            @RequestHeader("Authorization") String jwt
    ) throws UserException {
        User user=userService.findUserProfileByJwt(jwt);
        List<Asset> assets = assetService.getUsersAssets(user.getId());
        return ResponseEntity.ok().body(assets);
    }
}

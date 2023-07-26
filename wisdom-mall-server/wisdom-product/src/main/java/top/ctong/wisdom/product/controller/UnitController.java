package top.ctong.wisdom.product.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import top.ctong.wisdom.common.R;
import top.ctong.wisdom.common.log.Log;
import top.ctong.wisdom.common.model.dto.product.unit.AddUnitRequest;
import top.ctong.wisdom.common.model.dto.product.unit.UnitPageRequest;
import top.ctong.wisdom.common.model.entity.Unit;
import top.ctong.wisdom.common.utils.StringUtils;
import top.ctong.wisdom.product.service.UnitService;

import java.security.Principal;

/**
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2023 Clover You.
 * <p>
 * 单位前端控制器
 * </p>
 *
 * @author Clover
 * @date 2023-07-26 13:48
 */
@RestController
@RequestMapping("/product/unit")
@Tag(description = "商品单位前端控制器", name = "unit-controller")
public class UnitController {

    private final static Logger log = LoggerFactory.getLogger(UnitController.class);

    @Resource
    private UnitService unitService;

    /**
     * 添加商品单位
     *
     * @param params 单位信息
     * @return R<?>
     * @author Clover You
     * @date 2023/7/26 14:04
     */
    @PostMapping("add")
    @Operation(summary = "添加商品单位")
    @Log(name = "添加单位")
    public R<?> add(@RequestBody AddUnitRequest params, Principal principal) {
        log.debug("添加单位参数 ===>>> {}", params);
        unitService.save(params, Long.valueOf(principal.getName()));
        return R.ok();
    }

    /**
     * 分页获取单位信息
     *
     * @param params    请求参数
     * @param principal 登录用户信息
     * @return R<?>
     * @author Clover You
     * @date 2023/7/26 14:43
     */
    @GetMapping("post")
    @Log(name = "分页获取单位信息")
    @Operation(summary = "分页获取单位信息")
    public R<?> page(UnitPageRequest params, Principal principal) {
        var queryWrapper = new LambdaQueryWrapper<Unit>();

        queryWrapper.eq(Unit::getUnitId, Long.valueOf(principal.getName()));

        // 如果单位名称不为空，那么需要对齐进行模糊检索
        queryWrapper.like(
            StringUtils.notBlank(params.getUnitName()),
            Unit::getUnitName, params.getUnitName().trim()
        );

        var page = new Page<Unit>(params.getCurrent(), params.getSize());
        var results = unitService.page(page, queryWrapper);

        return R.ok(results);
    }

}

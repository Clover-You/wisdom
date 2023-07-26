package top.ctong.wisdom.product.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.ctong.wisdom.common.ErrorCode;
import top.ctong.wisdom.common.exception.ThrowUtils;
import top.ctong.wisdom.common.model.dto.product.unit.AddUnitRequest;
import top.ctong.wisdom.common.model.entity.Unit;
import top.ctong.wisdom.product.mapper.UnitMapper;
import top.ctong.wisdom.product.service.UnitService;

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
 * 单位服务
 * </p>
 *
 * @author Clover
 * @date 2023-07-26 14:06
 */
@Service
public class UnitServiceImpl extends ServiceImpl<UnitMapper, Unit> implements UnitService {

    /**
     * 保存单位信息
     *
     * @param params 单位信息
     * @param userId 用户id
     * @return boolean
     * @author Clover You
     * @date 2023/7/26 14:10
     */
    @Override
    public boolean save(AddUnitRequest params, Long userId) {
        // 获取数据库中最大的排序编号
        var sort = baseMapper.getMaxSortNum() + 1;

        // 检查单位是否存在
        var existsQueryWrapper = new LambdaQueryWrapper<Unit>();
        existsQueryWrapper.eq(Unit::getUserId, userId);
        existsQueryWrapper.eq(Unit::getUnitName, params.getUnitName().trim());
        existsQueryWrapper.eq(Unit::getIsDel, 0);

        var isExists = this.baseMapper.exists(existsQueryWrapper);
        ThrowUtils.throwIf(isExists, ErrorCode.PARAMS_ERROR, "单位已存在，不能再重复新增!");

        // 构造单位表
        var entity = Unit.builder()
            .unitName(params.getUnitName().trim())
            .unitRemark(params.getUnitRemark())
            .enable(params.getEnable())
            .isDecimal(params.getIsDecimal())
            .sort(sort)
            .userId(userId)
            .build();

        return this.save(entity);
    }
}
